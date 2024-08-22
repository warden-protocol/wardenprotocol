use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized")]
    Unauthorized {},

    #[error("ReplyFailed")]
    ReplyFailed { message: String },

    #[error("PostMessageFailed")]
    PostMessageFailed { message: String },

    #[error("ReceiveMessageFailed")]
    ReceiveMessageFailed { message: String },

    #[error("SetChainEmittorFailed")]
    SetChainEmittorFailed { message: String },

    #[error("HashDeriviationFailed")]
    HashDeriviationFailed { message: String },

    #[error("LifecycleCompleteFailed")]
    LifecycleCompleteFailed { message: String },
}
