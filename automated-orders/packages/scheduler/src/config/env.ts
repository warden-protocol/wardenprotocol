export interface Env {
  EVMOS_NODE_RPC: string;
  EVMOS_REGISTRY_ADDRESS: string;
  EVMOS_EVENTS_POLLING_BLOCKS: number;
  EVMOS_EVENTS_REGISTRY_START_POLLING_BLOCK: number;
  EVMOS_EVENTS_POLLING_INTERVAL_MSEC: number;
  EVMOS_EVENTS_ORDER_RETRY_ATTEMPTS: number;
  EVMOS_EVENTS_CACHE_SIZE: number;
  ETHEREUM_NODE_RPC: string;
  WARDEN_EVM_CHAIN_ID: number;
  AWS_KMS_KEY_ID: string;
  AWS_KMS_REGION: string;
}