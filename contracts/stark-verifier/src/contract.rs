use crate::error::ContractError;
use crate::msg::{ExecuteMsg, GetResultResponse, InstantiateMsg, QueryMsg};
use crate::state::{State, STATE};
use base64::{engine::general_purpose::STANDARD, Engine};

#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};
use ark_serialize::{CanonicalDeserialize};
// use more performant global allocator
#[cfg(not(target_env = "msvc"))]
use jemallocator::Jemalloc;
use ministark::Proof;
use sandstorm::{air::CairoAir, binary::CompiledProgram};

#[cfg(not(target_env = "msvc"))]
#[global_allocator]
static GLOBAL: Jemalloc = Jemalloc;

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let m = &msg.result.to_string();
    STATE.save(deps.storage, &State { result: msg.result })?;
    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("result", m))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Verify {
            program,
            proof,
        } => execute::verify(deps, program, proof),
    }
}

pub mod execute {
    use super::*;
    pub fn verify(
        deps: DepsMut,
        program: String,
        proof: String,
    ) -> Result<Response, ContractError> {
        let compiled: CompiledProgram = serde_json::from_slice(&STANDARD.decode(&program.as_bytes()).unwrap()).unwrap();
        let stark: Proof<CairoAir> = Proof::deserialize_compressed(STANDARD.decode(&proof.as_bytes()).unwrap().as_slice()).unwrap();
        let inputs = &stark.public_inputs;
        assert_eq!(compiled.get_public_memory(), inputs.public_memory);
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            match stark.verify()
            {
                Ok(_) => {
                    let s = "ZKP successfully verified - execution confirmed!";
                    println!("\n{}", s);
                    state.result = s.to_string();
                }
                Err(msg) => {
                    println!("\n{}", msg);
                    state.result = msg.to_string();
                }
            }
            Ok(state)
        })?;
        Ok(Response::new().add_attribute("action", "verify"))
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetVerifResult {} => to_binary(&query::result(deps)?),
    }
}

pub mod query {
    use super::*;
    pub fn result(deps: Deps) -> StdResult<GetResultResponse> {
        let state = STATE.load(deps.storage)?;
        Ok(GetResultResponse {
            result: state.result,
        })
    }
}
