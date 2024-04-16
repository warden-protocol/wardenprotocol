use cosmwasm_std::{PageRequest, QuerierWrapper, StdResult};

use crate::{AllKeysResponse, WardenProtocolQuery};
use crate::query::{WalletType, WardenQuery};

pub struct WardenQuerier<'a> {
    querier: &'a QuerierWrapper<'a, WardenProtocolQuery>,
}

impl<'a> WardenQuerier<'a> {
    pub fn new(querier: &'a QuerierWrapper<WardenProtocolQuery>) -> Self {
        WardenQuerier { querier }
    }

    pub fn query_warden_all_keys(&self, pagination: PageRequest, derive_wallets: Vec<WalletType>) -> StdResult<AllKeysResponse> {
        let request = WardenProtocolQuery::Warden(WardenQuery::AllKeys { pagination, derive_wallets });
        let response = self.querier.query::<AllKeysResponse>(&request.into())?;
        Ok(response)
    }
}