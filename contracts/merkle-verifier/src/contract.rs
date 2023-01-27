use crate::error::ContractError;
use crate::msg::{ExecuteMsg, GetResultResponse, InstantiateMsg, QueryMsg};
use crate::state::{State, STATE};
use base64::{engine::general_purpose::STANDARD, Engine};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};
use rs_merkle::{algorithms::Sha256, MerkleProof};

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
            proof,
            root,
            leaf_indices,
            leaf_hashes,
            leaf_count,
        } => execute::verify(deps, proof, root, leaf_indices, leaf_hashes, leaf_count),
    }
}

pub mod execute {
    use super::*;
    pub fn verify(
        deps: DepsMut,
        proof: String,
        root: Vec<u8>,
        leaf_indices: Vec<u64>,
        leaf_hashes: Vec<Vec<u8>>,
        leaf_count: u64,
    ) -> Result<Response, ContractError> {
        let mut hashes = Vec::new();
        for hash in leaf_hashes {
            hashes.push(hash.as_slice().try_into().unwrap())
        }
        let leaf_inds: Vec<usize> = leaf_indices.into_iter().map(|x| x as usize).collect();
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            match MerkleProof::<Sha256>::try_from(&STANDARD.decode(&proof.as_bytes()).unwrap()[..])
                .unwrap()
                .verify(
                    root.as_slice().try_into().unwrap(),
                    &leaf_inds,
                    &hashes,
                    leaf_count.try_into().unwrap(),
                ) {
                true => {
                    let s = "Merkle proof successfully verified!";
                    state.result = s.to_string();
                    println!("\n{}\n", s);
                }
                false => {
                    let s = "Verification failed!";
                    state.result = s.to_string();
                    println!("\n{}\n", s);
                }
            };
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
