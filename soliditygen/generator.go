package soliditygen

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

type Definition struct {
	Name string
	Text string
}

// WriteSolidityFromURL fetches JSON from the given URL, infers Solidity structs,
// and writes a .sol file named <contractName>Types.sol into the specified
// contractDirectory. Returns the path to the created file or an error.
func WriteSolidityFromURL(url, contractName, contractDirectory string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", fmt.Errorf("fetching JSON: %w", err)
	}
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("non-OK status code: %d", resp.StatusCode)
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("reading response body: %w", err)
	}

	var data map[string]interface{}
	if err := json.Unmarshal(bodyBytes, &data); err != nil {
		return "", fmt.Errorf("unmarshaling JSON: %w", err)
	}

	definitions := convertToSolidityStruct(contractName, data)

	contractName += "Types"

	topDef := definitions[len(definitions)-1]

	var solBuilder strings.Builder

	solBuilder.WriteString("// SPDX-License-Identifier: GPL-3.0\n")
	solBuilder.WriteString("// Code generated - DO NOT EDIT.\n")
	solBuilder.WriteString("// This file is a generated and any manual changes will be lost.\n")
	solBuilder.WriteString("pragma solidity >=0.8.25 <0.9.0;\n\n")
	solBuilder.WriteString("/**\n")
	solBuilder.WriteString(" * @title " + contractName + "\n")
	solBuilder.WriteString(" * @notice Solidity contract that declares structs derived from JSON.\n")
	solBuilder.WriteString(" */\n")

	solBuilder.WriteString("contract " + contractName + " {\n\n")

	for _, def := range definitions {
		solBuilder.WriteString(def.Text)
		solBuilder.WriteString("\n\n")
	}

	solBuilder.WriteString("function main(")
	solBuilder.WriteString(fmt.Sprintf("%s memory _%s", topDef.Name, strings.ToLower(topDef.Name)))
	solBuilder.WriteString(") external {\n")
	solBuilder.WriteString("    // This function doesn't do anything but ensures the top-level struct is referenced.\n")
	solBuilder.WriteString("}\n")

	solBuilder.WriteString("}\n")

	solFileName := filepath.Join(contractDirectory, contractName+".sol")

	if err := os.MkdirAll(contractDirectory, 0o755); err != nil {
		return "", fmt.Errorf("creating directory: %w", err)
	}
	if err := os.WriteFile(solFileName, []byte(solBuilder.String()), 0o644); err != nil {
		return "", fmt.Errorf("writing solidity file: %w", err)
	}

	return solFileName, nil
}

// convertToSolidityStruct recursively generates a child-first list of Solidity struct definitions.
func convertToSolidityStruct(structName string, value map[string]interface{}) []Definition {
	var childDefs []Definition
	var lines []string

	for key, val := range value {
		solType, nestedDefs := inferSolidityType(key, val)

		childDefs = append(childDefs, nestedDefs...)
		lines = append(lines, fmt.Sprintf("    %s %s;", solType, key))
	}

	structText := fmt.Sprintf("struct %s {\n%s\n}", structName, strings.Join(lines, "\n"))

	return append(childDefs, Definition{
		Name: structName,
		Text: structText,
	})
}

// inferSolidityType decides which Solidity type to use for a given JSON value,
// optionally returning new nested struct definitions if the value is a nested object/array of objects.
func inferSolidityType(fieldName string, v interface{}) (string, []Definition) {
	switch val := v.(type) {
	case string:
		return "string", nil
	case bool:
		return "bool", nil
	case float64:
		return "int256", nil
	case map[string]interface{}:
		nestedName := capitalize(fieldName)
		childDefs := convertToSolidityStruct(nestedName, val)
		return nestedName, childDefs
	case []interface{}:
		var firstNonNull interface{}
		for _, elem := range val {
			if elem != nil {
				firstNonNull = elem
				break
			}
		}
		if firstNonNull == nil {
			return "string[]", nil
		}
		elemType, nestedDefs := inferSolidityType(fieldName, firstNonNull)
		return elemType + "[]", nestedDefs
	case nil:
		return "string", nil
	default:
		return "string", nil
	}
}

func capitalize(str string) string {
	if len(str) == 0 {
		panic("invalid input: string cannot be empty")
	}
	return strings.ToUpper(str[:1]) + str[1:]
}
