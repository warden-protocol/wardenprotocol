use cosmwasm_schema::cw_serde;
use cosmwasm_std::{to_binary, Addr, CosmosMsg, StdResult, WasmMsg};

use crate::msg::{Cw3ExecuteMsg, Vote};
use cw_utils::Expiration;

/// Cw3Contract is a wrapper around Addr that provides a lot of helpers
/// for working with this.
///
/// If you wish to persist this, convert to Cw3CanonicalContract via .canonical()
///
/// FIXME: Cw3Contract currently only supports CosmosMsg<Empty>. When we actually
/// use this in some consuming code, we should make it generic over CosmosMsg<T>.
#[cw_serde]
pub struct Cw3Contract(pub Addr);

impl Cw3Contract {
    pub fn addr(&self) -> Addr {
        self.0.clone()
    }

    pub fn encode_msg(&self, msg: Cw3ExecuteMsg) -> StdResult<CosmosMsg> {
        Ok(WasmMsg::Execute {
            contract_addr: self.addr().into(),
            msg: to_binary(&msg)?,
            funds: vec![],
        }
        .into())
    }

    /// helper doesn't support custom messages now
    pub fn proposal<T: Into<String>, U: Into<String>>(
        &self,
        title: T,
        description: U,
        msgs: Vec<CosmosMsg>,
        earliest: Option<Expiration>,
        latest: Option<Expiration>,
    ) -> StdResult<CosmosMsg> {
        let msg = Cw3ExecuteMsg::Propose {
            title: title.into(),
            description: description.into(),
            msgs,
            earliest,
            latest,
        };
        self.encode_msg(msg)
    }

    pub fn vote(&self, proposal_id: u64, vote: Vote) -> StdResult<CosmosMsg> {
        let msg = Cw3ExecuteMsg::Vote { proposal_id, vote };
        self.encode_msg(msg)
    }

    pub fn execute(&self, proposal_id: u64) -> StdResult<CosmosMsg> {
        let msg = Cw3ExecuteMsg::Execute { proposal_id };
        self.encode_msg(msg)
    }

    pub fn close(&self, proposal_id: u64) -> StdResult<CosmosMsg> {
        let msg = Cw3ExecuteMsg::Close { proposal_id };
        self.encode_msg(msg)
    }
}
