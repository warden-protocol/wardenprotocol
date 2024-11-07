import { EvmClient, OrderCreatedAbi, OrderProcessor } from '@warden-automated-orders/blockchain';
import { logError } from '@warden-automated-orders/utils';

import { config } from './config/config.js';

async function main() {
  const evmos = new EvmClient({
    rpcURL: config.EVMOS_NODE_RPC,
  });

  const processor = new OrderProcessor(
    evmos,
    evmos.pollEvents.bind(config.EVMOS_REGISTRY_ADDRESS, 0n, OrderCreatedAbi, {
      pollingBlocks: BigInt(config.ETHEREUM_EVENTS_POLLING_BLOCKS),
      pollingIntervalMsec: config.ETHEREUM_EVENTS_POLLING_INTERVAL_MSEC,
    }),
  ).start();

  await Promise.all([processor]);
}

main()
  .catch((e) => {
    logError(e);
    process.exit(1);
  })
  .finally(() => process.exit());
