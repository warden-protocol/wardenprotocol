import { JSONSchemaType, envSchema } from 'env-schema';

import { Env } from './env.js';

const schema: JSONSchemaType<Env> = {
  type: 'object',
  required: [
    'EVMOS_NODE_RPC',
    'EVMOS_REGISTRY_ADDRESS',
    'EVMOS_PUBLIC_CLIENT_TIMEOUT_MSEC',
    'ETHEREUM_NODE_RPC',
    'WARDEN_EVM_CHAIN_ID', 
    'WARDEN_SIGN_REQUESTS_POLLING_INTERVAL_MSEC',
    'WARDEN_SIGN_REQUESTS_PAGE_SIZE',
    'SIGN_REQUESTS_PROCESSOR_SEEN_CACHE_ELEMENTS_SIZE',
  ],
  properties: {
    EVMOS_NODE_RPC: { type: 'string' },
    EVMOS_REGISTRY_ADDRESS: { type: 'string' },
    EVMOS_PUBLIC_CLIENT_TIMEOUT_MSEC: { type: 'number', minimum: 10_000 },
    ETHEREUM_NODE_RPC: { type: 'string' },
    WARDEN_EVM_CHAIN_ID: { type: 'number' },
    WARDEN_SIGN_REQUESTS_POLLING_INTERVAL_MSEC: { type: 'number', minimum: 100 },
    WARDEN_SIGN_REQUESTS_PAGE_SIZE: { type: 'number', minimum: 1 },
    SIGN_REQUESTS_PROCESSOR_SEEN_CACHE_ELEMENTS_SIZE: { type: 'number', minimum: 1 },
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
