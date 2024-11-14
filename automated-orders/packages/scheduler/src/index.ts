import { ChainIds, EvmClient, OrderProcessor, OrderRegisteredAbi } from '@warden-automated-orders/blockchain';
import { logError } from '@warden-automated-orders/utils';

import { config } from './config/config.js';

async function main() {
  const evmos = new EvmClient({
    rpcURL: config.EVMOS_NODE_RPC,
    eventsCacheSize: config.EVMOS_EVENTS_CACHE_SIZE,
    callerPrivateKey: config.EVMOS_CALLER_PRIVATE_KEY,
  });
  const ethereum = new EvmClient({
    rpcURL: config.ETHEREUM_NODE_RPC,
  });

  const chainIds = new Map([[BigInt(ChainIds.Sepolia), undefined]]);

  const processor = new OrderProcessor(
    evmos,
    ethereum,
    chainIds,
    config.EVMOS_EVENTS_ORDER_RETRY_ATTEMPTS,
    evmos.pollEvents.bind(
      evmos,
      config.EVMOS_REGISTRY_ADDRESS,
      config.EVMOS_EVENTS_REGISTRY_START_POLLING_BLOCK,
      OrderRegisteredAbi,
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
