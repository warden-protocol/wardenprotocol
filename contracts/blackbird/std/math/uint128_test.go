package math

import (
	"crypto/rand"
	"encoding/binary"
	"encoding/json"
	"errors"
	"math"
	"math/big"
	"reflect"
	"testing"

	"github.com/stretchr/testify/assert"
)

var maxUint128Big = func() *big.Int {
	x := new(big.Int)
	x, ok := x.SetString("340282366920938463463374607431768211455", 0)
	if !ok {
		panic("unable to set max big int for tests")
	}

	return x
}()

func toBig(u Uint128) *big.Int {
	i := new(big.Int).SetUint64(u.Hi)
	i = i.Lsh(i, 64)
	i = i.Xor(i, new(big.Int).SetUint64(u.Lo))
	return i
}

func randUint128() Uint128 {
	randBuf := make([]byte, 16)
	_, err := rand.Read(randBuf)
	if err != nil {
		panic(err)
	}
	u := &Uint128{}
	err = u.FromLEBytes(randBuf)
	if err != nil {
		panic(err)
	}

	return *u
}

func TestUint128(t *testing.T) {
	// test non-arithmetic methods
	for i := 0; i < 1000; i++ {
		x, y := randUint128(), randUint128()
		if i%3 == 0 {
			x = x.Rsh(64)
		} else if i%7 == 0 {
			x = x.Lsh(64)
		}

		b := make([]byte, 16)
		x.PutLEBytes(b)
		u128 := &Uint128{}
		err := u128.FromLEBytes(b)
		if err != nil {
			t.Fatal(err)
		}
		if *u128 != x {
			t.Fatal("FromLEBytes is not the inverse of PutLEBytes for", x)
		}

		if !x.Equals(x) {
			t.Fatalf("%v does not equal itself", x.Lo)
		}
		if !NewUint128FromUint64(x.Lo).Equals64(x.Lo) {
			t.Fatalf("%v does not equal itself", x.Lo)
		}

		if x.Cmp(y) != toBig(x).Cmp(toBig(y)) {
			t.Fatalf("mismatch: cmp(%v,%v) should equal %v, got %v", x, y, toBig(x).Cmp(toBig(y)), x.Cmp(y))
		} else if x.Cmp(x) != 0 {
			t.Fatalf("%v does not equal itself", x)
		}

		if x.Cmp64(y.Lo) != toBig(x).Cmp(toBig(NewUint128FromUint64(y.Lo))) {
			t.Fatalf("mismatch: cmp64(%v,%v) should equal %v, got %v", x, y.Lo, toBig(x).Cmp(toBig(NewUint128FromUint64(y.Lo))), x.Cmp64(y.Lo))
		} else if NewUint128FromUint64(x.Lo).Cmp64(x.Lo) != 0 {
			t.Fatalf("%v does not equal itself", x.Lo)
		}
	}
}

