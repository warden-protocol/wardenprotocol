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
    'EVMOS_EVENTS_ORDER_RETRY_ATTEMPTS',
    'EVMOS_EVENTS_CACHE_SIZE',
    'EVMOS_PUBLIC_CLIENT_TIMEOUT_MSEC',
    'ETHEREUM_NODE_RPC',
    'WARDEN_EVM_CHAIN_ID',
    'AWS_KMS_KEY_ID',
    'AWS_KMS_REGION'
  ],
  properties: {
    EVMOS_NODE_RPC: { type: 'string' },
    EVMOS_REGISTRY_ADDRESS: { type: 'string' },
    EVMOS_EVENTS_POLLING_BLOCKS: { type: 'number', minimum: 1 },
    EVMOS_EVENTS_REGISTRY_START_POLLING_BLOCK: { type: 'number', minimum: 1 },
    EVMOS_EVENTS_POLLING_INTERVAL_MSEC: { type: 'number', minimum: 1 },
    EVMOS_EVENTS_ORDER_RETRY_ATTEMPTS: { type: 'number', minimum: 1 },
    EVMOS_EVENTS_CACHE_SIZE: { type: 'number', minimum: 1 },
    EVMOS_PUBLIC_CLIENT_TIMEOUT_MSEC: { type: 'number', minimum: 10_000 },
    ETHEREUM_NODE_RPC: { type: 'string' },
    WARDEN_EVM_CHAIN_ID: { type: 'number' },
    AWS_KMS_KEY_ID: { type: 'string' },
    AWS_KMS_REGION: { type: 'string' }
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
