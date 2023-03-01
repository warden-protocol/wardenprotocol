use crate::prelude::*;

fn byte_to_hex(byte: &u8) -> String {
    format!("{:02x}", byte)
}

/// Serializes bytes into a hex string
pub fn to_hex_string<T: Clone + Into<Vec<u8>>>(bytes: &T) -> String {
    let hex_vec: Vec<String> = bytes.clone().into().iter().map(byte_to_hex).collect();

    hex_vec.join("")
}

/// Find a difference between two vectors and return a third vector
/// containing the difference. This function preserves the first
/// vector order.
pub fn difference<T: Clone + PartialEq>(a: &[T], b: &[T]) -> Vec<T> {
    a.iter().cloned().filter(|x| !b.contains(x)).collect()
}