func TestArithmetic(t *testing.T) {
	// compare Uint128 arithmetic methods to their math/big equivalents, using
	// random values
	randBuf := make([]byte, 17)
	randUint128 := func() Uint128 {
		_, err := rand.Read(randBuf)
		if err != nil {
			panic(err)
		}
		var Lo, Hi uint64
		if randBuf[16]&1 != 0 {
			Lo = binary.LittleEndian.Uint64(randBuf[:8])
		}
		if randBuf[16]&2 != 0 {
			Hi = binary.LittleEndian.Uint64(randBuf[8:])
		}
		return NewUint128(Lo, Hi)
	}
	mod128 := func(i *big.Int) *big.Int {
		// wraparound semantics
		if i.Sign() == -1 {
			i = i.Add(new(big.Int).Lsh(big.NewInt(1), 128), i)
		}
		_, rem := i.QuoRem(i, new(big.Int).Lsh(big.NewInt(1), 128), new(big.Int))
		return rem
	}
	checkBinOpX := func(x Uint128, op string, y Uint128, fn func(x, y Uint128) Uint128, fnb func(z, x, y *big.Int) *big.Int) {
		t.Helper()
		rb := fnb(new(big.Int), toBig(x), toBig(y))
		defer func() {
			if r := recover(); r != nil {
				if rb.BitLen() <= 128 && rb.Sign() >= 0 {
					t.Fatalf("mismatch: %v%v%v should not panic, %v", x, op, y, rb)
				}
			} else if rb.BitLen() > 128 || rb.Sign() < 0 {
				t.Fatalf("mismatch: %v%v%v should panic, %v", x, op, y, rb)
			}
		}()
		r := fn(x, y)
		if toBig(r).Cmp(rb) != 0 {
			t.Fatalf("mismatch: %v%v%v should equal %v, got %v", x, op, y, rb, r)
		}
	}
	checkBinOp := func(x Uint128, op string, y Uint128, fn func(x, y Uint128) Uint128, fnb func(z, x, y *big.Int) *big.Int) {
		t.Helper()
		r := fn(x, y)
		rb := mod128(fnb(new(big.Int), toBig(x), toBig(y)))
		if toBig(r).Cmp(rb) != 0 {
			t.Fatalf("mismatch: %v%v%v should equal %v, got %v", x, op, y, rb, r)
		}
	}
	checkShiftOp := func(x Uint128, op string, n uint, fn func(x Uint128, n uint) Uint128, fnb func(z, x *big.Int, n uint) *big.Int) {
		t.Helper()
		r := fn(x, n)
		rb := mod128(fnb(new(big.Int), toBig(x), n))
		if toBig(r).Cmp(rb) != 0 {
			t.Fatalf("mismatch: %v%v%v should equal %v, got %v", x, op, n, rb, r)
		}
	}
	checkBinOp64X := func(x Uint128, op string, y uint64, fn func(x Uint128, y uint64) Uint128, fnb func(z, x, y *big.Int) *big.Int) {
		t.Helper()
		xb, yb := toBig(x), toBig(NewUint128FromUint64(y))
		rb := fnb(new(big.Int), xb, yb)
		defer func() {
			if r := recover(); r != nil {
				if rb.BitLen() <= 128 && rb.Sign() >= 0 {
					t.Fatalf("mismatch: %v%v%v should not panic, %v", x, op, y, rb)
				}
			} else if rb.BitLen() > 128 || rb.Sign() < 0 {
				t.Fatalf("mismatch: %v%v%v should panic, %v", x, op, y, rb)
			}
		}()
		r := fn(x, y)
		if toBig(r).Cmp(rb) != 0 {
			t.Fatalf("mismatch: %v%v%v should equal %v, got %v", x, op, y, rb, r)
		}
	}
	checkBinOp64 := func(x Uint128, op string, y uint64, fn func(x Uint128, y uint64) Uint128, fnb func(z, x, y *big.Int) *big.Int) {
		t.Helper()
		xb, yb := toBig(x), toBig(NewUint128FromUint64(y))
		r := fn(x, y)
		rb := mod128(fnb(new(big.Int), xb, yb))
		if toBig(r).Cmp(rb) != 0 {
			t.Fatalf("mismatch: %v%v%v should equal %v, got %v", x, op, y, rb, r)
		}
	}
	for i := 0; i < 1000; i++ {
		x, y, z := randUint128(), randUint128(), uint(randUint128().Lo&0xFF)
		checkBinOpX(x, "[+]", y, Uint128.Add, (*big.Int).Add)
		checkBinOpX(x, "[-]", y, Uint128.Sub, (*big.Int).Sub)
		checkBinOpX(x, "[*]", y, Uint128.Mul, (*big.Int).Mul)
		checkBinOp(x, "+", y, Uint128.AddWrap, (*big.Int).Add)
		checkBinOp(x, "-", y, Uint128.SubWrap, (*big.Int).Sub)
		checkBinOp(x, "*", y, Uint128.MulWrap, (*big.Int).Mul)
		if !y.IsZero() {
			checkBinOp(x, "/", y, Uint128.Div, (*big.Int).Div)
			checkBinOp(x, "%", y, Uint128.Mod, (*big.Int).Mod)
		}
		checkBinOp(x, "&", y, Uint128.And, (*big.Int).And)
		checkBinOp(x, "|", y, Uint128.Or, (*big.Int).Or)
		checkBinOp(x, "^", y, Uint128.Xor, (*big.Int).Xor)
		checkShiftOp(x, "<<", z, Uint128.Lsh, (*big.Int).Lsh)
		checkShiftOp(x, ">>", z, Uint128.Rsh, (*big.Int).Rsh)

		// check 64-bit variants
		y64 := y.Lo
		checkBinOp64X(x, "[+]", y64, Uint128.Add64, (*big.Int).Add)
		checkBinOp64X(x, "[-]", y64, Uint128.Sub64, (*big.Int).Sub)
		checkBinOp64X(x, "[*]", y64, Uint128.Mul64, (*big.Int).Mul)
		checkBinOp64(x, "+", y64, Uint128.AddWrap64, (*big.Int).Add)
		checkBinOp64(x, "-", y64, Uint128.SubWrap64, (*big.Int).Sub)
		checkBinOp64(x, "*", y64, Uint128.MulWrap64, (*big.Int).Mul)
		if y64 != 0 {
			checkBinOp64(x, "/", y64, Uint128.Div64, (*big.Int).Div)
			modfn := func(x Uint128, y uint64) Uint128 {
				return NewUint128FromUint64(x.Mod64(y))
			}
			checkBinOp64(x, "%", y64, modfn, (*big.Int).Mod)
		}
		checkBinOp64(x, "&", y64, Uint128.And64, (*big.Int).And)
		checkBinOp64(x, "|", y64, Uint128.Or64, (*big.Int).Or)
		checkBinOp64(x, "^", y64, Uint128.Xor64, (*big.Int).Xor)
	}
}

