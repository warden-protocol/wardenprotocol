use cosmwasm_std::{PageRequest, QuerierWrapper, StdResult};

use crate::{QueryKeysResponse, WardenProtocolQuery};
use crate::query::{AddressType, WardenQuery};

pub struct WardenQuerier<'a> {
    querier: &'a QuerierWrapper<'a, WardenProtocolQuery>,
}

impl<'a> WardenQuerier<'a> {
    pub fn new(querier: &'a QuerierWrapper<WardenProtocolQuery>) -> Self {
        WardenQuerier { querier }
    }

    pub fn query_warden_all_keys(&self, pagination: PageRequest, derive_addresses: Vec<AddressType>) -> StdResult<QueryKeysResponse> {
        let request = WardenProtocolQuery::Warden(WardenQuery::AllKeys { pagination, derive_addresses });
        let response = self.querier.query::<QueryKeysResponse>(&request.into())?;
        Ok(response)
    }
}