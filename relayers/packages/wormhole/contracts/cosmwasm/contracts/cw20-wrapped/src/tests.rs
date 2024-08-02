#[cfg(test)]
mod tests {
    use crate::contract::{execute, instantiate};
    use crate::methods::{query_token_info, query_wrapped_asset_info};
    use crate::msg::{ExecuteMsg, HumanAddr, InstantiateMsg, WrappedAssetInfoResponse};

    use cosmwasm_std::testing::{message_info, mock_dependencies, mock_env};
    use cosmwasm_std::{Addr, Deps, DepsMut, Uint128};
    use cw20::TokenInfoResponse;
    use cw20_base::contract::query_balance;

    fn get_balance(deps: Deps, address: HumanAddr) -> Uint128 {
        query_balance(deps, address).unwrap().balance
    }

    fn do_init(mut deps: DepsMut, creator: &Addr) {
        let init_msg = InstantiateMsg {
            name: "Integers".to_string(),
            symbol: "INT".to_string(),
            asset_chain: 1,
            asset_address: vec![1; 32].into(),
            decimals: 10,
            mint: None,
            init_hook: None,
        };
        let env = mock_env();
        let info = message_info(&creator, &[]);
        let res = instantiate(deps.branch(), env, info, init_msg).unwrap();
        assert_eq!(0, res.messages.len());

        assert_eq!(
            query_token_info(deps.as_ref()).unwrap(),
            TokenInfoResponse {
                name: "Integers (Wormhole)".to_string(),
                symbol: "INT".to_string(),
                decimals: 10,
                total_supply: Uint128::from(0u128),
            }
        );

        assert_eq!(
            query_wrapped_asset_info(deps.as_ref()).unwrap(),
            WrappedAssetInfoResponse {
                asset_chain: 1,
                asset_address: vec![1; 32].into(),
                bridge: deps.api.addr_validate(&creator.to_string()).unwrap(),
            }
        );
    }

    fn do_init_and_mint(mut deps: DepsMut, creator: &Addr, mint_to: &Addr, amount: Uint128) {
        do_init(deps.branch(), creator);

        let msg = ExecuteMsg::Mint {
            recipient: mint_to.to_string(),
            amount,
        };

        let env = mock_env();
        let info = message_info(&creator, &[]);
        let res = execute(deps.branch(), env, info, msg).unwrap();
        assert_eq!(0, res.messages.len());
        assert_eq!(get_balance(deps.as_ref(), mint_to.to_string()), amount);

        assert_eq!(
            query_token_info(deps.as_ref()).unwrap(),
            TokenInfoResponse {
                name: "Integers (Wormhole)".to_string(),
                symbol: "INT".to_string(),
                decimals: 10,
                total_supply: amount,
            }
        );
    }

    #[test]
    fn can_mint_by_minter() {
        let mut deps = mock_dependencies();
        let minter = deps.api.addr_make("minter");
        let recipient = deps.api.addr_make("recipient");
        let amount = Uint128::new(222_222_222);
        do_init_and_mint(deps.as_mut(), &minter, &recipient, amount);
    }

    #[test]
    fn others_cannot_mint() {
        let mut deps = mock_dependencies();
        let minter = deps.api.addr_make("minter");
        let recipient = deps.api.addr_make("recipient");
        do_init(deps.as_mut(), &minter);

        let amount = Uint128::new(222_222_222);
        let msg = ExecuteMsg::Mint {
            recipient: recipient.into_string(),
            amount,
        };

        let other_address = deps.api.addr_make("other");
        let env = mock_env();
        let info = message_info(&other_address, &[]);
        let res = execute(deps.as_mut(), env, info, msg);
        assert_eq!(
            format!("{}", res.unwrap_err()),
            format!("{}", crate::error::ContractError::Unauthorized {})
        );
    }

    #[test]
    fn transfer_balance_success() {
        let mut deps = mock_dependencies();
        let minter = deps.api.addr_make("minter");
        let owner = deps.api.addr_make("owner");
        let amount_initial = Uint128::new(222_222_222);
        do_init_and_mint(deps.as_mut(), &minter, &owner, amount_initial);

        // Transfer
        let recipient = deps.api.addr_make("recipient");
        let amount_transfer = Uint128::new(222_222);
        let msg = ExecuteMsg::Transfer {
            recipient: recipient.clone().into_string(),
            amount: amount_transfer,
        };

        let env = mock_env();
        let info = message_info(&owner.clone(), &[]);
        let res = execute(deps.as_mut(), env, info, msg).unwrap();
        assert_eq!(0, res.messages.len());
        assert_eq!(
            get_balance(deps.as_ref(), owner.to_string()),
            Uint128::new(222_000_000)
        );
        assert_eq!(
            get_balance(deps.as_ref(), recipient.into_string()),
            amount_transfer
        );
    }

    #[test]
    fn transfer_balance_not_enough() {
        let mut deps = mock_dependencies();
        let minter = deps.api.addr_make("minter");
        let owner = deps.api.addr_make("owner");
        let amount_initial = Uint128::new(222_221);
        do_init_and_mint(deps.as_mut(), &minter, &owner, amount_initial);

        // Transfer
        let recipient = deps.api.addr_make("recipient");
        let amount_transfer = Uint128::new(222_222);
        let msg = ExecuteMsg::Transfer {
            recipient: recipient.into_string(),
            amount: amount_transfer,
        };

        let env = mock_env();
        let info = message_info(&owner, &[]);
        let _ = execute(deps.as_mut(), env, info, msg).unwrap_err(); // Will panic if no error
    }
}
