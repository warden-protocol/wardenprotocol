use crate::error::ContractError;
use crate::msg::{ExecuteMsg, GetResultResponse, InstantiateMsg, QueryMsg};
use crate::state::{State, STATE};
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult};
use miden_core::{Felt, ProgramOutputs};
use miden_verifier::{Digest, StarkProof};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    STATE.save(deps.storage, &State { result: msg.result })?;
    Ok(Response::new().add_attribute("method", "instantiate"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Verify { proof_bytes } => execute::verify(deps, proof_bytes),
    }
}

pub mod execute {

    use super::*;
    pub fn verify(deps: DepsMut, proof_bytes: Vec<u8>) -> Result<Response, ContractError> {
        // TO DO: Accept program outputs as fn parameter
        let stark_proof = StarkProof::from_bytes(&proof_bytes).unwrap();
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            match miden_verifier::verify(
                miden_core::chiplets::hasher::hash_elements(&[Felt::new(276171)]),
                &[],
                &ProgramOutputs::new(
                    vec![1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    vec![0, 276171],
                ),
                stark_proof,
            ) {
                Ok(_) => println!("Execution verified!"), // state.result = "Execution verified!".to_string(),
                Err(msg) => println!("{:?}", msg),        // state.result = msg.to_string(),
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
