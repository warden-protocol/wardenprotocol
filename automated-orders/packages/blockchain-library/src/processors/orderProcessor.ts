import { logError, logInfo, serialize } from '@warden-automated-orders/utils';

import { EvmClient } from '../clients/evm.js';
import { OrderCreated } from '../types/registry/events.js';
import { CanExecuteOrderAbi } from '../types/registry/functions.js';
import { Processor } from './processor.js';

export class OrderProcessor extends Processor<OrderCreated> {
  constructor(
    private evm: EvmClient,
    generator: () => AsyncGenerator<OrderCreated, unknown, unknown>,
  ) {
    super(generator);
  }

  async handle(data: OrderCreated): Promise<boolean> {
    try {
      logInfo(`New Signature request ${serialize(data)}`);

      const exist = this.evm.isContract(data.returnValues.order);

      if (!exist) {
        return true;
      }

      const canExecute = await this.evm.callView(data.returnValues.order, CanExecuteOrderAbi, []);

      logInfo(`${canExecute}`);

      // TODO: implementation

      return true;
    } catch (error) {
      logError(`New Signature error ${serialize(data)}. Error: ${error}, Stack trace: ${error.stack}`);

      return false;
    }
  }
}
