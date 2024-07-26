use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized")]
    Unauthorized {},

    #[error("TransferWithPayloadError")]
    TransferWithPayloadError { message: String },

    #[error("TokenError")]
    CoinError { message: String },

    #[error("CodecError")]
    CodecError { message: String },
}