func TestOverflowAndUnderflow(t *testing.T) {
	x := MaxUint128()
	y := NewUint128(10, 10)
	z := NewUint128FromUint64(10)
	checkPanic := func(fn func(), err error) {
		defer func() {
			r := recover()
			if s, ok := r.(error); !ok || !errors.Is(err, s) {
				t.Errorf("expected %q, got %q", err, r)
			}
		}()
		fn()
	}

	// should panic
	checkPanic(func() { _ = x.Add(y) }, errOverflow)
	checkPanic(func() { _ = x.Add64(10) }, errOverflow)
	checkPanic(func() { _ = y.Sub(x) }, errUnderflow)
	checkPanic(func() { _ = z.Sub64(math.MaxInt64) }, errUnderflow)
	checkPanic(func() { _ = x.Mul(y) }, errOverflow)
	checkPanic(func() { _ = NewUint128(0, 10).Mul(NewUint128(0, 10)) }, errOverflow)
	checkPanic(func() { _ = NewUint128(0, 1).Mul(NewUint128(0, 1)) }, errOverflow)
	checkPanic(func() { _ = x.Mul64(math.MaxInt64) }, errOverflow)
}

func TestLeadingZeros(t *testing.T) {
	tcs := []struct {
		l     Uint128
		r     Uint128
		zeros int
	}{
		{
			l:     NewUint128(0x00, 0xf000000000000000),
			r:     NewUint128(0x00, 0x8000000000000000),
			zeros: 1,
		},
		{
			l:     NewUint128(0x00, 0xf000000000000000),
			r:     NewUint128(0x00, 0xc000000000000000),
			zeros: 2,
		},
		{
			l:     NewUint128(0x00, 0xf000000000000000),
			r:     NewUint128(0x00, 0xe000000000000000),
			zeros: 3,
		},
		{
			l:     NewUint128(0x00, 0xffff000000000000),
			r:     NewUint128(0x00, 0xff00000000000000),
			zeros: 8,
		},
		{
			l:     NewUint128(0x00, 0x000000000000ffff),
			r:     NewUint128(0x00, 0x000000000000ff00),
			zeros: 56,
		},
		{
			l:     NewUint128(0xf000000000000000, 0x01),
			r:     NewUint128(0x4000000000000000, 0x00),
			zeros: 63,
		},
		{
			l:     NewUint128(0xf000000000000000, 0x00),
			r:     NewUint128(0x4000000000000000, 0x00),
			zeros: 64,
		},
		{
			l:     NewUint128(0xf000000000000000, 0x00),
			r:     NewUint128(0x8000000000000000, 0x00),
			zeros: 65,
		},
		{
			l:     NewUint128(0x00, 0x00),
			r:     NewUint128(0x00, 0x00),
			zeros: 128,
		},
		{
			l:     NewUint128(0x01, 0x00),
			r:     NewUint128(0x00, 0x00),
			zeros: 127,
		},
	}

	for _, tc := range tcs {
		zeros := tc.l.Xor(tc.r).LeadingZeros()
		if zeros != tc.zeros {
			t.Errorf("mismatch (expected: %d, got: %d)", tc.zeros, zeros)
		}
	}
}

