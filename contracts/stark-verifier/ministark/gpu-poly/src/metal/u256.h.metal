#ifndef u256_h
#define u256_h

#include "u128.h.metal"

class u256
{
public:
    u256() = default;
    constexpr u256(int l) : low(l), high(0) {}
    constexpr u256(unsigned long l) : low(u128(l)), high(0) {}
    constexpr u256(u128 l) : low(l), high(0) {}
    constexpr u256(bool b) : low(b), high(0) {}
    constexpr u256(u128 h, u128 l) : low(l), high(h) {}
    constexpr u256(unsigned long hh, unsigned long hl, unsigned long lh, unsigned long ll) : 
        low(u128(lh, ll)), high(u128(hh, hl)) {}

    constexpr u256 operator+(const u256 rhs) const
    {
        return u256(high + rhs.high + ((low + rhs.low) < low), low + rhs.low);
    }

    constexpr u256 operator+=(const u256 rhs)
    {
        *this = *this + rhs;
        return *this;
    }

    constexpr inline u256 operator-(const u256 rhs) const
    {
        return u256(high - rhs.high - ((low - rhs.low) > low), low - rhs.low);
    }

    constexpr u256 operator-=(const u256 rhs)
    {
        *this = *this - rhs;
        return *this;
    }

    constexpr bool operator==(const u256 rhs) const
    {
        return high == rhs.high && low == rhs.low;
    }

    constexpr bool operator!=(const u256 rhs) const
    {
        return !(*this == rhs);
    }

    constexpr bool operator<(const u256 rhs) const
    {
        return ((high == rhs.high) && (low < rhs.low)) || (high < rhs.high);
    }

    constexpr u256 operator&(const u256 rhs) const
    {
        return u256(high & rhs.high, low & rhs.low);
    }

    constexpr bool operator>(const u256 rhs) const
    {
        return ((high == rhs.high) && (low > rhs.low)) || (high > rhs.high);
    }

    constexpr bool operator>=(const u256 rhs) const
    {
        return !(*this < rhs);
    }

    constexpr bool operator<=(const u256 rhs) const
    {
        return !(*this > rhs);
    }

    constexpr inline u256 operator>>(unsigned shift) const
    {
        // TODO: reduce branch conditions
        if (shift >= 256)
        {
            return u256(0);
        }
        else if (shift == 128)
        {
            return u256(0, high);
        }
        else if (shift == 0)
        {
            return *this;
        }
        else if (shift < 128)
        {
            return u256(high >> shift, (high << (128 - shift)) | (low >> shift));
        }
        else if ((256 > shift) && (shift > 128))
        {
            return u256(0, (high >> (shift - 128)));
        }
        else
        {
            return u256(0);
        }
    }

    constexpr u256 operator>>=(unsigned rhs)
    {
        *this = *this >> rhs;
        return *this;
    }

    u256 operator*(const bool rhs) const
    {
        return u256(high * rhs, low * rhs);
    }

