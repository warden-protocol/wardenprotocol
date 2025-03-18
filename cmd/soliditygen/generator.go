package main

import (
	"encoding/json"
	"fmt"
	"strings"
	"text/template"
	"unicode"
)

// Definition represents a Solidity struct definition with its name and text representation.
type Definition struct {
	// Name is the identifier of the Solidity struct
	Name string
	// Text is the complete Solidity struct definition
	Text string
}

// GenerateContract can handle required output + optional input JSON. If inputJSON is empty,
// it will skip generating that struct. The final contract might have 1 or 2 top-level structs.
func GenerateContract(
	contractName string,
	inputName string, inputJSON []byte,
	outputName string, outputJSON []byte,
) (string, error) {
	if !isValidSolidityIdentifier(contractName) {
		return "", fmt.Errorf("invalid contract name: %s", contractName)
	}
	if len(inputJSON) > 0 && !isValidSolidityIdentifier(inputName) {
		return "", fmt.Errorf("invalid input struct name: %s", inputName)
	}
	if !isValidSolidityIdentifier(outputName) {
		return "", fmt.Errorf("invalid output struct name: %s", outputName)
	}

	var allDefs []Definition
	var topLevelStructs []string

	if len(inputJSON) > 0 {
		var inputMap map[string]any
		if err := json.Unmarshal(inputJSON, &inputMap); err != nil {
			return "", fmt.Errorf("unmarshaling input JSON: %w", err)
		}
		inputDefs, _ := convertToSolidityStruct(inputName, inputMap)
		allDefs = append(allDefs, inputDefs...)
		topLevelStructs = append(topLevelStructs, inputName)
	}

	var outputMap map[string]any
	if err := json.Unmarshal(outputJSON, &outputMap); err != nil {
		return "", fmt.Errorf("unmarshaling output JSON: %w", err)
	}
	outputDefs, _ := convertToSolidityStruct(outputName, outputMap)
	allDefs = append(allDefs, outputDefs...)
	topLevelStructs = append(topLevelStructs, outputName)

	tplData := contractTemplateData{
		ContractName:    contractName,
		Definitions:     allDefs,
		TopLevelStructs: topLevelStructs,
	}

	var finalContract strings.Builder
	if err := contractTpl.Execute(&finalContract, tplData); err != nil {
		return "", fmt.Errorf("executing template: %w", err)
	}

	return finalContract.String(), nil
}

type contractTemplateData struct {
	ContractName    string
	Definitions     []Definition
	TopLevelStructs []string
}

var contractTpl = template.Must(template.New("solidity").Funcs(template.FuncMap{
	"toLower": strings.ToLower,
}).Parse(`// SPDX-License-Identifier: GPL-3.0
// Code generated - DO NOT EDIT.
// This file is generated and any manual changes will be lost.

pragma solidity >=0.8.25 <0.9.0;

/**
 * @title {{.ContractName}}
 * @notice Defines struct(s) derived from JSON.
 */
contract {{.ContractName}} {
{{range .Definitions}}
{{.Text}}
{{end}}
    {{- if eq (len .TopLevelStructs) 2 }}
    function main({{ index .TopLevelStructs 0 }} memory _{{ (index .TopLevelStructs 0) | toLower }})
        external
        pure returns ({{ index .TopLevelStructs 1 }} memory)
    {
        _{{ (index .TopLevelStructs 0) | toLower }};
        {{ index .TopLevelStructs 1 }} memory out;
        return out;
    }
    {{- else }}
    function main()
        external
        pure returns ({{ index .TopLevelStructs 0 }} memory)
    {
        {{ index .TopLevelStructs 0 }} memory out;
        return out;
    }
    {{- end}}
}
`))

func convertToSolidityStruct(structName string, value map[string]any) ([]Definition, error) {
	var childDefs []Definition
	var lines []string

	for key, val := range value {
		if !isValidSolidityIdentifier(key) {
			return nil, fmt.Errorf("invalid field name: %s", key)
		}
		solType, nestedDefs := inferSolidityType(key, val)
		childDefs = append(childDefs, nestedDefs...)
		lines = append(lines, fmt.Sprintf("        %s %s;", solType, key))
	}

	structText := fmt.Sprintf("    struct %s {\n%s\n    }", structName, strings.Join(lines, "\n"))

	return append(childDefs, Definition{
		Name: structName,
		Text: structText,
	}), nil
}

func inferSolidityType(fieldName string, v any) (string, []Definition) {
	switch val := v.(type) {
	case string:
		return "string", nil
	case bool:
		return "bool", nil
	case float64:
		return "int256", nil
	case map[string]any:
		nestedName := capitalize(fieldName)
		childDefs, _ := convertToSolidityStruct(nestedName, val)
		return nestedName, childDefs
	case []any:
		// If array, infer from first element type
		var firstNonNull any
		for _, elem := range val {
			if elem != nil {
				firstNonNull = elem
				break
			}
		}
		if firstNonNull == nil {
			// If entire array is empty or nil elements, default to string[]
			return "string[]", nil
		}
		elemType, nestedDefs := inferSolidityType(fieldName, firstNonNull)

		return elemType + "[]", nestedDefs
	default:
		// fallback: treat as string
		return "string", nil
	}
}

func isValidSolidityIdentifier(name string) bool {
	if len(name) == 0 {
		return false
	}
	for i, r := range name {
		if i == 0 && !unicode.IsLetter(r) && r != '_' {
			return false
		}
		if i > 0 && !unicode.IsLetter(r) && !unicode.IsDigit(r) && r != '_' {
			return false
		}
	}

	return true
}

func capitalize(str string) string {
	if len(str) == 0 {
		panic("invalid field name: cannot be empty")
	}
	return strings.ToUpper(str[:1]) + str[1:]
}
