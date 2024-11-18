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
import {
  toHex,
  serializeTransaction,
  TransactionSerializable,
  parseTransaction,
  parseSignature,
 } from "viem";

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

  public async broadcastTx(signedTransaction: Hex, dataForSigning: Hex): Promise<void> {
    const hexTrans = toHex(utils.bytesToUint8Array(dataForSigning));
    const ethRequest = parseTransaction(hexTrans);
    const hexSign = toHex(utils.bytesToUint8Array(signedTransaction));
    const signature = parseSignature(hexSign);
    
    const serialized = serializeTransaction(
      ethRequest as TransactionSerializable,
      signature,
    );

    
    const promi = this.web3.eth.sendSignedTransaction(serialized);
    await promi.then();
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