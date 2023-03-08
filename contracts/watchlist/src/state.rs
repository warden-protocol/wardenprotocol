use cw_storage_plus::Item;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct State {
    pub watchlist: HashMap<String, u8>,
    pub events: HashMap<Vec<u8>, (u8, bool)>,
}

pub const STATE: Item<State> = Item::new("state");
