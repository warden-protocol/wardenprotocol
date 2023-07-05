use schemars::JsonSchema;
use std::fmt;
use thiserror::Error;

use cosmwasm_schema::cw_serde;
use cosmwasm_std::{
    attr, Addr, CustomQuery, Deps, DepsMut, MessageInfo, Response, StdError, StdResult,
};
use cw_storage_plus::Item;

// TODO: should the return values end up in utils, so eg. cw4 can import them as well as this module?
/// Returned from Admin.query_admin()
#[cw_serde]
pub struct AdminResponse {
    pub admin: Option<String>,
}

/// Errors returned from Admin
#[derive(Error, Debug, PartialEq)]
pub enum AdminError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Caller is not admin")]
    NotAdmin {},
}

// state/logic
pub struct Admin<'a>(Item<'a, Option<Addr>>);

// this is the core business logic we expose
impl<'a> Admin<'a> {
    pub const fn new(namespace: &'a str) -> Self {
        Admin(Item::new(namespace))
    }

    pub fn set<Q: CustomQuery>(&self, deps: DepsMut<Q>, admin: Option<Addr>) -> StdResult<()> {
        self.0.save(deps.storage, &admin)
    }

    pub fn get<Q: CustomQuery>(&self, deps: Deps<Q>) -> StdResult<Option<Addr>> {
        self.0.load(deps.storage)
    }

    /// Returns Ok(true) if this is an admin, Ok(false) if not and an Error if
    /// we hit an error with Api or Storage usage
    pub fn is_admin<Q: CustomQuery>(&self, deps: Deps<Q>, caller: &Addr) -> StdResult<bool> {
        match self.0.load(deps.storage)? {
            Some(owner) => Ok(caller == &owner),
            None => Ok(false),
        }
    }

    /// Like is_admin but returns AdminError::NotAdmin if not admin.
    /// Helper for a nice one-line auth check.
    pub fn assert_admin<Q: CustomQuery>(
        &self,
        deps: Deps<Q>,
        caller: &Addr,
    ) -> Result<(), AdminError> {
        if !self.is_admin(deps, caller)? {
            Err(AdminError::NotAdmin {})
        } else {
            Ok(())
        }
    }

    pub fn execute_update_admin<C, Q: CustomQuery>(
        &self,
        deps: DepsMut<Q>,
        info: MessageInfo,
        new_admin: Option<Addr>,
    ) -> Result<Response<C>, AdminError>
    where
        C: Clone + fmt::Debug + PartialEq + JsonSchema,
    {
        self.assert_admin(deps.as_ref(), &info.sender)?;

        let admin_str = match new_admin.as_ref() {
            Some(admin) => admin.to_string(),
            None => "None".to_string(),
        };
        let attributes = vec![
            attr("action", "update_admin"),
            attr("admin", admin_str),
            attr("sender", info.sender),
        ];

        self.set(deps, new_admin)?;

        Ok(Response::new().add_attributes(attributes))
    }

    pub fn query_admin<Q: CustomQuery>(&self, deps: Deps<Q>) -> StdResult<AdminResponse> {
        let admin = self.get(deps)?.map(String::from);
        Ok(AdminResponse { admin })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    use cosmwasm_std::testing::{mock_dependencies, mock_info};
    use cosmwasm_std::Empty;

    #[test]
    fn set_and_get_admin() {
        let mut deps = mock_dependencies();
        let control = Admin::new("foo");

        // initialize and check
        let admin = Some(Addr::unchecked("admin"));
        control.set(deps.as_mut(), admin.clone()).unwrap();
        let got = control.get(deps.as_ref()).unwrap();
        assert_eq!(admin, got);

        // clear it and check
        control.set(deps.as_mut(), None).unwrap();
        let got = control.get(deps.as_ref()).unwrap();
        assert_eq!(None, got);
    }

    #[test]
    fn admin_checks() {
        let mut deps = mock_dependencies();

        let control = Admin::new("foo");
        let owner = Addr::unchecked("big boss");
        let imposter = Addr::unchecked("imposter");

        // ensure checks proper with owner set
        control.set(deps.as_mut(), Some(owner.clone())).unwrap();
        assert!(control.is_admin(deps.as_ref(), &owner).unwrap());
        assert!(!(control.is_admin(deps.as_ref(), &imposter).unwrap()));
        control.assert_admin(deps.as_ref(), &owner).unwrap();
        let err = control.assert_admin(deps.as_ref(), &imposter).unwrap_err();
        assert_eq!(AdminError::NotAdmin {}, err);

        // ensure checks proper with owner None
        control.set(deps.as_mut(), None).unwrap();
        assert!(!(control.is_admin(deps.as_ref(), &owner).unwrap()));
        assert!(!(control.is_admin(deps.as_ref(), &imposter).unwrap()));
        let err = control.assert_admin(deps.as_ref(), &owner).unwrap_err();
        assert_eq!(AdminError::NotAdmin {}, err);
        let err = control.assert_admin(deps.as_ref(), &imposter).unwrap_err();
        assert_eq!(AdminError::NotAdmin {}, err);
    }

    #[test]
    fn test_execute_query() {
        let mut deps = mock_dependencies();

        // initial setup
        let control = Admin::new("foo");
        let owner = Addr::unchecked("big boss");
        let imposter = Addr::unchecked("imposter");
        let friend = Addr::unchecked("buddy");
        control.set(deps.as_mut(), Some(owner.clone())).unwrap();

        // query shows results
        let res = control.query_admin(deps.as_ref()).unwrap();
        assert_eq!(Some(owner.to_string()), res.admin);

        // imposter cannot update
        let info = mock_info(imposter.as_ref(), &[]);
        let new_admin = Some(friend.clone());
        let err = control
            .execute_update_admin::<Empty, Empty>(deps.as_mut(), info, new_admin.clone())
            .unwrap_err();
        assert_eq!(AdminError::NotAdmin {}, err);

        // owner can update
        let info = mock_info(owner.as_ref(), &[]);
        let res = control
            .execute_update_admin::<Empty, Empty>(deps.as_mut(), info, new_admin)
            .unwrap();
        assert_eq!(0, res.messages.len());

        // query shows results
        let res = control.query_admin(deps.as_ref()).unwrap();
        assert_eq!(Some(friend.to_string()), res.admin);
    }
}
