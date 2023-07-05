use cosmwasm_schema::cw_serde;
use cosmwasm_std::{to_binary, Addr, CosmosMsg, StdResult, WasmMsg};

use crate::msg::Cw1ExecuteMsg;

/// Cw1Contract is a wrapper around Addr that provides a lot of helpers
/// for working with this.
///
/// If you wish to persist this, convert to Cw1CanonicalContract via .canonical()
#[cw_serde]
pub struct Cw1Contract(pub Addr);

impl Cw1Contract {
    pub fn addr(&self) -> Addr {
        self.0.clone()
    }

    pub fn execute<T: Into<Vec<CosmosMsg>>>(&self, msgs: T) -> StdResult<CosmosMsg> {
        let msg = Cw1ExecuteMsg::Execute { msgs: msgs.into() };
        Ok(WasmMsg::Execute {
            contract_addr: self.addr().into(),
            msg: to_binary(&msg)?,
            funds: vec![],
        }
        .into())
    }
}
