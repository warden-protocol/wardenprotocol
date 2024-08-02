use cosmwasm_std::{
    CosmosMsg, Deps, DepsMut, Env, MessageInfo, Response, StdError, StdResult, Uint128, WasmMsg,
};
use cw2::set_contract_version;
use cw20::TokenInfoResponse;
use cw20_base::contract::execute_mint;
use cw20_base::state::TOKEN_INFO;
use cw20_base::state::{MinterData, TokenInfo};
use cw20_base::ContractError;

use crate::msg::{HumanAddr, InstantiateMsg, WrappedAssetInfoResponse};
use crate::state::{WrappedAssetInfo, CONTRACT_NAME, CONTRACT_VERSION, WRAPPED_ASSET};

pub fn execute_instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    // store token info using cw20-base format
    TOKEN_INFO.save(
        deps.storage,
        &TokenInfo {
            name: msg.name,
            symbol: msg.symbol,
            decimals: msg.decimals,
            total_supply: Uint128::new(0),
            // set creator as minter
            mint: Some(MinterData {
                minter: deps.api.addr_validate(info.sender.as_str())?,
                cap: None,
            }),
        },
    )?;

    // save wrapped asset info
    WRAPPED_ASSET.save(
        deps.storage,
        &WrappedAssetInfo {
            asset_chain: msg.asset_chain,
            asset_address: msg.asset_address,
            bridge: deps.api.addr_canonicalize(info.sender.as_str())?,
        },
    )?;

    if let Some(mint_info) = msg.mint {
        execute_mint(deps, env, info, mint_info.recipient, mint_info.amount)
            .map_err(|e| StdError::generic_err(format!("{e}")))?;
    }

    if let Some(hook) = msg.init_hook {
        Ok(
            Response::new().add_message(CosmosMsg::Wasm(WasmMsg::Execute {
                contract_addr: hook.contract_addr,
                msg: hook.msg,
                funds: vec![],
            })),
        )
    } else {
        Ok(Response::default())
    }
}

pub fn execute_mint_wrapped(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    recipient: HumanAddr,
    amount: Uint128,
) -> Result<Response, ContractError> {
    execute_mint(deps, env, info, recipient, amount)
}

pub fn execute_update_metadata(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    name: String,
    symbol: String,
) -> Result<Response, ContractError> {
    // Only bridge can update.
    let wrapped_info = WRAPPED_ASSET.load(deps.storage)?;

    if wrapped_info.bridge != deps.api.addr_canonicalize(info.sender.as_str())? {
        return Err(ContractError::Unauthorized {});
    }

    let mut state = TOKEN_INFO.load(deps.storage)?;
    state.name = name;
    state.symbol = symbol;
    TOKEN_INFO.save(deps.storage, &state)?;
    Ok(Response::default())
}

pub fn query_token_info(deps: Deps) -> StdResult<TokenInfoResponse> {
    let info = TOKEN_INFO.load(deps.storage)?;
    Ok(TokenInfoResponse {
        name: info.name + " (Wormhole)",
        symbol: info.symbol,
        decimals: info.decimals,
        total_supply: info.total_supply,
    })
}

pub fn query_wrapped_asset_info(deps: Deps) -> StdResult<WrappedAssetInfoResponse> {
    let wrapped_info = WRAPPED_ASSET.load(deps.storage)?;
    Ok(WrappedAssetInfoResponse {
        asset_chain: wrapped_info.asset_chain,
        asset_address: wrapped_info.asset_address,
        bridge: deps.api.addr_humanize(&wrapped_info.bridge)?,
    })
}
