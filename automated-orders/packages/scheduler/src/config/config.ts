import { JSONSchemaType, envSchema } from 'env-schema';

import { Env } from './env.js';

const schema: JSONSchemaType<Env> = {
  type: 'object',
  required: [
    'EVMOS_NODE_RPC',
    'EVMOS_REGISTRY_ADDRESS',
    'ETHEREUM_EVENTS_POLLING_BLOCKS',
    'ETHEREUM_EVENTS_POLLING_INTERVAL_MSEC',
  ],
  properties: {
    EVMOS_NODE_RPC: { type: 'string' },
    EVMOS_REGISTRY_ADDRESS: { type: 'string' },
    ETHEREUM_EVENTS_POLLING_BLOCKS: { type: 'number' },
    ETHEREUM_EVENTS_POLLING_INTERVAL_MSEC: { type: 'number' },
  },
};

export const config = envSchema({
  schema,
  dotenv: true,
});
