use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::PageRequest;
use bindings::key::KeyType;
use bindings::query::{WalletType};

#[cw_serde]
pub enum ExecuteMsg
{
    NewKeyRequest {
        space_id: u64,
        keychain_id: u64,
        key_type: KeyType,
        btl: u64,
        intent_id: u64,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg
{
    #[returns(bindings::AllKeysResponse)]
    WardenAllKeys { pagination: PageRequest, derive_wallets: Vec<WalletType> }
}
