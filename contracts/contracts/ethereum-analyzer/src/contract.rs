use crate::error::ContractError;
use crate::ethereum;
use crate::msg::{EthereumAnalyzerResult, ExecuteMsg, QueryMsg};
use alloy_consensus::SignableTransaction;
use alloy_primitives::TxKind;
use bindings::WardenProtocolQuery;
use analyzers_core::msg::AnalyzeResult;
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdError, StdResult};
use cw2::set_contract_version;

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:wardenprotocol-ethereum-analyzer";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut<WardenProtocolQuery>,
    _env: Env,
    _info: MessageInfo,
    _msg: Empty,
) -> StdResult<Response> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    _deps: DepsMut<WardenProtocolQuery>,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Analyze { input } => analyze(input),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(_deps: Deps<WardenProtocolQuery>, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {}
}

pub fn analyze(input: Binary) -> Result<Response, ContractError> {
    let tx = ethereum::parse(input)
        .map_err(|e| -> ContractError { StdError::generic_err(e.to_string()).into() })?;

    let result = AnalyzeResult::new_with_data(
        tx.signature_hash().as_slice().into(),
        EthereumAnalyzerResult {
            to: match tx.to {
                TxKind::Call(to) => to.to_string(),
                TxKind::Create => "".to_string(),
            },
            value: tx.value.to_string(),
            chain_id: tx.chain_id,
        },
    );

    let ser_result = serde_json_wasm::to_vec(&result)
        .map_err(|e| -> ContractError { StdError::generic_err(e.to_string()).into() })?;
    let res = Response::new().set_data(ser_result);
    Ok(res)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_analyze() -> Result<(), Box<dyn std::error::Error>> {
        let txhex = "02f283aa36a70a843b9aca008529779987ce82520894077cfb491cea8f35304ab3a6015f4ea3756ba50687038d7ea4c6800080c0";
        let txbytez = hex::decode(txhex)?;

        let response = analyze(txbytez.into())?;
        let data: AnalyzeResult<EthereumAnalyzerResult> =
            serde_json_wasm::from_slice(&response.data.unwrap())?;

        assert_eq!(
            data.result.to,
            "0x077Cfb491CEa8F35304aB3A6015F4Ea3756bA506".to_string()
        );
        assert_eq!(data.result.value, "1000000000000000".to_string());
        assert_eq!(
            data.data_for_signing,
            Some(
                hex::decode("2f53d4dcac8f9242d1c1704ac8fe8a0c2c274218b019d0ab7ce32474f9c91136")?
                    .into()
            )
        );

        Ok(())
    }
}
