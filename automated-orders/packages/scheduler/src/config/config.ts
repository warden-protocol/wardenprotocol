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
    'WARDEN_EVM_CHAIN_ID',
    'AWS_KMS_KEY_ID',
    'AWS_KMS_REGION'
  ],
  anyOf: [
    { required: ['ETHEREUM_NODE_RPC'] }, // If EVMOS_NODE_RPC exists, MEE_NODE_URL should not
    { required: ['MEE_NODE_URL'] },   // If EVMOS_NODE_RPC is missing, MEE_NODE_URL can exist or not
    {},
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
    WARDEN_EVM_CHAIN_ID: { type: 'number' },
    AWS_KMS_KEY_ID: { type: 'string' },
    AWS_KMS_REGION: { type: 'string' },
    ETHEREUM_NODE_RPC: { type: 'string', nullable: true },
    MEE_NODE_URL: { type: 'string', nullable: true }
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
