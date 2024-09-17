use cosmwasm_schema::write_api;
use gmp_with_token::msg::ExecuteMsg;

fn main() {
    write_api! {
        execute: ExecuteMsg,
    }
}
