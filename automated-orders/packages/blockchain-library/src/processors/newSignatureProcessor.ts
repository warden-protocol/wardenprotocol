import { logError, logInfo, serialize } from '@warden-automated-orders/utils';

import { EvmClient } from '../clients/evm.js';
import { INewSignatureRequest } from '../types/warden/newSignatureRequest.js';
import { Processor } from './processor.js';
import { circuitBreaker, ConsecutiveBreaker, ExponentialBackoff, handleAll, IPolicy, retry, wrap } from 'cockatiel';
import { WardenRegistryClient } from '../clients/registry.js';

export class NewSignatureProcessor extends Processor<INewSignatureRequest> {
  private retryPolicy: IPolicy;

  constructor(
    private evm: EvmClient,
    private registryClient: WardenRegistryClient,
    generator: () => AsyncGenerator<INewSignatureRequest, unknown, unknown>,
  ) {
    super(generator);

    const retryPolicy = retry(handleAll, { maxAttempts: 3, backoff: new ExponentialBackoff() });

    const circuitBreakerPolicy = circuitBreaker(handleAll, {
      halfOpenAfter: 10 * 1000,
      breaker: new ConsecutiveBreaker(5),
    });

    this.retryPolicy = wrap(retryPolicy, circuitBreakerPolicy);
  }

  async handle(data: INewSignatureRequest): Promise<void> {
    try {
      logInfo(`New Signature request ${serialize(data)}`);
      
      await this.retryPolicy.execute(async () => { 
        const transactionExists = await this.evm.transactionExists(data.transactionHash);
        if(transactionExists) {
          logInfo(`Transaction ${data.transactionHash} already exists`);
          return;
        }

        const transaction = await this.registryClient.getTransaction(data.transactionHash);
        if(transaction) {
          await this.evm.broadcastTx(transaction, data.signature);
        } else { 
          logError(`Transaction with hash "${data.transactionHash}" not found in registry`)
        }
      });
    } catch (error) {
      logError(`New Signature error ${serialize(data)}. Error: ${error}, Stack trace: ${error.stack}`);
    }
  }
}