func TestString(t *testing.T) {
	for i := 0; i < 1000; i++ {
		x := randUint128()
		if x.String() != toBig(x).String() {
			t.Fatalf("mismatch:\n%v !=\n%v", x.String(), toBig(x))
		}
	}
	// Test 0 string
	if ZeroUint128().String() != "0" {
		t.Fatalf(`Zero.String() should be "0", got %q`, ZeroUint128().String())
	}
	// Test Max string
	if MaxUint128().String() != "340282366920938463463374607431768211455" {
		t.Fatalf(`Max.String() should be "0", got %q`, MaxUint128().String())
	}
}

func TestUint128_FromBytes(t *testing.T) {
	type testCase struct {
		bytes  []byte
		errors bool
	}
	tests := map[string]testCase{
		"ok": {
			bytes:  []byte{0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15},
			errors: false,
		},
		"invalid length": {
			bytes:  nil,
			errors: true,
		},
	}

	for name, tc := range tests {
		tc := tc
		t.Run(name, func(t *testing.T) {
			u := &Uint128{}
			err := u.FromLEBytes(tc.bytes)
			if tc.errors && err == nil {
				t.Fatalf("error expected")
			}
			if !tc.errors && err != nil {
				t.Fatalf("unexpected error: %s", err)
			}
		})
	}
}

func TestUint128_SafeQuoRem64(t *testing.T) {
	type test struct {
		uint128   Uint128
		uint64    uint64
		expected  Uint128
		remainder uint64
		errors    bool
	}

	tests := map[string]test{
		"division by zero": {
			uint128:   NewUint128FromUint64(100),
			uint64:    0,
			expected:  Uint128{},
			remainder: 0,
			errors:    true,
		},
	}

	for name, tc := range tests {
		tc := tc
		t.Run(name, func(t *testing.T) {
			result, remainder, err := tc.uint128.SafeQuoRem64(tc.uint64)
			if err != nil && !tc.errors {
				t.Fatalf("unexpected error: %s", err)
			}
			if err == nil && tc.errors {
				t.Fatalf("expected error")
			}

			if result != tc.expected {
				t.Fatalf("unexpected result, wanted: %s got: %s", tc.expected, result)
			}
			if remainder != tc.remainder {
				t.Fatalf("unexpected remainder, wanted: %d got: %d", tc.remainder, remainder)
			}
		})
	}
}

func TestUint128_PutBEBytes(t *testing.T) {
	type test struct {
		u128 Uint128
	}

	tests := map[string]test{
		"ok": {
			u128: maxUint128,
		},
	}

	for name, tc := range tests {
		tc := tc
		t.Run(name, func(t *testing.T) {
			b := make([]byte, 16)
			tc.u128.PutBEBytes(b)
			got := &Uint128{}
			err := got.FromBEBytes(b)
			if err != nil {
				t.Fatalf("unexpected error: %s", err)
			}

			if !reflect.DeepEqual(tc.u128, *got) {
				t.Fatalf("from bytes to bytes unmatch: %s - %s", tc.u128, got)
			}
		})
	}
}

