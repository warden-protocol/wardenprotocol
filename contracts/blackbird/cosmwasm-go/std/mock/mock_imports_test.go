package mock

import (
	"encoding/hex"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/CosmWasm/cosmwasm-go/std"
	"github.com/CosmWasm/cosmwasm-go/std/types"
)

func TestMockStorage(t *testing.T) {
	es := Storage()
	key1, key2, key3, key4, key5 := []byte("aaaaa"), []byte("bbbbb"), []byte("ccccc"), []byte("ddddd"), []byte("eeeee")
	value1, value2, value3, value4, value5 := []byte("11111"), []byte("22222"), []byte("33333"), []byte("44444"), []byte("55555")
	inexistentKey := []byte("inexistent")

	// setter && getter
	bytes := es.Get(key1)
	require.Nil(t, bytes)
	es.Set(key1, value1)
	es.Set(key2, value2)
	es.Set(key3, value3)
	es.Set(key4, value4)
	es.Set(key5, value5)

	// iterator
	// ascending
	iter := es.Range([]byte{'a'}, []byte{'d'}, std.Ascending)
	assertKV(t, iter, key1, value1, false)
	assertKV(t, iter, key2, value2, false)
	assertKV(t, iter, key3, value3, false)
	assertKV(t, iter, key4, value4, true)
	// descending
	iter = es.Range([]byte{'b'}, []byte("eeeef"), std.Descending)
	assertKV(t, iter, key5, value5, false)
	assertKV(t, iter, key4, value4, false)
	assertKV(t, iter, key3, value3, false)
	assertKV(t, iter, key2, value2, false)
	assertKV(t, iter, key1, value1, true)

	// delete
	es.Remove(inexistentKey)
	es.Remove(key1)
	bytes = es.Get(key1)
	require.Nil(t, bytes)

}

func assertKV(t *testing.T, iter std.Iterator, key, value []byte, isEnd bool) {
	curKey, curValue, err := iter.Next()
	if isEnd {
		require.Error(t, err)
		require.Nil(t, curKey)
		require.Nil(t, curValue)
		return
	}
	require.NoError(t, err)
	require.Equal(t, curKey, key)
	require.Equal(t, curValue, value)
}

func TestMockApi_CanonicalAddress(t *testing.T) {
	ea := api{}
	humanAddr := "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
	longHumanAddr := humanAddr + "a"
	expectedCanonAddr := types.CanonicalAddress(humanAddr)

	canonAddr, err := ea.CanonicalAddress(longHumanAddr)
	require.Error(t, err)
	require.Nil(t, canonAddr)

	canonAddr, err = ea.CanonicalAddress(humanAddr)
	require.NoError(t, err)
	require.Equal(t, expectedCanonAddr, canonAddr)
}

func TestMockApi_HumanAddress(t *testing.T) {
	ea := api{}
	expectedHumanAddr := "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
	expectedCanonAddr := types.CanonicalAddress(expectedHumanAddr)

	humanAddr, err := ea.HumanAddress(expectedCanonAddr)
	require.NoError(t, err)
	require.Equal(t, expectedHumanAddr, humanAddr)

	// error report
	longCanonAddr := make(types.CanonicalAddress, canonicalAddressLength)
	copy(longCanonAddr, expectedCanonAddr)
	longCanonAddr = append(longCanonAddr, 'a')
	humanAddr, err = ea.HumanAddress(longCanonAddr)
	require.Error(t, err)
	require.Equal(t, "", humanAddr)

	inputCanonAddr := make(types.CanonicalAddress, canonicalAddressLength)
	copy(inputCanonAddr, expectedCanonAddr)
	inputCanonAddr[9] = 0
	humanAddr, err = ea.HumanAddress(inputCanonAddr)
	require.NoError(t, err)
	require.Equal(t, "aaaaaaaaa", humanAddr)
}

