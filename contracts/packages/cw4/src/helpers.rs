use cosmwasm_schema::cw_serde;
use cosmwasm_std::{
    to_binary, Addr, CosmosMsg, CustomQuery, QuerierWrapper, QueryRequest, StdResult, WasmMsg,
    WasmQuery,
};

use crate::msg::Cw4ExecuteMsg;
use crate::query::HooksResponse;
use crate::{
    AdminResponse, Cw4QueryMsg, Member, MemberListResponse, MemberResponse, MEMBERS_KEY, TOTAL_KEY,
};
use cw_storage_plus::{Item, Map};

/// Cw4Contract is a wrapper around Addr that provides a lot of helpers
/// for working with cw4 contracts
///
/// If you wish to persist this, convert to Cw4CanonicalContract via .canonical()
#[cw_serde]
pub struct Cw4Contract(pub Addr);

impl Cw4Contract {
    pub fn new(addr: Addr) -> Self {
        Cw4Contract(addr)
    }

    pub fn addr(&self) -> Addr {
        self.0.clone()
    }

    fn encode_msg(&self, msg: Cw4ExecuteMsg) -> StdResult<CosmosMsg> {
        Ok(WasmMsg::Execute {
            contract_addr: self.addr().into(),
            msg: to_binary(&msg)?,
            funds: vec![],
        }
        .into())
    }

    pub fn add_hook<T: Into<String>>(&self, addr: T) -> StdResult<CosmosMsg> {
        let msg = Cw4ExecuteMsg::AddHook { addr: addr.into() };
        self.encode_msg(msg)
    }

    pub fn remove_hook<T: Into<String>>(&self, addr: T) -> StdResult<CosmosMsg> {
        let msg = Cw4ExecuteMsg::RemoveHook { addr: addr.into() };
        self.encode_msg(msg)
    }

    pub fn update_admin<T: Into<String>>(&self, admin: Option<T>) -> StdResult<CosmosMsg> {
        let msg = Cw4ExecuteMsg::UpdateAdmin {
            admin: admin.map(|x| x.into()),
        };
        self.encode_msg(msg)
    }

    fn encode_smart_query<Q: CustomQuery>(&self, msg: Cw4QueryMsg) -> StdResult<QueryRequest<Q>> {
        Ok(WasmQuery::Smart {
            contract_addr: self.addr().into(),
            msg: to_binary(&msg)?,
        }
        .into())
    }

    /// Show the hooks
    pub fn hooks<Q: CustomQuery>(&self, querier: &QuerierWrapper<Q>) -> StdResult<Vec<String>> {
        let query = self.encode_smart_query(Cw4QueryMsg::Hooks {})?;
        let res: HooksResponse = querier.query(&query)?;
        Ok(res.hooks)
    }

    /// Read the total weight
    pub fn total_weight(&self, querier: &QuerierWrapper) -> StdResult<u64> {
        Item::new(TOTAL_KEY).query(querier, self.addr())
    }

    /// Check if this address is a member and returns its weight
    pub fn is_member(
        &self,
        querier: &QuerierWrapper,
        member: &Addr,
        height: Option<u64>,
    ) -> StdResult<Option<u64>> {
        match height {
            Some(height) => self.member_at_height(querier, member.to_string(), height.into()),
            None => Map::new(MEMBERS_KEY).query(querier, self.addr(), member),
        }
    }

    /// Check if this address is a member, and if its weight is >= 1
    /// Returns member's weight in positive case
    pub fn is_voting_member(
        &self,
        querier: &QuerierWrapper,
        member: &Addr,
        height: impl Into<Option<u64>>,
    ) -> StdResult<Option<u64>> {
        if let Some(weight) = self.member_at_height(querier, member.to_string(), height.into())? {
            if weight >= 1 {
                return Ok(Some(weight));
            }
        }
        Ok(None)
    }

    /// Return the member's weight at the given snapshot - requires a smart query
    pub fn member_at_height(
        &self,
        querier: &QuerierWrapper,
        member: impl Into<String>,
        at_height: Option<u64>,
    ) -> StdResult<Option<u64>> {
        let query = self.encode_smart_query(Cw4QueryMsg::Member {
            addr: member.into(),
            at_height,
        })?;
        let res: MemberResponse = querier.query(&query)?;
        Ok(res.weight)
    }

    pub fn list_members(
        &self,
        querier: &QuerierWrapper,
        start_after: Option<String>,
        limit: Option<u32>,
    ) -> StdResult<Vec<Member>> {
        let query = self.encode_smart_query(Cw4QueryMsg::ListMembers { start_after, limit })?;
        let res: MemberListResponse = querier.query(&query)?;
        Ok(res.members)
    }

    /// Read the admin
    pub fn admin(&self, querier: &QuerierWrapper) -> StdResult<Option<String>> {
        let query = self.encode_smart_query(Cw4QueryMsg::Admin {})?;
        let res: AdminResponse = querier.query(&query)?;
        Ok(res.admin)
    }
}
