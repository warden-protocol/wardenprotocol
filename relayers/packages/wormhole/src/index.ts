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
  // const solana_recipient = tryNativeToHexString(
  //   'YFrLDa88tsfhAepJQCKid2S226fvGbdermVBFwyTAQk',
  //   chainToChainId('Solana'),
  // );

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

  // await client.initialize();

  // await client.registerForeignContract(
  //   chainToChainId('Sepolia'),
  //   Buffer.alloc(32, '00000000000000000000000027b6fa47efd7eb3f67ed4a28703ec907a96c2f97', 'hex'),
  //   CONTRACTS[getWormholeContractsNetwork(config.ENVIRONMENT)].sepolia.token_bridge,
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
