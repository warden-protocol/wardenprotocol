package eip712

import (
	"bytes"
	"encoding/json"
	"fmt"
	"math/big"
	"reflect"
	"strings"
	"time"

	"golang.org/x/text/cases"
	"golang.org/x/text/language"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/math"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/signer/core/apitypes"
)

// ComputeTypedDataHash computes keccak hash of typed data for signing.
func ComputeTypedDataHash(typedData apitypes.TypedData) ([]byte, error) {
	domainSeparator, err := typedData.HashStruct("EIP712Domain", typedData.Domain.Map())
	if err != nil {
		err = sdkerrors.Wrap(err, "failed to pack and hash typedData EIP712Domain")
		return nil, err
	}

	typedDataHash, err := typedData.HashStruct(typedData.PrimaryType, typedData.Message)
	if err != nil {
		err = sdkerrors.Wrap(err, "failed to pack and hash typedData primary type")
		return nil, err
	}

	rawData := []byte(fmt.Sprintf("\x19\x01%s%s", string(domainSeparator), string(typedDataHash)))
	return crypto.Keccak256(rawData), nil
}

// WrapTxToTypedData is an ultimate method that wraps Amino-encoded Cosmos Tx JSON data
// into an EIP712-compatible TypedData request.
func WrapTxToTypedData(
	cdc codectypes.AnyUnpacker,
	chainID uint64,
	msg sdk.Msg,
	data []byte,
	feeDelegation *FeeDelegationOptions,
) (apitypes.TypedData, error) {
	txData := make(map[string]interface{})

	if err := json.Unmarshal(data, &txData); err != nil {
		return apitypes.TypedData{}, sdkerrors.Wrap(sdkerrors.ErrJSONUnmarshal, "failed to JSON unmarshal data")
	}

	domain := apitypes.TypedDataDomain{
		Name:              "Cosmos Web3",
		Version:           "1.0.0",
		ChainId:           math.NewHexOrDecimal256(int64(chainID)),
		VerifyingContract: "cosmos",
		Salt:              "0",
	}

	msgTypes, err := extractMsgTypes(cdc, "MsgValue", msg)
	if err != nil {
		return apitypes.TypedData{}, err
	}

	if feeDelegation != nil {
		feeInfo, ok := txData["fee"].(map[string]interface{})
		if !ok {
			return apitypes.TypedData{}, sdkerrors.Wrap(sdkerrors.ErrInvalidType, "cannot parse fee from tx data")
		}

		feeInfo["feePayer"] = feeDelegation.FeePayer.String()

		// also patching msgTypes to include feePayer
		msgTypes["Fee"] = []apitypes.Type{
			{Name: "feePayer", Type: "string"},
			{Name: "amount", Type: "Coin[]"},
			{Name: "gas", Type: "string"},
		}
	}

	typedData := apitypes.TypedData{
		Types:       msgTypes,
		PrimaryType: "Tx",
		Domain:      domain,
		Message:     txData,
	}

	return typedData, nil
}

type FeeDelegationOptions struct {
	FeePayer sdk.AccAddress
}

func extractMsgTypes(cdc codectypes.AnyUnpacker, msgTypeName string, msg sdk.Msg) (apitypes.Types, error) {
	rootTypes := apitypes.Types{
		"EIP712Domain": {
			{
				Name: "name",
				Type: "string",
			},
			{
				Name: "version",
				Type: "string",
			},
			{
				Name: "chainId",
				Type: "uint256",
			},
			{
				Name: "verifyingContract",
				Type: "string",
			},
			{
				Name: "salt",
				Type: "string",
			},
		},
		"Tx": {
			{Name: "account_number", Type: "string"},
			{Name: "chain_id", Type: "string"},
			{Name: "fee", Type: "Fee"},
			{Name: "memo", Type: "string"},
			{Name: "msgs", Type: "Msg[]"},
			{Name: "sequence", Type: "string"},
			// Note timeout_height was removed because it was not getting filled with the legacyTx
			// {Name: "timeout_height", Type: "string"},
		},
		"Fee": {
			{Name: "amount", Type: "Coin[]"},
			{Name: "gas", Type: "string"},
		},
		"Coin": {
			{Name: "denom", Type: "string"},
			{Name: "amount", Type: "string"},
		},
		"Msg": {
			{Name: "type", Type: "string"},
			{Name: "value", Type: msgTypeName},
		},
		msgTypeName: {},
	}

	if err := walkFields(cdc, rootTypes, msgTypeName, msg); err != nil {
		return nil, err
	}

	return rootTypes, nil
}

