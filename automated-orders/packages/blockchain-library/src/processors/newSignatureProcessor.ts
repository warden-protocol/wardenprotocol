import { logError, logInfo, serialize } from '@warden-automated-orders/utils';

import { EvmClient } from '../clients/evm.js';
import { INewSignatureRequest } from '../types/warden/newSignatureRequest.js';
import { Processor } from './processor.js';
import { ExponentialBackoff, handleAll, IPolicy, retry } from 'cockatiel';
import { WardenRegistryClient } from '../clients/registry.js';
import { LRUCache } from 'lru-cache';

export class NewSignatureProcessor extends Processor<INewSignatureRequest> {
  private retryPolicy: IPolicy;
  private recentSignRequests: LRUCache<bigint, bigint>;

  constructor(
    private evm: EvmClient,
    private registryClient: WardenRegistryClient,
    generator: () => AsyncGenerator<INewSignatureRequest, unknown, unknown>,
    seenRequestsCacheSize: number
  ) {
    super(generator);

    const retryPolicy = retry(handleAll, { maxAttempts: 3, backoff: new ExponentialBackoff() });
    // TODO AT: Add circuit breaker
    this.retryPolicy = retryPolicy;

    this.recentSignRequests = new LRUCache<bigint, bigint>({
      max: seenRequestsCacheSize,
    });
  }

  async handle(data: INewSignatureRequest): Promise<void> {
    if(this.recentSignRequests.has(data.id)) { 
      logInfo(`Skip already seen transaction ${data.transactionHash}`);
      return;
    }
    
    logInfo(`New Signature request ${serialize(data)}`);

    try {
      await this.handleInternal(data);
    } catch (error) {
      logError(`New Signature error ${serialize(data)}. Error: ${error}, Stack trace: ${error.stack}`);
    }
  }

  private async handleInternal(data: INewSignatureRequest) : Promise<void> {
    await this.retryPolicy.execute(async () => {
      const transaction = await this.registryClient.getTransaction(data.transactionHash);
      if (!transaction) {
        logError(`Transaction with hash "${data.transactionHash}" not found in registry`);
        return;
      }

      const transactionExists = await this.evm.transactionExists(transaction, data.signature);
      if (transactionExists) {
        logInfo(`Transaction ${data.transactionHash} already exists`);
        this.recentSignRequests.set(data.id, data.id);
        return;
      }

      await this.evm.broadcastTx(transaction, data.signature);
      this.recentSignRequests.set(data.id, data.id);
    });
  }
}
