use crate::error::ContractError;
use crate::msg::{ExecuteMsg, GetResultResponse, InstantiateMsg, QueryMsg};
use crate::state::{State, STATE};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};
use miden_core::utils::{Deserializable, SliceReader};
use miden_core::ProgramOutputs;
use miden_verifier::{Digest, StarkProof};

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
            hash,
            inputs,
            outputs,
            proof,
        } => execute::verify(deps, hash, inputs, outputs, proof),
    }
}

pub mod execute {
    use super::*;
    pub fn verify(
        deps: DepsMut,
        hash: Vec<u8>,
        inputs: Vec<u64>,
        outputs: Vec<Vec<u64>>,
        proof: Vec<u8>,
    ) -> Result<Response, ContractError> {
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            match miden_verifier::verify(
                Digest::read_from(&mut SliceReader::new(&hash)).unwrap(),
                &inputs,
                &ProgramOutputs::new(outputs[0].clone(), outputs[1].clone()),
                StarkProof::from_bytes(&proof).unwrap(),
            ) {
                Ok(_) => {
                    let s = "Execution verified!";
                    println!("{}", s);
                    state.result = s.to_string();
                }
                Err(msg) => {
                    println!("{}", msg);
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
