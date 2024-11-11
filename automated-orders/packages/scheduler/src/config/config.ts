import { JSONSchemaType, envSchema } from 'env-schema';

import { Env } from './env.js';

const schema: JSONSchemaType<Env> = {
  type: 'object',
  required: ['ETHEREUM_NODE_RPC', 'ETHEREUM_REGISTRY_ADDRESS'],
  properties: {
    ETHEREUM_NODE_RPC: { type: 'string' },
    ETHEREUM_REGISTRY_ADDRESS: { type: 'string' },
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
