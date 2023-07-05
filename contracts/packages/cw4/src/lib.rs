/*!
CW4 is a spec for storing group membership, which can be combined
with CW3 multisigs. The purpose is to store a set of members/voters
that can be accessed to determine permissions in another section.

Since this is often deployed as a contract pair, we expect this
contract to often be queried with `QueryRaw` and the internal
layout of some of the data structures becomes part of the public API.
Implementations may add more data structures, but at least
the ones laid out here should be under the specified keys and in the
same format.

In this case, a cw3 contract could *read* an external group contract with
no significant cost besides reading local storage. However, updating
that group contract (if allowed), would be an external message and
will be charged as part of the overhead for each contract.

For more information on this specification, please check out the
[README](https://github.com/CosmWasm/cw-plus/blob/main/packages/cw4/README.md).
*/

mod helpers;
mod hook;
mod msg;
mod query;

pub use crate::helpers::Cw4Contract;
pub use crate::hook::{MemberChangedHookMsg, MemberDiff};
pub use crate::msg::Cw4ExecuteMsg;
pub use crate::query::{
    member_key, AdminResponse, Cw4QueryMsg, HooksResponse, Member, MemberListResponse,
    MemberResponse, TotalWeightResponse, MEMBERS_CHANGELOG, MEMBERS_CHECKPOINTS, MEMBERS_KEY,
    TOTAL_KEY, TOTAL_KEY_CHANGELOG, TOTAL_KEY_CHECKPOINTS,
};
