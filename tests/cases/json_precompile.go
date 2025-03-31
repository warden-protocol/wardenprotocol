package cases

import (
	"bytes"
	"context"
	"encoding/json"
	"math/big"
	"testing"

	"github.com/Jeffail/gabs/v2"
	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"

	jsonPrecompile "github.com/warden-protocol/wardenprotocol/precompiles/json"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
)

func init() {
	Register(&Test_JsonPrecompile{})
}

type Test_JsonPrecompile struct {
	w *exec.WardenNode
}

func (c *Test_JsonPrecompile) Setup(t *testing.T, ctx context.Context, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, ctx, "./testdata/snapshot-many-users")
	c.w.WaitRunning(t)
}

func (c *Test_JsonPrecompile) Run(t *testing.T, ctx context.Context, _ framework.BuildResult) {
	alice := exec.NewWardend(c.w, "alice")

	evmClient := c.w.EthClient(t)
	iJsonClient, err := jsonPrecompile.NewIJson(common.HexToAddress(jsonPrecompile.PrecompileAddress), evmClient)
	require.NoError(t, err)

	t.Run("set string value", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()

		setStringResponse, err := iJsonClient.SetString(alice.CallOps(t), newJsonObjectBytes, "someKey", "someValue")
		require.NoError(t, err)

		setStringResponseParsed, err := gabs.ParseJSON(setStringResponse)
		require.NoError(t, err)
		require.Equal(t, "someValue", setStringResponseParsed.Path("someKey").Data().(string))
	})

	t.Run("set address value", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()

		setStringResponse, err := iJsonClient.SetAddress(alice.CallOps(t), newJsonObjectBytes, "someKey", common.HexToAddress(jsonPrecompile.PrecompileAddress))
		require.NoError(t, err)

		setStringResponseParsed, err := gabs.ParseJSON(setStringResponse)
		require.NoError(t, err)
		require.Equal(t, jsonPrecompile.PrecompileAddress, setStringResponseParsed.Path("someKey").Data().(string))
	})

	t.Run("set int256 value", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()

		int256Value, ok := new(big.Int).SetString("340282366920938463463374607431768211455", 10)
		require.True(t, ok, "Failed to create big.Int from string")

		setIntResponse, err := iJsonClient.SetInt256(alice.CallOps(t), newJsonObjectBytes, "intKey", int256Value)
		require.NoError(t, err)

		decoder := json.NewDecoder(bytes.NewReader(setIntResponse))
		decoder.UseNumber()

		setIntResponseParsed, err := gabs.ParseJSONDecoder(decoder)
		require.NoError(t, err)

		intKeyValue, ok := setIntResponseParsed.Path("intKey").Data().(json.Number)
		require.True(t, ok, "Expected intKey to be of type json.Number")

		intKeyValueBigInt, ok := new(big.Int).SetString(intKeyValue.String(), 10)
		require.True(t, ok, "Failed to convert intKeyValue to big.Int")
		require.Equal(t, int256Value, intKeyValueBigInt)
	})

	t.Run("set uint256 value", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()

		uint256Value, ok := new(big.Int).SetString("340282366920938463463374607431768211455", 10)
		require.True(t, ok, "Failed to create big.Int from string")

		setUint256Response, err := iJsonClient.SetUint256(alice.CallOps(t), newJsonObjectBytes, "uintKey", uint256Value)
		require.NoError(t, err)

		decoder := json.NewDecoder(bytes.NewReader(setUint256Response))
		decoder.UseNumber()

		setUintResponseParsed, err := gabs.ParseJSONDecoder(decoder)
		require.NoError(t, err)

		uintKeyValue, ok := setUintResponseParsed.Path("uintKey").Data().(json.Number)
		require.True(t, ok, "Expected uintKey to be of type json.Number")

		uintKeyValueBigInt, ok := new(big.Int).SetString(uintKeyValue.String(), 10)
		require.True(t, ok, "Failed to convert uintKeyValue to big.Int")
		require.Equal(t, uint256Value, uintKeyValueBigInt)
	})

	t.Run("set boolean value", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()

		setBoolResponse, err := iJsonClient.SetBool(alice.CallOps(t), newJsonObjectBytes, "boolKey", true)
		require.NoError(t, err)

		setBoolResponseParsed, err := gabs.ParseJSON(setBoolResponse)
		require.NoError(t, err)
		require.Equal(t, true, setBoolResponseParsed.Path("boolKey").Data().(bool))
	})

	t.Run("set nested object", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		nestedObject, err := gabs.ParseJSON([]byte(`{"nestedKey": "nestedValue"}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()
		nestedObjectBytes := nestedObject.EncodeJSON()

		setObjectResponse, err := iJsonClient.SetObject(alice.CallOps(t), newJsonObjectBytes, "objectKey", nestedObjectBytes)
		require.NoError(t, err)

		setObjectResponseParsed, err := gabs.ParseJSON(setObjectResponse)
		require.NoError(t, err)
		require.Equal(t, "nestedValue", setObjectResponseParsed.Path("objectKey.nestedKey").Data().(string))
	})

	// t.Run("set bytes", func(t *testing.T) {
	// 	newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
	// 	require.NoError(t, err)

	// 	newJsonObjectBytes := newJsonObject.EncodeJSON()
	// 	nestedObjectBytes := []byte(`{"nestedKey": "nestedValue"}`)

	// 	setObjectResponse, err := iJsonClient.SetBytes(alice.CallOps(t), newJsonObjectBytes, "objectKey", nestedObjectBytes)
	// 	require.NoError(t, err)

	// 	setObjectResponseParsed, err := gabs.ParseJSON(setObjectResponse)
	// 	require.NoError(t, err)
	// 	require.Equal(t, nestedObjectBytes, setObjectResponseParsed.Path("objectKey").Data().([]byte))
	// })
}
