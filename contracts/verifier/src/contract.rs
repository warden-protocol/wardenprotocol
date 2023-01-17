use crate::error::ContractError;
use crate::msg::{ExecuteMsg, GetResultResponse, InstantiateMsg, QueryMsg};
use crate::state::{State, STATE};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};
use miden_core::ProgramOutputs;
use miden_verifier::StarkProof;
use winter_crypto::{hashers::Rp64_256, Hasher};

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
        ExecuteMsg::Verify {
            program_hash,
            stack_inputs,
            stack_outputs,
            proof,
        } => execute::verify(deps, program_hash, stack_inputs, stack_outputs, proof),
    }
}

pub mod execute {
    use super::*;
    pub fn verify(
        deps: DepsMut,
        program_hash: Vec<u8>,
        stack_inputs: Vec<u64>,
        stack_outputs: Vec<u64>,
        proof: Vec<u8>,
    ) -> Result<Response, ContractError> {
        let hash = Rp64_256::hash(&program_hash);
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            match miden_verifier::verify(
                hash,
                &stack_inputs,
                &ProgramOutputs::new(
                    vec![1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    vec![0, 276171],
                ),
                StarkProof::from_bytes(&proof).unwrap(),
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