func TestMockApi_VerifySecp256k1Signature(t *testing.T) {
	type testCase struct {
		name            string
		hashHexStr      string
		signatureHexStr string
		pubKeyHexStr    string
		//
		errExpected bool
		resExpected bool
	}

	testCases := []testCase{
		{
			name:            "OK: valid signature",
			hashHexStr:      "5ae8317d34d1e595e3fa7247db80c0af4320cce1116de187f8f7e2e099c0d8d0",
			signatureHexStr: "207082eb2c3dfa0b454e0906051270ba4074ac93760ba9e7110cd9471475111151eb0dbbc9920e72146fb564f99d039802bf6ef2561446eb126ef364d21ee9c4",
			pubKeyHexStr:    "04051c1ee2190ecfb174bfe4f90763f2b4ff7517b70a2aec1876ebcfd644c4633fb03f3cfbd94b1f376e34592d9d41ccaf640bb751b00a1fadeb0c01157769eb73",
			resExpected:     true,
		},
		{
			name:            "OK: invalid signature",
			hashHexStr:      "5ae8317d34d1e595e3fa7247db80c0af4320cce1116de187f8f7e2e099c0d8d0",
			signatureHexStr: "207082eb2c3dfa0b454e0906051270ba4074ac93760ba9e7110cd9471475111151eb0dbbc9920e72146fb564f99d039802bf6ef2561446eb126ef364d21ee900",
			pubKeyHexStr:    "04051c1ee2190ecfb174bfe4f90763f2b4ff7517b70a2aec1876ebcfd644c4633fb03f3cfbd94b1f376e34592d9d41ccaf640bb751b00a1fadeb0c01157769eb73",
			resExpected:     false,
		},
		{
			name:            "Fail: invalid hash",
			hashHexStr:      "",
			signatureHexStr: "207082eb2c3dfa0b454e0906051270ba4074ac93760ba9e7110cd9471475111151eb0dbbc9920e72146fb564f99d039802bf6ef2561446eb126ef364d21ee9c4",
			pubKeyHexStr:    "04051c1ee2190ecfb174bfe4f90763f2b4ff7517b70a2aec1876ebcfd644c4633fb03f3cfbd94b1f376e34592d9d41ccaf640bb751b00a1fadeb0c01157769eb73",
			errExpected:     true,
		},
		{
			name:            "Fail: invalid signature",
			hashHexStr:      "5ae8317d34d1e595e3fa7247db80c0af4320cce1116de187f8f7e2e099c0d8d0",
			signatureHexStr: "207082eb2c3dfa0b454e0906051270ba4074ac93760ba9e7110cd9471475111151eb0dbbc9920e72146fb564f99d039802bf6ef2561446eb126ef364d21ee9",
			pubKeyHexStr:    "04051c1ee2190ecfb174bfe4f90763f2b4ff7517b70a2aec1876ebcfd644c4633fb03f3cfbd94b1f376e34592d9d41ccaf640bb751b00a1fadeb0c01157769eb73",
			errExpected:     true,
		},
		{
			name:            "Fail: invalid pubKey",
			hashHexStr:      "5ae8317d34d1e595e3fa7247db80c0af4320cce1116de187f8f7e2e099c0d8d0",
			signatureHexStr: "207082eb2c3dfa0b454e0906051270ba4074ac93760ba9e7110cd9471475111151eb0dbbc9920e72146fb564f99d039802bf6ef2561446eb126ef364d21ee9c4",
			pubKeyHexStr:    "04051c1ee2190ecfb174bfe4f90763f2b4ff7517b70a2aec1876ebcfd644c4633fb03f3cfbd94b1f376e34592d9d41ccaf640bb751b00a1fadeb0c01157769eb",
			errExpected:     true,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			hash, err := hex.DecodeString(tc.hashHexStr)
			require.NoError(t, err)
			sig, err := hex.DecodeString(tc.signatureHexStr)
			require.NoError(t, err)
			pubKey, err := hex.DecodeString(tc.pubKeyHexStr)
			require.NoError(t, err)

			res, err := api{}.VerifySecp256k1Signature(hash, sig, pubKey)
			if tc.errExpected {
				assert.Error(t, err)
				return
			}

			require.NoError(t, err)
			assert.Equal(t, tc.resExpected, res)
		})
	}
}

func TestMockApi_VerifyEd25519Signature(t *testing.T) {
	type testCase struct {
		name            string
		msg             []byte
		signatureHexStr string
		pubKeyHexStr    string
		//
		errExpected bool
		resExpected bool
	}

	testCases := []testCase{
		{
			name:            "OK: valid signature (cosmwasm example)",
			msg:             []byte("Hello World!"),
			signatureHexStr: "dea09a2edbcc545c3875ec482602dd61b68273a24f7562db3fb425ee9dbd863ae732a6ade9e72e04bc32c2bd269b25b59342d6da66898f809d0b7e40d8914f05",
			pubKeyHexStr:    "bc1c3a48e8b583d7b990e8cbdd0a54744a3152715e20dd4f9451c532d6bbbd7b",
			resExpected:     true,
		},
		{
			name:            "OK: invalid signature",
			msg:             []byte("Hello!"),
			signatureHexStr: "dea09a2edbcc545c3875ec482602dd61b68273a24f7562db3fb425ee9dbd863ae732a6ade9e72e04bc32c2bd269b25b59342d6da66898f809d0b7e40d8914f05",
			pubKeyHexStr:    "bc1c3a48e8b583d7b990e8cbdd0a54744a3152715e20dd4f9451c532d6bbbd7b",
			resExpected:     false,
		},
		{
			name:            "Fail: invalid signature len",
			msg:             []byte("Hello World!"),
			signatureHexStr: "dea09a2edbcc545c3875ec482602dd61b68273a24f7562db3fb425ee9dbd863ae732a6ade9e72e04bc32c2bd269b25b59342d6da66898f809d0b7e40d8914f",
			pubKeyHexStr:    "bc1c3a48e8b583d7b990e8cbdd0a54744a3152715e20dd4f9451c532d6bbbd7b",
			errExpected:     true,
		},
		{
			name:            "Fail: invalid pubKey len",
			msg:             []byte("Hello World!"),
			signatureHexStr: "dea09a2edbcc545c3875ec482602dd61b68273a24f7562db3fb425ee9dbd863ae732a6ade9e72e04bc32c2bd269b25b59342d6da66898f809d0b7e40d8914f",
			pubKeyHexStr:    "bc1c3a48e8b583d7b990e8cbdd0a54744a3152715e20dd4f9451c532d6bbbd",
			errExpected:     true,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			sig, err := hex.DecodeString(tc.signatureHexStr)
			require.NoError(t, err)
			pubKey, err := hex.DecodeString(tc.pubKeyHexStr)
			require.NoError(t, err)

			res, err := api{}.VerifyEd25519Signature(tc.msg, sig, pubKey)
			if tc.errExpected {
				assert.Error(t, err)
				return
			}

			require.NoError(t, err)
			assert.Equal(t, tc.resExpected, res)
		})
	}
}
