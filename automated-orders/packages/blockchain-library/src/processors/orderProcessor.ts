import { logError, logInfo, serialize } from '@warden-automated-orders/utils';

import { EvmClient } from '../clients/evm.js';
import { OrderCreated } from '../types/registry/events.js';
import {
  CanExecuteOrderAbi,
  ExecuteAbi,
  ExecutionDataAbi,
  IExecutionData,
  IsExecutedOrderAbi,
} from '../types/registry/functions.js';
import { Processor } from './processor.js';

export class OrderProcessor extends Processor<OrderCreated> {
  constructor(
    private evm: EvmClient,
    generator: () => AsyncGenerator<OrderCreated, unknown, unknown>,
  ) {
    super(generator);
  }

  async handle(event: OrderCreated): Promise<boolean> {
    try {
      logInfo(`New Signature request ${serialize(event)}`);

      const exist = await this.evm.isContract(event.returnValues.order);

      if (!exist) {
        this.evm.events.delete(this.evm.getEventId(event));

        return true;
      }

      const isExecuted = await this.evm.callView<boolean>(event.returnValues.order, IsExecutedOrderAbi, []);

      if (isExecuted) {
        this.evm.events.delete(this.evm.getEventId(event));

        return true;
      }

      const canExecute = await this.evm.callView<boolean>(event.returnValues.order, CanExecuteOrderAbi, []);

      if (!canExecute) {
        // TODO: cache and try check later
        return true;
      }

      logInfo(`${canExecute}`);

      const orderDetails = await this.evm.callView<IExecutionData>(event.returnValues.order, ExecutionDataAbi, []);

      logInfo(`${serialize(orderDetails.caller)}`);

      const nonce = this.evm.getNextNonce(orderDetails.caller);

      // TODO: add missing args (gas settings)
      const executed = await this.evm.sendTransaction(event.returnValues.order, ExecuteAbi, [nonce]);

      if (!executed) {
        return true;
      }

      // TODO: 3 attempts to execute()
      this.evm.events.delete(this.evm.getEventId(event));

      return true;
    } catch (error) {
      logError(`New Signature error ${serialize(event)}. Error: ${error}, Stack trace: ${error.stack}`);

      return false;
    }
  }
}
