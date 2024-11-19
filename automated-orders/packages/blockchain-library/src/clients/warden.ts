import * as utils from '@warden-automated-orders/utils';

import { IWardenConfiguration } from '../types/warden/configuration.js';
import { INewSignatureRequest } from '../types/warden/newSignatureRequest.js';

import { LRUCache } from 'lru-cache'
import { EvmClient } from './evm.js';
import { 
    IPageRequest, 
    ISignRequest, 
    ISignRequestResponse, 
    SignRequestsAbi, 
    SignRequestStatus 
} from '../types/warden/functions.js';
import { bytesToHex, Hex, hexToBytes } from 'viem';

const { delay } = utils;

export class WardenClient {

  constructor(
    private configuration: IWardenConfiguration,
    private evm: EvmClient
  ) { }

  private readonly precompileAddress = '0x0000000000000000000000000000000000000900';

  private readonly entriesPerRequest = 100;
  private readonly seenCache: LRUCache<bigint, bigint> = new LRUCache<bigint, bigint>({
    max: this.entriesPerRequest * 2,
  });

  async *pollSignatureRequests(): AsyncGenerator<INewSignatureRequest> {
    let nextKey: Uint8Array | undefined = undefined;

    while (true) {
      await delay(this.configuration.pollingIntervalMsec);

      const { signRequests, pageResponse } = await this.querySignRequests(nextKey, BigInt(this.entriesPerRequest))

      yield* this.yieldNewRequests(signRequests);

      const newKey = this.tryConvertBytesToUint8Array(pageResponse.nextKey)
      if(utils.notEmpty(newKey)) { 
        nextKey = newKey;
      }
    }
  }

  private *yieldNewRequests(signRequests: ISignRequest[]) {
    for (const request of signRequests) {
      if (!request.result) {
        utils.logError(`Signed data is empty, but request "${request.id}" is fulfilled`)
        continue;
      }

      if (this.seenCache.has(request.id)) {
        utils.logInfo(`Skipping already seen request "${request.id}"`);
        continue;
      }

      yield {
        signature: request.result!,
        transactionHash: request.dataForSigning!,
      };

      this.seenCache.set(request.id, request.id);
    }
  }

  private async querySignRequests(nextKey: Uint8Array | undefined, limit: bigint): Promise<ISignRequestResponse> {
    const pagination: IPageRequest = nextKey
      ? { key: bytesToHex(nextKey), limit: limit, offset: undefined, countTotal: false, reverse: false }
      : { offset: BigInt(0), limit: limit, key: undefined, countTotal: false, reverse: false };

    // TODO AT: Need to add filter by SignRequest type, when implemented
    const response = await this.evm.callView<ISignRequestResponse>(
      this.precompileAddress, 
      SignRequestsAbi, 
      [pagination, BigInt(1), SignRequestStatus.SIGN_REQUEST_STATUS_FULFILLED])

    return response;
  }

  private tryConvertBytesToUint8Array(bytes: Hex) : Uint8Array | undefined { 
    try {
      const arr = hexToBytes(bytes);
      if (utils.notEmpty(arr)) {
        return arr;
      }
    }
    catch(err) {
      utils.logError(`Error while converting Bytes to Uint8Array ${bytes}: ${utils.serialize(err)}`)
    }

    return undefined;
  }
}