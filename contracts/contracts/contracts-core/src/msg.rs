use cosmwasm_schema::cw_serde;
use cosmwasm_std::Binary;

#[cw_serde]
pub struct AnalyzeResult<T> {
    pub data_for_signing: Option<Binary>,
    pub result: T,
}

impl<T> AnalyzeResult<T> {
    pub fn new(result: T) -> AnalyzeResult<T> {
        AnalyzeResult {
            data_for_signing: None,
            result,
        }
    }

    pub fn new_with_data(data: Binary, result: T) -> AnalyzeResult<T> {
        AnalyzeResult {
            data_for_signing: Some(data),
            result,
        }
    }
}