func TestUint128_FromBEBytes(t *testing.T) {
	type test struct {
		b            []byte
		expectedU128 Uint128
		err          error
	}

	tests := map[string]test{
		"ok": {
			b:            []byte{0xf, 0xf, 0xf, 0xf, 0xf, 0xf, 0xf, 0xf, 0xf, 0xf, 0xf, 0xf, 0xf, 0xf, 0xf, 0xf},
			expectedU128: maxUint128,
			err:          nil,
		},
		"invalid length": {
			b:   []byte{0x1},
			err: errInvalidUint128Size,
		},
	}

	for name, tc := range tests {
		tc := tc
		t.Run(name, func(t *testing.T) {
			got := &Uint128{}
			err := got.FromBEBytes(tc.b)
			if err != nil && tc.err == nil {
				t.Fatalf("unexpected error: %s", err)
			}

			if !errors.Is(err, tc.err) {
				t.Fatalf("expected error: %s, got: %s", tc.err, err)
			}

		})
	}
}

func randomUint128String(t *testing.T) (string, Uint128) {
	i, err := rand.Int(rand.Reader, maxUint128Big)
	if err != nil {
		t.Fatalf("failed test precondition: %s", err)
	}

	// impossible this happens, but just wanna make sure
	if i.Sign() < 0 {
		panic("value cannot be negative")
	} else if i.BitLen() > 128 {
		panic("value overflows Uint128")
	}
	return i.String(), NewUint128(i.Uint64(), new(big.Int).Rsh(i, 64).Uint64())
}

func TestUint128_FromString(t *testing.T) {
	type test struct {
		str             string
		expectedUint128 Uint128
		expectedErr     error
	}

	okStr, okU128 := randomUint128String(t)
	tests := map[string]test{
		"ok": {
			str:             "1204595495959596854934",
			expectedUint128: NewUint128(5557131168475999894, 65),
			expectedErr:     nil,
		},
		"ok zero": {
			str:             "0",
			expectedUint128: zeroUint128,
			expectedErr:     nil,
		},
		"ok u64": {
			str:             "123456",
			expectedUint128: Uint128{Lo: 123456},
			expectedErr:     nil,
		},
		"ok bigger than u64": {
			str:             "340282366920938463463374607431768211455",
			expectedUint128: maxUint128,
		},
		"ok random": {
			str:             okStr,
			expectedUint128: okU128,
			expectedErr:     nil,
		},
		"negative": {
			str:         "-12345",
			expectedErr: errInvalidUint128String,
		},
		"empty string": {
			str:             "",
			expectedUint128: Uint128{},
			expectedErr:     errInvalidUint128String,
		},

		"non numeric string": {
			str:             "0a",
			expectedUint128: Uint128{},
			expectedErr:     errInvalidUint128String,
		},

		"invalid length": {
			str:             "1000000000000000000000000000000000000000000",
			expectedErr:     errInvalidUint128String,
			expectedUint128: Uint128{},
		},
	}

	for name, tc := range tests {
		tc := tc
		t.Run(name, func(t *testing.T) {
			gotU128 := ZeroUint128()
			gotErr := (&gotU128).FromString(tc.str)
			if !errors.Is(gotErr, tc.expectedErr) {
				t.Fatalf("unexpected error, want: %s, got: %s", tc.expectedErr, gotErr)
			}

			if gotErr != nil {
				return
			}

			if !tc.expectedUint128.Equals(gotU128) {
				t.Fatalf("unexpected result:\n\twanted: %s (%d, %d)\n\tgot: %s (%d, %d)",
					tc.expectedUint128, tc.expectedUint128.Lo, tc.expectedUint128.Hi,
					gotU128, gotU128.Lo, gotU128.Hi)
			}
		})
	}
}

