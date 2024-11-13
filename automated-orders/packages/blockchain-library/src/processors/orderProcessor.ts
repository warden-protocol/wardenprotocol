import { logError, logInfo, logWarning, serialize } from '@warden-automated-orders/utils';

import { EvmClient } from '../clients/evm.js';
import { OrderCreated } from '../types/order/events.js';
import {
  CanExecuteOrderAbi,
  ExecuteAbi,
  ExecutionDataAbi,
  IExecutionData,
  IsExecutedOrderAbi,
} from '../types/order/functions.js';
import { Processor } from './processor.js';

export class OrderProcessor extends Processor<OrderCreated> {
  constructor(
    private evmos: EvmClient,
    private ethereum: EvmClient,
    private supportedChainIds: Map<bigint, undefined>,
    private retryAttempts: number,
    generator: () => AsyncGenerator<OrderCreated, unknown, unknown>,
  ) {
    super(generator);
  }

  async handle(event: OrderCreated, retryAttempt?: number): Promise<boolean> {
    if (retryAttempt && retryAttempt >= this.retryAttempts) {
      return true;
    }

    try {
      logInfo(`New order: ${serialize(event)}`);

      const id = this.evmos.getEventId(event);

      const exist = await this.evmos.isContract(event.returnValues.execution);

      if (!exist) {
        logWarning(`Order is not a contract: ${id}`);

        this.evmos.events.delete(id);

        return true;
      }

      const isExecuted = await this.evmos.callView<boolean>(event.returnValues.execution, IsExecutedOrderAbi, []);

      if (isExecuted) {
        logWarning(`Order was already executed: ${id}`);

        this.evmos.events.delete(id);

        return true;
      }

      const canExecute = await this.evmos.callView<boolean>(event.returnValues.execution, CanExecuteOrderAbi, []);

      if (!canExecute) {
        logWarning(`Order is not ready yet: ${id}`);

        return true;
      }

      const orderDetails = await this.evmos.callView<IExecutionData>(
        event.returnValues.execution,
        ExecutionDataAbi,
        [],
      );

      if (!this.supportedChainIds.has(orderDetails.chainId)) {
        this.evmos.events.delete(id);

        logError(`Chain id = ${orderDetails.chainId} is not supported`);

        return true;
      }

      const nonce = await this.ethereum.getNextNonce(orderDetails.caller);
      const gas = await this.ethereum.getGasFees(
        orderDetails.caller,
        orderDetails.to,
        orderDetails.data,
        nonce,
        orderDetails.value,
      );

      const executed = await this.evmos.sendTransaction(event.returnValues.execution, ExecuteAbi, [
        nonce,
        gas.gasLimit,
        gas.feeData.gasPrice,
        gas.feeData.maxPriorityFeePerGas,
        gas.feeData.maxFeePerGas,
      ]);

      if (!executed) {
        logError(`Failed to execute order: ${id}`);

        return true;
      }

      this.evmos.events.delete(id);

      return true;
    } catch (error) {
      logError(`New order error ${serialize(event)}. Error: ${error}, Stack trace: ${error.stack}`);

      retryAttempt = retryAttempt ?? 1;

      return await this.handle(event, ++retryAttempt);
    }
  }
}
