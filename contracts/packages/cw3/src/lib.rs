/*!
CW3 is a specification for voting contracts based on CosmWasm.
It is an extension of CW1 (which served as an immediate 1 of N multisig).
In this case, no key can immediately execute, but only propose
a set of messages for execution. The proposal, subsequent
approvals, and signature aggregation all happen on chain.

For more information on this specification, please check out the
[README](https://github.com/CosmWasm/cw-plus/blob/main/packages/cw3/README.md).
*/

// mod helpers;
mod deposit;
mod helpers;
mod msg;
mod proposal;
mod query;

pub use crate::deposit::{DepositError, DepositInfo, UncheckedDepositInfo};
pub use crate::helpers::Cw3Contract;
pub use crate::msg::{Cw3ExecuteMsg, Vote};
pub use crate::proposal::{Ballot, Proposal, Votes};
pub use crate::query::{
    Cw3QueryMsg, ProposalListResponse, ProposalResponse, Status, VoteInfo, VoteListResponse,
    VoteResponse, VoterDetail, VoterListResponse, VoterResponse,
};
