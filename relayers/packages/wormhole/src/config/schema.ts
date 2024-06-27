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
    'SPY_URL',
    'EVM_PRIVATE_KEY',
    'SOL_PRIVATE_KEY',
    'COSMOS_MNEMONIC',
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
    SPY_URL: { type: 'string' },
    EVM_PRIVATE_KEY: { type: 'string' },
    SOL_PRIVATE_KEY: { type: 'string' },
    COSMOS_MNEMONIC: { type: 'string' },
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
