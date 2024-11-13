import { JSONSchemaType, envSchema } from 'env-schema';

import { Env } from './env.js';

const schema: JSONSchemaType<Env> = {
  type: 'object',
  required: ['ETHEREUM_NODE_RPC', 'WARDEN_RPC_URL', 'WARDEN_POLLING_INTERVAL_MSEC'],
  properties: {
    ETHEREUM_NODE_RPC: { type: 'string' },
    WARDEN_RPC_URL: { type: 'string' },
    WARDEN_POLLING_INTERVAL_MSEC: { type: 'number' },
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
