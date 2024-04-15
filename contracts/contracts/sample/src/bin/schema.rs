use cosmwasm_schema::write_api;

use sample::msg::{ExecuteMsg};

fn main() {
    write_api! {
        execute: ExecuteMsg,
    }
}
