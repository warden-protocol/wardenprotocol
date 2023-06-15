use cosmwasm_schema::cw_serde;
use cw_utils::{must_pay, PaymentError};
use thiserror::Error;

use cosmwasm_std::{
    to_binary, Addr, BankMsg, Coin, CosmosMsg, Deps, MessageInfo, StdResult, Uint128, WasmMsg,
};
use cw20::{Denom, UncheckedDenom};

/// Information about the deposit required to create a proposal.
#[cw_serde]
pub struct DepositInfo {
    /// The number tokens required for payment.
    pub amount: Uint128,
    /// The denom of the deposit payment.
    pub denom: Denom,
    /// Should failed proposals have their deposits refunded?
    pub refund_failed_proposals: bool,
}

/// Information about the deposit required to create a proposal. For
/// use in messages. To validate, transform into `DepositInfo` via
/// `into_checked()`.
#[cw_serde]
pub struct UncheckedDepositInfo {
    /// The number tokens required for payment.
    pub amount: Uint128,
    /// The denom of the deposit payment.
    pub denom: UncheckedDenom,
    /// Should failed proposals have their deposits refunded?
    pub refund_failed_proposals: bool,
}

#[derive(Error, Debug, PartialEq, Eq)]
pub enum DepositError {
    #[error("Invalid zero deposit. Set the deposit to None to have no deposit.")]
    ZeroDeposit {},

    #[error("Invalid cw20")]
    InvalidCw20 {},

    #[error("{0}")]
    Payment(#[from] PaymentError),

    #[error("Invalid native deposit amount")]
    InvalidDeposit {},
}

impl UncheckedDepositInfo {
    /// Checks deposit info.
    pub fn into_checked(self, deps: Deps) -> Result<DepositInfo, DepositError> {
        if self.amount.is_zero() {
            Err(DepositError::ZeroDeposit {})
        } else {
            Ok(DepositInfo {
                amount: self.amount,
                denom: self
                    .denom
                    .into_checked(deps)
                    .map_err(|_| DepositError::InvalidCw20 {})?,
                refund_failed_proposals: self.refund_failed_proposals,
            })
        }
    }
}

impl DepositInfo {
    pub fn check_native_deposit_paid(&self, info: &MessageInfo) -> Result<(), DepositError> {
        if let Self {
            amount,
            denom: Denom::Native(denom),
            ..
        } = self
        {
            let paid = must_pay(info, denom)?;
            if paid != *amount {
                Err(DepositError::InvalidDeposit {})
            } else {
                Ok(())
            }
        } else {
            Ok(())
        }
    }

    pub fn get_take_deposit_messages(
        &self,
        depositor: &Addr,
        contract: &Addr,
    ) -> StdResult<Vec<CosmosMsg>> {
        let take_deposit_msg: Vec<CosmosMsg> = if let DepositInfo {
            amount,
            denom: Denom::Cw20(address),
            ..
        } = self
        {
            // into_checked() makes sure this isn't the case, but just for
            // posterity.
            if amount.is_zero() {
                vec![]
            } else {
                vec![WasmMsg::Execute {
                    contract_addr: address.to_string(),
                    funds: vec![],
                    msg: to_binary(&cw20::Cw20ExecuteMsg::TransferFrom {
                        owner: depositor.to_string(),
                        recipient: contract.to_string(),
                        amount: *amount,
                    })?,
                }
                .into()]
            }
        } else {
            vec![]
        };
        Ok(take_deposit_msg)
    }

    pub fn get_return_deposit_message(&self, depositor: &Addr) -> StdResult<CosmosMsg> {
        let message = match &self.denom {
            Denom::Native(denom) => BankMsg::Send {
                to_address: depositor.to_string(),
                amount: vec![Coin {
                    amount: self.amount,
                    denom: denom.to_string(),
                }],
            }
            .into(),
            Denom::Cw20(address) => WasmMsg::Execute {
                contract_addr: address.to_string(),
                msg: to_binary(&cw20::Cw20ExecuteMsg::Transfer {
                    recipient: depositor.to_string(),
                    amount: self.amount,
                })?,
                funds: vec![],
            }
            .into(),
        };
        Ok(message)
    }
}
