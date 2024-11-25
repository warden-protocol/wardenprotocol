import { sepolia } from '@wagmi/core/chains';
import { ChainIds, EvmClient, OrderProcessor, OrderRegisteredAbi } from '@warden-automated-orders/blockchain';
import { logError } from '@warden-automated-orders/utils';
import { defineChain } from 'viem';

import { config } from './config/config.js';

async function main() {
  const evmosChain = defineChain({
    id: config.WARDEN_EVM_CHAIN_ID,
    name: "Warden",
    nativeCurrency: {
      decimals: 18,
      name: "Warden",
      symbol: "WARD"
    },
    rpcUrls: {
      default: {
        http: []
      }
    }
  });

  const evmos = new EvmClient(
    {
      rpcURL: config.EVMOS_NODE_RPC,
      eventsCacheSize: config.EVMOS_EVENTS_CACHE_SIZE,
      awsKmsSignerConfig: { awsKmsRegion: config.AWS_KMS_REGION, awsKmsKeyId: config.AWS_KMS_KEY_ID }
    },
    evmosChain,
  );

  await evmos.init();

  const ethereum = new EvmClient(
    {
      rpcURL: config.ETHEREUM_NODE_RPC,
    },
    sepolia,
  );

  const chainIds = new Set([BigInt(ChainIds.Sepolia)]);

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