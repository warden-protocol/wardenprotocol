import * as utils from '@warden-automated-orders/utils';

import { IWardenConfiguration } from '../types/warden/configuration.js';
import { INewSignatureRequest } from '../types/warden/newSignatureRequest.js';

import { EvmClient } from './evm.js';
import {
  IPageRequest,
  SignRequestsAbi,
  SignRequestStatus,
  ISignRequestResponse as Response,
  OptionalBroadcastType
} from '../types/warden/functions.js';
import { Hex } from 'viem';

const { delay } = utils;

export class WardenClient {
  constructor(
    private configuration: IWardenConfiguration,
    private evm: EvmClient
  ) { }

  async *pollSignatureRequests(): AsyncGenerator<INewSignatureRequest> {
    let nextKey: Hex | undefined = undefined;
    while (true) {
      await delay(this.configuration.signatureRequestsPoolingIntervalMsec);

      try {
        const [signRequests, pageResponse] = await this.querySignRequests(
          nextKey, BigInt(this.configuration.signatureRequestsPageSize))

        if (signRequests && signRequests.length > 0) { 
          for (const request of signRequests) {
            if (!request.result) {
              utils.logError(`Signed data is empty, but request "${request.id}" is fulfilled`)
              continue;
            }

            yield {
              id: request.id,
              creator: request.creator,
              signature: request.result!,
              transactionHash: request.dataForSigning!,
            };
          }
        } else { 
          utils.logInfo(`No new sign requests found`);
        }

        nextKey = pageResponse?.nextKey;
      }
      catch (err) {
        utils.logError(`Error while polling for new signature requests: ${utils.serialize(err)}`)
      }
    }
  }

  private async querySignRequests(nextKey: Hex | undefined, limit: bigint): Promise<Response> {
    const pagination: IPageRequest = { 
      key: nextKey ?? `0x`, 
      limit: limit,
      offset: BigInt(0), 
      countTotal: false, 
      reverse: false 
    };

    const args: unknown[] = [pagination, BigInt(1), SignRequestStatus.SIGN_REQUEST_STATUS_FULFILLED, OptionalBroadcastType.AUTOMATIC];
    const response = await this.evm.callView<Response>(
      this.configuration.wardenPrecompileAddress,
      SignRequestsAbi,
      args)

    return response;
  }
}