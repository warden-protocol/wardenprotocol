use std::env::current_dir;
use std::fs::create_dir_all;

use cosmwasm_schema::{export_schema_with_title, remove_schemas, schema_for};

use bindings::{WardenProtocolMsg, WardenProtocolQuery, QueryKeysResponse};

fn main() {
    let mut out_dir = current_dir().unwrap();
    out_dir.push("schema");
    create_dir_all(&out_dir).unwrap();
    remove_schemas(&out_dir).unwrap();

    export_schema_with_title(
        &schema_for!(WardenProtocolMsg),
        &out_dir,
        "WardenProtocolMsg",
    );
    export_schema_with_title(
        &schema_for!(WardenProtocolQuery),
        &out_dir,
        "WardenProtocolQuery",
    );
    export_schema_with_title(
        &schema_for!(QueryKeysResponse),
        &out_dir,
        "QueryKeysResponse",
    );
}
