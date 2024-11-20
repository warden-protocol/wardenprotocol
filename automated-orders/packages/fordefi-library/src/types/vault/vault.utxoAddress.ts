export interface UtxoVaultAddress {
  id: string;
  created_at: Date;
  modified_at: Date;
  name: string;
  balance: string;
  balances: Balances;
  public_key_compressed: string;
  type: string;
  address: Address;
}

export interface Address {
  address: string;
  address_type: string;
  chain: Chain;
}

export interface Chain {
  chain_type: string;
  unique_id: string;
}

export interface Balances {
  mined: string;
  pending_incoming: string;
}
