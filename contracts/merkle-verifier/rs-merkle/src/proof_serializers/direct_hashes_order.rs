use crate::{prelude::*, Error, Hasher, MerkleProof, MerkleProofSerializer};
use core::convert::TryFrom;

/// Serializes proof data to bytes with a direct hash order - hashes are concatenated from
/// left to right, bottom to top.
pub struct DirectHashesOrder {}

impl MerkleProofSerializer for DirectHashesOrder {
    fn serialize<T: Hasher>(proof: &MerkleProof<T>) -> Vec<u8> {
        let mut vectors: Vec<Vec<u8>> = proof
            .proof_hashes()
            .iter()
            .cloned()
            .map(|hash| hash.into())
            .collect();
        vectors.drain(..).flatten().collect()
    }

    fn deserialize<T: Hasher>(bytes: &[u8]) -> Result<MerkleProof<T>, Error> {
        let hash_size = T::hash_size();

        if bytes.len() % hash_size != 0 {
            return Err(Error::wrong_proof_size(bytes.len(), hash_size));
        }

        let hashes_count = bytes.len() / hash_size;
        let mut proof_hashes_slices = Vec::<T::Hash>::with_capacity(hashes_count);

        for i in 0..hashes_count {
            let slice_start = i * hash_size;
            let slice_end = (i + 1) * hash_size;
            let slice = bytes
                .get(slice_start..slice_end)
                .ok_or_else(Error::vec_to_hash_conversion_error)?;
            let vec =
                Vec::<u8>::try_from(slice).map_err(|_| Error::vec_to_hash_conversion_error())?;
            match T::Hash::try_from(vec) {
                Ok(val) => proof_hashes_slices.push(val),
                Err(_) => return Err(Error::vec_to_hash_conversion_error()),
            }
        }

        Ok(MerkleProof::new(proof_hashes_slices))
    }
}
