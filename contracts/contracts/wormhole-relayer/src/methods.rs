use crate::{
    msg::{InstantiateMsg, ParsedVAA, WormholeExecuteMsg, WormholeQueryMsg},
    state::{
        ADMIN, CONTRACT_NAME, CONTRACT_VERSION, WORMHOLE_CHAINS_EMITTERS, WORMHOLE_CORE_CONTRACT,
    },
};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    to_json_binary, Addr, Binary, CosmosMsg, DepsMut, Env, MessageInfo, Response, StdError,
    StdResult, WasmMsg,
};
use cw2::set_contract_version;

pub fn execute_instantiate(deps: &mut DepsMut, msg: &InstantiateMsg) -> StdResult<Response> {
    let admin_addr = deps.api.addr_validate(&msg.admin)?;

    ADMIN.set(deps.branch(), Some(admin_addr))?;

    WORMHOLE_CORE_CONTRACT.save(deps.storage, &deps.api.addr_validate(&msg.wormhole_core)?)?;

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
