// Copyright 2023 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/evmos/ethermint/blob/main/LICENSE
package eip712

import (
	"bytes"
	"fmt"
	"sort"
	"strings"

	"golang.org/x/text/cases"
	"golang.org/x/text/language"

	errorsmod "cosmossdk.io/errors"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/ethereum/go-ethereum/signer/core/apitypes"
	"github.com/tidwall/gjson"
)

const (
	rootPrefix = "_"
	typePrefix = "Type"

	txField   = "Tx"
	ethBool   = "bool"
	ethInt64  = "int64"
	ethString = "string"

	msgTypeField = "type"

	maxDuplicateTypeDefs = 1000
)

// getEIP712Types creates and returns the EIP-712 types
// for the given message payload.
func createEIP712Types(messagePayload eip712MessagePayload) (apitypes.Types, error) {
	eip712Types := apitypes.Types{
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
			{Name: "sequence", Type: "string"},
			// Note timeout_height was removed because it was not getting filled with the legacyTx
		},
		"Fee": {
			{Name: "amount", Type: "Coin[]"},
			{Name: "gas", Type: "string"},
		},
		"Coin": {
			{Name: "denom", Type: "string"},
			{Name: "amount", Type: "string"},
		},
	}

	for i := 0; i < messagePayload.numPayloadMsgs; i++ {
		field := msgFieldForIndex(i)
		msg := messagePayload.payload.Get(field)

		if err := addMsgTypesToRoot(eip712Types, field, msg); err != nil {
			return nil, err
		}
	}

	return eip712Types, nil
}

// addMsgTypesToRoot adds all types for the given message
// to eip712Types, recursively handling object sub-fields.
func addMsgTypesToRoot(eip712Types apitypes.Types, msgField string, msg gjson.Result) (err error) {
	defer doRecover(&err)

	if !msg.IsObject() {
		return errorsmod.Wrapf(errortypes.ErrInvalidRequest, "message is not valid JSON, cannot parse types")
	}

	msgRootType, err := msgRootType(msg)
	if err != nil {
		return err
	}

	msgTypeDef, err := recursivelyAddTypesToRoot(eip712Types, msgRootType, rootPrefix, msg)
	if err != nil {
		return err
	}

	addMsgTypeDefToTxSchema(eip712Types, msgField, msgTypeDef)

	return nil
}

// msgRootType parses the message and returns the formatted
// type signature corresponding to the message type.
func msgRootType(msg gjson.Result) (string, error) {
	msgType := msg.Get(msgTypeField).Str
	if msgType == "" {
		// .Str is empty for arrays and objects
		return "", errorsmod.Wrap(errortypes.ErrInvalidType, "malformed message type value, expected type string")
	}

	// Convert e.g. cosmos-sdk/MsgSend to TypeMsgSend
	typeTokenized := strings.Split(msgType, "/")
	msgSignature := typeTokenized[len(typeTokenized)-1]
	rootType := fmt.Sprintf("%v%v", typePrefix, msgSignature)

	return rootType, nil
}

// addMsgTypeDefToTxSchema adds the message's field-type pairing
// to the Tx schema.
func addMsgTypeDefToTxSchema(eip712Types apitypes.Types, msgField, msgTypeDef string) {
	eip712Types[txField] = append(eip712Types[txField], apitypes.Type{
		Name: msgField,
		Type: msgTypeDef,
	})
}

// recursivelyAddTypesToRoot walks all types in the given map
// and recursively adds sub-maps as new types when necessary.
// It adds all type definitions to typeMap, then returns a key
// to the json object's type definition within the map.
func recursivelyAddTypesToRoot(
	typeMap apitypes.Types,
	rootType string,
	prefix string,
	payload gjson.Result,
) (string, error) {
	typesToAdd := []apitypes.Type{}

	// Must sort the JSON keys for deterministic type generation.
	sortedFieldNames, err := sortedJSONKeys(payload)
	if err != nil {
		return "", errorsmod.Wrap(err, "unable to sort object keys")
	}

	typeDef := typeDefForPrefix(prefix, rootType)

	for _, fieldName := range sortedFieldNames {
		field := payload.Get(fieldName)
		if !field.Exists() {
			continue
		}

		// Handle array type by unwrapping the first element.
		// Note that arrays with multiple types are not supported
		// using EIP-712, so we can ignore that case.
		isCollection := false
		if field.IsArray() {
			fieldAsArray := field.Array()

			if len(fieldAsArray) == 0 {
				// Arbitrarily add string[] type to handle empty arrays,
				// since we cannot access the underlying object.
				emptyArrayType := "string[]"
				typesToAdd = appendedTypesList(typesToAdd, fieldName, emptyArrayType)

				continue
			}

			field = fieldAsArray[0]
			isCollection = true
		}

		ethType := getEthTypeForJSON(field)

		// Handle JSON primitive types by adding the corresponding
		// EIP-712 type to the types schema.
		if ethType != "" {
			if isCollection {
				ethType += "[]"
			}
			typesToAdd = appendedTypesList(typesToAdd, fieldName, ethType)

			continue
		}

		// Handle object types recursively. Note that nested array types are not supported
		// in EIP-712, so we can exclude that case.
		if field.IsObject() {
			fieldPrefix := prefixForSubField(prefix, fieldName)

			fieldTypeDef, err := recursivelyAddTypesToRoot(typeMap, rootType, fieldPrefix, field)
			if err != nil {
				return "", err
			}

			fieldTypeDef = sanitizeTypedef(fieldTypeDef)
			if isCollection {
				fieldTypeDef += "[]"
			}

			typesToAdd = appendedTypesList(typesToAdd, fieldName, fieldTypeDef)

			continue
		}
	}

	return addTypesToRoot(typeMap, typeDef, typesToAdd)
}

