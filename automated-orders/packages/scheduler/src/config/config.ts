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
    'WARDEN_EVM_CHAIN_ID'
  ],
  properties: {
    EVMOS_NODE_RPC: { type: 'string' },
    EVMOS_REGISTRY_ADDRESS: { type: 'string' },
    EVMOS_EVENTS_POLLING_BLOCKS: { type: 'number', minimum: 1 },
    EVMOS_EVENTS_REGISTRY_START_POLLING_BLOCK: { type: 'number', minimum: 1 },
    EVMOS_EVENTS_POLLING_INTERVAL_MSEC: { type: 'number', minimum: 1 },
    EVMOS_CALLER_PRIVATE_KEY: { type: 'string' },
    EVMOS_EVENTS_ORDER_RETRY_ATTEMPTS: { type: 'number', minimum: 1 },
    EVMOS_EVENTS_CACHE_SIZE: { type: 'number', minimum: 1 },
    ETHEREUM_NODE_RPC: { type: 'string' },
    WARDEN_EVM_CHAIN_ID: { type: 'number' }
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
