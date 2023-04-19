package math

import (
	"encoding/binary"
	"errors"
	"math"
	"math/bits"
)

var (
	zeroUint128 = Uint128{}
	maxUint128  = NewUint128(math.MaxUint64, math.MaxUint64)
)

var (
	errOverflow             = errors.New("math: overflow")
	errUnderflow            = errors.New("math: underflow")
	errDivideByZero         = errors.New("math: divide by zero")
	errNegativeValue        = errors.New("math: negative value")
	errInvalidUint128Size   = errors.New("math: invalid uint128 size")
	errInvalidUint128String = errors.New("math: invalid uint128 string")
)

const (
	// Uint128Size defines the byte size of an Uint128
	Uint128Size = 16
	// Uint128BitSize defines the bit size of an Uint128
	Uint128BitSize = 16 * 8
)

// ZeroUint128 returns the zero value of an Uint128
func ZeroUint128() Uint128 {
	return zeroUint128
}

// MaxUint128 returns the max value of an Uint128
func MaxUint128() Uint128 {
	return maxUint128
}

// NewUint128 returns the Uint128 value (lo,hi).
func NewUint128(lo, hi uint64) Uint128 {
	return Uint128{lo, hi}
}

// NewUint128FromUint64 returns an Uint128 from an uint64
func NewUint128FromUint64(u uint64) Uint128 {
	uint128 := &Uint128{}
	uint128.From64(u)
	return *uint128
}

// Uint128 is an unsigned 128-bit number.
type Uint128 struct {
	Lo, Hi uint64
}

// IsZero returns true if u == 0.
func (u Uint128) IsZero() bool {
	return u == zeroUint128
}

// Equals returns true if u == v.
//
// Uint128 values can be compared directly with ==, but use of the Equals method
// is preferred for consistency.
func (u Uint128) Equals(v Uint128) bool {
	return u == v
}

// Equals64 returns true if u == v.
func (u Uint128) Equals64(v uint64) bool {
	return u.Lo == v && u.Hi == 0
}

// Cmp compares u and v and returns:
//
//   -1 if u <  v
//    0 if u == v
//   +1 if u >  v
//
func (u Uint128) Cmp(v Uint128) int {
	if u == v {
		return 0
	} else if u.Hi < v.Hi || (u.Hi == v.Hi && u.Lo < v.Lo) {
		return -1
	} else {
		return 1
	}
}

// Cmp64 compares u and v and returns:
//
//   -1 if u <  v
//    0 if u == v
//   +1 if u >  v
//
func (u Uint128) Cmp64(v uint64) int {
	if u.Hi == 0 && u.Lo == v {
		return 0
	} else if u.Hi == 0 && u.Lo < v {
		return -1
	} else {
		return 1
	}
}

// LT checks if u is less than v.
func (u Uint128) LT(v Uint128) bool {
	return u.Cmp(v) == -1
}

// LTE checks if u is less than or equals to v.
func (u Uint128) LTE(v Uint128) bool {
	return u.Cmp(v) <= 0
}

// GT checks if u is greater than v.
func (u Uint128) GT(v Uint128) bool {
	return u.Cmp(v) == 1
}

// GTE checks if u is greater than or equals to v.
func (u Uint128) GTE(v Uint128) bool {
	return u.Cmp(v) >= 0
}

// And returns u&v.
func (u Uint128) And(v Uint128) Uint128 {
	return Uint128{u.Lo & v.Lo, u.Hi & v.Hi}
}

// And64 returns u&v.
func (u Uint128) And64(v uint64) Uint128 {
	return Uint128{u.Lo & v, u.Hi & 0}
}

// Or returns u|v.
func (u Uint128) Or(v Uint128) Uint128 {
	return Uint128{u.Lo | v.Lo, u.Hi | v.Hi}
}

// Or64 returns u|v.
func (u Uint128) Or64(v uint64) Uint128 {
	return Uint128{u.Lo | v, u.Hi | 0}
}

// Xor returns u^v.
func (u Uint128) Xor(v Uint128) Uint128 {
	return Uint128{u.Lo ^ v.Lo, u.Hi ^ v.Hi}
}

