mod common;

pub mod root {
    use crate::common;
    use rayon::prelude::*;
    use rs_merkle::{algorithms::Sha256, Error, Hasher, MerkleTree};
    use std::time::Instant;

    #[test]
    pub fn should_return_a_correct_root() -> Result<(), Error> {
        let test_data = common::setup();
        let expected_root = test_data.expected_root_hex.clone();
        let leaf_hashes = &test_data.leaf_hashes;
        let indices_to_prove = vec![3, 4];

        let leaves_to_prove: Vec<[u8; 32]> = indices_to_prove
            .iter()
            .map(|i| leaf_hashes.get(*i).unwrap().clone())
            .collect();

        let merkle_tree = MerkleTree::<Sha256>::from_leaves(&test_data.leaf_hashes);
        let proof = merkle_tree.proof(&indices_to_prove);
        let extracted_root = proof.root_hex(
            &indices_to_prove,
            &leaves_to_prove,
            test_data.leaf_values.len(),
        )?;

        assert_eq!(extracted_root, expected_root.to_string());

        let test_preparation_started = Instant::now();
        let test_cases = common::setup_proof_test_cases();
        println!(
            "Preparing test cases took {:.2}s",
            test_preparation_started.elapsed().as_secs_f32()
        );
        let test_cases_count = test_cases
            .iter()
            .fold(0, |acc, case| acc + case.cases.len());

        // Roots:
        // 1: ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb
        // 2: e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a
        // 3: 7075152d03a5cd92104887b476862778ec0c87be5c2fa1c0a90f87c49fad6eff
        // 4: 14ede5e8e97ad9372327728f5099b95604a39593cac3bd38a343ad76205213e7
        // 5: d71f8983ad4ee170f8129f1ebcdd7440be7798d8e1c80420bf11f1eced610dba
        // 6: 1f7379539707bcaea00564168d1d4d626b09b73f8a2a365234c62d763f854da2
        // 7 (g): e2a80e0e872a6c6eaed37b4c1f220e1935004805585b5f99617e48e9c8fe4034
        // 8 (h): bd7c8a900be9b67ba7df5c78a652a8474aedd78adb5083e80e49d9479138a23f
        // 9 (k): 09b6890b23e32e607f0e5f670ab224e36af8f6599cbe88b468f4b0f761802dd6
        // 10: acd9c757c94bde41f98946fe6f5ce5ae567b0f103bd9eeb37421c760c592db1e
        // 11: 5232b16d412d5902d87a153a3551a22094a634c67695d7f9e215be48b15aa9a3
        // 12: f64bc461b545975dfe84768c7ebd1d09c536b680819239cb78469b5d3bb182d8
        // 13: a848a99df01e9c1b938403a30226e770f88d37c4d43e8347356ed6887f7b30a3
        // 14: 4e4afdcec057392d1a735b39f41d4f3ef1cab5637c91f5443996079b3c763538
        // 15: a2e073232cb6285fa5f04957dfe6a3238a9dce003908932231174884e5861767

        let test_run_started = Instant::now();
        test_cases.par_iter().for_each(|test_case| {
            let merkle_tree = &test_case.merkle_tree;
            let root = merkle_tree.root();

            test_case.cases.par_iter().for_each(|case| {
                let proof = merkle_tree.proof(&case.leaf_indices_to_prove);
                let extracted_root = proof.root(
                    &case.leaf_indices_to_prove,
                    &case.leaf_hashes_to_prove,
                    merkle_tree.leaves_len(),
                );

                assert_eq!(extracted_root.ok(), root)
            });
        });

        println!(
            "{} test cases executed in {:.2}s",
            test_cases_count,
            test_run_started.elapsed().as_secs_f32()
        );

        Ok(())
    }
}

pub mod to_bytes {
    use crate::common;
    use rs_merkle::{algorithms::Sha256, MerkleTree};

    #[test]
    pub fn should_correctly_serialize_to_bytes() {
        let expected_bytes: Vec<u8> = vec![
            46, 125, 44, 3, 169, 80, 122, 226, 101, 236, 245, 181, 53, 104, 133, 165, 51, 147, 162,
            2, 157, 36, 19, 148, 153, 114, 101, 161, 162, 90, 239, 198, 37, 47, 16, 200, 54, 16,
            235, 202, 26, 5, 156, 11, 174, 130, 85, 235, 162, 249, 91, 228, 209, 215, 188, 250,
            137, 215, 36, 138, 130, 217, 241, 17, 229, 160, 31, 238, 20, 224, 237, 92, 72, 113, 79,
            34, 24, 15, 37, 173, 131, 101, 181, 63, 151, 121, 247, 157, 196, 163, 215, 233, 57, 99,
            249, 74,
        ];

        let test_data = common::setup();
        let indices_to_prove = vec![3, 4];
        let merkle_tree = MerkleTree::<Sha256>::from_leaves(&test_data.leaf_hashes);
        let proof = merkle_tree.proof(&indices_to_prove);

        let bytes = proof.to_bytes();

        assert_eq!(bytes, expected_bytes);
    }
}

pub mod from_bytes {
    use crate::common;
    use rs_merkle::{algorithms::Sha256, Error, MerkleProof};

    #[test]
    pub fn should_return_result_with_proof() -> Result<(), Error> {
        let expected_proof_hashes = [
            "2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6",
            "252f10c83610ebca1a059c0bae8255eba2f95be4d1d7bcfa89d7248a82d9f111",
            "e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a",
        ];

        let bytes: Vec<u8> = vec![
            46, 125, 44, 3, 169, 80, 122, 226, 101, 236, 245, 181, 53, 104, 133, 165, 51, 147, 162,
            2, 157, 36, 19, 148, 153, 114, 101, 161, 162, 90, 239, 198, 37, 47, 16, 200, 54, 16,
            235, 202, 26, 5, 156, 11, 174, 130, 85, 235, 162, 249, 91, 228, 209, 215, 188, 250,
            137, 215, 36, 138, 130, 217, 241, 17, 229, 160, 31, 238, 20, 224, 237, 92, 72, 113, 79,
            34, 24, 15, 37, 173, 131, 101, 181, 63, 151, 121, 247, 157, 196, 163, 215, 233, 57, 99,
            249, 74,
        ];

        let proof = MerkleProof::<Sha256>::from_bytes(&bytes)?;
        let hex_hashes = proof.proof_hashes_hex();

        assert_eq!(hex_hashes, expected_proof_hashes);

        Ok(())
    }

    #[test]
    pub fn should_return_error_when_proof_can_not_be_parsed() {
        let bytes: Vec<u8> = vec![
            46, 125, 44, 3, 169, 80, 122, 226, 101, 236, 245, 181, 53, 104, 133, 165, 51, 147, 162,
            2, 157, 36, 19, 148, 153, 114, 101, 161, 162, 90, 239, 198, 37, 47, 16, 200, 54, 16,
            235, 202, 26, 5, 156, 11, 174, 130, 85, 235, 162, 249, 91, 228, 209, 215, 188, 250,
            137, 215, 36, 138, 130, 217, 241, 17, 229, 160, 31, 238, 20, 224, 237, 92, 72, 113, 79,
            34, 24, 15, 37, 173, 131, 101, 181, 63,
        ];

        let err = MerkleProof::<Sha256>::from_bytes(&bytes).err().unwrap();

        assert_eq!(
            err.message(),
            "proof of size 84 bytes can not be divided into chunks of 32 bytes"
        );
    }
}
