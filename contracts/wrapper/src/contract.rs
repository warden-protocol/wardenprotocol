use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg};
use crate::state::{State, STATE};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, to_binary, Addr, BankMsg, Coin, CosmosMsg, DepsMut, Env, MessageInfo, Response,
    Uint128, WasmMsg,
};
use cw20::Cw20ExecuteMsg;
use cw_storage_plus::Item;
use serde::{Deserialize, Serialize};

pub const QRDO: &str = "qrdo";
pub const WQRDO: &str = "wQRDO";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct ContractConfig {
    pub contract_addr: Addr,
}

static CONFIG: Item<ContractConfig> = Item::new("config");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    STATE.save(
        deps.storage,
        &State {
            ibc_connected: false,
        },
    )?;
    Ok(Response::new().add_attribute("method", "instantiate"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Wrap { amount } => execute::wrap(deps, env, info, amount),
        ExecuteMsg::Unwrap { amount } => execute::unwrap(deps, env, info, amount),
    }
}

pub mod execute {
    use super::*;
    pub fn wrap(
        deps: DepsMut,
        _env: Env,
        info: MessageInfo,
        amount: Uint128,
    ) -> Result<Response, ContractError> {
        let config = CONFIG.load(deps.storage)?;

        let lock_qrdo = CosmosMsg::Bank(BankMsg::Send {
            to_address: config.contract_addr.to_string(),
            amount: vec![Coin {
                denom: QRDO.to_string(),
                amount: amount.into(),
            }],
        });

        let mint_wqrdo = CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: config.contract_addr.to_string(),
            msg: to_binary(&Cw20ExecuteMsg::Mint {
                recipient: info.sender.to_string(),
                amount: amount.into(),
            })?,
            funds: vec![],
        });

        Ok(Response::new()
            .add_message(lock_qrdo)
            .add_message(mint_wqrdo)
            .add_attribute("action", "wrap")
            .add_attribute("amount", amount.to_string()))
    }

    pub fn unwrap(
        deps: DepsMut,
        _env: Env,
        info: MessageInfo,
        amount: Uint128,
    ) -> Result<Response, ContractError> {
        let config = CONFIG.load(deps.storage)?;

        let burn_wqrdo = CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: config.contract_addr.to_string(),
            msg: to_binary(&Cw20ExecuteMsg::Burn {
                amount: amount.into(),
            })?,
            funds: vec![],
        });

        let release_qrdo = CosmosMsg::Bank(BankMsg::Send {
            to_address: info.sender.to_string(),
            amount: vec![Coin {
                denom: QRDO.to_string(),
                amount: amount.into(),
            }],
        });

        Ok(Response::new()
            .add_message(burn_wqrdo)
            .add_message(release_qrdo)
            .add_attribute("action", "unwrap")
            .add_attribute("amount", amount.to_string()))
    }
}