// Xor64 returns u^v.
func (u Uint128) Xor64(v uint64) Uint128 {
	return Uint128{u.Lo ^ v, u.Hi ^ 0}
}

// Add returns u+v panicking on overflow.
func (u Uint128) Add(v Uint128) Uint128 {
	result, err := u.SafeAdd(v)
	if err != nil {
		panic(err)
	}
	return result
}

// SafeAdd returns u+v or an error on overflow.
func (u Uint128) SafeAdd(v Uint128) (Uint128, error) {
	lo, carry := bits.Add64(u.Lo, v.Lo, 0)
	hi, carry := bits.Add64(u.Hi, v.Hi, carry)
	if carry != 0 {
		return Uint128{}, errOverflow
	}
	return Uint128{lo, hi}, nil
}

// AddWrap returns u+v with wraparound semantics; for example,
// Max.AddWrap(From64(1)) == Zero.
func (u Uint128) AddWrap(v Uint128) Uint128 {
	lo, carry := bits.Add64(u.Lo, v.Lo, 0)
	hi, _ := bits.Add64(u.Hi, v.Hi, carry)
	return Uint128{lo, hi}
}

// Add64 returns u+v panicking on overflow.
func (u Uint128) Add64(v uint64) Uint128 {
	result, err := u.SafeAdd64(v)
	if err != nil {
		panic(err)
	}

	return result
}

// SafeAdd64 returns u+v or an error on overflow.
func (u Uint128) SafeAdd64(v uint64) (Uint128, error) {
	lo, carry := bits.Add64(u.Lo, v, 0)
	hi, carry := bits.Add64(u.Hi, 0, carry)
	if carry != 0 {
		return Uint128{}, errOverflow
	}
	return Uint128{lo, hi}, nil
}

// AddWrap64 returns u+v with wraparound semantics; for example,
// Max.AddWrap64(1) == Zero.
func (u Uint128) AddWrap64(v uint64) Uint128 {
	lo, carry := bits.Add64(u.Lo, v, 0)
	hi := u.Hi + carry
	return Uint128{lo, hi}
}

// Sub returns u-v panicking on overflow.
func (u Uint128) Sub(v Uint128) Uint128 {
	result, err := u.SafeSub(v)
	if err != nil {
		panic(err)
	}

	return result
}

// SafeSub returns u-v or an error on overflow.
func (u Uint128) SafeSub(v Uint128) (Uint128, error) {
	lo, borrow := bits.Sub64(u.Lo, v.Lo, 0)
	hi, borrow := bits.Sub64(u.Hi, v.Hi, borrow)
	if borrow != 0 {
		return Uint128{}, errUnderflow
	}
	return Uint128{lo, hi}, nil
}

// SubWrap returns u-v with wraparound semantics; for example,
// Zero.SubWrap(From64(1)) == Max.
func (u Uint128) SubWrap(v Uint128) Uint128 {
	lo, borrow := bits.Sub64(u.Lo, v.Lo, 0)
	hi, _ := bits.Sub64(u.Hi, v.Hi, borrow)
	return Uint128{lo, hi}
}

// Sub64 returns u-v panicking on overflow.
func (u Uint128) Sub64(v uint64) Uint128 {
	result, err := u.SafeSub64(v)
	if err != nil {
		panic(err)
	}

	return result
}

// SafeSub64 returns u-v or an error on overflow.
func (u Uint128) SafeSub64(v uint64) (Uint128, error) {
	lo, borrow := bits.Sub64(u.Lo, v, 0)
	hi, borrow := bits.Sub64(u.Hi, 0, borrow)
	if borrow != 0 {
		return Uint128{}, errUnderflow
	}
	return Uint128{lo, hi}, nil
}

// SubWrap64 returns u-v with wraparound semantics; for example,
// Zero.SubWrap64(1) == Max.
func (u Uint128) SubWrap64(v uint64) Uint128 {
	lo, borrow := bits.Sub64(u.Lo, v, 0)
	hi := u.Hi - borrow
	return Uint128{lo, hi}
}

// Mul returns u*v, panicking on overflow.
func (u Uint128) Mul(v Uint128) Uint128 {
	result, err := u.SafeMul(v)
	if err != nil {
		panic(err)
	}
	return result
}

