# GPU Poly

This library contains GPU optimized polynomial arithmetic. The code is written in the Metal programming language so currently only supports Apple Silicon. This library achieves up to a 10x speedup over CPU implementation. In future support for CUDA will be added. Please get in touch if you want to help with the CUDA implementation. I only have an Apple laptop so writing and evaluating CUDA code is not so easy for me.

# Usage

```bash
# debug mode
export METAL_DEVICE_WRAPPER_TYPE=1
make
cargo test
```
