import { JSONSchemaType, envSchema } from 'env-schema';

import { Env } from './env.js';

const schema: JSONSchemaType<Env> = {
  type: 'object',
  required: [
    'APP_NAME',
    'ENVIRONMENT',
    'REDIS_HOST',
    'REDIS_PORT',
    'REDIS_USERNAME',
    'REDIS_PASSWORD',
    'REDIS_ATTEMPTS',
    'REDIS_QUEUE',
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_NAME',
    'SPY_URL',
    'EVM_PRIVATE_KEY',
    'SOL_PRIVATE_KEY',
    'COSMOS_MNEMONIC',
    'SOLANA_RPC',
    'WORMHOLE_CHAINS_TO_EMITTERS',
    'WORMHOLE_CHAINS_START_SEQUENCES',
  ],
  properties: {
    APP_NAME: { type: 'string' },
    ENVIRONMENT: { type: 'string' },
    REDIS_HOST: { type: 'string' },
    REDIS_PORT: { type: 'number' },
    REDIS_USERNAME: { type: 'string' },
    REDIS_PASSWORD: { type: 'string' },
    REDIS_ATTEMPTS: { type: 'number' },
    REDIS_QUEUE: { type: 'string' },
    DB_HOST: { type: 'string' },
    DB_PORT: { type: 'number' },
    DB_USERNAME: { type: 'string' },
    DB_PASSWORD: { type: 'string' },
    DB_NAME: { type: 'string' },
    SPY_URL: { type: 'string' },
    EVM_PRIVATE_KEY: { type: 'string' },
    SOL_PRIVATE_KEY: { type: 'string' },
    COSMOS_MNEMONIC: { type: 'string' },
    SOLANA_RPC: { type: 'string' },
    WORMHOLE_CHAINS_TO_EMITTERS: { type: 'string' },
    WORMHOLE_CHAINS_START_SEQUENCES: { type: 'string' },
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
