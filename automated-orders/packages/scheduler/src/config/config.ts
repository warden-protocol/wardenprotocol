import { JSONSchemaType, envSchema } from 'env-schema';

import { Env } from './env.js';

const schema: JSONSchemaType<Env> = {
  type: 'object',
  required: [
    'EVMOS_NODE_RPC',
    'EVMOS_REGISTRY_ADDRESS',
    'EVMOS_EVENTS_POLLING_BLOCKS',
    'EVMOS_EVENTS_REGISTRY_START_POLLING_BLOCK',
    'EVMOS_EVENTS_POLLING_INTERVAL_MSEC',
    'EVMOS_CALLER_PRIVATE_KEY',
    'EVMOS_EVENTS_ORDER_RETRY_ATTEMPTS',
    'EVMOS_EVENTS_CACHE_SIZE',
    'ETHEREUM_NODE_RPC',
  ],
  properties: {
    EVMOS_NODE_RPC: { type: 'string' },
    EVMOS_REGISTRY_ADDRESS: { type: 'string' },
    EVMOS_EVENTS_POLLING_BLOCKS: { type: 'number' },
    EVMOS_EVENTS_REGISTRY_START_POLLING_BLOCK: { type: 'number' },
    EVMOS_EVENTS_POLLING_INTERVAL_MSEC: { type: 'number' },
    EVMOS_CALLER_PRIVATE_KEY: { type: 'string' },
    EVMOS_EVENTS_ORDER_RETRY_ATTEMPTS: { type: 'number' },
    EVMOS_EVENTS_CACHE_SIZE: { type: 'number' },
    ETHEREUM_NODE_RPC: { type: 'string' },
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
