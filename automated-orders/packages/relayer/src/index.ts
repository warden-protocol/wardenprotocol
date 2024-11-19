import { sepolia } from '@wagmi/core/chains';
import { EvmClient, NewSignatureProcessor, WardenClient } from '@warden-automated-orders/blockchain';
import { logError } from '@warden-automated-orders/utils';
import { config } from './config/config.js';
import { defineChain } from 'viem';
import { WardenRegistryClient } from '@warden-automated-orders/blockchain/dist/clients/registry.js';

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
      callerPrivateKey: config.EVMOS_CALLER_PRIVATE_KEY,
    },
    evmosChain,
  );

  const warden = new WardenClient({
    wardenPrecompileAddress: '0x0000000000000000000000000000000000000900',
    pollingIntervalMsec: config.WARDEN_POLLING_INTERVAL_MSEC,
  }, evmos);

  const registry = new WardenRegistryClient({
    contractAddress: config.EVMOS_REGISTRY_ADDRESS,
  }, evmos);

  const ethereum = new EvmClient(
    {
      rpcURL: config.ETHEREUM_NODE_RPC,
    },
    sepolia,
  );

  const processor = new NewSignatureProcessor(
    ethereum,
    registry,
    warden.pollSignatureRequests.bind(warden),
  ).start();

  await Promise.all([processor]);
}

main()
  .catch((e) => {
    logError(e);
    process.exit(1);
  })
  .finally(() => process.exit());
