import { delay } from '@warden-automated-orders/utils';
import { AbiEventFragment, EventLog, Web3 } from 'web3';

import { IEvmConfiguration } from '../types/evm/configuration.js';
import { IEventPollingConfiguration } from '../types/evm/pollingConfiguration.js';

export class EvmClient {
  web3: Web3;

  constructor(private configuration: IEvmConfiguration) {
    this.web3 = new Web3(this.configuration.rpcURL);
  }

  async broadcastTx(): Promise<void> {
    // TODO: implementation
  }

  async *pollEvents<T extends EventLog>(
    contract: string,
    startBlock: bigint,
    eventAbi: AbiEventFragment,
    config: IEventPollingConfiguration,
  ): AsyncGenerator<T> {
    while (true) {
      await delay(config.pollingIntervalMsec);

      const myContract = new this.web3.eth.Contract([eventAbi], contract);
      const endBlock = await this.web3.eth.getBlockNumber();

      let currentBlock = startBlock;

      do {
        let nextBlock: bigint;

        if (currentBlock + config.pollingBlocks > endBlock) {
          nextBlock = endBlock;
        } else {
          nextBlock = currentBlock + config.pollingBlocks;
        }

        const logs = (await myContract.getPastEvents({
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
}
