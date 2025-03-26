import { logError, logInfo, serialize } from '@warden-automated-orders/utils';
import { LRUCache } from 'lru-cache';
import { concatHex, decodeFunctionResult, Hex } from 'viem';
import { ExecuteSignedQuoteParams, GetQuotePayload } from '@biconomy/abstractjs';

import { getQuotePayloadAbiItem } from '../types/biconomy/abi.js';
import { EvmClient } from '../clients/evm.js';
import { BiconomyMEEClient } from '../clients/mee.js';
import { INewSignatureRequest } from '../types/warden/newSignatureRequest.js';
import { Processor } from './processor.js';
import { ExponentialBackoff, handleAll, IPolicy, retry } from 'cockatiel';
import { WardenRegistryClient } from '../clients/registry.js';

/**
 * Custom error for missing required clients
 */
export class MissingClientError extends Error {
  constructor(message = 'At least one of EvmClient or BiconomyMEEClient must be provided') {
    super(message);
    this.name = 'MissingClientError';
    Object.setPrototypeOf(this, MissingClientError.prototype);
  }
}

export class NewSignatureProcessor extends Processor<INewSignatureRequest> {
  private retryPolicy: IPolicy;
  private recentSignRequests: LRUCache<bigint, bigint>;

  constructor(
    private registryClient: WardenRegistryClient,
    generator: () => AsyncGenerator<INewSignatureRequest, unknown, unknown>,
    seenRequestsCacheSize: number,
    private evm?: EvmClient,
    private mee?: BiconomyMEEClient,
  ) {
    super(generator);

    if (!evm && !mee) {
      throw new MissingClientError();
    }

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
      const transaction = await this.registryClient.getTransaction(data.transactionHash, data.creator);
      if (!transaction) {
        logError(`Transaction with hash "${data.transactionHash}" not found in registry`);
        return;
      }

      const transactionExists = await this.transactionExists(transaction, data);

      if (transactionExists) {
        logInfo(`Transaction ${data.transactionHash} already exists`);
        this.recentSignRequests.set(data.id, data.id);
        return;
      }

      await this.sendTx(transaction, data);
      this.recentSignRequests.set(data.id, data.id);
    });
  }

  private async transactionExists(transaction: Hex, data: INewSignatureRequest): Promise<boolean> {
    if (this.evm) {
      return await this.evm.transactionExists(transaction, data.signature);
    } else if (this.mee) {
      return await this.mee.transactionExists(data.transactionHash);
    } else {
      throw new MissingClientError();
    }
  }

  private async sendTx(transaction: Hex, data: INewSignatureRequest): Promise<void> {
    if (this.evm) {
      await this.evm.broadcastTx(transaction, data.signature);
    } else if (this.mee) {
      const getQuotePayload = decodeFunctionResult({
        abi: [getQuotePayloadAbiItem],
        data: transaction
      });

      const params: ExecuteSignedQuoteParams = {
        signedQuote: { ...getQuotePayload as GetQuotePayload, signature: concatHex(["0x00", data.signature]) }
      };
      
      await this.mee.executeSignedQuote(params);
    } else {
      throw new MissingClientError();
    }
  }
}
