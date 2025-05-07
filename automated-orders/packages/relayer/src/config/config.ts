import { JSONSchemaType, envSchema } from 'env-schema';

import { Env } from './env.js';

const schema: JSONSchemaType<Env> = {
  type: 'object',
  required: [
    'EVMOS_NODE_RPC',
    'EVMOS_REGISTRY_ADDRESS',
    'EVMOS_PUBLIC_CLIENT_TIMEOUT_MSEC',
    'WARDEN_EVM_CHAIN_ID', 
    'WARDEN_SIGN_REQUESTS_POLLING_INTERVAL_MSEC',
    'WARDEN_SIGN_REQUESTS_PAGE_SIZE',
    'SIGN_REQUESTS_PROCESSOR_SEEN_CACHE_ELEMENTS_SIZE',
  ],
  anyOf: [
    { required: ['ETHEREUM_NODE_RPC'] }, // If EVMOS_NODE_RPC exists, MEE_NODE_URL should not
    { required: ['MEE_NODE_URL'] },   // If EVMOS_NODE_RPC is missing, MEE_NODE_URL can exist or not
    {},
  ],
  properties: {
    EVMOS_NODE_RPC: { type: 'string' },
    EVMOS_REGISTRY_ADDRESS: { type: 'string' },
    EVMOS_PUBLIC_CLIENT_TIMEOUT_MSEC: { type: 'number', minimum: 10_000 },
    WARDEN_EVM_CHAIN_ID: { type: 'number' },
    WARDEN_SIGN_REQUESTS_POLLING_INTERVAL_MSEC: { type: 'number', minimum: 100 },
    WARDEN_SIGN_REQUESTS_PAGE_SIZE: { type: 'number', minimum: 1 },
    SIGN_REQUESTS_PROCESSOR_SEEN_CACHE_ELEMENTS_SIZE: { type: 'number', minimum: 1 },
    ETHEREUM_NODE_RPC: { type: 'string', nullable: true },
    MEE_NODE_URL: { type: 'string', nullable: true }
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
