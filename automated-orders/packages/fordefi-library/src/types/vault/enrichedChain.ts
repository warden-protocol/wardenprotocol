import { VaultType } from './vault.type.js';

export interface EnrichedChain {
  /** The type of the chain. */
  chain_type: VaultType;
  /** Chain unique id. */
  unique_id: string;
  /** The full blockchain name. */
  name: string;
  /** The native currency symbol. */
  native_currency_symbol: string;
  /** The native currency name. */
  native_currency_name: string;
  /** A blockchain explorer entry point. */
  blockchain_explorer: BlockchainExplorer;
  /** The base denom of the chain. */
  base_denom: string;
  /** The bech32 prefix for addresses on the chain. */
  bech32_prefix: string;
}

export interface BlockchainExplorer {
  transaction_url: string;
  address_url: string;
  root_url: string;
  transaction_format_url: string;
  address_format_url: string;
}
