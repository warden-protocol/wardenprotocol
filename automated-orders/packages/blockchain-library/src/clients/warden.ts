import * as utils from '@warden-automated-orders/utils';
import { warden } from '@wardenprotocol/wardenjs';
import { SignRequest, SignRequestStatus } from '@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/signature';

import { IWardenConfiguration } from '../types/warden/configuration.js';
import { INewSignatureRequest } from '../types/warden/newSignatureRequest.js';
import { QuerySignRequestsRequest } from '@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query';
import { PageRequest } from '@wardenprotocol/wardenjs/codegen/cosmos/base/query/v1beta1/pagination';

import { LRUCache } from 'lru-cache'

const { delay } = utils;
const { createRPCQueryClient } = warden.ClientFactory;

export class WardenClient {
  constructor(private configuration: IWardenConfiguration) { }

  private readonly entriesPerRequest = 100;
  private readonly seenCache: LRUCache<bigint, bigint> = new LRUCache<bigint, bigint>({
    max: this.entriesPerRequest * 2,
  });

  async query() {
    return await createRPCQueryClient({ rpcEndpoint: this.configuration.rpcURL });
  }

  async *pollSignatureRequests(): AsyncGenerator<INewSignatureRequest> {
    let nextKey: Uint8Array | undefined = undefined;

    while (true) {
      await delay(this.configuration.pollingIntervalMsec);

      const { signRequests, pagination } = await this.querySignRequests(nextKey, BigInt(this.entriesPerRequest));

      yield* this.yieldNewRequests(signRequests);

      if (notEmpty(pagination?.nextKey)) {
        nextKey = pagination!.nextKey;
      }
    }
  }

  private *yieldNewRequests(signRequests: SignRequest[]) {
    for (const request of signRequests) {
      if (!request.signedData) {
        continue;
      }

      if (this.seenCache.has(request.id)) {
        utils.logInfo(`Skipping already seen request ${request.id}`);
        continue;
      }

      yield {
        signedData: request.signedData!,
      };

      this.seenCache.set(request.id, request.id);
    }
  }

  private async querySignRequests(nextKey: Uint8Array | undefined, limit: bigint) {
    const page = nextKey
      ? { key: nextKey, limit: limit }
      : { offset: 0n, limit: limit };

    const query = (await this.query()).warden.warden.v1beta3.signRequests(QuerySignRequestsRequest.fromPartial({
      pagination: PageRequest.fromPartial(page),
      status: SignRequestStatus.SIGN_REQUEST_STATUS_FULFILLED,
      keychainId: 0n,
    }));

    const queryResponse = await query;

    return { signRequests: queryResponse.signRequests, pagination: queryResponse.pagination};
  }
}

function notEmpty(arr: Uint8Array | undefined) : boolean {
  return arr && arr.length > 0 || false;
}
