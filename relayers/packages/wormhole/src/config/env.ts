import { Environment } from '@wormhole-foundation/relayer-engine';

export interface Env {
  APP_NAME: string;
  ENVIRONMENT: Environment;

  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  REDIS_ATTEMPTS: number;
  REDIS_QUEUE: string;

  SPY_URL: string;

  EVM_PRIVATE_KEY: string;
  SOL_PRIVATE_KEY: string;
  COSMOS_MNEMONIC: string;
}
