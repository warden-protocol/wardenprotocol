use schemars::JsonSchema;
use std::fmt;

use cosmwasm_schema::cw_serde;
use cosmwasm_std::{CosmosMsg, Empty};

#[cw_serde]
pub enum Cw1QueryMsg<T = Empty>
where
    T: Clone + fmt::Debug + PartialEq + JsonSchema,
{
    /// Checks permissions of the caller on this proxy.
    /// If CanExecute returns true then a call to `Execute` with the same message,
    /// from the given sender, before any further state changes, should also succeed.
    CanExecute { sender: String, msg: CosmosMsg<T> },
}

#[cw_serde]
pub struct CanExecuteResponse {
    pub can_execute: bool,
}
