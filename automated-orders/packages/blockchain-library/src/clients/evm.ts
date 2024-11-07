import { delay } from '@warden-automated-orders/utils';
import { AbiEventFragment, AbiFunctionFragment, EventLog, Web3 } from 'web3';

import { IEvmConfiguration } from '../types/evm/configuration.js';
import { IEventPollingConfiguration } from '../types/evm/pollingConfiguration.js';

export class EvmClient {
  web3: Web3;

  constructor(private configuration: IEvmConfiguration) {
    this.web3 = new Web3(this.configuration.rpcURL);
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

      const contract = new this.web3.eth.Contract([eventAbi], contractAddress);
      const endBlock = await this.web3.eth.getBlockNumber();

      let currentBlock = BigInt(startBlock);

      do {
        let nextBlock: bigint;

        if (currentBlock + config.pollingBlocks > endBlock) {
          nextBlock = endBlock;
        } else {
          nextBlock = currentBlock + config.pollingBlocks;
        }

        const logs = (await contract.getPastEvents({
          fromBlock: startBlock,
          toBlock: endBlock,
        })) as EventLog[];

        for (const log of logs) {
          if (log.event !== eventAbi.name) {
            continue;
          }

          const event = log as T;

          if (!event) {
            continue;
          }

          yield event;
        }

        currentBlock = nextBlock;
      } while (currentBlock < endBlock);
    }
  }

  public async isContract(address: string): Promise<boolean> {
    return (await this.web3.eth.getCode(address)).length > 0;
  }

  public async callView(
    contractAddress: string,
    functionAbi: AbiFunctionFragment,
    ...args: unknown[]
  ): Promise<unknown> {
    const contract = new this.web3.eth.Contract([functionAbi], contractAddress);
    const method = contract.methods[functionAbi.name].call(this, args);

    return await method.call();
  }
}
