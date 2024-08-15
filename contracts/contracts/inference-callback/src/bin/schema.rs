use cosmwasm_schema::write_api;

use inference_callback::msg::{ExecuteMsg, QueryMsg};

fn main() {
    write_api! {
        execute: ExecuteMsg,
        query: QueryMsg
    }
}
