#ifndef permute_h
#define permute_h

// TODO: Can use metal::log2 method
constexpr int log2_floor(unsigned n)
{
    int i = -(n == 0);
    if (n >= 1 << 16)
    {
        i += 16;
        n >>= 16;
    }
    if (n >= 1 << 8)
    {
        i += 8;
        n >>= 8;
    }
    if (n >= 1 << 4)
    {
        i += 4;
        n >>= 4;
    }
    if (n >= 1 << 2)
    {
        i += 2;
        n >>= 2;
    }
    if (n >= 1 << 1)
    {
        i += 1;
        n >>= 1;
    }
    return i;
}

// TODO: Can use metal::reverse_bits method
constexpr unsigned bit_rev(unsigned n)
{
    n = (n & 0xFFFF0000) >> 16 | (n & ~0xFFFF0000) << 16;
    n = (n & 0xFF00FF00) >> 8 | (n & ~0xFF00FF00) << 8;
    n = (n & 0xF0F0F0F0) >> 4 | (n & ~0xF0F0F0F0) << 4;
    n = (n & 0xCCCCCCCC) >> 2 | (n & ~0xCCCCCCCC) << 2;
    n = (n & 0xAAAAAAAA) >> 1 | (n & ~0xAAAAAAAA) << 1;
    return n;
}

// NOTE: Needs to be in fft.metal to get access to N variable
// constexpr unsigned inv_twiddle_idx(unsigned idx) {
//     return permute_index(N, N - permute_index(N, idx)) % N;
// }

// Reverses the bits of each index
constexpr unsigned permute_index(unsigned size, unsigned index)
{
    return bit_rev(index) >> (sizeof(unsigned) * 8 - log2_floor(size));
}

#endif /* permute_h */
