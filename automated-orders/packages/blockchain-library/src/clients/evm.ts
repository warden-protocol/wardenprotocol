import {
  Config,
  createConfig,
  estimateFeesPerGas,
  estimateGas,
  getBlockNumber,
  getBytecode,
  getTransactionCount,
  http,
} from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { delay } from '@warden-automated-orders/utils';
import { LRUCache } from 'lru-cache';
import { Hex, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { AbiEventFragment, AbiFunctionFragment, Bytes, EventLog } from 'web3';

import { IEvmConfiguration } from '../types/evm/configuration.js';
import { GasFeeData } from '../types/evm/gas.js';
import { IEventPollingConfiguration } from '../types/evm/pollingConfiguration.js';

export class EvmClient {
  signer: Hex;
  eventsFromBlocks: Map<string, bigint>;
  events: LRUCache<string, EventLog>;
  config: Config;

  constructor(private configuration: IEvmConfiguration) {
    this.config = createConfig({
      chains: [sepolia],
      transports: {
        [sepolia.id]: http(this.configuration.rpcURL),
      },
    });

    this.eventsFromBlocks = new Map<string, bigint>();

    if (this.configuration.eventsCacheSize) {
      this.events = new LRUCache<string, EventLog>({
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
      const endBlock = await getBlockNumber(this.config);

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
    const code = await getBytecode(this.config, { address: address as Hex });
    return (code?.length ?? 0) > 0;
  }

  public async callView<T>(contractAddress: string, functionAbi: AbiFunctionFragment, args: unknown[]): Promise<T> {
    const contract = new this.web3.eth.Contract([functionAbi], contractAddress);
    const result = await contract.methods[functionAbi.name](...args).call();

    return result as T;
  }

  public getEventId(event: EventLog): string {
    return `bk_${event.blockNumber}_ix_${event.logIndex}`;
  }

  public async getNextNonce(account: string): Promise<number> {
    const transactionsCount = await getTransactionCount(this.config, {
      address: account as Hex,
    });

    return transactionsCount;
  }

  public async getGasFees(from: string, to: string, data: Bytes, value: bigint): Promise<GasFeeData> {
    const feeData = await estimateFeesPerGas(this.config);

    const gasLimit = await estimateGas(this.config, {
      account: from as Hex,
      to: to as Hex,
      value: value,
      data: data as Hex,
    });

    return {
      gasLimit,
      gasPrice: feeData.gasPrice,
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    };
  }

  public async sendTransaction(
    contractAddress: string,
    functionAbi: AbiFunctionFragment,
    args: unknown[],
  ): Promise<void> {
    const contract = new this.web3.eth.Contract([functionAbi], contractAddress);
    const data = contract.methods[functionAbi.name](...args).encodeABI();

    const gas = await this.getGasFees(this.signer, contractAddress, data, 0n);

    const wallet = createWalletClient({
      transport: http(this.configuration.rpcURL),
      key: this.configuration.callerPrivateKey,
    });

    const signedTx = await wallet.signTransaction({
      chain: this.config.chains[0], // TODO: !!!
      account: this.signer as Hex,
      to: contractAddress as Hex,
      data: data as Hex,
      gas: gas.gasLimit,
      maxFeePerGas: gas.maxFeePerGas,
      maxPriorityFeePerGas: gas.maxPriorityFeePerGas,
    });

    await wallet.sendRawTransaction({
      serializedTransaction: signedTx,
    });
  }
}
