use std::env::current_dir;
use std::fs::create_dir_all;

use cosmwasm_schema::{export_schema, export_schema_with_title, remove_schemas, schema_for};

use cw1::{CanExecuteResponse, Cw1ExecuteMsg, Cw1QueryMsg};

fn main() {
    let mut out_dir = current_dir().unwrap();
    out_dir.push("schema");
    create_dir_all(&out_dir).unwrap();
    remove_schemas(&out_dir).unwrap();

    export_schema_with_title(&schema_for!(Cw1ExecuteMsg), &out_dir, "ExecuteMsg");
    export_schema_with_title(&schema_for!(Cw1QueryMsg), &out_dir, "QueryMsg");
    export_schema(&schema_for!(CanExecuteResponse), &out_dir);
}
