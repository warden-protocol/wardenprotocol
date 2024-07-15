import { CHAIN_ID_BASE_SEPOLIA, CHAIN_ID_SOLANA } from '@certusone/wormhole-sdk';
import {
  RedisStorage,
  RelayerApp,
  StandardRelayerContext,
  defaultWormscanUrl,
  logging,
  providers,
  spawnMissedVaaWorker,
  stagingArea,
} from '@warden/wormhole-relayer-engine';
import 'dotenv/config';
import winston from 'winston';

import { config } from './config/schema.js';
import { RelayProcessor, send } from './processors/relayProcessor.js';

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

  app.use(
    stagingArea({
      namespace: config.APP_NAME,
      redis,
    }),
  );

  // app.use(processor.relay);
  app.multiple(
    {
      [CHAIN_ID_SOLANA]: ['B8oRMM8MgiM9VTQsHCWKh1H1X2pr1nsHCnVEA2Yg1Nye'],
      [CHAIN_ID_BASE_SEPOLIA]: [
        '0x79A1027a6A159502049F10906D333EC57E95F083',
        '0x2A22d82A10Ff8C3e72cC3771b8B82070b81781d8',
      ],
    },
    processor.relay,
  );

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
  });

  // send('Hello World!');

  await Promise.all([spawnMissedVaa, app.listen()]);
}

main()
  .catch((error) => console.error('Unhandled error:', error))
  .finally(() => process.exit());
