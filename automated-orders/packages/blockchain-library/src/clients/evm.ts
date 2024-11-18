import {
  Config,
  createConfig,
  estimateFeesPerGas,
  estimateGas,
  getBlockNumber,
  getBytecode,
  getGasPrice,
  getTransactionCount,
  http,
  readContract,
} from '@wagmi/core';
import { delay } from '@warden-automated-orders/utils';
import { LRUCache } from 'lru-cache';
import {
  AbiEvent,
  AbiFunction,
  Chain,
  Hex,
  Log,
  PublicClient,
  createPublicClient,
  createWalletClient,
  decodeEventLog,
  encodeFunctionData,
} from 'viem';
import { privateKeyToAccount, signTransaction } from 'viem/accounts';

import { IEvmConfiguration } from '../types/evm/configuration.js';
import { GasFeeData } from '../types/evm/gas.js';
import { IEventPollingConfiguration } from '../types/evm/pollingConfiguration.js';

export class EvmClient {
  signer: Hex;
  eventsFromBlocks: Map<string, bigint>;
  events: LRUCache<string, Log>;
  config: Config;
  client: PublicClient;

  constructor(
    private configuration: IEvmConfiguration,
    chain: Chain,
  ) {
    this.config = createConfig({
      chains: [chain],
      transports: {
        [chain.id]: http(this.configuration.rpcURL),
      },
    });

    this.client = createPublicClient({
      chain: chain,
      transport: http(this.configuration.rpcURL),
    });

    this.eventsFromBlocks = new Map<string, bigint>();

    if (this.configuration.eventsCacheSize) {
      this.events = new LRUCache<string, Log>({
        max: this.configuration.eventsCacheSize,
      });
    }

    if (this.configuration.callerPrivateKey) {
      this.signer = privateKeyToAccount(this.configuration.callerPrivateKey as Hex).address;
    }
  }

  public async broadcastTx(): Promise<void> {
    // TODO: implementation
  }

  public async *pollEvents<T>(
    contractAddress: string,
    startBlock: bigint,
    eventAbi: AbiEvent,
    config: IEventPollingConfiguration,
  ): AsyncGenerator<[string, T]> {
    while (true) {
      await delay(config.pollingIntervalMsec);

      for (const event of this.events) {
        yield [event[0], event[1] as T];
      }

      const endBlock = await getBlockNumber(this.config);

      let fromBlock = BigInt(this.eventsFromBlocks.get(eventAbi.name) ?? startBlock);
      let toBlock = endBlock;

      do {
        if (fromBlock + config.pollingBlocks > endBlock) {
          toBlock = endBlock;
        } else {
          toBlock = fromBlock + config.pollingBlocks;
        }

        const logs = await this.client.getContractEvents({
          address: contractAddress as Hex,
          abi: [eventAbi],
          fromBlock: fromBlock,
          toBlock: toBlock,
          eventName: eventAbi.name,
        });

        for (const log of logs) {
          const id = this.getEventId(log);
          const event = this.decodeEventLog<T>(eventAbi, log);

          this.events.set(id, log);

          yield [id, event];
        }

        fromBlock = toBlock;

        this.eventsFromBlocks.set(eventAbi.name, fromBlock);
      } while (fromBlock < endBlock);
    }
  }

  public async isContract(address: string): Promise<boolean> {
    const code = await getBytecode(this.config, { address: address as Hex });
    return (code?.length ?? 0) > 0;
  }

  public async callView<T>(contractAddress: string, functionAbi: AbiFunction, args: unknown[]): Promise<T> {
    const result = await readContract(this.config, {
      abi: [functionAbi],
      functionName: functionAbi.name,
      args: args,
      address: contractAddress as Hex,
      account: this.signer,
    });

    return result as T;
  }

  public getEventId(event: Log): string {
    return `bk_${event.blockNumber}_ix_${event.logIndex}`;
  }

  public async getNextNonce(account: string): Promise<number> {
    const transactionsCount = await getTransactionCount(this.config, {
      address: account as Hex,
    });

    return transactionsCount;
  }

  public async getGasFees(from: string, to: string, data: string, value: bigint): Promise<GasFeeData> {
    const feeData = await estimateFeesPerGas(this.config);
    const gasPrice = await getGasPrice(this.config);
    const gasLimit = await estimateGas(this.config, {
      account: from as Hex,
      to: to as Hex,
      value: value,
      data: data as Hex,
    });

    return {
      gasLimit,
      gasPrice,
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    };
  }

  public async sendTransaction(contractAddress: string, functionAbi: AbiFunction, args: unknown[]): Promise<void> {
    const data = encodeFunctionData({
      abi: [functionAbi],
      functionName: functionAbi.name,
      args: args,
    });

    const gas = await this.getGasFees(this.signer, contractAddress, data, 0n);
    const nonce = await this.getNextNonce(this.signer);

    const wallet = createWalletClient({
      transport: http(this.configuration.rpcURL),
      key: this.configuration.callerPrivateKey,
    });

    const signedTx = await signTransaction({
      privateKey: this.configuration.callerPrivateKey! as Hex,
      transaction: {
        chainId: this.config.chains[0].id,
        to: contractAddress as Hex,
        data: data as Hex,
        gas: gas.gasLimit,
        maxFeePerGas: gas.maxFeePerGas,
        maxPriorityFeePerGas: gas.maxPriorityFeePerGas,
        nonce: nonce,
      },
    });

    await wallet.sendRawTransaction({
      serializedTransaction: signedTx,
    });
  }

