//! This module contains built-in implementations of the [`Hasher`]
//!
//! [`Hasher`]: crate::Hasher
mod sha256;
mod bitcoin;

pub use sha256::Sha256Algorithm as Sha256;
pub use bitcoin::BitcoinHasher as Bitcoin;
