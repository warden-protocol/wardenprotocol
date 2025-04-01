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

	t.Run("plain get test", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{"nestedKey2":{"nestedKey1":{"nestedKey":"nestedValue"}}}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()

		setObjectResponse, err := iJsonClient.Get(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1")
		require.NoError(t, err)

		setObjectResponseParsed, err := gabs.ParseJSON(setObjectResponse)
		require.NoError(t, err)
		require.Equal(t, "nestedValue", setObjectResponseParsed.Path("nestedKey").Data().(string))
	})

	t.Run("get string test", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{"nestedKey2":{"nestedKey1":{"nestedKey":"nestedValue"}}}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()

		getResponse, err := iJsonClient.GetString(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1.nestedKey")
		require.NoError(t, err)
		require.Equal(t, "nestedValue", getResponse)
	})

	t.Run("get bool test", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{"nestedKey2":{"nestedKey1":{"nestedKey": true}}}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()

		getResponse, err := iJsonClient.GetBool(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1.nestedKey")
		require.NoError(t, err)
		require.Equal(t, true, getResponse)
	})

	t.Run("get address test", func(t *testing.T) {
		// Arrange
		newJsonObject, err := gabs.ParseJSON([]byte(`{"nestedKey2":{"nestedKey1":{"nestedKey": "0x0000000000000000000000000000000000000905"}}}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()

		// Act
		getResponse, err := iJsonClient.GetAddress(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1.nestedKey")

		// Assert
		require.NoError(t, err)
		require.Equal(t, common.HexToAddress(jsonPrecompile.PrecompileAddress), getResponse)
	})

	t.Run("get int256 test", func(t *testing.T) {
		// Arrange
		dec := json.NewDecoder(bytes.NewReader([]byte(`{"nestedKey2":{"nestedKey1":{"nestedKey":340282366920938463463374607431768211455}}}`)))
		dec.UseNumber()
		newJsonObject, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)
		newJsonObjectBytes := newJsonObject.EncodeJSON()

		expectedValue, _ := new(big.Int).SetString("340282366920938463463374607431768211455", 10)

		// Act
		getResponse, err := iJsonClient.GetInt256(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1.nestedKey")

		// Assert
		require.NoError(t, err)
		require.Equal(t, expectedValue, getResponse)
	})

	t.Run("get uint256 test", func(t *testing.T) {
		// Arrange
		dec := json.NewDecoder(bytes.NewReader([]byte(`{"nestedKey2":{"nestedKey1":{"nestedKey":340282366920938463463374607431768211455}}}`)))
		dec.UseNumber()
		newJsonObject, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)
		newJsonObjectBytes := newJsonObject.EncodeJSON()

		expectedValue, _ := new(big.Int).SetString("340282366920938463463374607431768211455", 10)

		// Act
		getResponse, err := iJsonClient.GetUint256(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1.nestedKey")

		// Assert
		require.NoError(t, err)
		require.Equal(t, expectedValue, getResponse)
	})

	t.Run("get float test", func(t *testing.T) {
		// Arrange
		dec := json.NewDecoder(bytes.NewReader([]byte(`{"nestedKey2":{"nestedKey1":{"nestedKey":0.1}}}`)))
		dec.UseNumber()
		newJsonObject, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)
		newJsonObjectBytes := newJsonObject.EncodeJSON()

		expectedValue1 := big.NewInt(0)
		expectedValue2 := big.NewInt(1)
		expectedValue3 := big.NewInt(10)

		// Act
		getResponse1, err := iJsonClient.GetFloat(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1.nestedKey", 0)
		getResponse2, err := iJsonClient.GetFloat(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1.nestedKey", 1)
		getResponse3, err := iJsonClient.GetFloat(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1.nestedKey", 2)

		// Assert
		require.NoError(t, err)
		require.Equal(t, expectedValue1.Int64(), getResponse1.Int64())
		require.Equal(t, expectedValue2, getResponse2)
		require.Equal(t, expectedValue3, getResponse3)
	})
}