// SafeMul returns u*v or an error on overflow.
func (u Uint128) SafeMul(v Uint128) (Uint128, error) {
	hi, lo := bits.Mul64(u.Lo, v.Lo)
	p0, p1 := bits.Mul64(u.Hi, v.Lo)
	p2, p3 := bits.Mul64(u.Lo, v.Hi)
	hi, c0 := bits.Add64(hi, p1, 0)
	hi, c1 := bits.Add64(hi, p3, c0)
	if (u.Hi != 0 && v.Hi != 0) || p0 != 0 || p2 != 0 || c1 != 0 {
		return Uint128{}, errOverflow
	}
	return Uint128{lo, hi}, nil
}

// MulWrap returns u*v with wraparound semantics; for example,
// Max.MulWrap(Max) == 1.
func (u Uint128) MulWrap(v Uint128) Uint128 {
	hi, lo := bits.Mul64(u.Lo, v.Lo)
	hi += u.Hi*v.Lo + u.Lo*v.Hi
	return Uint128{lo, hi}
}

// Mul64 returns u*v, panicking on overflow.
func (u Uint128) Mul64(v uint64) Uint128 {
	result, err := u.SafeMul64(v)
	if err != nil {
		panic(err)
	}
	return result
}

// SafeMul64 returns u*v or an error on overflow.
func (u Uint128) SafeMul64(v uint64) (Uint128, error) {
	hi, lo := bits.Mul64(u.Lo, v)
	p0, p1 := bits.Mul64(u.Hi, v)
	hi, c0 := bits.Add64(hi, p1, 0)
	if p0 != 0 || c0 != 0 {
		return Uint128{}, errOverflow
	}
	return Uint128{lo, hi}, nil
}

// MulWrap64 returns u*v with wraparound semantics; for example,
// Max.MulWrap64(2) == Max.Sub64(1).
func (u Uint128) MulWrap64(v uint64) Uint128 {
	hi, lo := bits.Mul64(u.Lo, v)
	hi += u.Hi * v
	return Uint128{lo, hi}
}

// Div returns u/v. Panics if v is invalid.
func (u Uint128) Div(v Uint128) Uint128 {
	q, err := u.SafeDiv(v)
	if err != nil {
		panic(err)
	}
	return q
}

// SafeDiv returns u/v or an error if v is invalid.
func (u Uint128) SafeDiv(v Uint128) (q Uint128, err error) {
	q, _, err = u.SafeQuoRem(v)
	if err != nil {
		return Uint128{}, err
	}

	return q, nil
}

// Div64 returns u/v. Panics if v is invalid.
func (u Uint128) Div64(v uint64) Uint128 {
	q, err := u.SafeDiv64(v)
	if err != nil {
		panic(err)
	}
	return q
}

// SafeDiv64 returns u/v or an error if v is invalid.
func (u Uint128) SafeDiv64(v uint64) (q Uint128, err error) {
	q, _, err = u.SafeQuoRem64(v)
	if err != nil {
		return Uint128{}, err
	}

	return q, nil
}

// QuoRem returns q = u/v and r = u%v, panicking on division by zero.
func (u Uint128) QuoRem(v Uint128) (q, r Uint128) {
	q, r, err := u.SafeQuoRem(v)
	if err != nil {
		panic(err)
	}

	return q, r
}

// SafeQuoRem returns q = u/v and u%v, returning an error on division by zero or quotient overflow.
func (u Uint128) SafeQuoRem(v Uint128) (q Uint128, r Uint128, err error) {
	if v == zeroUint128 {
		return Uint128{}, Uint128{}, errDivideByZero
	}

	if v.Hi == 0 {
		var r64 uint64
		q, r64 = u.QuoRem64(v.Lo)
		(&r).From64(r64)
	} else {
		// generate a "trial quotient," guaranteed to be within 1 of the actual
		// quotient, then adjust.
		n := uint(bits.LeadingZeros64(v.Hi))
		v1 := v.Lsh(n)
		u1 := u.Rsh(1)
		tq, _ := bits.Div64(u1.Hi, u1.Lo, v1.Hi)
		tq >>= 63 - n
		if tq != 0 {
			tq--
		}
		(&q).From64(tq)
		// calculate remainder using trial quotient, then adjust if remainder is
		// greater than divisor
		r = u.Sub(v.Mul64(tq))
		if r.Cmp(v) >= 0 {
			q = q.Add64(1)
			r = r.Sub(v)
		}
	}
	return
}