// sortedJSONKeys returns the sorted JSON keys for the input object,
// to be used for deterministic iteration.
func sortedJSONKeys(json gjson.Result) ([]string, error) {
	if !json.IsObject() {
		return nil, errorsmod.Wrap(errortypes.ErrInvalidType, "expected JSON map to parse")
	}

	jsonMap := json.Map()

	keys := make([]string, len(jsonMap))
	i := 0
	// #nosec G705 for map iteration
	for k := range jsonMap {
		keys[i] = k
		i++
	}

	sort.Slice(keys, func(i, j int) bool {
		return strings.Compare(keys[i], keys[j]) > 0
	})

	return keys, nil
}

// typeDefForPrefix computes the type definition for the given
// prefix. This value will represent the types key within
// the EIP-712 types map.
func typeDefForPrefix(prefix, rootType string) string {
	if prefix == rootPrefix {
		return rootType
	}
	return sanitizeTypedef(prefix)
}

// appendedTypesList returns an array of Types with a new element
// consisting of name and typeDef.
func appendedTypesList(types []apitypes.Type, name, typeDef string) []apitypes.Type {
	return append(types, apitypes.Type{
		Name: name,
		Type: typeDef,
	})
}

// prefixForSubField computes the prefix for a subfield by
// indicating that it's derived from the object associated with prefix.
func prefixForSubField(prefix, fieldName string) string {
	return fmt.Sprintf("%s.%s", prefix, fieldName)
}

// addTypesToRoot attempts to add the types to the root at key
// typeDef and returns the key at which the types are present,
// or an error if they cannot be added. If the typeDef key is a
// duplicate, we return the key corresponding to an identical copy
// if present, without modifying the structure. Otherwise, we insert
// the types at the next available typeDef-{n} field. We do this to
// support identically named payloads with different schemas.
func addTypesToRoot(typeMap apitypes.Types, typeDef string, types []apitypes.Type) (string, error) {
	var indexedTypeDef string

	indexAsDuplicate := 0

	for {
		indexedTypeDef = typeDefWithIndex(typeDef, indexAsDuplicate)
		existingTypes, foundElement := typeMap[indexedTypeDef]

		// Found identical duplicate, so we can simply return
		// the existing type definition.
		if foundElement && typesAreEqual(types, existingTypes) {
			return indexedTypeDef, nil
		}

		// Found no element, so we can create a new one at this index.
		if !foundElement {
			break
		}

		indexAsDuplicate++

		if indexAsDuplicate == maxDuplicateTypeDefs {
			return "", errorsmod.Wrap(errortypes.ErrInvalidRequest, "exceeded maximum number of duplicates for a single type definition")
		}
	}

	typeMap[indexedTypeDef] = types

	return indexedTypeDef, nil
}

// typeDefWithIndex creates a duplicate-indexed type definition
// to differentiate between different schemas with the same name.
func typeDefWithIndex(typeDef string, index int) string {
	return fmt.Sprintf("%v%d", typeDef, index)
}

// typesAreEqual compares two apitypes.Type arrays
// and returns a boolean indicating whether they have
// the same values.
// It assumes both arrays are in the same sorted order.
func typesAreEqual(types1 []apitypes.Type, types2 []apitypes.Type) bool {
	if len(types1) != len(types2) {
		return false
	}

	for i := 0; i < len(types1); i++ {
		if types1[i].Name != types2[i].Name || types1[i].Type != types2[i].Type {
			return false
		}
	}

	return true
}

// _.foo_bar.baz -> TypeFooBarBaz
//
// Since Geth does not tolerate complex EIP-712 type names, we need to sanitize
// the inputs.
func sanitizeTypedef(str string) string {
	buf := new(bytes.Buffer)
	caser := cases.Title(language.English, cases.NoLower)
	parts := strings.Split(str, ".")

	for _, part := range parts {
		if part == rootPrefix {
			buf.WriteString(typePrefix)
			continue
		}

		subparts := strings.Split(part, "_")
		for _, subpart := range subparts {
			buf.WriteString(caser.String(subpart))
		}
	}

	return buf.String()
}

// getEthTypeForJSON converts a JSON type to an Ethereum type.
// It returns an empty string for Objects, Arrays, or Null.
// See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md for more.
func getEthTypeForJSON(json gjson.Result) string {
	switch json.Type {
	case gjson.True, gjson.False:
		return ethBool
	case gjson.Number:
		return ethInt64
	case gjson.String:
		return ethString
	case gjson.JSON:
		// Array or Object type
		return ""
	default:
		return ""
	}
}

// doRecover attempts to recover in the event of a panic to
// prevent DOS and gracefully handle an error instead.
func doRecover(err *error) {
	if r := recover(); r != nil {
		if e, ok := r.(error); ok {
			e = errorsmod.Wrap(e, "panicked with error")
			*err = e
			return
		}

		*err = fmt.Errorf("%v", r)
	}
}