    u256 operator*(const u256 rhs) const
    {
        // split values into 4 64-bit parts
        u128 top[2] = {u128(low.high), u128(low.low)};
        u128 bottom[3] = {u128(rhs.high.low), u128(rhs.low.high), u128(rhs.low.low)};
        
        unsigned long tmp3_3 = high.high * rhs.low.low;
        unsigned long tmp0_0 = low.low * rhs.high.high;
        unsigned long tmp2_2 = high.low * rhs.low.high;

        u128 tmp2_3 = u128(high.low) * bottom[2];
        u128 tmp0_3 = top[1] * bottom[2];
        u128 tmp1_3 = top[0] * bottom[2];

        u128 tmp0_2 = top[1] * bottom[1];
        u128 third64 = u128(tmp0_2.low) + u128(tmp0_3.high);
        u128 tmp1_2 = top[0] * bottom[1];

        u128 tmp0_1 = top[1] * bottom[0];
        u128 second64 = u128(tmp0_1.low) + u128(tmp0_2.high);
        unsigned long first64 = tmp0_0 + tmp0_1.high;
        
        u128 tmp1_1 = top[0] * bottom[0];
        first64 += tmp1_1.low + tmp1_2.high;

        // second row
        third64 += u128(tmp1_3.low);
        second64 += u128(tmp1_2.low) + u128(tmp1_3.high);

        // third row
        second64 += u128(tmp2_3.low);
        first64 += tmp2_2 + tmp2_3.high;

        // fourth row
        first64 += tmp3_3;
        second64 += u128(third64.high);
        first64 += second64.high;

        return u256(u128(first64, second64.low), u128(third64.low, tmp0_3.low));


        // // unsigned long t_low_high_low = high * rhs.low;
        // // unsigned long t_low_low_high = low * rhs.high;

        // // unsigned long t_low = low * rhs.low;

        // // u128 t_low = low * rhs.low;

        // // unsigned long t_low_high = metal::mulhi(low.low, rhs.low.high);
        // // unsigned long t_high_low = metal::mulhi(low.high, rhs.low.low);
        // // unsigned long t_high = metal::mulhi(low.low, rhs.low.low);
        // // unsigned long t_low = low.low * rhs.low.low;

        // // u128 low_low = u128(t_low_high + t_high_low + t_high, t_low);

        // // t_low_high = metal::mulhi(low.low, rhs.low.high);
        // // t_high_low = metal::mulhi(low.high, rhs.low.low);
        // // t_high = metal::mulhi(low.low, rhs.low.low);
        // // t_low = low.low * rhs.low.low;

        // // return ;

        // // split values into 4 64-bit parts
        // u128 top[3] = {u128(high.low), u128(low.high), u128(low.low)};
        // u128 bottom[3] = {u128(rhs.high.low), u128(rhs.low.high), u128(rhs.low.low)};
        // // u128 top[4] = {high >> 32, high & 0xffffffff, low >> 32, low & 0xffffffff};
        // // u128 bottom[4] = {rhs.high >> 32, rhs.high & 0xffffffff, rhs.low >> 32, rhs.low & 0xffffffff};
        // // u128 products[4][4];

        // // // multiply each component of the values
        // // Alternative:
        // //   for(int y = 3; y > -1; y--){
        // //       for(int x = 3; x > -1; x--){
        // //           products[3 - x][y] = top[x] * bottom[y];
        // //       }
        // //   }
        // u128 tmp0_3 = top[2] * bottom[2];
        // u128 tmp1_3 = top[1] * bottom[2];
        // u128 tmp2_3 = top[0] * bottom[2];
        // // u128 tmp3_3 = top[0] * bottom[2];
        // unsigned long tmp3_3 = high.high * rhs.low.low;
        // // unsigned long tmp0 = low.low * rhs.high.high;

        // u128 tmp0_2 = top[2] * bottom[1];
        // u128 tmp1_2 = top[1] * bottom[1];
        // // u128 tmp2_2 = top[0] * bottom[1];
        // unsigned long tmp2_2 = high.low * rhs.low.high;


        // u128 tmp0_1 = top[2] * bottom[0];
        // u128 tmp1_1 = top[1] * bottom[0];
        // // u128 tmp3_1 = top[0] * bottom[0];

        // unsigned long tmp0_0 = low.low * rhs.high.high;

        // // first row
        // u128 fourth64 = tmp0_3.low;
        // u128 third64 = u128(tmp0_2.low) + u128(tmp0_3.high);
        // u128 second64 = u128(tmp0_1.low) + u128(tmp0_2.high);
        // u128 first64 = u128(tmp0_0) + u128(tmp0_1.high);

        // // second row
        // third64 += u128(tmp1_3.low);
        // second64 += u128(tmp1_2.low) + u128(tmp1_3.high);
        // first64 += u128(tmp1_1.low) + u128(tmp1_2.high);

        // // third row
        // second64 += u128(tmp2_3.low);
        // first64 += u128(tmp2_2) + u128(tmp2_3.high);

        // // fourth row
        // first64 += u128(tmp3_3);
        // second64 += u128(third64.high);
        // first64 += u128(second64.high);

        // // remove carry from current digit
        // // fourth64 &= 0xffffffff; // TODO: figure out if this is a nop
        // // third64 &= 0xffffffff;
        // // second64 = u128(second64.low);
        // // first64 &= 0xffffffff;

        // // combine components
        // // return u256((first64 << 64) | second64, (third64 << 64) | fourth64);
        // return u256(u128(first64.low, second64.low), u128(third64.low, fourth64.low));

        // // return u128((first64.high second64, (third64 << 64) | fourth64);
    }

    u256 operator*=(const u256 rhs)
    {
        *this = *this * rhs;
        return *this;
    }

    // TODO: Could get better performance with  smaller limb size
    // Not sure what word size is for M1 GPU
#ifdef __LITTLE_ENDIAN__
    u128 low;
    u128 high;
#endif
#ifdef __BIG_ENDIAN__
    u128 high;
    u128 low;
#endif
};

#endif /* u256_h */
