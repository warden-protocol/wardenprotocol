import { Environment } from '@warden/wormhole-relayer-engine';
import { Network } from '@wormhole-foundation/sdk';
import { promisify } from 'util';

export const delay = promisify((ms: number, res: () => void) => setTimeout(res, ms));

export function getWormholeContractsNetwork(env: Environment): string {
  switch (env) {
    case Environment.MAINNET:
      return 'MAINNET';
    case Environment.TESTNET:
      return 'TESTNET';
    case Environment.DEVNET:
      return 'DEVNET';
    default:
      throw new Error(`${env} is not supported`);
  }
}

export function getWormholeSdkNetwork(env: Environment): Network {
  switch (env) {
    case Environment.MAINNET:
      return 'Mainnet';
    case Environment.TESTNET:
      return 'Testnet';
    case Environment.DEVNET:
      return 'Devnet';
    default:
      throw new Error(`${env} is not supported`);
  }
}

// const sepolia_emitter = tryNativeToHexString('DeUdMBvNmuQcZzNFtrCGb8jGUzdoc89djeTbfzuBPWjd', chainToChainId('Solana'));
// const solana_recipient = tryNativeToHexString(
//   'YFrLDa88tsfhAepJQCKid2S226fvGbdermVBFwyTAQk',
//   chainToChainId('Solana'),
// );

// const spawnMissedVaa = spawnMissedVaaWorker(app, {
//   namespace: config.APP_NAME,
//   wormholeRpcs: [defaultWormscanUrl[config.ENVIRONMENT]],
//   registry: store.registry,
//   logger: rootLogger,
//   storagePrefix: store.getPrefix(),
//   redis,
//   concurrency: 1,
//   vaasFetchConcurrency: 1,
// });

// await client.initialize();

// await client.registerForeignContract(
//   chainToChainId('Sepolia'),
//   Buffer.alloc(32, '00000000000000000000000027b6fa47efd7eb3f67ed4a28703ec907a96c2f97', 'hex'),
//   CONTRACTS[getWormholeContractsNetwork(config.ENVIRONMENT)].sepolia.token_bridge,
// );
