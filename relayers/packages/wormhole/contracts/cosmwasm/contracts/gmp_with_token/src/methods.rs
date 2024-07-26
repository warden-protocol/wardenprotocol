use crate::msg::{InstantiateMsg, ParsedVAA, WormholeExecuteMsg, WormholeQueryMsg};
use crate::state::{
    ADMIN, CONTRACT_NAME, CONTRACT_VERSION, CW_DENOMS, WORMHOLE_CHAINS_EMITTERS,
    WORMHOLE_CORE_CONTRACT, WORMHOLE_TOKEN_BRIDGE_CONTRACT,
};
use crate::ContractError;
use bs58::decode;
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    to_json_binary, Addr, Binary, CosmosMsg, DepsMut, Env, MessageInfo, Response, StdError,
    StdResult, WasmMsg,
};
use cosmwasm_std::{Coin, Deps, Uint128};
use cw2::set_contract_version;
use cw20_wrapped_2::msg::ExecuteMsg as Cw20WrappedExecuteMsg;
use wormhole_bindings::tokenfactory::{TokenFactoryMsg, TokenMsg};

pub fn execute_instantiate(deps: &mut DepsMut, msg: &InstantiateMsg) -> StdResult<Response> {
    let admin_addr = deps.api.addr_validate(&msg.admin)?;

    ADMIN.set(deps.branch(), Some(admin_addr))?;

    WORMHOLE_CORE_CONTRACT.save(deps.storage, &deps.api.addr_validate(&msg.wormhole_core)?)?;

    WORMHOLE_TOKEN_BRIDGE_CONTRACT.save(
        deps.storage,
        &deps
            .api
            .addr_validate(&msg.wormhole_token_bridge_contract)?,
    )?;

    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
    Ok(Response::default().add_attribute("version", CONTRACT_VERSION))
}

pub fn execute_set_chain_emitter(
    deps: &mut DepsMut,
    info: &MessageInfo,
    chain_id: u16,
    emitter: &Binary,
) -> StdResult<Response> {
    ADMIN
        .assert_admin(deps.as_ref(), &info.sender)
        .map_err(|err| StdError::generic_err(err.to_string()))?;

    WORMHOLE_CHAINS_EMITTERS.save(deps.storage, chain_id, &emitter.to_array()?)?;

    Ok(Response::default())
}

pub fn execute_receive_message(deps: &DepsMut, env: &Env, vaa: &Binary) -> StdResult<Response> {
    let parsed_vaa: ParsedVAA = query_verify_vaas(deps, env, None, vaa)?;

    let expected_emitter = WORMHOLE_CHAINS_EMITTERS.load(deps.storage, parsed_vaa.emitter_chain)?;

    if parsed_vaa.emitter_address != expected_emitter {
        return Err(StdError::generic_err("invalid emitter address"));
    }

    let string = String::from_utf8(parsed_vaa.payload).expect("invalid utf8");

    Ok(Response::default().add_attribute("message", string))
}

pub fn execute_post_message(deps: &DepsMut, nonce: u32, message: &Binary) -> StdResult<Response> {
    let wormhole_core_contract = WORMHOLE_CORE_CONTRACT.load(deps.storage)?;

    let msg = CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: wormhole_core_contract.to_string(),
        funds: vec![],
        msg: to_json_binary(&WormholeExecuteMsg::PostMessage {
            message: message.clone(),
            nonce,
        })?,
    });

    Ok(Response::new().add_message(msg))
}

pub fn query_verify_vaas(
    deps: &DepsMut,
    env: &Env,
    mb_wormhole_core: Option<Addr>,
    vaa: &Binary,
) -> StdResult<ParsedVAA> {
    let wormhole_core = mb_wormhole_core.unwrap_or(WORMHOLE_CORE_CONTRACT.load(deps.storage)?);

    deps.querier.query_wasm_smart(
        wormhole_core,
        &WormholeQueryMsg::VerifyVAA {
            vaa: vaa.clone(),
            block_time: env.block.time.seconds(),
        },
    )
}

pub fn execute_convert_and_transfer_with_payload(
    deps: DepsMut,
    info: MessageInfo,
    env: Env,
    target_chain: u16,
    target_contract: Binary,
    payload: Binary,
    fee: Uint128,
    nonce: u32,
) -> Result<Response, ContractError> {
    let wormhole_token_bridge = WORMHOLE_TOKEN_BRIDGE_CONTRACT.load(deps.storage)?;

    if info.funds.len() != 1 {
        return Err(ContractError::TransferWithPayloadError {
            message: "info.funds should contain only 1 coin".to_string(),
        });
    }

    let bridging_coin = info.funds[0].clone();
    let cw20_contract_addr = parse_bank_token_factory_contract(deps, env, bridging_coin.clone())?;

    // batch calls together
    let mut response: Response<TokenFactoryMsg> = Response::new();

    // 1. tokenfactorymsg::burn for the bank tokens
    response = response.add_message(TokenMsg::BurnTokens {
        denom: bridging_coin.denom.clone(),
        amount: bridging_coin.amount.u128(),
        burn_from_address: "".to_string(),
    });

    // 2. cw20::increaseAllowance to the contract address for the token bridge to spend the amount of tokens
    let increase_allowance_msg = to_json_binary(&Cw20WrappedExecuteMsg::IncreaseAllowance {
        spender: wormhole_token_bridge.into_string(),
        amount: bridging_coin.amount,
        expires: None,
    })
    .or_else(|_| {
        Err(ContractError::TransferWithPayloadError {
            message: "".to_string(),
        })
    })?;

    response = response.add_message(CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: cw20_contract_addr.clone(),
        msg: increase_allowance_msg,
        funds: vec![],
    }));

    Ok(Response::default())
}

fn parse_bank_token_factory_contract(
    deps: DepsMut,
    env: Env,
    coin: Coin,
) -> Result<String, ContractError> {
    let parsed_denom = coin.denom.split("/").collect::<Vec<_>>();

    if parsed_denom.len() != 3
        || parsed_denom[0] != "factory"
        || parsed_denom[1] != env.contract.address.to_string()
    {
        return Err(ContractError::CoinError {
            message: "coin is not from the token factory".to_string(),
        });
    }

    // decode subdenom from base64 => encode as cosmos addr to get contract addr
    let cw20_contract_addr = contract_addr_from_base58(deps.as_ref(), parsed_denom[2])?;

    // validate that the contract does indeed match the stored denom we have for it
    let stored_denom = CW_DENOMS
        .load(deps.storage, cw20_contract_addr.clone())
        .or_else(|_| {
            Err(ContractError::CoinError {
                message: "a denom for the cw20_contract_addr was not found".to_string(),
            })
        })?;

    if stored_denom != coin.denom {
        return Err(ContractError::CoinError {
            message: "the stored denom for the contract does not match the actual coin denom"
                .to_string(),
        });
    }

    Ok(cw20_contract_addr)
}

fn contract_addr_from_base58(deps: Deps, subdenom: &str) -> Result<String, ContractError> {
    let decoded_addr = decode(subdenom).into_vec().or_else(|_| {
        Err(ContractError::CodecError {
            message: "failed to decode the subdenom".to_string(),
        })
    })?;

    let canonical_addr = Binary::from(decoded_addr);

    deps.api
        .addr_humanize(&canonical_addr.into())
        .map(|a| a.to_string())
        .or_else(|_| {
            Err(ContractError::CodecError {
                message: "failed to humanize the canonical_addr".to_string(),
            })
        })
}
