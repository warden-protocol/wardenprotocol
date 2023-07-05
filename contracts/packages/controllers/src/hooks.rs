use schemars::JsonSchema;
use std::fmt;
use thiserror::Error;

use cosmwasm_schema::cw_serde;
use cosmwasm_std::{
    attr, Addr, CustomQuery, Deps, DepsMut, MessageInfo, Response, StdError, StdResult, Storage,
    SubMsg,
};
use cw_storage_plus::Item;

use crate::admin::{Admin, AdminError};

// this is copied from cw4
// TODO: pull into utils as common dep
#[cw_serde]
pub struct HooksResponse {
    pub hooks: Vec<String>,
}

#[derive(Error, Debug, PartialEq)]
pub enum HookError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("{0}")]
    Admin(#[from] AdminError),

    #[error("Given address already registered as a hook")]
    HookAlreadyRegistered {},

    #[error("Given address not registered as a hook")]
    HookNotRegistered {},
}

// store all hook addresses in one item. We cannot have many of them before the contract becomes unusable anyway.
pub struct Hooks<'a>(Item<'a, Vec<Addr>>);

impl<'a> Hooks<'a> {
    pub const fn new(storage_key: &'a str) -> Self {
        Hooks(Item::new(storage_key))
    }

    pub fn add_hook(&self, storage: &mut dyn Storage, addr: Addr) -> Result<(), HookError> {
        let mut hooks = self.0.may_load(storage)?.unwrap_or_default();
        if !hooks.iter().any(|h| h == &addr) {
            hooks.push(addr);
        } else {
            return Err(HookError::HookAlreadyRegistered {});
        }
        Ok(self.0.save(storage, &hooks)?)
    }

    pub fn remove_hook(&self, storage: &mut dyn Storage, addr: Addr) -> Result<(), HookError> {
        let mut hooks = self.0.load(storage)?;
        if let Some(p) = hooks.iter().position(|x| x == &addr) {
            hooks.remove(p);
        } else {
            return Err(HookError::HookNotRegistered {});
        }
        Ok(self.0.save(storage, &hooks)?)
    }

    pub fn prepare_hooks<F: Fn(Addr) -> StdResult<SubMsg>>(
        &self,
        storage: &dyn Storage,
        prep: F,
    ) -> StdResult<Vec<SubMsg>> {
        self.0
            .may_load(storage)?
            .unwrap_or_default()
            .into_iter()
            .map(prep)
            .collect()
    }

    pub fn execute_add_hook<C, Q: CustomQuery>(
        &self,
        admin: &Admin,
        deps: DepsMut<Q>,
        info: MessageInfo,
        addr: Addr,
    ) -> Result<Response<C>, HookError>
    where
        C: Clone + fmt::Debug + PartialEq + JsonSchema,
    {
        admin.assert_admin(deps.as_ref(), &info.sender)?;
        self.add_hook(deps.storage, addr.clone())?;

        let attributes = vec![
            attr("action", "add_hook"),
            attr("hook", addr),
            attr("sender", info.sender),
        ];
        Ok(Response::new().add_attributes(attributes))
    }

    pub fn execute_remove_hook<C, Q: CustomQuery>(
        &self,
        admin: &Admin,
        deps: DepsMut<Q>,
        info: MessageInfo,
        addr: Addr,
    ) -> Result<Response<C>, HookError>
    where
        C: Clone + fmt::Debug + PartialEq + JsonSchema,
    {
        admin.assert_admin(deps.as_ref(), &info.sender)?;
        self.remove_hook(deps.storage, addr.clone())?;

        let attributes = vec![
            attr("action", "remove_hook"),
            attr("hook", addr),
            attr("sender", info.sender),
        ];
        Ok(Response::new().add_attributes(attributes))
    }

    pub fn query_hooks<Q: CustomQuery>(&self, deps: Deps<Q>) -> StdResult<HooksResponse> {
        let hooks = self.0.may_load(deps.storage)?.unwrap_or_default();
        let hooks = hooks.into_iter().map(String::from).collect();
        Ok(HooksResponse { hooks })
    }

    // Return true if hook is in hooks
    pub fn query_hook<Q: CustomQuery>(&self, deps: Deps<Q>, hook: String) -> StdResult<bool> {
        Ok(self.query_hooks(deps)?.hooks.into_iter().any(|h| h == hook))
    }
}

// TODO: add test coverage
