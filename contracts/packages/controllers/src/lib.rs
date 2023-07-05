/*!
This is a collection of "controllers" that we end up reimplementing in
many contracts. I use the word "controller" similar to the MVC framework
style, where it is an element that encapsulated business logic and data access.
We can also directly handle some `ExecuteMsg` and `QueryMsg` variants by
adding a sub-router to these controllers.

This is the beginning of an experiment in code composition, and how best to
reuse code among multiple contracts. We have already seen some "extend" and
existing base contract (like `cw20-staking` extends `cw20-base`), but this
goes for smaller scale units.

Supported controllers:

* Admin (`UpdateAdmin` handler, `Admin` querier, set_admin and is_admin methods)
*/
mod admin;
mod claim;
mod hooks;

pub use admin::{Admin, AdminError, AdminResponse};
pub use claim::{Claim, Claims, ClaimsResponse};
pub use hooks::{HookError, Hooks, HooksResponse};
