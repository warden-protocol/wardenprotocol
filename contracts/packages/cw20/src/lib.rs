/*!
CW20 is a specification for fungible tokens based on CosmWasm.
The name and design is loosely based on Ethereum's ERC20 standard,
but many changes have been made. The types in here can be imported by
contracts that wish to implement this spec, or by contracts that call
to any standard cw20 contract.

For more information on this specification, please check out the
[README](https://github.com/CosmWasm/cw-plus/blob/main/packages/cw20/README.md).
*/

pub use cw_utils::Expiration;

pub use crate::balance::Balance;
pub use crate::coin::{Cw20Coin, Cw20CoinVerified};
pub use crate::denom::{Denom, UncheckedDenom};
pub use crate::helpers::Cw20Contract;
pub use crate::logo::{EmbeddedLogo, Logo, LogoInfo};
pub use crate::msg::Cw20ExecuteMsg;
pub use crate::query::{
    AllAccountsResponse, AllAllowancesResponse, AllSpenderAllowancesResponse, AllowanceInfo,
    AllowanceResponse, BalanceResponse, Cw20QueryMsg, DownloadLogoResponse, MarketingInfoResponse,
    MinterResponse, SpenderAllowanceInfo, TokenInfoResponse,
};
pub use crate::receiver::Cw20ReceiveMsg;

mod balance;
mod coin;
mod denom;
mod helpers;
mod logo;
mod msg;
mod query;
mod receiver;

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        // test me
    }
}
