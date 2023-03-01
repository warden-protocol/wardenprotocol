use crate::prelude::*;
use core::fmt::{Debug, Display, Formatter};

/// A list specifying general categories of tree traversals/parsing errors.
///
/// This list is intended to grow over time and it is not recommended to
/// exhaustively match against it.
///
/// It is used with the [`Error`] type.
///
/// [`Error`]: crate::Error
#[derive(Clone, Copy, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
#[non_exhaustive]
pub enum ErrorKind {
    /// Serialized to bytes merkle proof can't be parsed because it can not be divided
    SerializedProofSizeIsIncorrect,
    /// Not enough helper nodes to calculate the root was passed to the [`PartialTree`].
    ///
    /// [`PartialTree`]: crate::PartialTree
    NotEnoughHelperNodes,
    HashConversionError,
    NotEnoughHashesToCalculateRoot,
    LeavesIndicesCountMismatch,
}

/// The error type for tree traversals/parsing errors of the [`MerkleProof`] and [`PartialTree`].
///
/// Errors mostly originate from the data being insufficient to traverse the partial tree
///
/// [`MerkleProof`]: crate::MerkleProof
/// [`PartialTree`]: crate::PartialTree
#[derive(Clone, Debug)]
pub struct Error {
    kind: ErrorKind,
    message: String,
}

impl Error {
    pub fn new(kind: ErrorKind, message: String) -> Self {
        Self { kind, message }
    }

    pub fn not_enough_helper_nodes() -> Self {
        Self::new(
            ErrorKind::NotEnoughHelperNodes,
            String::from("not enough hashes to reconstruct the root"),
        )
    }

    pub fn wrong_proof_size(proof_len: usize, hash_size: usize) -> Self {
        Self::new(
            ErrorKind::SerializedProofSizeIsIncorrect,
            format!(
                "proof of size {} bytes can not be divided into chunks of {} bytes",
                proof_len, hash_size,
            ),
        )
    }

    pub fn vec_to_hash_conversion_error() -> Self {
        Self::new(
            ErrorKind::HashConversionError,
            "couldn't convert proof hash data into Hasher::Hash".to_string(),
        )
    }

    pub fn not_enough_hashes_to_calculate_root() -> Self {
        Self::new(
            ErrorKind::NotEnoughHashesToCalculateRoot,
            "proof doesn't contain enough data to extract the root".to_string(),
        )
    }

    pub fn leaves_indices_count_mismatch(indices_len: usize, leaves_len: usize) -> Self {
        Self::new(
            ErrorKind::LeavesIndicesCountMismatch,
            format!(
                "leaves indices count doesn't match leaves count: {} and {}",
                indices_len, leaves_len
            ),
        )
    }

    pub fn kind(&self) -> ErrorKind {
        self.kind
    }

    pub fn message(&self) -> &str {
        &self.message
    }
}

#[cfg(feature = "std")]
impl std::error::Error for Error {}

impl Display for Error {
    fn fmt(&self, f: &mut Formatter<'_>) -> core::fmt::Result {
        write!(f, "{}", self.message)
    }
}
