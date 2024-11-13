import { EvmClient, NewSignatureProcessor, WardenClient } from '@warden-automated-orders/blockchain';
import { logError } from '@warden-automated-orders/utils';

import { config } from './config/config.js';

async function main() {
  logInfo('todo: implementation');
}

main()
  .catch((e) => {
    logError(e);
    process.exit(1);
  })
  .catch((e) => {
    logError(e);
    process.exit(1);
  })
  .finally(() => process.exit());
