use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Deps, StdResult, Uint128};

use crate::{Cw20QueryMsg, TokenInfoResponse};

#[cw_serde]
pub enum Denom {
    Native(String),
    Cw20(Addr),
}

#[cw_serde]
pub enum UncheckedDenom {
    Native(String),
    Cw20(String),
}

#[cw_serde]
pub struct DepositInfo {
    amount: Uint128,
    denom: UncheckedDenom,
}

impl UncheckedDenom {
    pub fn into_checked(self, deps: Deps) -> StdResult<Denom> {
        match self {
            Self::Native(denom) => Ok(Denom::Native(denom)),
            Self::Cw20(addr) => {
                let addr = deps.api.addr_validate(&addr)?;
                let _info: TokenInfoResponse = deps
                    .querier
                    .query_wasm_smart(addr.clone(), &Cw20QueryMsg::TokenInfo {})?;
                Ok(Denom::Cw20(addr))
            }
        }
    }
}

// TODO: remove or figure out where needed
impl Default for Denom {
    fn default() -> Denom {
        Denom::Native(String::default())
    }
}

impl Denom {
    pub fn is_empty(&self) -> bool {
        match self {
            Denom::Native(string) => string.is_empty(),
            Denom::Cw20(addr) => addr.as_ref().is_empty(),
        }
    }
}
