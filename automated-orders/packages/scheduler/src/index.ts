import { EvmClient, OrderCreatedAbi, OrderProcessor } from '@warden-automated-orders/blockchain';
import { logError } from '@warden-automated-orders/utils';

import { config } from './config/config.js';

async function main() {
  const evmos = new EvmClient({
    rpcURL: config.EVMOS_NODE_RPC,
    callerPrivateKey: config.EVMOS_CALLER_PRIVATE_KEY,
  });

  const processor = new OrderProcessor(
    evmos,
    evmos.pollEvents.bind(
      evmos,
      config.EVMOS_REGISTRY_ADDRESS,
      config.EVMOS_EVENTS_REGISTRY_START_POLLING_BLOCK,
      OrderCreatedAbi,
      {
        pollingBlocks: BigInt(config.EVMOS_EVENTS_POLLING_BLOCKS),
        pollingIntervalMsec: config.EVMOS_EVENTS_POLLING_INTERVAL_MSEC,
      },
    ),
  ).start();

  await Promise.all([processor]);
}

main()
  .catch((e) => {
    logError(e);
    process.exit(1);
  })
  .finally(() => process.exit());
