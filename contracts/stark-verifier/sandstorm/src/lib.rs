#![feature(
    buf_read_has_data_left,
    allocator_api,
    array_chunks,
    slice_flatten,
    array_windows,
    slice_as_chunks
)]

#[macro_use]
extern crate alloc;

pub mod air;
pub mod binary;
pub mod prover;
pub mod trace;
mod utils;