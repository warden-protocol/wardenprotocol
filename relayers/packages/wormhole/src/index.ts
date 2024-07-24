import { TokenBridgePayload, parseTokenTransferPayload, parseTokenTransferVaa } from '@certusone/wormhole-sdk';
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
import { WormholeDataSource } from './database/wormholeDataSource.js';
import { RelayProcessor } from './processors/relayProcessor.js';

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

  const processor = new RelayProcessor(config.WORMHOLE_CHAINS_TO_EMITTERS, config.WORMHOLE_CHAINS_START_SEQUENCES);

  await WormholeDataSource.initialize()
    .then(() => rootLogger.info('Data Source has been initialized!'))
    .catch((error) => rootLogger.error(error));

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

  // const client = new SolanaGmpWithTokenClient('DeUdMBvNmuQcZzNFtrCGb8jGUzdoc89djeTbfzuBPWjd');

  // const buffer = Buffer.from([
  //   1, 0, 0, 0, 0, 1, 0, 88, 162, 251, 247, 232, 128, 30, 64, 149, 213, 2, 84, 27, 2, 32, 162, 23, 243, 73, 222, 77,
  //   112, 157, 66, 172, 163, 126, 149, 131, 122, 110, 146, 26, 250, 53, 51, 137, 186, 76, 213, 143, 246, 136, 153, 145,
  //   117, 75, 127, 32, 164, 47, 59, 175, 207, 98, 141, 37, 73, 130, 183, 66, 5, 242, 134, 0, 102, 160, 248, 147, 0, 0, 0,
  //   0, 0, 1, 59, 38, 64, 159, 138, 173, 237, 63, 93, 220, 161, 132, 105, 90, 166, 160, 250, 130, 155, 12, 133, 202, 248,
  //   72, 86, 50, 72, 150, 210, 20, 202, 152, 0, 0, 0, 0, 0, 0, 111, 245, 32, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 152, 150, 128, 59, 68, 44, 179, 145, 33, 87, 241, 58, 147, 61, 1, 52,
  //   40, 45, 3, 43, 95, 254, 205, 1, 162, 219, 241, 183, 121, 6, 8, 223, 0, 46, 167, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  //   0, 0, 39, 182, 250, 71, 239, 215, 235, 63, 103, 237, 74, 40, 112, 62, 201, 7, 169, 108, 47, 151, 39, 18, 187, 229,
  //   248, 124, 149, 227, 187, 228, 229, 230, 177, 3, 151, 138, 11, 21, 0, 199, 122, 198, 146, 204, 215, 160, 27, 129, 7,
  //   243, 45, 182, 10, 140, 1, 39, 182, 250, 71, 239, 215, 235, 63, 103, 237, 74, 40, 112, 62, 201, 7, 169, 108, 47, 151,
  //   39, 182, 250, 71, 239, 215, 235, 63, 103, 237, 74, 40,
  // ]);

  // const ad = parseTokenTransferVaa(buffer);
  // const asd = parseTokenTransferPayload(ad.tokenTransferPayload);

  // const send = await client.sendNative(
  //   Keypair.fromSecretKey(
  //     bs58.decode('59gdFVEWn6K63CHtWFreZFBcdAZeFRV3LaJEQ5XeWDBwKx5KvVvmgEi8Cr1Wr3DWhXt4EbaJqTuEX88qQWYauWvG'),
  //   ),
  //   Buffer.alloc(32, '27b6Fa47efd7Eb3F67ED4A28703EC907A96C2f97', 'hex'),
  //   chainToChainId('Sepolia'),
  //   new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'),
  //   10000000n,
  // );

  // app.use(processor.listenToVaas.bind(processor));

  for (const [chainId, [emitter, _]] of processor.supportedEmitters) {
    app.chain(chainId).address(emitter, processor.listenToVaas.bind(processor));
  }

  app.use(async (err, ctx, next) => {
    ctx.logger.error('Error middleware triggered: ', err);
    await next();
  });

  const spawnMissedVaa = spawnMissedVaaWorker(app, {
    namespace: config.APP_NAME,
    wormholeRpcs: [defaultWormscanUrl[config.ENVIRONMENT]],
    registry: store.registry,
    logger: rootLogger,
    storagePrefix: store.getPrefix(),
    redis,
    concurrency: 1,
    vaasFetchConcurrency: 1,
    checkInterval: 15000,
    maxLookAhead: 1000,
    forceSeenKeysReindex: true,
    fetchVaaRetries: 10,
    startingSequenceConfig: processor.chainStartSequences,
  });

  await Promise.all([spawnMissedVaa, app.listen(), processor.relayVaas()]);
}

main()
  .catch((error) => rootLogger.error('Unhandled error:', error))
  .finally(() => process.exit());
