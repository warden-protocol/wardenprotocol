use cosmwasm_schema::cw_serde;
use cosmwasm_std::Coin;

use std::fmt;

use cw_utils::NativeBalance;

use crate::Cw20CoinVerified;

#[cw_serde]

pub enum Balance {
    Native(NativeBalance),
    Cw20(Cw20CoinVerified),
}

impl Default for Balance {
    fn default() -> Balance {
        Balance::Native(NativeBalance(vec![]))
    }
}

impl fmt::Display for Balance {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Balance::Native(native) => write!(f, "{}", native),
            Balance::Cw20(cw20) => write!(f, "{}", cw20),
        }?;
        Ok(())
    }
}

impl Balance {
    pub fn is_empty(&self) -> bool {
        match self {
            Balance::Native(balance) => balance.is_empty(),
            Balance::Cw20(coin) => coin.is_empty(),
        }
    }

    /// normalize Wallet
    pub fn normalize(&mut self) {
        match self {
            Balance::Native(balance) => balance.normalize(),
            Balance::Cw20(_) => {}
        }
    }
}

impl From<Vec<Coin>> for Balance {
    fn from(coins: Vec<Coin>) -> Balance {
        Balance::Native(NativeBalance(coins))
    }
}

impl From<Cw20CoinVerified> for Balance {
    fn from(cw20_coin: Cw20CoinVerified) -> Balance {
        Balance::Cw20(cw20_coin)
    }
}
