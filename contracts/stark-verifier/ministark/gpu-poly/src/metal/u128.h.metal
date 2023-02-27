#ifndef u128_h
#define u128_h

class u128
{
public:
    u128() = default;
    constexpr u128(int l) : low(l), high(0) {}
    constexpr u128(unsigned long l) : low(l), high(0) {}
    constexpr u128(bool b) : low(b), high(0) {}
    constexpr u128(unsigned long h, unsigned long l) : low(l), high(h) {}

    constexpr u128 operator+(const u128 rhs) const
    {
        return u128(high + rhs.high + ((low + rhs.low) < low), low + rhs.low);
    }

    constexpr u128 operator+=(const u128 rhs)
    {
        *this = *this + rhs;
        return *this;
    }

    constexpr inline u128 operator-(const u128 rhs) const
    {
        return u128(high - rhs.high - ((low - rhs.low) > low), low - rhs.low);
    }

    constexpr u128 operator-=(const u128 rhs)
    {
        *this = *this - rhs;
        return *this;
    }

    constexpr bool operator==(const u128 rhs) const
    {
        return high == rhs.high && low == rhs.low;
    }

    constexpr bool operator!=(const u128 rhs) const
    {
        return !(*this == rhs);
    }

    constexpr bool operator<(const u128 rhs) const
    {
        return ((high == rhs.high) && (low < rhs.low)) || (high < rhs.high);
    }

    constexpr u128 operator&(const u128 rhs) const
    {
        return u128(high & rhs.high, low & rhs.low);
    }

    constexpr u128 operator|(const u128 rhs) const
    {
        return u128(high | rhs.high, low | rhs.low);
    }

    constexpr bool operator>(const u128 rhs) const
    {
        return ((high == rhs.high) && (low > rhs.low)) || (high > rhs.high);
    }

    constexpr bool operator>=(const u128 rhs) const
    {
        return !(*this < rhs);
    }

    constexpr bool operator<=(const u128 rhs) const
    {
        return !(*this > rhs);
    }

    constexpr inline u128 operator>>(unsigned shift) const
    {
        // TODO: reduce branch conditions
        if (shift >= 128)
        {
            return u128(0);
        }
        else if (shift == 64)
        {
            return u128(0, high);
        }
        else if (shift == 0)
        {
            return *this;
        }
        else if (shift < 64)
        {
            return u128(high >> shift, (high << (64 - shift)) | (low >> shift));
        }
        else if ((128 > shift) && (shift > 64))
        {
            return u128(0, (high >> (shift - 64)));
        }
        else
        {
            return u128(0);
        }
    }

    constexpr inline u128 operator<<(unsigned shift) const
    {
        // TODO: reduce branch conditions
        if (shift >= 128)
        {
            return u128(0);
        }
        else if (shift == 64)
        {
            return u128(low, 0);
        }
        else if (shift == 0)
        {
            return *this;
        }
        else if (shift < 64)
        {
            return u128((high << shift) | (low >> (64 - shift)), low << shift);
        }
        else if ((128 > shift) && (shift > 64))
        {
            return u128((low >> (shift - 64)), 0);
        }
        else
        {
            return u128(0);
        }
    }

    constexpr u128 operator>>=(unsigned rhs)
    {
        *this = *this >> rhs;
        return *this;
    }

    u128 operator*(const bool rhs) const
    {
        return u128(high * rhs, low * rhs);
    }

    u128 operator*(const u128 rhs) const
    {
        unsigned long t_low_high = metal::mulhi(low, rhs.high);
        unsigned long t_high = metal::mulhi(low, rhs.low);
        unsigned long t_high_low = metal::mulhi(high, rhs.low);
        unsigned long t_low = low * rhs.low;
        return u128(t_low_high + t_high_low + t_high, t_low);

        // // // split values into 4 32-bit parts
        // // unsigned long top[4] = {high >> 32, high & 0xffffffff, low >> 32, low & 0xffffffff};
        // // unsigned long bottom[4] = {rhs.high >> 32, rhs.high & 0xffffffff, rhs.low >> 32, rhs.low & 0xffffffff};
        // // unsigned long products[4][4];

        // // // multiply each component of the values
        // // Alternative:
        // //   for(int y = 3; y > -1; y--){
        // //       for(int x = 3; x > -1; x--){
        // //           products[3 - x][y] = top[x] * bottom[y];
        // //       }
        // //   }
        // products[0][3] = top[3] * bottom[3];
        // products[1][3] = top[2] * bottom[3];
        // products[2][3] = top[1] * bottom[3];
        // products[3][3] = top[0] * bottom[3];

        // products[0][2] = top[3] * bottom[2];
        // products[1][2] = top[2] * bottom[2];
        // products[2][2] = top[1] * bottom[2];
        // // products[3][2] = top[0] * bottom[2];

        // products[0][1] = top[3] * bottom[1];
        // products[1][1] = top[2] * bottom[1];
        // // products[2][1] = top[1] * bottom[1];
        // products[3][1] = top[0] * bottom[1];

        // products[0][0] = top[3] * bottom[0];
        // // products[1][0] = top[2] * bottom[0];
        // // products[2][0] = top[1] * bottom[0];
        // // products[3][0] = top[0] * bottom[0];

        // // first row
        // unsigned long fourth32 = products[0][3] & 0xffffffff;
        // unsigned long third32 = (products[0][2] & 0xffffffff) + (products[0][3] >> 32);
        // unsigned long second32 = (products[0][1] & 0xffffffff) + (products[0][2] >> 32);
        // unsigned long first32 = (products[0][0] & 0xffffffff) + (products[0][1] >> 32);

        // // second row
        // third32 += products[1][3] & 0xffffffff;
        // second32 += (products[1][2] & 0xffffffff) + (products[1][3] >> 32);
        // first32 += (products[1][1] & 0xffffffff) + (products[1][2] >> 32);

        // // third row
        // second32 += products[2][3] & 0xffffffff;
        // first32 += (products[2][2] & 0xffffffff) + (products[2][3] >> 32);

        // // fourth row
        // first32 += products[3][3] & 0xffffffff;

        // // move carry to next digit
        // // third32 += fourth32 >> 32; // TODO: figure out if this is a nop
        // second32 += third32 >> 32;
        // first32 += second32 >> 32;

        // // remove carry from current digit
        // // fourth32 &= 0xffffffff; // TODO: figure out if this is a nop
        // // third32 &= 0xffffffff;
        // second32 &= 0xffffffff;
        // // first32 &= 0xffffffff;

        // // combine components
        // // return u128((first32 << 32) | second32, (third32 << 32) | fourth32);
        // return u128((first32 << 32) | second32, (third32 << 32) | fourth32);
    }

    u128 operator*=(const u128 rhs)
    {
        *this = *this * rhs;
        return *this;
    }

    // TODO: Could get better performance with  smaller limb size
    // Not sure what word size is for M1 GPU
#ifdef __LITTLE_ENDIAN__
    unsigned long low;
    unsigned long high;
#endif
#ifdef __BIG_ENDIAN__
    unsigned long high;
    unsigned long low;
#endif
};

#endif /* u128_h */