  private decodeEventLog<T>(eventAbi: AbiEvent, log: Log): T {
    return decodeEventLog({
      abi: [eventAbi],
      topics: log.topics,
      data: log.data,
    }) as T;
  }
}
import { delay, logError } from '@warden-automated-orders/utils';
import { AbiEventFragment, AbiFunctionFragment, Bytes, EventLog, FeeData, Transaction, Web3 } from 'web3';
import { IEvmConfiguration } from '../types/evm/configuration.js';
import { IEventPollingConfiguration } from '../types/evm/pollingConfiguration.js';

export class EvmClient {
  web3: Web3;
  events: Map<string, EventLog>;
  eventsFromBlocks: Map<string, bigint>;

  constructor(private configuration: IEvmConfiguration) {
    this.web3 = new Web3(this.configuration.rpcURL);
    this.events = new Map<string, EventLog>();
    this.eventsFromBlocks = new Map<string, bigint>();
  }

  public async broadcastTx(signedTransaction: Uint8Array): Promise<void> {
      const promi = this.web3.eth.sendSignedTransaction(signedTransaction);
      await promi.then();
  }

  public async *pollEvents<T extends EventLog>(
    contractAddress: string,
    startBlock: bigint,
    eventAbi: AbiEventFragment,
    config: IEventPollingConfiguration,
  ): AsyncGenerator<T> {
    while (true) {
      await delay(config.pollingIntervalMsec);

      for (const event of this.events) {
        yield event[1] as T;
      }

      const contract = new this.web3.eth.Contract([eventAbi], contractAddress);
      const endBlock = await this.web3.eth.getBlockNumber();

      let fromBlock = BigInt(this.eventsFromBlocks.get(eventAbi.name) ?? startBlock);
      let toBlock = endBlock;

      do {
        if (fromBlock + config.pollingBlocks > endBlock) {
          toBlock = endBlock;
        } else {
          toBlock = fromBlock + config.pollingBlocks;
        }

        const logs = (await contract.getPastEvents({
          fromBlock: fromBlock,
          toBlock: toBlock,
        })) as EventLog[];

        for (const log of logs) {
          if (log.event !== eventAbi.name) {
            continue;
          }

          const event = log as T;

          if (!event) {
            continue;
          }

          this.events.set(this.getEventId(event), event);

          yield event;
        }

        fromBlock = toBlock;

        this.eventsFromBlocks.set(eventAbi.name, fromBlock);
      } while (fromBlock < endBlock);
    }
  }

  public async isContract(address: string): Promise<boolean> {
    const code = await this.web3.eth.getCode(address);
    return Buffer.from(code.replace('0x', ''), 'hex').length > 0;
  }

  public async callView<T>(contractAddress: string, functionAbi: AbiFunctionFragment, args: unknown[]): Promise<T> {
    const contract = new this.web3.eth.Contract([functionAbi], contractAddress);
    const method = contract.methods[functionAbi.name].call(this, ...args);

    return (await method.call()) as T;
  }

  public getEventId(event: EventLog): string {
    return `${event.blockNumber}${event.logIndex}`;
  }

  public async getNextNonce(account: string): Promise<bigint> {
    const transactionsCount = await this.web3.eth.getTransactionCount(account);

    return transactionsCount + 1n;
  }

  public async getGasFees(
    from: string,
    to: string,
    data: Bytes,
    nonce: bigint,
    value: bigint,
  ): Promise<{ feeData: FeeData | undefined; gasLimit: bigint | undefined }> {
    const feeData = await this.web3.eth.calculateFeeData().catch((err) => {
      logError(`Failed to caldulate fee data, ${err}`);
      return undefined;
    });

    const gasLimit = await this.web3.eth
      .estimateGas({
        from: from,
        to: to,
        value: value,
        nonce: nonce,
        data: data,
        type: '0x2',
      })
      .catch((err) => {
        logError(`Failed to estimate gas, ${err}`);
        return undefined;
      });

    return { feeData, gasLimit };
  }

  public async sendTransaction(
    contractAddress: string,
    functionAbi: AbiFunctionFragment,
    args: unknown[],
  ): Promise<boolean> {
    const contract = new this.web3.eth.Contract([functionAbi], contractAddress);
    const data = contract.methods[functionAbi.name].call(this, ...args).encodeABI();
    const account = this.web3.eth.accounts.privateKeyToAccount(this.configuration.callerPrivateKey!);

    const nonce = await this.getNextNonce(account.address);

    const gas = await this.getGasFees(account.address, contractAddress, data, nonce, 0n);

    if (!gas.gasLimit || !gas.feeData) {
      return false;
    }

    const tx: Transaction = {
      from: account.address,
      to: contractAddress,
      data: data,
      gas: gas.gasLimit,
      maxFeePerGas: gas.feeData.maxFeePerGas,
      maxPriorityFeePerGas: gas.feeData.maxPriorityFeePerGas,
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(tx, this.configuration.callerPrivateKey!);
    const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction!);

    return receipt.status == 0;
  }
}
