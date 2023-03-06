//! This module contains built-in implementations of the [`Hasher`]
//!
//! [`Hasher`]: crate::Hasher
mod bitcoin;
mod sha256;

pub use bitcoin::BitcoinHasher as Bitcoin;
pub use sha256::Sha256Algorithm as Sha256;
