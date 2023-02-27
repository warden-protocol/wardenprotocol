#ifndef felt_u128_h
#define felt_u128_h

#include "u128.h.metal"

// Optimized 128-bit prime field (FP) element
//
// This implementation has been optimized by storing and performing
// arithmetic on field elements in Montgomery form. Arithmetic in Montgomery
// form is significantly faster due to avoiding expensive division operations.
// This optimized implementation results in a ~100x speedup over a naive prime
// field implementation. The auxiliary modulus "R" for this field element (felt)
// class is always `2 ^ 128`. For more information about Montgomery arithmetic
// see https://en.wikipedia.org/wiki/Montgomery_modular_multiplication
//
// ## Template parameters
//
// Template parameters are `u128` values specified as two `unsigned long`s due
// to the requirements of non-type teplate parameters being integral types
// https://en.cppreference.com/w/cpp/language/template_parameters
//
// ### N
//
// Prime field modulus i.e. 270497897142230380135924736767050121217
//
// ### R_SQUARED
//
// Square of auxiliary modulus R for montgomery reduction `R_SQUARED ≡ R^2 mod N`.
// Auxiliary modulus is always `R = 1<<128` which exceeds the maximum u128 which is
// why it isn't listed as a variable. The square `R^2` is useful for converting field
// elements into montgomery form. R_SQUARED values can be calculated using Python:
//
// ```python
// R = 1<<128
// N = <<prime modulus>>
// R_SQUARED = (R * R) % N
// print(R_SQUARED)
// ```
//
// ### N_PRIME
//
// Integer `N'` in `[0, R)` such that `N * N' ≡ −1 mod R`. Value can be calculated
// using Python (integers are unbounded in size in Python)
//
// ```python
// R = 1<<128
// N = <<prime modulus>>
// pow(N, -1, R)
// ```
template <
    /* =N **/ unsigned long N_HIGH, unsigned long N_LOW,
    /* =R_SQUARED **/ unsigned long R_SQUARED_HIGH, unsigned long R_SQUARED_LOW,
    /* =N_PRIME **/ unsigned long N_PRIME_HIGH, unsigned long N_PRIME_LOW>
class Felt128
{
public:
    typedef Felt128 LN;

    Felt128() = default;
    constexpr Felt128(unsigned long v) : inner(v) {}
    constexpr Felt128(u128 v) : inner(v) {}

    constexpr explicit operator u128() const
    {
        return inner;
    }

    constexpr Felt128 operator+(const Felt128 rhs) const
    {
        return Felt128(add(inner, rhs.inner));
    }

    constexpr Felt128 operator-(const Felt128 rhs) const
    {
        return Felt128(sub(inner, rhs.inner));
    }

    Felt128 operator*(const Felt128 rhs) const
    {
        return Felt128(mul(inner, rhs.inner));
    }

private:
    u128 inner;

    constexpr static const constant u128 N = u128(N_HIGH, N_LOW);
    constexpr static const constant u128 R_SQUARED = u128(R_SQUARED_HIGH, R_SQUARED_LOW);
    constexpr static const constant u128 N_PRIME = u128(N_PRIME_HIGH, N_PRIME_LOW);

    // Equates to `(1 << 128) - N`
    constexpr static const constant u128 R_SUB_N =
        u128(0xFFFFFFFFFFFFFFFF, 0xFFFFFFFFFFFFFFFF) - N + u128(1);

    // Computes `lhs + rhs mod N`
    // Returns value in range [0,N)
    inline u128 add(const u128 lhs, const u128 rhs) const
    {
        u128 addition = (lhs + rhs);
        u128 res = addition;
        // TODO: determine if an if statement here are more optimal
        return res - u128(addition >= N) * N + u128(addition < lhs) * R_SUB_N;
    }

    // Computes `lhs - rhs mod N`
    // Assumes `rhs` value in range [0,N)
    inline u128 sub(const u128 lhs, const u128 rhs) const
    {
        // TODO: figure what goes on here with "constant" scope variables
        return add(lhs, ((u128)N) - rhs);
    }

