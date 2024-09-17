import { Environment } from '@warden/wormhole-relayer-engine';

export interface Env {
  APP_NAME: string;
  ENVIRONMENT: Environment;

  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  REDIS_ATTEMPTS: number;
  REDIS_QUEUE: string;

  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;

  SPY_URL: string;

  EVM_PRIVATE_KEY: string;
  SOL_PRIVATE_KEY: string;
  COSMOS_MNEMONIC: string;

  SOLANA_RPC: string;

  WORMHOLE_CHAINS_TO_EMITTERS: string;
  WORMHOLE_CHAINS_START_SEQUENCES: string;
}
