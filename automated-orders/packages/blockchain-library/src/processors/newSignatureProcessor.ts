import { logError, logInfo, serialize } from '@warden-automated-orders/utils';

import { EvmClient } from '../clients/evm.js';
import { INewSignatureRequest } from '../types/warden/newSignatureRequest.js';
import { Processor } from './processor.js';

export class NewSignatureProcessor extends Processor<INewSignatureRequest> {
  constructor(
    private evm: EvmClient,
    generator: () => AsyncGenerator<INewSignatureRequest, unknown, unknown>,
  ) {
    super(generator);
  }

  async handle(data: INewSignatureRequest): Promise<void> {
    try {
      logInfo(`New Signature request ${serialize(data)}`);

      // TODO: implementation
      await this.evm.broadcastTx();
    } catch (error) {
      logError(`New Signature error ${serialize(data)}. Error: ${error}, Stack trace: ${error.stack}`);
    }
  }
}
