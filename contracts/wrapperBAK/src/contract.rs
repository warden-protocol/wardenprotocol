use crate::allowances::{
    execute_burn_from, execute_decrease_allowance, execute_increase_allowance, execute_send_from,
    execute_transfer_from, query_allowance,
};
use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg};
use crate::state::{State, STATE};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, to_binary, BankMsg, Coin, CosmosMsg, DepsMut, Env, MessageInfo, Response, WasmMsg,
};
use cw20::Cw20ExecuteMsg;
use cw_storage_plus::Item;
use serde::{Deserialize, Serialize};

pub const QRDO: &str = "qrdo";
pub const WQRDO: &str = "wQRDO";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct ContractConfig {
    pub contract_addr: String,
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
    CONFIG.save(
        deps.storage,
        &ContractConfig {
            // contract_addr: deps.api.addr_validate(&msg.contract_addr)?,
            contract_addr: "qredo14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9ss9tga8"
                .to_owned(),
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
        ExecuteMsg::Transfer { recipient, amount } => {
            execute_transfer(deps, env, info, recipient, amount)
        }
        ExecuteMsg::Burn { amount } => execute_burn(deps, env, info, amount),
        ExecuteMsg::Send {
            contract,
            amount,
            msg,
        } => execute_send(deps, env, info, contract, amount, msg),
        ExecuteMsg::Mint { recipient, amount } => execute_mint(deps, env, info, recipient, amount),
        ExecuteMsg::IncreaseAllowance {
            spender,
            amount,
            expires,
        } => execute_increase_allowance(deps, env, info, spender, amount, expires),
        ExecuteMsg::DecreaseAllowance {
            spender,
            amount,
            expires,
        } => execute_decrease_allowance(deps, env, info, spender, amount, expires),
        ExecuteMsg::TransferFrom {
            owner,
            recipient,
            amount,
        } => execute_transfer_from(deps, env, info, owner, recipient, amount),
        ExecuteMsg::BurnFrom { owner, amount } => execute_burn_from(deps, env, info, owner, amount),
        ExecuteMsg::SendFrom {
            owner,
            contract,
            amount,
            msg,
        } => execute_send_from(deps, env, info, owner, contract, amount, msg),
    }
}

pub mod execute {
    use super::*;
    pub fn wrap(
        deps: DepsMut,
        _env: Env,
        info: MessageInfo,
        amount: String,
    ) -> Result<Response, ContractError> {
        let config = CONFIG.load(deps.storage)?;
        let lock_qrdo = CosmosMsg::Bank(BankMsg::Send {
            to_address: config.contract_addr.clone(),
            amount: vec![Coin {
                denom: QRDO.to_string(),
                amount: amount.parse::<u128>().unwrap().into(),
            }],
        });

        let mint_wqrdo = CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: config.contract_addr,
            msg: to_binary(&Cw20ExecuteMsg::Mint {
                recipient: info.sender.to_string(),
                amount: amount.parse::<u128>().unwrap().into(),
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
        amount: String,
    ) -> Result<Response, ContractError> {
        let config = CONFIG.load(deps.storage)?;

        let burn_wqrdo = CosmosMsg::Wasm(WasmMsg::Execute {
            contract_addr: config.contract_addr,
            msg: to_binary(&Cw20ExecuteMsg::Burn {
                amount: amount.parse::<u128>().unwrap().into(),
            })?,
            funds: vec![],
        });

        let release_qrdo = CosmosMsg::Bank(BankMsg::Send {
            to_address: info.sender.to_string(),
            amount: vec![Coin {
                denom: QRDO.to_string(),
                amount: amount.parse::<u128>().unwrap().into(),
            }],
        });

        Ok(Response::new()
            .add_message(burn_wqrdo)
            .add_message(release_qrdo)
            .add_attribute("action", "unwrap")
            .add_attribute("amount", amount.to_string()))
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Balance { address } => to_binary(&query_balance(deps, address)?),
        QueryMsg::TokenInfo {} => to_binary(&query_token_info(deps)?),
        QueryMsg::Minter {} => to_binary(&query_minter(deps)?),
        QueryMsg::Allowance { owner, spender } => {
            to_binary(&query_allowance(deps, owner, spender)?)
        }
        QueryMsg::AllAllowances {
            owner,
            start_after,
            limit,
        } => to_binary(&query_all_allowances(deps, owner, start_after, limit)?),
        QueryMsg::AllAccounts { start_after, limit } => {
            to_binary(&query_all_accounts(deps, start_after, limit)?)
        }
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, _msg: MigrateMsg) -> StdResult<Response> {
    Ok(Response::default())
}