// QuoRem64 returns q = u/v and r = u%v, panicking on division by zero or quotient overflow.
func (u Uint128) QuoRem64(v uint64) (Uint128, uint64) {
	q, r, err := u.SafeQuoRem64(v)
	if err != nil {
		panic(err)
	}
	return q, r
}

// SafeQuoRem64 returns q = u/v r = u%v returning an error on division by zero or quotient overflow.
func (u Uint128) SafeQuoRem64(v uint64) (q Uint128, r uint64, err error) {
	if v == 0 {
		return Uint128{}, 0, errDivideByZero
	}

	// compute the quotient and remainder
	if u.Hi < v {
		q.Lo, r = bits.Div64(u.Hi, u.Lo, v)
	} else {
		q.Hi, r = bits.Div64(0, u.Hi, v)
		q.Lo, r = bits.Div64(r, u.Lo, v)
	}
	return
}

// Mod returns r = u%v, panicking on invalid values of v.
func (u Uint128) Mod(v Uint128) (r Uint128) {
	r, err := u.SafeMod(v)
	if err != nil {
		panic(err)
	}

	return r
}

// SafeMod returns r = u%v, returning errors on invalid v.
func (u Uint128) SafeMod(v Uint128) (r Uint128, err error) {
	_, r, err = u.SafeQuoRem(v)
	if err != nil {
		return Uint128{}, err
	}

	return r, nil
}

// Mod64 returns r = u%v, panicking on invalid values of v.
func (u Uint128) Mod64(v uint64) (r uint64) {
	r, err := u.SafeMod64(v)
	if err != nil {
		panic(err)
	}
	return r
}

// SafeMod64 returns r = u%v, returning errors on invalid values of v.
func (u Uint128) SafeMod64(v uint64) (r uint64, err error) {
	_, r, err = u.SafeQuoRem64(v)
	if err != nil {
		return 0, err
	}

	return r, nil
}

// Lsh returns u<<n.
func (u Uint128) Lsh(n uint) (s Uint128) {
	if n > 64 {
		s.Lo = 0
		s.Hi = u.Lo << (n - 64)
	} else {
		s.Lo = u.Lo << n
		s.Hi = u.Hi<<n | u.Lo>>(64-n)
	}
	return
}

// Rsh returns u>>n.
func (u Uint128) Rsh(n uint) (s Uint128) {
	if n > 64 {
		s.Lo = u.Hi >> (n - 64)
		s.Hi = 0
	} else {
		s.Lo = u.Lo>>n | u.Hi<<(64-n)
		s.Hi = u.Hi >> n
	}
	return
}

// LeadingZeros returns the number of leading zero bits in u; the result is 128
// for u == 0.
func (u Uint128) LeadingZeros() int {
	if u.Hi > 0 {
		return bits.LeadingZeros64(u.Hi)
	}
	return 64 + bits.LeadingZeros64(u.Lo)
}

// TrailingZeros returns the number of trailing zero bits in u; the result is
// 128 for u == 0.
func (u Uint128) TrailingZeros() int {
	if u.Lo > 0 {
		return bits.TrailingZeros64(u.Lo)
	}
	return 64 + bits.TrailingZeros64(u.Hi)
}

// OnesCount returns the number of one bits ("population count") in u.
func (u Uint128) OnesCount() int {
	return bits.OnesCount64(u.Hi) + bits.OnesCount64(u.Lo)
}

// RotateLeft returns the value of u rotated left by (k mod 128) bits.
func (u Uint128) RotateLeft(k int) Uint128 {
	const n = 128
	s := uint(k) & (n - 1)
	return u.Lsh(s).Or(u.Rsh(n - s))
}

// RotateRight returns the value of u rotated left by (k mod 128) bits.
func (u Uint128) RotateRight(k int) Uint128 {
	return u.RotateLeft(-k)
}

