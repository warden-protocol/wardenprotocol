import { logError, logInfo, logWarning, serialize } from '@warden-automated-orders/utils';

import { EvmClient } from '../clients/evm.js';
import { IOrderRegistered } from '../types/order/events.js';
import {
  CanExecuteOrderAbi,
  IsExecutedOrderAbi,
} from '../types/order/functions.js';
import {
  ExecuteAbiV0,
  ExecutionDataAbiV0,
  IExecutionDataV0,
} from '../types/order/v0.js';
import { Processor } from './processor.js';
import { MissingClientError } from '../types/errors/missedClientError.js';
import { Hex } from 'viem';
import { ExecuteAbiV1, ExecutionDataAbiV1, IExecutionDataV1 } from '../types/order/v1.js';
import { BiconomyMEEClient } from '../clients/mee.js';

export class OrderProcessor extends Processor<[string, IOrderRegistered]> {
  constructor(
    private evmos: EvmClient,
    private supportedChainIds: Set<bigint>,
    private retryAttempts: number,
    generator: () => AsyncGenerator<[string, IOrderRegistered], unknown, unknown>,
    private ethereum?: EvmClient,
    private mee?: BiconomyMEEClient,
  ) {
    
    if (!ethereum && !mee) {
      throw new MissingClientError();
    }
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

      let txHash;
      if (this.ethereum) {
        txHash = await this.handleV0(data, key);
      } else if (this.mee) {
        txHash = await this.handleV1(data, key);
      } else {
        throw new MissingClientError();
      }

      if (txHash !== null) {
        const receipt = await this.evmos.client.waitForTransactionReceipt({ hash: txHash });
        if (receipt.status != "success") {
          throw new Error(`Tx with hash ${txHash} not executed: ${JSON.stringify(
            receipt,
            (key, value) =>
              typeof value === 'bigint'
                  ? value.toString()
                  : value // return everything else unchanged
            )}`);
        }

        this.evmos.events.delete(key);
      }

    } catch (error) {
      logError(`New order error ${serialize(event)}. Error: ${error}, Stack trace: ${error.stack}`);

      retryAttempt = retryAttempt ?? 1;

      await this.handle(event, ++retryAttempt);
    }
  }

  private async handleV0(data: IOrderRegistered, key: string): Promise<Hex | null> {
    const orderDetails = await this.evmos.callView<IExecutionDataV0>(data.args.execution, ExecutionDataAbiV0, []);

    if (!this.supportedChainIds.has(orderDetails.chainId)) {
      this.evmos.events.delete(key);

      logError(`Chain id = ${orderDetails.chainId} is not supported`);

      return null;
    }

    const nonce = await this.ethereum!.getNextNonce(orderDetails.caller);
    const gas = await this.ethereum!.getGasFees(
      orderDetails.caller,
      orderDetails.to,
      orderDetails.data,
      orderDetails.value,
    );

    const txHash = await this.evmos.sendTransaction(data.args.execution, ExecuteAbiV0, [
      nonce,
      gas.gasLimit,
      gas.gasPrice,
      gas.maxPriorityFeePerGas,
      gas.maxFeePerGas,
    ]);

    return txHash;
  }

  private async handleV1(data: IOrderRegistered, key: string): Promise<Hex | null> {
    const orderDetails = await this.evmos.callView<IExecutionDataV1>(data.args.execution, ExecutionDataAbiV1, []);
    
    if (orderDetails.instructions.length === 0) {
      this.evmos.events.delete(key);
      logError(`Empty instructions`);

      return null;
    }

    for (const chainId of orderDetails.instructions.map(i => i.chainId)) {
      if (!this.supportedChainIds.has(BigInt(chainId))) {
        this.evmos.events.delete(key);

        logError(`Chain id = ${chainId} is not supported`);

        return null;
      }
    }
    const quote = await this.mee!.getQuote(
      orderDetails.caller,
      orderDetails.instructions.map(i => ({ ...i, chainId: Number(i.chainId) })),
      { address: orderDetails.feeToken["addr"], chainId: Number(orderDetails.feeToken.chainId) });
    
    const initCode = quote.paymentInfo.initCode;
    const paymentInfoToEncode = { ...quote.paymentInfo, initCode: initCode ? initCode : '0x' };
    quote.paymentInfo = paymentInfoToEncode;
    const txHash = await this.evmos.sendTransaction(data.args.execution, ExecuteAbiV1, [
      quote
    ]);

    return txHash;
  }
}
