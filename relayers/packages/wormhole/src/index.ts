import { CHAIN_ID_ARBITRUM_SEPOLIA, CHAIN_ID_PYTHNET, CHAIN_ID_SOLANA, CONTRACTS } from '@certusone/wormhole-sdk';
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
import { RelayProcessor, test } from './processors/relayProcessor.js';

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

  app.multiple(
    {
      [CHAIN_ID_SOLANA]: [
        // '3u8hJUVTA4jH1wYAyUur7FFZVQ8H635K3tSHHF4ssjQ5',
        // 'DZnkkTmCiFWfYTfT41X3Rd1kDgozqzxWaHqsw6W4x2oe',
        'B8oRMM8MgiM9VTQsHCWKh1H1X2pr1nsHCnVEA2Yg1Nye',
      ],
      // [CHAIN_ID_PYTHNET]: ['G9LV2mp9ua1znRAfYwZz5cPiJMAbo1T6mbjdQsDZuMJg'],
      // [CHAIN_ID_ARBITRUM_SEPOLIA]: ['0xe0418C44F06B0b0D7D1706E01706316DBB0B210E'],
    },
    processor.relay,
  );

  app.use(async (err, ctx, next) => {
    ctx.logger.error('Error middleware triggered');

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

  await Promise.all([spawnMissedVaa, app.listen(), test()]);
}

main()
  .catch((error) => console.error('Unhandled error:', error))
  .finally(() => process.exit());