    // Computes `lhs * rhs mod M`
    //
    // Essential that inputs are already in the range [0,N) and are in montgomery
    // form. Multiplication performs single round of montgomery reduction.
    //
    // Reference:
    // - https://en.wikipedia.org/wiki/Montgomery_modular_multiplication (REDC)
    // - https://www.youtube.com/watch?v=2UmQDKcelBQ
    u128 mul(const u128 lhs, const u128 rhs) const
    {
        u128 lhs_low = lhs.low;
        u128 lhs_high = lhs.high;
        u128 rhs_low = rhs.low;
        u128 rhs_high = rhs.high;

        u128 partial_t_high = lhs_high * rhs_high;
        u128 partial_t_mid_a = lhs_high * rhs_low;
        u128 partial_t_mid_a_low = partial_t_mid_a.low;
        u128 partial_t_mid_a_high = partial_t_mid_a.high;
        u128 partial_t_mid_b = rhs_high * lhs_low;
        u128 partial_t_mid_b_low = partial_t_mid_b.low;
        u128 partial_t_mid_b_high = partial_t_mid_b.high;
        u128 partial_t_low = lhs_low * rhs_low;

        u128 tmp = partial_t_mid_a_low +
                   partial_t_mid_b_low + partial_t_low.high;
        u128 carry = tmp.high;
        u128 t_low = u128(tmp.low, partial_t_low.low);
        u128 t_high = partial_t_high + partial_t_mid_a_high + partial_t_mid_b_high + carry;

        // Compute `m = T * N' mod R`
        u128 m = t_low * N_PRIME;

        // Compute `t = (T + m * N) / R`
        u128 n = N;
        u128 n_low = n.low;
        u128 n_high = n.high;
        u128 m_low = m.low;
        u128 m_high = m.high;

        u128 partial_mn_high = m_high * n_high;
        u128 partial_mn_mid_a = m_high * n_low;
        u128 partial_mn_mid_a_low = partial_mn_mid_a.low;
        u128 partial_mn_mid_a_high = partial_mn_mid_a.high;
        u128 partial_mn_mid_b = n_high * m_low;
        u128 partial_mn_mid_b_low = partial_mn_mid_b.low;
        u128 partial_mn_mid_b_high = partial_mn_mid_b.high;
        u128 partial_mn_low = m_low * n_low;

        tmp = partial_mn_mid_a_low + partial_mn_mid_b_low + u128(partial_mn_low.high);
        carry = tmp.high;
        u128 mn_low = u128(tmp.low, partial_mn_low.low);
        u128 mn_high = partial_mn_high + partial_mn_mid_a_high + partial_mn_mid_b_high + carry;

        u128 overflow = mn_low + t_low < mn_low;
        u128 t_tmp = t_high + overflow;
        u128 t = t_tmp + mn_high;
        u128 overflows_r = t < t_tmp;
        u128 overflows_modulus = t >= N;

        return t + overflows_r * R_SUB_N - overflows_modulus * N;
    }
};

namespace p270497897142230380135924736767050121217 {

// STARK-friendly prime field (FP) with modulus `1 + 407 * 2^119`.
//
// The inspiration for this field came from the Anatomy of a STARK tutorial.
// https://aszepieniec.github.io/stark-anatomy/basic-tools
//
// Montgomery field params:
//  * N (prime modulus) = 270497897142230380135924736767050121217 (1 + 407 * (1 << 119))
//  * R (Mongomery aux modulus) = 340282366920938463463374607431768211456 (1 << 128)
//  * R_SQUARED = 227239200783092534449076146062029718070 (see Felt128 for generation)
//  * N_PRIME = 270497897142230380135924736767050121215 (see Felt128 for generation)
using Fp = Felt128<
    /* =N **/ /*u128(*/ 14663720386718334976, 1 /*)*/,
    /* =R_SQUARED **/ /*u128(*/ 12318661758144933314, 6617259544868782646 /*)*/,
    /* =N_PRIME **/ /*u128(*/ 14663720386718334975, 18446744073709551615 /*)*/
    >;

}

#endif /* felt_u128_h */
