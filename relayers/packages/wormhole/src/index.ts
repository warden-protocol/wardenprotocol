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
import 'dotenv/config';
import winston from 'winston';

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
