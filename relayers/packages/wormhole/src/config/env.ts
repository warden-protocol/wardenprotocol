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

  SPY_URL: string;

  EVM_PRIVATE_KEY: string;
  SOL_PRIVATE_KEY: string;
  COSMOS_MNEMONIC: string;

  SOLANA_RPC: string;
  SOLANA_GMP_CONTRACT_ADDRESS: string;
  SOLANA_GMP_WITH_TOKEN_CONTRACT_ADDRESS: string;
  SOLANA_GMP_WITH_TOKEN_RELAYER_FEE: number;
  SOLANA_GMP_WITH_TOKEN_RELAYER_FEE_PRECISION: number;

  ETHEREUM_GMP_CONTRACT_ADDRESS: string;
}
