use cosmwasm_std::CanonicalAddr;

pub trait ByteUtils {
    fn get_u8(&self, index: usize) -> u8;
    fn get_u16(&self, index: usize) -> u16;
    fn get_u32(&self, index: usize) -> u32;
    fn get_u64(&self, index: usize) -> u64;

    fn get_u128_be(&self, index: usize) -> u128;
    /// High 128 then low 128
    fn get_u256(&self, index: usize) -> (u128, u128);
    fn get_address(&self, index: usize) -> CanonicalAddr;
    fn get_bytes32(&self, index: usize) -> &[u8];
    fn get_bytes(&self, index: usize, bytes: usize) -> &[u8];
    fn get_const_bytes<const N: usize>(&self, index: usize) -> [u8; N];
}

impl ByteUtils for &[u8] {
    fn get_u8(&self, index: usize) -> u8 {
        self[index]
    }
    fn get_u16(&self, index: usize) -> u16 {
        let mut bytes: [u8; 16 / 8] = [0; 16 / 8];
        bytes.copy_from_slice(&self[index..index + 2]);
        u16::from_be_bytes(bytes)
    }
    fn get_u32(&self, index: usize) -> u32 {
        let mut bytes: [u8; 32 / 8] = [0; 32 / 8];
        bytes.copy_from_slice(&self[index..index + 4]);
        u32::from_be_bytes(bytes)
    }
    fn get_u64(&self, index: usize) -> u64 {
        let mut bytes: [u8; 64 / 8] = [0; 64 / 8];
        bytes.copy_from_slice(&self[index..index + 8]);
        u64::from_be_bytes(bytes)
    }
    fn get_u128_be(&self, index: usize) -> u128 {
        let mut bytes: [u8; 128 / 8] = [0; 128 / 8];
        bytes.copy_from_slice(&self[index..index + 128 / 8]);
        u128::from_be_bytes(bytes)
    }
    fn get_u256(&self, index: usize) -> (u128, u128) {
        (self.get_u128_be(index), self.get_u128_be(index + 128 / 8))
    }
    fn get_address(&self, index: usize) -> CanonicalAddr {
        // 32 bytes are reserved for addresses, but wasmd uses both 32 and 20 bytes
        // https://github.com/CosmWasm/wasmd/blob/ac92fdcf37388cc8dc24535f301f64395f8fb3da/x/wasm/types/types.go#L325
        if self.get_u128_be(index) >> 32 == 0 {
            return CanonicalAddr::from(&self[index + 12..index + 32]);
        }
        CanonicalAddr::from(&self[index..index + 32])
    }
    fn get_bytes32(&self, index: usize) -> &[u8] {
        &self[index..index + 32]
    }

    fn get_bytes(&self, index: usize, bytes: usize) -> &[u8] {
        &self[index..index + bytes]
    }

    fn get_const_bytes<const N: usize>(&self, index: usize) -> [u8; N] {
        let mut bytes: [u8; N] = [0; N];
        bytes.copy_from_slice(&self[index..index + N]);
        bytes
    }
}

/// Left-pad a <= 32 byte address with 0s
pub fn extend_address_to_32(addr: &CanonicalAddr) -> Vec<u8> {
    extend_address_to_32_array(addr).to_vec()
}

pub fn extend_address_to_32_array(addr: &CanonicalAddr) -> [u8; 32] {
    let mut result = [0u8; 32];
    let start = 32 - addr.len();
    result[start..].copy_from_slice(addr);
    result
}

/// Turn a string into a fixed length array. If the string is shorter than the
/// resulting array, it gets padded with \0s on the right. If longer, it gets
/// truncated.
pub fn string_to_array<const N: usize>(s: &str) -> [u8; N] {
    let bytes = s.as_bytes();
    let len = usize::min(N, bytes.len());
    let mut result = [0u8; N];
    result[..len].copy_from_slice(&bytes[..len]);
    result
}

pub fn extend_string_to_32(s: &str) -> Vec<u8> {
    string_to_array::<32>(s).to_vec()
}

pub fn get_string_from_32(v: &[u8]) -> String {
    let s = String::from_utf8_lossy(v);
    s.chars().filter(|c| c != &'\0').collect()
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn extend_address() {
        let addr = [
            0x04, 0x12, 0x72, 0xf4, 0x8e, 0x2a, 0x0d, 0xdd, 0xb4, 0x4c, 0x2b, 0x84, 0xe7, 0x36,
            0xe5, 0xd0, 0x0b, 0xbc, 0x94, 0x81, 0x62, 0x35, 0xa7, 0xfc, 0xe3, 0x1c, 0x0b, 0x97,
            0xe7, 0xac, 0x9f, 0x58,
        ];

        let zeroes = [0u8; 32];

        for i in 0..=32 {
            let res = extend_address_to_32_array(&addr[i..].into());
            assert_eq!(res[i..], addr[i..]);
            assert_eq!(res[..i], zeroes[..i]);
        }
    }

    #[test]
    fn extend_string() {
        let src = "f4a9d6346560cfecd57b88121e7cbf23";
        let zeroes = [0u8; 32];

        for i in 0..=32 {
            let res = string_to_array::<32>(&src[..i]);
            assert_eq!(res[..i], src.as_bytes()[..i]);
            assert_eq!(res[i..], zeroes[i..]);
        }

        let large = "dc00835f9ebed39b3cd3dc221c4e3fb0efdf46cc4dc7b0d1";
        let res = string_to_array::<32>(large);
        assert_eq!(res[..], large.as_bytes()[..32]);
    }
}
