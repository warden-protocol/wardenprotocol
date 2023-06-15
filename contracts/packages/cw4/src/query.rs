use cosmwasm_schema::cw_serde;

#[cw_serde]

pub enum Cw4QueryMsg {
    /// Return AdminResponse
    Admin {},
    /// Return TotalWeightResponse
    TotalWeight { at_height: Option<u64> },
    /// Returns MembersListResponse
    ListMembers {
        start_after: Option<String>,
        limit: Option<u32>,
    },
    /// Returns MemberResponse
    Member {
        addr: String,
        at_height: Option<u64>,
    },
    /// Shows all registered hooks. Returns HooksResponse.
    Hooks {},
}

#[cw_serde]
pub struct AdminResponse {
    pub admin: Option<String>,
}

/// A group member has a weight associated with them.
/// This may all be equal, or may have meaning in the app that
/// makes use of the group (eg. voting power)
#[cw_serde]
pub struct Member {
    pub addr: String,
    pub weight: u64,
}

#[cw_serde]
pub struct MemberListResponse {
    pub members: Vec<Member>,
}

#[cw_serde]
pub struct MemberResponse {
    pub weight: Option<u64>,
}

#[cw_serde]
pub struct TotalWeightResponse {
    pub weight: u64,
}

#[cw_serde]
pub struct HooksResponse {
    pub hooks: Vec<String>,
}

/// TOTAL_KEY is meant for raw queries
pub const TOTAL_KEY: &str = "total";
pub const TOTAL_KEY_CHECKPOINTS: &str = "total__checkpoints";
pub const TOTAL_KEY_CHANGELOG: &str = "total__changelog";
pub const MEMBERS_KEY: &str = "members";
pub const MEMBERS_CHECKPOINTS: &str = "members__checkpoints";
pub const MEMBERS_CHANGELOG: &str = "members__changelog";

/// member_key is meant for raw queries for one member, given address
pub fn member_key(address: &str) -> Vec<u8> {
    // FIXME: Inlined here to avoid storage-plus import
    let mut key = [b"\x00", &[MEMBERS_KEY.len() as u8], MEMBERS_KEY.as_bytes()].concat();
    key.extend_from_slice(address.as_bytes());
    key
}
