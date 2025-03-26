import { logError, logInfo, logWarning, serialize } from '@warden-automated-orders/utils';

import { EvmClient } from '../clients/evm.js';
import { IOrderRegistered } from '../types/order/events.js';
import {
  CanExecuteOrderAbi,
  ExecuteAbi,
  ExecutionDataAbi,
  IExecutionData,
  IsExecutedOrderAbi,
} from '../types/order/functions.js';
import { Processor } from './processor.js';

export class OrderProcessor extends Processor<[string, IOrderRegistered]> {
  constructor(
    private evmos: EvmClient,
    private ethereum: EvmClient,
    private supportedChainIds: Set<bigint>,
    private retryAttempts: number,
    generator: () => AsyncGenerator<[string, IOrderRegistered], unknown, unknown>,
  ) {
    super(generator);
  }

  async handle(event: [string, IOrderRegistered], retryAttempt?: number): Promise<void> {
    if (retryAttempt && retryAttempt >= this.retryAttempts) {
      return;
    }

    try {
      const [key, data] = event;

      logInfo(`New order: ${serialize(event)}`);

      const exist = await this.evmos.isContract(data.args.execution);
      if (!exist) {
        logWarning(`Order is not a contract: ${key}`);

        this.evmos.events.delete(key);

        return;
      }

      const isExecuted = await this.evmos.callView<boolean>(data.args.execution, IsExecutedOrderAbi, []);
      if (isExecuted) {
        logWarning(`Order was already executed: ${key}`);

        this.evmos.events.delete(key);

        return;
      }

      const canExecute = await this.evmos.callView<boolean>(data.args.execution, CanExecuteOrderAbi, []);
      if (!canExecute) {
        logWarning(`Order is not ready yet: ${key}`);

        return;
      }

      const orderDetails = await this.evmos.callView<IExecutionData>(data.args.execution, ExecutionDataAbi, []);

      if (!this.supportedChainIds.has(orderDetails.chainId)) {
        this.evmos.events.delete(key);

        logError(`Chain id = ${orderDetails.chainId} is not supported`);

        return;
      }

      const nonce = await this.ethereum.getNextNonce(orderDetails.caller);
      const gas = await this.ethereum.getGasFees(
        orderDetails.caller,
        orderDetails.to,
        orderDetails.data,
        orderDetails.value,
      );

      const txHash = await this.evmos.sendTransaction(data.args.execution, ExecuteAbi, [
        nonce,
        gas.gasLimit,
        gas.gasPrice,
        gas.maxPriorityFeePerGas,
        gas.maxFeePerGas,
      ]);

      const receipt = await this.evmos.client.waitForTransactionReceipt({ hash: txHash });
      if (receipt.status != "success") {
        throw new Error(`Tx with hash ${txHash} not executed: ${receipt}`);
      }

      this.evmos.events.delete(key);

    } catch (error) {
      logError(`New order error ${serialize(event)}. Error: ${error}, Stack trace: ${error.stack}`);

      retryAttempt = retryAttempt ?? 1;

      await this.handle(event, ++retryAttempt);
    }
  }
}
