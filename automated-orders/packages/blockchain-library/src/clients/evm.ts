import { delay } from '@warden-automated-orders/utils';
import { LRUCache } from 'lru-cache';
import { AbiEventFragment, AbiFunctionFragment, Bytes, EventLog, FeeData, Transaction, Web3 } from 'web3';

import { IEvmConfiguration } from '../types/evm/configuration.js';
import { IEventPollingConfiguration } from '../types/evm/pollingConfiguration.js';

export class EvmClient {
  web3: Web3;
  signer: string;
  eventsFromBlocks: Map<string, bigint>;
  events: LRUCache<string, EventLog>;

  constructor(private configuration: IEvmConfiguration) {
    this.web3 = new Web3(this.configuration.rpcURL);
    this.eventsFromBlocks = new Map<string, bigint>();

    if (this.configuration.eventsCacheSize) {
      this.events = new LRUCache<string, EventLog>({
        max: this.configuration.eventsCacheSize,
      });
    }

    if (this.configuration.callerPrivateKey) {
      this.signer = this.web3.eth.accounts.privateKeyToAccount(this.configuration.callerPrivateKey!).address;
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
    return `bk_${event.blockNumber}_ix_${event.logIndex}`;
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
  ): Promise<{ feeData: FeeData; gasLimit: bigint }> {
    const feeData = await this.web3.eth.calculateFeeData();

    const gasLimit = await this.web3.eth.estimateGas({
      from: from,
      to: to,
      value: value,
      nonce: nonce,
      data: data,
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

    const nonce = await this.getNextNonce(this.signer);
    const gas = await this.getGasFees(this.signer, contractAddress, data, nonce, 0n);

    const tx: Transaction = {
      from: this.signer,
      to: contractAddress,
      data: data,
      gas: gas.gasLimit,
      maxFeePerGas: gas.feeData.maxFeePerGas,
      maxPriorityFeePerGas: gas.feeData.maxPriorityFeePerGas,
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(tx, this.configuration.callerPrivateKey!);
    const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction!);

    return receipt.status == 1;
  }
}
