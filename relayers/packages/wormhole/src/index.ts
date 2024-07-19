import { CHAIN_ID_SEPOLIA, CHAIN_ID_SOLANA, CONTRACTS, tryNativeToHexString } from '@certusone/wormhole-sdk';
import { Keypair, PublicKey } from '@solana/web3.js';
import {
  RedisStorage,
  RelayerApp,
  StandardRelayerContext,
  defaultWormscanUrl,
  logging,
  providers,
  spawnMissedVaaWorker,
  stagingArea,
  tokenBridgeContracts,
} from '@warden/wormhole-relayer-engine';
import { chainToChainId } from '@wormhole-foundation/sdk';
import bs58 from 'bs58';
import 'dotenv/config';
import winston from 'winston';

import { SolanaGmpWithTokenClient } from './clients/solanaGmpWithTokenClient.js';
import { config } from './config/schema.js';
import { RelayProcessor } from './processors/relayProcessor.js';
import { getWormholeContractsNetwork } from './utils.js';

export const rootLogger = winston.createLogger({
  level: 'debug',
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`),
  ),
});

export async function main() {
  const app = new RelayerApp<StandardRelayerContext>(config.ENVIRONMENT);
  const redis = {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    username: config.REDIS_USERNAME,
    password: config.REDIS_PASSWORD,
  };

  const store = new RedisStorage({
    attempts: config.REDIS_ATTEMPTS,
    namespace: config.APP_NAME,
    queueName: config.REDIS_QUEUE,
    redis,
  });

  const processor = new RelayProcessor();

  app.spy(config.SPY_URL);
  app.useStorage(store);
  app.logger(rootLogger);

  // middleware
  app.use(logging(rootLogger));
  app.use(providers());
  app.use(tokenBridgeContracts());

  app.use(
    stagingArea({
      namespace: config.APP_NAME,
      redis,
    }),
  );

  // const sepolia_emitter = tryNativeToHexString('DeUdMBvNmuQcZzNFtrCGb8jGUzdoc89djeTbfzuBPWjd', chainToChainId('Solana'));

  // app.use(processor.relay);
  app.multiple(
    {
      // [CHAIN_ID_SOLANA]: ['B8oRMM8MgiM9VTQsHCWKh1H1X2pr1nsHCnVEA2Yg1Nye'],
      [CHAIN_ID_SEPOLIA]: ['0xDB5492265f6038831E89f495670FF909aDe94bd9'],
    },
    processor.relay,
  );

  app.use(async (err, ctx, next) => {
    ctx.logger.error('Error middleware triggered: ', err);

    await next();
  });

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

  const client = new SolanaGmpWithTokenClient();

  // await client.initialize();

  // await client.registerForeignContract(
  //   chainToChainId('Sepolia'),
  //   Buffer.alloc(32, '00000000000000000000000027b6fa47efd7eb3f67ed4a28703ec907a96c2f97', 'hex'),
  //   CONTRACTS[getWormholeContractsNetwork(config.ENVIRONMENT)].sepolia.token_bridge,
  // );

  const buffer = Buffer.from([
    1, 0, 0, 0, 0, 1, 0, 96, 50, 165, 209, 253, 88, 15, 180, 40, 119, 14, 160, 126, 52, 141, 160, 37, 226, 235, 155,
    242, 13, 191, 181, 148, 40, 205, 182, 110, 218, 255, 126, 76, 7, 237, 137, 10, 22, 227, 182, 114, 224, 205, 222,
    130, 122, 249, 13, 230, 2, 140, 227, 46, 21, 95, 38, 107, 90, 204, 194, 232, 27, 115, 80, 0, 102, 154, 102, 140, 0,
    0, 0, 0, 39, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 219, 84, 146, 38, 95, 96, 56, 131, 30, 137, 244, 149, 103, 15,
    249, 9, 173, 233, 75, 217, 0, 0, 0, 0, 0, 0, 12, 241, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 134, 160, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 125, 75, 25, 108, 176, 199, 176,
    29, 116, 63, 188, 97, 22, 169, 2, 55, 156, 114, 56, 39, 18, 187, 229, 248, 124, 149, 227, 187, 228, 229, 230, 177,
    3, 151, 138, 11, 21, 0, 199, 122, 198, 146, 204, 215, 160, 27, 129, 7, 243, 45, 182, 10, 140, 0, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 39, 182, 250, 71, 239, 215, 235, 63, 103, 237, 74, 40, 112, 62, 201, 7, 169, 108, 47, 151, 1,
    8, 1, 203, 240, 161, 182, 7, 80, 206, 77, 34, 249, 151, 98, 186, 115, 100, 19, 50, 153, 0, 179, 89, 108, 63, 140,
    100, 71, 12, 47, 79, 117,
  ]);

  await client.redeemWrapped(
    Keypair.fromSecretKey(
      bs58.decode('59gdFVEWn6K63CHtWFreZFBcdAZeFRV3LaJEQ5XeWDBwKx5KvVvmgEi8Cr1Wr3DWhXt4EbaJqTuEX88qQWYauWvG'),
    ),
    buffer,
  );

  // const send = client.sendNative(
  //   Keypair.fromSecretKey(
  //     bs58.decode('59gdFVEWn6K63CHtWFreZFBcdAZeFRV3LaJEQ5XeWDBwKx5KvVvmgEi8Cr1Wr3DWhXt4EbaJqTuEX88qQWYauWvG'),
  //   ),
  //   // Buffer.alloc(32, '27b6Fa47efd7Eb3F67ED4A28703EC907A96C2f97', 'hex'),
  //   Buffer.alloc(32, 'deadbeef', 'hex'),
  //   chainToChainId('Sepolia'),
  //   new PublicKey('Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'),
  //   0,
  //   100000000n,
  // );

  await Promise.all([
    // spawnMissedVaa,
    app.listen(),
    // send,
  ]);
}

main()
  .catch((error) => console.error('Unhandled error:', error))
  .finally(() => process.exit());
