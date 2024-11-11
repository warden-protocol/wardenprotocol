import { logError, logInfo, serialize } from '@warden-automated-orders/utils';

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
    generator: () => AsyncGenerator<OrderCreated, unknown, unknown>,
  ) {
    super(generator);
  }

  async handle(event: OrderCreated): Promise<boolean> {
    try {
      logInfo(`New Signature request ${serialize(event)}`);

      const exist = await this.evmos.isContract(event.returnValues.order);

      if (!exist) {
        this.evmos.events.delete(this.evmos.getEventId(event));

        return true;
      }

      const isExecuted = await this.evmos.callView<boolean>(event.returnValues.order, IsExecutedOrderAbi, []);

      if (isExecuted) {
        this.evmos.events.delete(this.evmos.getEventId(event));

        return true;
      }

      const canExecute = await this.evmos.callView<boolean>(event.returnValues.order, CanExecuteOrderAbi, []);

      if (!canExecute) {
        // TODO: cache and try check later
        return true;
      }

      logInfo(`${canExecute}`);

      const orderDetails = await this.evmos.callView<IExecutionData>(event.returnValues.order, ExecutionDataAbi, []);

      logInfo(`${serialize(orderDetails)}`);

      if (!this.supportedChainIds.has(orderDetails.chainId)) {
        this.evmos.events.delete(this.evmos.getEventId(event));

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

      if (!gas.gasLimit || !gas.feeData) {
        return true;
      }

      const executed = await this.evmos.sendTransaction(event.returnValues.order, ExecuteAbi, [
        nonce,
        gas.gasLimit,
        gas.feeData.gasPrice,
        gas.feeData.maxPriorityFeePerGas,
        gas.feeData.maxFeePerGas,
      ]);

      if (!executed) {
        return true;
      }

      // TODO: 3 attempts to execute()
      this.evmos.events.delete(this.evmos.getEventId(event));

      return true;
    } catch (error) {
      logError(`New Signature error ${serialize(event)}. Error: ${error}, Stack trace: ${error.stack}`);

      return false;
    }
  }
}
