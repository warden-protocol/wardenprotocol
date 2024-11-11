import { EvmClient, NewSignatureProcessor, WardenClient } from '@warden-automated-orders/blockchain';
import { logError } from '@warden-automated-orders/utils';

import { config } from './config/config.js';

async function main() {
  const warden = new WardenClient({
    rpcURL: config.WARDEN_RPC_URL,
    pollingIntervalMsec: config.WARDEN_POLLING_INTERVAL_MSEC,
  });

  const ethereum = new EvmClient({
    rpcURL: config.ETHEREUM_NODE_RPC,
  });

  const newSignatureRequestProcess = new NewSignatureProcessor(
    ethereum,
    warden.pollSignatureRequests.bind(warden),
  ).start();

  await Promise.all([newSignatureRequestProcess]);
}

main()
  .catch((e) => {
    logError(e);
    process.exit(1);
  })
  .finally(() => process.exit());
