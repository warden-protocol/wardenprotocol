package cases

import (
	"bytes"
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

func (c *Test_JsonPrecompile) Setup(t *testing.T, f *framework.F) {
	c.w = f.GetWardenNode()
	go c.w.Start(t, "./testdata/snapshot-many-users")
	c.w.WaitRunning(t)
}

func (c *Test_JsonPrecompile) Run(t *testing.T, _ *framework.F) {
	alice := exec.NewWardend(c.w, "alice")

	evmClient := c.w.EthClient(t)
	iJsonClient, err := jsonPrecompile.NewIJson(common.HexToAddress(jsonPrecompile.PrecompileAddress), evmClient)
	require.NoError(t, err)

	t.Run("create empty json", func(t *testing.T) {
		newJsonObjectBytes, err := iJsonClient.NewJson(alice.CallOps(t))
		require.NoError(t, err)
		require.Equal(t, "{}", string(newJsonObjectBytes))
	})

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

	t.Run("set float", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()

		testCases := []struct {
			value    *big.Int
			decimals int64
			expected string
		}{
			{big.NewInt(-2), 3, "-0.002"},
			{big.NewInt(-1), 2, "-0.01"},
			{big.NewInt(-3), 1, "-0.3"},
			{big.NewInt(-3), 0, "-3"},
		}

		for _, testCase := range testCases {
			setResponse, err := iJsonClient.SetFloat(alice.CallOps(t), newJsonObjectBytes, "floatKey", testCase.value, testCase.decimals)
			require.NoError(t, err)

			dec := json.NewDecoder(bytes.NewReader(setResponse))
			dec.UseNumber()
			setResponseParsed, err := gabs.ParseJSONDecoder(dec)
			require.NoError(t, err)

			require.Equal(t, testCase.expected, setResponseParsed.Path("floatKey").Data().(json.Number).String())
		}
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

	t.Run("set string array", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()
		stringArray := []string{"value1", "value2", "value3"}

		setResponse, err := iJsonClient.SetStringArray(alice.CallOps(t), newJsonObjectBytes, "stringArrayKey", stringArray)
		require.NoError(t, err)

		setResponseParsed, err := gabs.ParseJSON(setResponse)
		require.NoError(t, err)

		for i, value := range stringArray {
			require.Equal(t, value, setResponseParsed.Path("stringArrayKey").Index(i).Data().(string))
		}
	})

	t.Run("set uint array", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()
		uintArray := []*big.Int{
			big.NewInt(1),
			big.NewInt(2),
			big.NewInt(3),
		}

		setResponse, err := iJsonClient.SetUintArray(alice.CallOps(t), newJsonObjectBytes, "uintArrayKey", uintArray)
		require.NoError(t, err)

		dec := json.NewDecoder(bytes.NewReader(setResponse))
		dec.UseNumber()
		setResponseParsed, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)

		for i, value := range uintArray {
			require.Equal(t, value.String(), setResponseParsed.Path("uintArrayKey").Index(i).Data().(json.Number).String())
		}
	})

	t.Run("set int array", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()
		intArray := []*big.Int{
			big.NewInt(-1),
			big.NewInt(-2),
			big.NewInt(-3),
		}

		setResponse, err := iJsonClient.SetIntArray(alice.CallOps(t), newJsonObjectBytes, "intArrayKey", intArray)
		require.NoError(t, err)

		dec := json.NewDecoder(bytes.NewReader(setResponse))
		dec.UseNumber()
		setResponseParsed, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)

		for i, value := range intArray {
			require.Equal(t, value.String(), setResponseParsed.Path("intArrayKey").Index(i).Data().(json.Number).String())
		}
	})

	t.Run("set float array", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()

		intArray := []*big.Int{
			big.NewInt(-1),
			big.NewInt(-2),
			big.NewInt(-3),
		}

		expectedArray := []string{
			"-0.01",
			"-0.02",
			"-0.03",
		}

		setResponse, err := iJsonClient.SetFloatArray(alice.CallOps(t), newJsonObjectBytes, "floatArrayKey", intArray, int64(2))
		require.NoError(t, err)

		dec := json.NewDecoder(bytes.NewReader(setResponse))
		dec.UseNumber()
		setResponseParsed, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)

		for i, value := range expectedArray {
			require.Equal(t, value, setResponseParsed.Path("floatArrayKey").Index(i).Data().(json.Number).String())
		}
	})

	t.Run("set bool array", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()
		boolArray := []bool{true, false, true}

		setResponse, err := iJsonClient.SetBoolArray(alice.CallOps(t), newJsonObjectBytes, "boolArrayKey", boolArray)
		require.NoError(t, err)

		setResponseParsed, err := gabs.ParseJSON(setResponse)
		require.NoError(t, err)

		for i, value := range boolArray {
			require.Equal(t, value, setResponseParsed.Path("boolArrayKey").Index(i).Data().(bool))
		}
	})

	t.Run("set address array", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()
		addressArray := []common.Address{
			common.HexToAddress("0x0000000000000000000000000000000000000001"),
			common.HexToAddress("0x0000000000000000000000000000000000000002"),
			common.HexToAddress("0x0000000000000000000000000000000000000003"),
		}

		setResponse, err := iJsonClient.SetAddressArray(alice.CallOps(t), newJsonObjectBytes, "addressArrayKey", addressArray)
		require.NoError(t, err)

		setResponseParsed, err := gabs.ParseJSON(setResponse)
		require.NoError(t, err)

		for i, value := range addressArray {
			require.Equal(t, value.Hex(), setResponseParsed.Path("addressArrayKey").Index(i).Data().(string))
		}
	})

	t.Run("set objects array", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()
		objectsArray := [][]byte{
			[]byte(`{"key1":"value1"}`),
			[]byte(`{"key2":"value2"}`),
			[]byte(`{"key3":"value3"}`),
		}

		setResponse, err := iJsonClient.SetObjectsArray(alice.CallOps(t), newJsonObjectBytes, "objectsArrayKey", objectsArray)
		require.NoError(t, err)

		setResponseParsed, err := gabs.ParseJSON(setResponse)
		require.NoError(t, err)

		for i, obj := range objectsArray {
			parsedObj, err := gabs.ParseJSON(obj)
			require.NoError(t, err)
			require.Equal(t, parsedObj.Bytes(), setResponseParsed.Path("objectsArrayKey").Index(i).Bytes())
		}
	})

	t.Run("set objects array with collision replaces the field", func(t *testing.T) {
		newJsonObject, err := gabs.ParseJSON([]byte(`{"objectsArrayKey":{}}`))
		require.NoError(t, err)

		newJsonObjectBytes := newJsonObject.EncodeJSON()
		objectsArray := [][]byte{
			[]byte(`{"key1":"value1"}`),
			[]byte(`{"key2":"value2"}`),
			[]byte(`{"key3":"value3"}`),
		}

		setResponse, err := iJsonClient.SetObjectsArray(alice.CallOps(t), newJsonObjectBytes, "objectsArrayKey", objectsArray)
		require.NoError(t, err)

		setResponseParsed, err := gabs.ParseJSON(setResponse)
		require.NoError(t, err)

		for i, obj := range objectsArray {
			parsedObj, err := gabs.ParseJSON(obj)
			require.NoError(t, err)
			require.Equal(t, parsedObj.Bytes(), setResponseParsed.Path("objectsArrayKey").Index(i).Bytes())
		}
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
		newJsonObject, err := gabs.ParseJSON([]byte(`{"nestedKey2":{"nestedKey1":{"nestedKey": "0x0000000000000000000000000000000000000904"}}}`))
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

	t.Run("get big float test", func(t *testing.T) {
		// Arrange
		dec := json.NewDecoder(bytes.NewReader([]byte(`{"nestedKey2":{"nestedKey1":{"nestedKey":340282366920938463463.374607431768211455}}}`)))
		dec.UseNumber()
		newJsonObject, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)
		newJsonObjectBytes := newJsonObject.EncodeJSON()

		expectedValue1, _ := new(big.Int).SetString("340282366920938463463374607431768211455", 10)

		// Act
		getResponse1, err := iJsonClient.GetFloat(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1.nestedKey", 18)

		// Assert
		require.NoError(t, err)
		require.Equal(t, expectedValue1.String(), getResponse1.String())
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

	t.Run("get string array test", func(t *testing.T) {
		// Arrange
		dec := json.NewDecoder(bytes.NewReader([]byte(`{"nestedKey2":{"nestedKey1":["string1", "string2", "string3"]}}`)))
		dec.UseNumber()
		newJsonObject, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)
		newJsonObjectBytes := newJsonObject.EncodeJSON()

		// Act
		getResponse, err := iJsonClient.GetStringArray(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1")

		// Assert
		require.NoError(t, err)
		require.Equal(t, 3, len(getResponse))
		require.Equal(t, "string1", getResponse[0])
		require.Equal(t, "string2", getResponse[1])
		require.Equal(t, "string3", getResponse[2])
	})

	t.Run("get int256 array test", func(t *testing.T) {
		// Arrange
		dec := json.NewDecoder(bytes.NewReader([]byte(`{"nestedKey2":{"nestedKey1":[ 340282366920938463463374607431768211451, 340282366920938463463374607431768211452, 340282366920938463463374607431768211453]}}`)))
		dec.UseNumber()
		newJsonObject, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)
		newJsonObjectBytes := newJsonObject.EncodeJSON()

		expectedValue1, _ := new(big.Int).SetString("340282366920938463463374607431768211451", 10)
		expectedValue2, _ := new(big.Int).SetString("340282366920938463463374607431768211452", 10)
		expectedValue3, _ := new(big.Int).SetString("340282366920938463463374607431768211453", 10)

		// Act
		getResponse, err := iJsonClient.GetIntArray(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1")

		// Assert
		require.NoError(t, err)
		require.Equal(t, 3, len(getResponse))
		require.Equal(t, expectedValue1, getResponse[0])
		require.Equal(t, expectedValue2, getResponse[1])
		require.Equal(t, expectedValue3, getResponse[2])
	})

	t.Run("get uint256 array test", func(t *testing.T) {
		// Arrange
		dec := json.NewDecoder(bytes.NewReader([]byte(`{"nestedKey2":{"nestedKey1":[ 340282366920938463463374607431768211451, 340282366920938463463374607431768211452, 340282366920938463463374607431768211453]}}`)))
		dec.UseNumber()
		newJsonObject, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)
		newJsonObjectBytes := newJsonObject.EncodeJSON()

		expectedValue1, _ := new(big.Int).SetString("340282366920938463463374607431768211451", 10)
		expectedValue2, _ := new(big.Int).SetString("340282366920938463463374607431768211452", 10)
		expectedValue3, _ := new(big.Int).SetString("340282366920938463463374607431768211453", 10)

		// Act
		getResponse, err := iJsonClient.GetUintArray(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1")

		// Assert
		require.NoError(t, err)
		require.Equal(t, 3, len(getResponse))
		require.Equal(t, expectedValue1, getResponse[0])
		require.Equal(t, expectedValue2, getResponse[1])
		require.Equal(t, expectedValue3, getResponse[2])
	})

	t.Run("get bool array test", func(t *testing.T) {
		// Arrange
		dec := json.NewDecoder(bytes.NewReader([]byte(`{"nestedKey2":{"nestedKey1":[ true, false, true ]}}`)))
		dec.UseNumber()
		newJsonObject, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)
		newJsonObjectBytes := newJsonObject.EncodeJSON()

		// Act
		getResponse, err := iJsonClient.GetBoolArray(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1")

		// Assert
		require.NoError(t, err)
		require.Equal(t, 3, len(getResponse))
		require.Equal(t, true, getResponse[0])
		require.Equal(t, false, getResponse[1])
		require.Equal(t, true, getResponse[2])
	})

	t.Run("get address array test", func(t *testing.T) {
		// Arrange
		dec := json.NewDecoder(bytes.NewReader([]byte(`{"nestedKey2":{"nestedKey1":[ "0x0000000000000000000000000000000000000901", "0x0000000000000000000000000000000000000902", "0x0000000000000000000000000000000000000903" ]}}`)))
		dec.UseNumber()
		newJsonObject, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)
		newJsonObjectBytes := newJsonObject.EncodeJSON()

		// Act
		getResponse, err := iJsonClient.GetAddressArray(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1")

		// Assert
		require.NoError(t, err)
		require.Equal(t, 3, len(getResponse))
		require.Equal(t, common.HexToAddress("0x0000000000000000000000000000000000000901"), getResponse[0])
		require.Equal(t, common.HexToAddress("0x0000000000000000000000000000000000000902"), getResponse[1])
		require.Equal(t, common.HexToAddress("0x0000000000000000000000000000000000000903"), getResponse[2])
	})

	t.Run("get object array test", func(t *testing.T) {
		// Arrange
		dec := json.NewDecoder(bytes.NewReader([]byte(`{"nestedKey2":{"nestedKey1":[ {"value":1}, {"value":2}, {"value":3}]}}`)))
		dec.UseNumber()
		newJsonObject, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)
		newJsonObjectBytes := newJsonObject.EncodeJSON()

		// Act
		getResponse, err := iJsonClient.GetObjectsArray(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1")

		// Assert
		require.NoError(t, err)
		require.Equal(t, 3, len(getResponse))

		for i := 0; i < len(getResponse); i++ {
			dec := json.NewDecoder(bytes.NewReader(getResponse[i]))
			dec.UseNumber()
			innerItem, err := gabs.ParseJSONDecoder(dec)
			require.NoError(t, err)

			innerItemValue, err := innerItem.Path("value").Data().(json.Number).Int64()
			require.NoError(t, err)
			require.Equal(t, int64(i+1), innerItemValue)
		}
	})

	t.Run("get float array test", func(t *testing.T) {
		// Arrange
		dec := json.NewDecoder(bytes.NewReader([]byte(`{"nestedKey2":{"nestedKey1":[0.1, 0.2, 0.3]}}`)))
		dec.UseNumber()
		newJsonObject, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)
		newJsonObjectBytes := newJsonObject.EncodeJSON()

		expectedValues := []*big.Int{
			big.NewInt(1), // 0.1 * 10
			big.NewInt(2), // 0.2 * 10
			big.NewInt(3), // 0.3 * 10
		}

		// Act
		getResponse, err := iJsonClient.GetFloatArray(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1", 1)

		// Assert
		require.NoError(t, err)
		require.Equal(t, len(expectedValues), len(getResponse))
		for i, expectedValue := range expectedValues {
			require.Equal(t, expectedValue, getResponse[i])
		}
	})

	t.Run("get really big float array test", func(t *testing.T) {
		// Arrange
		dec := json.NewDecoder(bytes.NewReader([]byte(`{"nestedKey2":{"nestedKey1":[340282366920938463463.374607431768211455]}}`)))
		dec.UseNumber()
		newJsonObject, err := gabs.ParseJSONDecoder(dec)
		require.NoError(t, err)
		newJsonObjectBytes := newJsonObject.EncodeJSON()

		bigIntValue, _ := new(big.Int).SetString("340282366920938463463374607431768211455", 10)

		expectedValues := []*big.Int{
			bigIntValue,
		}

		// Act
		getResponse, err := iJsonClient.GetFloatArray(alice.CallOps(t), newJsonObjectBytes, "nestedKey2.nestedKey1", 18)

		// Assert
		require.NoError(t, err)
		require.Equal(t, len(expectedValues), len(getResponse))
		for i, expectedValue := range expectedValues {
			require.Equal(t, expectedValue, getResponse[i])
		}
	})
}
