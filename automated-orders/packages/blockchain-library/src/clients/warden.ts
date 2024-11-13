import * as utils from '@warden-automated-orders/utils';
import { warden } from '@wardenprotocol/wardenjs';
import { SignRequest, SignRequestStatus } from '@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/signature';

import { IWardenConfiguration } from '../types/warden/configuration.js';
import { INewSignatureRequest } from '../types/warden/newSignatureRequest.js';

const { delay } = utils;
const { createRPCQueryClient } = warden.ClientFactory;

export class WardenClient {
  constructor(private configuration: IWardenConfiguration) {}

  async query() {
    return await createRPCQueryClient({ rpcEndpoint: this.configuration.rpcURL });
  }

  async *pollSignatureRequests(): AsyncGenerator<INewSignatureRequest> {
    while (true) {
      await delay(this.configuration.pollingIntervalMsec);

      // TODO: query paged fulfilled sign requests
      // const query = (await this.query()).warden.warden.v1beta3;
      const signRequests: SignRequest[] = [
        {
          id: 1n,
          creator: 'string',
          keyId: 1n,
          dataForSigning: new Uint8Array(),
          status: SignRequestStatus.SIGN_REQUEST_STATUS_FULFILLED,
          signedData: new Uint8Array(),
          rejectReason: 'string',
          encryptionKey: new Uint8Array(),
          deductedKeychainFees: [],
        },
      ];

      for (let i = 0; i < signRequests.length; i++) {
        const request = signRequests[i];

        if (!request.signedData) {
          continue;
        }

        yield {
          signedData: request.signedData!,
        };
      }
    }
  }
}