// Reverse returns the value of u with its bits in reversed order.
func (u Uint128) Reverse() Uint128 {
	return Uint128{bits.Reverse64(u.Hi), bits.Reverse64(u.Lo)}
}

// ReverseBytes returns the value of u with its bytes in reversed order.
func (u Uint128) ReverseBytes() Uint128 {
	return Uint128{bits.ReverseBytes64(u.Hi), bits.ReverseBytes64(u.Lo)}
}

// Len returns the minimum number of bits required to represent u; the result is
// 0 for u == 0.
func (u Uint128) Len() int {
	return 128 - u.LeadingZeros()
}

// String returns the base-10 representation of u as a string.
func (u Uint128) String() string {
	if u.IsZero() {
		return "0"
	}
	buf := []byte("0000000000000000000000000000000000000000") // log10(2^128) < 40
	for i := len(buf); ; i -= 19 {
		q, r := u.QuoRem64(1e19) // largest power of 10 that fits in a uint64
		var n int
		for ; r != 0; r /= 10 {
			n++
			buf[i-n] += byte(r % 10)
		}
		if q.IsZero() {
			return string(buf[i-n:])
		}
		u = q
	}
}

// PutLEBytes stores u in b in little-endian order. It panics if len(b) < 16.
func (u Uint128) PutLEBytes(b []byte) {
	binary.LittleEndian.PutUint64(b[:8], u.Lo)
	binary.LittleEndian.PutUint64(b[8:], u.Hi)
}

// PutBEBytes stores u in b in big-endian order. It panics if len(b) < 16.
func (u *Uint128) PutBEBytes(b []byte) {
	binary.BigEndian.PutUint64(b[:8], u.Hi)
	binary.BigEndian.PutUint64(b[8:], u.Lo)
}

// From64 converts v to a Uint128 value.
func (u *Uint128) From64(v uint64) {
	u.Lo = v
	u.Hi = 0
}

// FromLEBytes populates the Uint128 value given bytes in little endian order.
func (u *Uint128) FromLEBytes(b []byte) error {
	if len(b) != Uint128Size {
		return errInvalidUint128Size
	}

	u.Lo = binary.LittleEndian.Uint64(b[:8])
	u.Hi = binary.LittleEndian.Uint64(b[8:])

	return nil
}

// FromBEBytes populates the Uin128 value given bytes in big endian order.
func (u *Uint128) FromBEBytes(b []byte) error {
	if len(b) != Uint128Size {
		return errInvalidUint128Size
	}

	u.Hi = binary.BigEndian.Uint64(b[:8])
	u.Lo = binary.BigEndian.Uint64(b[8:])

	return nil
}

// FromString populates the Uint128 with a base0 string.
func (u *Uint128) FromString(s string) error {
	res := ZeroUint128()
	var err error

	if len(s) == 0 || len(s) > 40 {
		return errInvalidUint128String
	}

	// simple optimisation is to parse out first 19 digits into res (and remove end of string) before starting this loop
	// this will use more efficient uint64 and likely cover all the work for simple cases.

	for i := 0; i < len(s); i++ {
		ch := s[i]
		if ch < '0' || ch > '9' {
			return errInvalidUint128String
		}
		val := uint64(ch - '0')
		res, err = res.SafeMul64(10)
		if err != nil {
			return err
		}
		res, err = res.SafeAdd64(val)
		if err != nil {
			return err
		}
	}
	*u = res
	return nil
}

// UnmarshalJSON populates Uint128 from a json string value.
func (u *Uint128) UnmarshalJSON(b []byte) error {
	// we need to manually check that the length is valid
	// a json string will have two double quotes at least
	// NOTE: the empty string case is handled by Uint128.FromString
	if len(b) < 2 {
		return errInvalidUint128String
	}
	// check that the first element and the last elements are double quotes
	// if not it means that we're trying to parse not a json string
	if b[0] != '"' || b[len(b)-1] != '"' {
		return errInvalidUint128String
	}

	// parse the real string, removing the starting and ending double quotes
	return u.FromString(string(b[1 : len(b)-1]))
}

// MarshalJSON implements json.Marshaler and returns
// Uint128.String converted to bytes.
func (u Uint128) MarshalJSON() (b []byte, err error) {
	return []byte(`"` + u.String() + `"`), nil
}
