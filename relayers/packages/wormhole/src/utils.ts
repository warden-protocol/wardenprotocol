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

// const buffer = Buffer.from([
//   1, 0, 0, 0, 0, 1, 0, 117, 0, 46, 84, 204, 169, 34, 9, 215, 1, 98, 93, 158, 21, 128, 49, 76, 115, 88, 24, 214, 191,
//   15, 84, 34, 221, 17, 44, 152, 103, 111, 122, 8, 226, 9, 72, 158, 36, 151, 238, 58, 75, 150, 177, 250, 135, 101, 94,
//   202, 7, 177, 116, 215, 250, 102, 142, 30, 176, 11, 104, 7, 166, 6, 149, 1, 102, 162, 40, 255, 0, 0, 0, 0, 0, 1, 59,
//   38, 64, 159, 138, 173, 237, 63, 93, 220, 161, 132, 105, 90, 166, 160, 250, 130, 155, 12, 133, 202, 248, 72, 86, 50,
//   72, 150, 210, 20, 202, 152, 0, 0, 0, 0, 0, 0, 111, 247, 32, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 152, 150, 128, 6, 155, 136, 87, 254, 171, 129, 132, 251, 104, 127, 99, 70, 24, 192,
//   53, 218, 196, 57, 220, 26, 235, 59, 85, 152, 160, 240, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39,
//   182, 250, 71, 239, 215, 235, 63, 103, 237, 74, 40, 112, 62, 201, 7, 169, 108, 47, 151, 39, 18, 187, 229, 248, 124,
//   149, 227, 187, 228, 229, 230, 177, 3, 151, 138, 11, 21, 0, 199, 122, 198, 146, 204, 215, 160, 27, 129, 7, 243, 45,
//   182, 10, 140, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 182, 250, 71, 239, 215, 235, 63, 103, 237, 74, 40, 112, 62,
//   201, 7, 169, 108, 47, 151,
// ]);

// const send = await client.sendNative(
//   Keypair.fromSecretKey(
//     bs58.decode('59gdFVEWn6K63CHtWFreZFBcdAZeFRV3LaJEQ5XeWDBwKx5KvVvmgEi8Cr1Wr3DWhXt4EbaJqTuEX88qQWYauWvG'),
//   ),
//   Buffer.alloc(
//     32,
//     encodeEmitterAddress(chainToChainId('Sepolia'), '0x27b6Fa47efd7Eb3F67ED4A28703EC907A96C2f97'),
//     'hex',
//   ),
//   chainToChainId('Sepolia'),
//   new PublicKey('So11111111111111111111111111111111111111112'),
//   100000000n,
// );

// const ad = parseTokenTransferVaa(buffer);
// const asd = parseTokenTransferPayload(ad.tokenTransferPayload);
