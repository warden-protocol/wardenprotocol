import { JSONSchemaType, envSchema } from 'env-schema';

import { Env } from './env.js';

const schema: JSONSchemaType<Env> = {
  type: 'object',
  required: [
    'EVMOS_NODE_RPC',
    'EVMOS_REGISTRY_ADDRESS',
    'ETHEREUM_NODE_RPC',
    'WARDEN_EVM_CHAIN_ID', 
    'WARDEN_SIGN_REQUESTS_POLLING_INTERVAL_MSEC',
    'WARDEN_SIGN_REQUESTS_PAGE_SIZE',
  ],
  properties: {
    EVMOS_NODE_RPC: { type: 'string' },
    EVMOS_REGISTRY_ADDRESS: { type: 'string' },
    ETHEREUM_NODE_RPC: { type: 'string' },
    WARDEN_EVM_CHAIN_ID: { type: 'number' },
    WARDEN_SIGN_REQUESTS_POLLING_INTERVAL_MSEC: { type: 'number', minimum: 100 },
    WARDEN_SIGN_REQUESTS_PAGE_SIZE: { type: 'number', minimum: 1 },
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
