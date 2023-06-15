use schemars::JsonSchema;
use std::fmt;

use cosmwasm_schema::cw_serde;
use cosmwasm_std::{CosmosMsg, Empty};

#[cw_serde]
pub enum Cw1ExecuteMsg<T = Empty>
where
    T: Clone + fmt::Debug + PartialEq + JsonSchema,
{
    /// Execute requests the contract to re-dispatch all these messages with the
    /// contract's address as sender. Every implementation has it's own logic to
    /// determine in
    Execute { msgs: Vec<CosmosMsg<T>> },
}
