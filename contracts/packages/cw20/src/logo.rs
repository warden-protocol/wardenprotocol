use cosmwasm_schema::cw_serde;
use cosmwasm_std::Binary;

/// This is used for uploading logo data, or setting it in InstantiateData
#[cw_serde]

pub enum Logo {
    /// A reference to an externally hosted logo. Must be a valid HTTP or HTTPS URL.
    Url(String),
    /// Logo content stored on the blockchain. Enforce maximum size of 5KB on all variants
    Embedded(EmbeddedLogo),
}

/// This is used to store the logo on the blockchain in an accepted format.
/// Enforce maximum size of 5KB on all variants.
#[cw_serde]

pub enum EmbeddedLogo {
    /// Store the Logo as an SVG file. The content must conform to the spec
    /// at https://en.wikipedia.org/wiki/Scalable_Vector_Graphics
    /// (The contract should do some light-weight sanity-check validation)
    Svg(Binary),
    /// Store the Logo as a PNG file. This will likely only support up to 64x64 or so
    /// within the 5KB limit.
    Png(Binary),
}

/// This is used to display logo info, provide a link or inform there is one
/// that can be downloaded from the blockchain itself
#[cw_serde]

pub enum LogoInfo {
    /// A reference to an externally hosted logo. Must be a valid HTTP or HTTPS URL.
    Url(String),
    /// There is an embedded logo on the chain, make another call to download it.
    Embedded,
}
