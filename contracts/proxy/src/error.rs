use std::string::FromUtf8Error;
use thiserror::Error;

use cosmwasm_std::StdError;
use cw_controllers::AdminError;
use cw_utils::PaymentError;

/// Never is a placeholder to ensure we don't return any errors
#[derive(Error, Debug)]
pub enum Never {}

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("{0}")]
    Payment(#[from] PaymentError),

    #[error("{0}")]
    Admin(#[from] AdminError),

    #[error("Only the admin can call this function")]
    NotAdmin {},
}

impl From<FromUtf8Error> for ContractError {
    fn from(_: FromUtf8Error) -> Self {
        ContractError::Std(StdError::invalid_utf8("parsing denom key"))
    }
}
