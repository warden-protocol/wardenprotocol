#[cfg(test)]
mod test {
    use crate::{
        contract::{EncodedPoint, VerifyingKey},
        state::GuardianAddress,
    };

    use super::keys_equal;

    const DECOMPRESSED_KEY: &str = "049678ad0aa2fbd7f212239e21ed1472e84ca558fecf70a54bbf7901d89c306191c52e7f10012960085ecdbbeeb22e63a8e86b58f788990b4db53cdf4e0a55ac1e";
    const COMPRESSED_KEY: &str =
        "029678ad0aa2fbd7f212239e21ed1472e84ca558fecf70a54bbf7901d89c306191";
    const ADDRESS: &str = "54dbb737eac5007103e729e9ab7ce64a6850a310";

    fn test_keys_equal(point: Vec<u8>) {
        let addr = GuardianAddress::from(ADDRESS);

        // get the verifying key for the point
        let encoded_point = EncodedPoint::from_bytes(point).unwrap();
        let verifying_key = VerifyingKey::from_encoded_point(&encoded_point).unwrap();

        // pass into function
        // verifying key should == addr
        let is_equal = keys_equal(&verifying_key, &addr);
        assert!(is_equal)
    }

    #[test]
    fn keys_equal_decompressed_point() {
        let decompressed_point = hex::decode(DECOMPRESSED_KEY).unwrap();
        test_keys_equal(decompressed_point)
    }

    #[test]
    fn keys_equal_compressed_point() {
        let compressed_point = hex::decode(COMPRESSED_KEY).unwrap();
        test_keys_equal(compressed_point)
    }
}