func TestUint128_MarshalJSON(t *testing.T) {
	type jsonTestType struct {
		Amount Uint128 `json:"amount"`
	}

	type test struct {
		u128 Uint128
	}

	tests := map[string]test{
		"ok zero": {u128: zeroUint128},
		"ok u64":  {u128: NewUint128FromUint64(10000)},
		"ok u128": {u128: NewUint128(5557131168475999894, 65)},
	}

	for name, tc := range tests {
		t.Run(name, func(t *testing.T) {
			b, err := json.Marshal(jsonTestType{Amount: tc.u128})
			if err != nil {
				t.Fatalf("unexpected error: %s", err)
			}

			gotU128 := new(jsonTestType)
			err = json.Unmarshal(b, gotU128)
			if err != nil {
				t.Fatalf("unexpected error: %s", err)
			}

			if !gotU128.Amount.Equals(tc.u128) {
				t.Fatalf("marshal and unmarshal are not opposites:\n\twanted: %s\n\tgot: %s", tc.u128, gotU128)
			}
		})
	}
}

func TestUint128_UnmarshalJSON(t *testing.T) {
	type jsonTestType struct {
		Amount Uint128 `json:"amount"`
	}
	type test struct {
		jsonBytes       []byte
		expectedUint128 Uint128
		expectedError   error
	}

	tests := map[string]test{
		"ok zero": {
			jsonBytes:       []byte(`{"amount":"0"}`),
			expectedUint128: zeroUint128,
			expectedError:   nil,
		},
		"ok u64": {
			jsonBytes:       []byte(`{"amount": "5804835"}`),
			expectedUint128: NewUint128FromUint64(5804835),
		},
		"ok u128": {
			jsonBytes:       []byte(`{"amount": "1204595495959596854934"}`),
			expectedUint128: NewUint128(5557131168475999894, 65),
		},

		"no double quotes": {
			jsonBytes:     []byte(`{"amount": {"something": "else"}}`),
			expectedError: errInvalidUint128String,
		},

		"invalid size": {
			jsonBytes:     []byte(`{"amount": 0}`),
			expectedError: errInvalidUint128String,
		},
		"empty string": {
			jsonBytes:     []byte(`{"amount": ""}`),
			expectedError: errInvalidUint128String,
		},
	}

	for name, tc := range tests {
		tc := tc
		t.Run(name, func(t *testing.T) {
			jsonType := new(jsonTestType)
			err := json.Unmarshal(tc.jsonBytes, jsonType)
			if !errors.Is(err, tc.expectedError) {
				t.Fatalf("unexpected error: %s", err)
			}

			if err != nil {
				return
			}

			gotU128 := jsonType.Amount
			if !tc.expectedUint128.Equals(gotU128) {
				t.Fatalf("unexpected result:\n\twanted: %s (%d, %d)\n\tgot: %s (%d, %d)",
					tc.expectedUint128, tc.expectedUint128.Lo, tc.expectedUint128.Hi,
					gotU128, gotU128.Lo, gotU128.Hi)
			}
		})
	}
}

func TestUint128_Cmp(t *testing.T) {
	type testCase struct {
		name string
		a    Uint128
		b    Uint128
		//
		expLT  bool
		expLTE bool
		expGT  bool
		expGTE bool
	}

	testCases := []testCase{
		{
			name:  "0 vs 0",
			a:     NewUint128FromUint64(0),
			b:     NewUint128FromUint64(0),
			expLT: false, expLTE: true,
			expGT: false, expGTE: true,
		},
		{
			name:  "1 vs 0",
			a:     NewUint128FromUint64(1),
			b:     NewUint128FromUint64(0),
			expLT: false, expLTE: false,
			expGT: true, expGTE: true,
		},
		{
			name:  "0 vs 1",
			a:     NewUint128FromUint64(0),
			b:     NewUint128FromUint64(1),
			expLT: true, expLTE: true,
			expGT: false, expGTE: false,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			assert.Equalf(t, tc.expLT, tc.a.LT(tc.b), "LT")
			assert.Equalf(t, tc.expLTE, tc.a.LTE(tc.b), "LTE")
			assert.Equalf(t, tc.expGT, tc.a.GT(tc.b), "GT")
			assert.Equalf(t, tc.expGTE, tc.a.GTE(tc.b), "GTE")
		})
	}
}

