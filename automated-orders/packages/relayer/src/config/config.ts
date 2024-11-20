import { JSONSchemaType, envSchema } from 'env-schema';

import { Env } from './env.js';

const schema: JSONSchemaType<Env> = {
  type: 'object',
  required: [
    'EVMOS_NODE_RPC',
    'EVMOS_REGISTRY_ADDRESS',
    'WARDEN_RPC_URL', 
    'ETHEREUM_NODE_RPC',
    'WARDEN_EVM_CHAIN_ID', 
    'WARDEN_POLLING_INTERVAL_MSEC'
  ],
  properties: {
    EVMOS_NODE_RPC: { type: 'string' },
    EVMOS_REGISTRY_ADDRESS: { type: 'string' },
    WARDEN_RPC_URL: { type: 'string' },
    ETHEREUM_NODE_RPC: { type: 'string' },
    WARDEN_EVM_CHAIN_ID: { type: 'number' },
    WARDEN_POLLING_INTERVAL_MSEC: { type: 'number' },
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