const typeDefPrefix = "_"

func walkFields(cdc codectypes.AnyUnpacker, typeMap apitypes.Types, rootType string, in interface{}) (err error) {
	defer doRecover(&err)

	t := reflect.TypeOf(in)
	v := reflect.ValueOf(in)

	for {
		if t.Kind() == reflect.Ptr ||
			t.Kind() == reflect.Interface {
			t = t.Elem()
			v = v.Elem()

			continue
		}

		break
	}

	return traverseFields(cdc, typeMap, rootType, typeDefPrefix, t, v)
}

type cosmosAnyWrapper struct {
	Type  string      `json:"type"`
	Value interface{} `json:"value"`
}

func traverseFields(
	cdc codectypes.AnyUnpacker,
	typeMap apitypes.Types,
	rootType string,
	prefix string,
	t reflect.Type,
	v reflect.Value,
) error {
	n := t.NumField()

	if prefix == typeDefPrefix {
		if len(typeMap[rootType]) == n {
			return nil
		}
	} else {
		typeDef := sanitizeTypedef(prefix)
		if len(typeMap[typeDef]) == n {
			return nil
		}
	}

	for i := 0; i < n; i++ {
		var field reflect.Value
		if v.IsValid() {
			field = v.Field(i)
		}

		fieldType := t.Field(i).Type
		fieldName := jsonNameFromTag(t.Field(i).Tag)

		if fieldType == cosmosAnyType {
			any, ok := field.Interface().(*codectypes.Any)
			if !ok {
				return sdkerrors.Wrapf(sdkerrors.ErrPackAny, "%T", field.Interface())
			}

			anyWrapper := &cosmosAnyWrapper{
				Type: any.TypeUrl,
			}

			if err := cdc.UnpackAny(any, &anyWrapper.Value); err != nil {
				return sdkerrors.Wrap(err, "failed to unpack Any in msg struct")
			}

			fieldType = reflect.TypeOf(anyWrapper)
			field = reflect.ValueOf(anyWrapper)

			// then continue as normal
		}

		// If its a nil pointer, do not include in types
		if fieldType.Kind() == reflect.Ptr && field.IsNil() {
			continue
		}

		for {
			if fieldType.Kind() == reflect.Ptr {
				fieldType = fieldType.Elem()

				if field.IsValid() {
					field = field.Elem()
				}

				continue
			}

			if fieldType.Kind() == reflect.Interface {
				fieldType = reflect.TypeOf(field.Interface())
				continue
			}

			if field.Kind() == reflect.Ptr {
				field = field.Elem()
				continue
			}

			break
		}

		var isCollection bool
		if fieldType.Kind() == reflect.Array || fieldType.Kind() == reflect.Slice {
			if field.Len() == 0 {
				// skip empty collections from type mapping
				continue
			}

			fieldType = fieldType.Elem()
			field = field.Index(0)
			isCollection = true
		}

		for {
			if fieldType.Kind() == reflect.Ptr {
				fieldType = fieldType.Elem()

				if field.IsValid() {
					field = field.Elem()
				}

				continue
			}

			if fieldType.Kind() == reflect.Interface {
				fieldType = reflect.TypeOf(field.Interface())
				continue
			}

			if field.Kind() == reflect.Ptr {
				field = field.Elem()
				continue
			}

			break
		}

		fieldPrefix := fmt.Sprintf("%s.%s", prefix, fieldName)

		ethTyp := typToEth(fieldType)
		if len(ethTyp) > 0 {
			// Support array of uint64
			if isCollection && fieldType.Kind() != reflect.Slice && fieldType.Kind() != reflect.Array {
				ethTyp += "[]"
			}

			if prefix == typeDefPrefix {
				typeMap[rootType] = append(typeMap[rootType], apitypes.Type{
					Name: fieldName,
					Type: ethTyp,
				})
			} else {
				typeDef := sanitizeTypedef(prefix)
				typeMap[typeDef] = append(typeMap[typeDef], apitypes.Type{
					Name: fieldName,
					Type: ethTyp,
				})
			}

			continue
		}

		if fieldType.Kind() == reflect.Struct {

			var fieldTypedef string

			if isCollection {
				fieldTypedef = sanitizeTypedef(fieldPrefix) + "[]"
			} else {
				fieldTypedef = sanitizeTypedef(fieldPrefix)
			}

			if prefix == typeDefPrefix {
				typeMap[rootType] = append(typeMap[rootType], apitypes.Type{
					Name: fieldName,
					Type: fieldTypedef,
				})
			} else {
				typeDef := sanitizeTypedef(prefix)
				typeMap[typeDef] = append(typeMap[typeDef], apitypes.Type{
					Name: fieldName,
					Type: fieldTypedef,
				})
			}

			if err := traverseFields(cdc, typeMap, rootType, fieldPrefix, fieldType, field); err != nil {
				return err
			}

			continue
		}
	}

	return nil
}

