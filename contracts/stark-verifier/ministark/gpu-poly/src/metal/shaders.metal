
// TODO: make seperate constants for constraint evaluation and FFT?
// TODO: would be nice if constants could be stored near the shaders that use them

// Number of input items being transformed
constant unsigned N [[ function_constant(0) ]];

// Number of boxes for the FFT/IFFT itteration e.g.
// ┌─────────────────────────┐ ┌─────────────────────┐ ┌───────────────────┐
// │ a[0]               a[0] │ │ a[0]           a[0] │ │ a[0]         a[0] │
// │      ╲           ╱      │ │      ╲       ╱      │ │      ❭ εϊз ❬      │
// │ a[1]  ╲         ╱  a[1] │ │ a[1]  ❭ εϊз ❬  a[1] │ │ a[1]         a[1] │
// │      ╲ ╲       ╱ ╱      │ │      ╳       ╳      │ ├───────────────────┤
// │ a[2]  ╲ ❭ εϊз ❬ ╱  a[2] │ │ a[2]  ❭ εϊз ❬  a[2] │ │ a[2]         a[2] │
// │      ╲ ╳       ╳ ╱      │ │      ╱       ╲      │ │      ❭ εϊз ❬      │
// │ a[3]  ╳ ❭ εϊз ❬ ╳  a[3] │ │ a[3]           a[3] │ │ a[3]         a[3] │
// │      ╳ ╳       ╳ ╳      │ ├─────────────────────┤ ├───────────────────┤
// │ a[4]  ╳ ❭ εϊз ❬ ╳  a[4] │ │ a[4]           a[4] │ │ a[4]         a[4] │
// │      ╱ ╳       ╳ ╲      │ │      ╲       ╱      │ │      ❭ εϊз ❬      │
// │ a[5]  ╱ ❭ εϊз ❬ ╲  a[5] │ │ a[5]  ❭ εϊз ❬  a[5] │ │ a[5]         a[5] │
// │      ╱ ╱       ╲ ╲      │ │      ╳       ╳      │ ├───────────────────┤
// │ a[6]  ╱         ╲  a[6] │ │ a[6]  ❭ εϊз ❬  a[6] │ │ a[6]         a[6] │
// │      ╱           ╲      │ │      ╱       ╲      │ │      ❭ εϊз ❬      │
// │ a[7]               a[7] │ │ a[7]           a[7] │ │ a[7]         a[7] │
// ├─────────────────────────┤ ├─────────────────────┤ ├───────────────────┤
// │       NUM_BOXES=1       │ │     NUM_BOXES=2     │ │    NUM_BOXES=4    │
// └─────────────────────────┘ └─────────────────────┘ └───────────────────┘
constant unsigned NUM_BOXES [[ function_constant(1) ]];

// FFT size that each threadgroup computes.
// Always a power of two.
constant unsigned THREADGROUP_FFT_SIZE [[ function_constant(2) ]];

#include "fft_shaders.h.metal"
#include "evaluation_shaders.h.metal"