func BenchmarkArithmetic(b *testing.B) {
	randBuf := make([]byte, 17)
	randUint128 := func() Uint128 {
		rand.Read(randBuf)
		var Lo, Hi uint64
		if randBuf[16]&1 != 0 {
			Lo = binary.LittleEndian.Uint64(randBuf[:8])
		}
		if randBuf[16]&2 != 0 {
			Hi = binary.LittleEndian.Uint64(randBuf[8:])
		}
		return NewUint128(Lo, Hi)
	}
	x, y := randUint128(), randUint128()

	b.Run("Add native", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			_ = x.Lo * y.Lo
		}
	})

	b.Run("Add", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			x.Add(y)
		}
	})

	b.Run("Sub", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			x.Sub(y)
		}
	})

	b.Run("Mul", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			x.Mul(y)
		}
	})

	b.Run("Lsh", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			x.Lsh(17)
		}
	})

	b.Run("Rsh", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			x.Rsh(17)
		}
	})

	b.Run("Cmp64", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			x.Cmp64(y.Lo)
		}
	})
}

func BenchmarkDivision(b *testing.B) {
	randBuf := make([]byte, 8)
	randU64 := func() uint64 {
		rand.Read(randBuf)
		return binary.LittleEndian.Uint64(randBuf) | 3 // avoid divide-by-zero
	}
	x64 := NewUint128FromUint64(randU64())
	y64 := NewUint128FromUint64(randU64())
	x128 := NewUint128(randU64(), randU64())
	y128 := NewUint128(randU64(), randU64())

	b.Run("native 64/64", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			_ = x64.Lo / y64.Lo
		}
	})
	b.Run("Div64 64/64", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			x64.Div64(y64.Lo)
		}
	})
	b.Run("Div64 128/64", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			x128.Div64(y64.Lo)
		}
	})
	b.Run("Div 64/64", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			x64.Div(y64)
		}
	})
	b.Run("Div 128/64-Lo", func(b *testing.B) {
		x := x128
		x.Hi = y64.Lo - 1
		for i := 0; i < b.N; i++ {
			x.Div(y64)
		}
	})
	b.Run("Div 128/64-Hi", func(b *testing.B) {
		x := x128
		x.Hi = y64.Lo + 1
		for i := 0; i < b.N; i++ {
			x.Div(y64)
		}
	})
	b.Run("Div 128/128", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			x128.Div(y128)
		}
	})
	b.Run("big.Int 128/64", func(b *testing.B) {
		xb, yb := toBig(x128), toBig(y64)
		q := new(big.Int)
		for i := 0; i < b.N; i++ {
			q = q.Div(xb, yb)
		}
	})
	b.Run("big.Int 128/128", func(b *testing.B) {
		xb, yb := toBig(x128), toBig(y128)
		q := new(big.Int)
		for i := 0; i < b.N; i++ {
			q = q.Div(xb, yb)
		}
	})
}

func BenchmarkString(b *testing.B) {
	buf := make([]byte, 16)
	rand.Read(buf)
	x := NewUint128(
		binary.LittleEndian.Uint64(buf[:8]),
		binary.LittleEndian.Uint64(buf[8:]),
	)
	xb := toBig(x)
	b.Run("Uint128", func(b *testing.B) {
		b.ReportAllocs()
		for i := 0; i < b.N; i++ {
			_ = x.String()
		}
	})
	b.Run("big.Int", func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			_ = xb.String()
		}
	})
}