func jsonNameFromTag(tag reflect.StructTag) string {
	jsonTags := tag.Get("json")
	parts := strings.Split(jsonTags, ",")
	return parts[0]
}

// _.foo_bar.baz -> TypeFooBarBaz
//
// this is needed for Geth's own signing code which doesn't
// tolerate complex type names
func sanitizeTypedef(str string) string {
	buf := new(bytes.Buffer)
	parts := strings.Split(str, ".")
	caser := cases.Title(language.English, cases.NoLower)

	for _, part := range parts {
		if part == "_" {
			buf.WriteString("Type")
			continue
		}

		subparts := strings.Split(part, "_")
		for _, subpart := range subparts {
			buf.WriteString(caser.String(subpart))
		}
	}

	return buf.String()
}

var (
	hashType      = reflect.TypeOf(common.Hash{})
	addressType   = reflect.TypeOf(common.Address{})
	bigIntType    = reflect.TypeOf(big.Int{})
	cosmIntType   = reflect.TypeOf(sdk.Int{})
	cosmosAnyType = reflect.TypeOf(&codectypes.Any{})
	timeType      = reflect.TypeOf(time.Time{})
)

// typToEth supports only basic types and arrays of basic types.
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md
func typToEth(typ reflect.Type) string {
	const str = "string"

	switch typ.Kind() {
	case reflect.String:
		return str
	case reflect.Bool:
		return "bool"
	case reflect.Int:
		return "int64"
	case reflect.Int8:
		return "int8"
	case reflect.Int16:
		return "int16"
	case reflect.Int32:
		return "int32"
	case reflect.Int64:
		return "int64"
	case reflect.Uint:
		return "uint64"
	case reflect.Uint8:
		return "uint8"
	case reflect.Uint16:
		return "uint16"
	case reflect.Uint32:
		return "uint32"
	case reflect.Uint64:
		return "uint64"
	case reflect.Slice:
		ethName := typToEth(typ.Elem())
		if len(ethName) > 0 {
			return ethName + "[]"
		}
	case reflect.Array:
		ethName := typToEth(typ.Elem())
		if len(ethName) > 0 {
			return ethName + "[]"
		}
	case reflect.Ptr:
		if typ.Elem().ConvertibleTo(bigIntType) ||
			typ.Elem().ConvertibleTo(timeType) ||
			typ.Elem().ConvertibleTo(cosmIntType) {
			return str
		}
	case reflect.Struct:
		if typ.ConvertibleTo(hashType) ||
			typ.ConvertibleTo(addressType) ||
			typ.ConvertibleTo(bigIntType) ||
			typ.ConvertibleTo(timeType) ||
			typ.ConvertibleTo(cosmIntType) {
			return str
		}
	}

	return ""
}

func doRecover(err *error) {
	if r := recover(); r != nil {
		if e, ok := r.(error); ok {
			e = sdkerrors.Wrap(e, "panicked with error")
			*err = e
			return
		}

		*err = fmt.Errorf("%v", r)
	}
}
