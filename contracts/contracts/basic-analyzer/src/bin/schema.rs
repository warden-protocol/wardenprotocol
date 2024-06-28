use cosmwasm_schema::write_api;

use basic_analyzer::msg::{ExecuteMsg, QueryMsg};

fn main() {
    write_api! {
        execute: ExecuteMsg,
        query: QueryMsg
    }
}
