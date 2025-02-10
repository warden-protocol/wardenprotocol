package soliditygen

import (
	"encoding/json"
	"fmt"
	"strings"
	"text/template"
)

// Definition holds the name and text for a generated Solidity struct.
type Definition struct {
	Name string
	Text string
}

// GenerateContract can handle required output + optional input JSON. If inputJSON is empty,
// it will skip generating that struct. The final contract might have 1 or 2 top-level structs.
func GenerateContract(
	contractName string,
	inputName string, inputJSON []byte,
	outputName string, outputJSON []byte,
) (string, error) {

	var allDefs []Definition
	var topLevelStructs []string

	if len(inputJSON) > 0 {
		var inputMap map[string]interface{}
		if err := json.Unmarshal(inputJSON, &inputMap); err != nil {
			return "", fmt.Errorf("unmarshaling input JSON: %w", err)
		}
		inputDefs := convertToSolidityStruct(inputName, inputMap)
		allDefs = append(allDefs, inputDefs...)
		topLevelStructs = append(topLevelStructs, inputName)
	}

	var outputMap map[string]interface{}
	if err := json.Unmarshal(outputJSON, &outputMap); err != nil {
		return "", fmt.Errorf("unmarshaling output JSON: %w", err)
	}
	outputDefs := convertToSolidityStruct(outputName, outputMap)
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
{{end}}{{if .TopLevelStructs}}
    function main({{range $i, $name := .TopLevelStructs}}{{if $i}}, {{end}}{{$name}} memory _{{ $name | toLower }}{{end}}) external {
        // No-op function referencing the struct(s).
    }
{{end}}
}
`))

// convertToSolidityStruct recursively generates a child-first list of Solidity struct definitions.
func convertToSolidityStruct(structName string, value map[string]interface{}) []Definition {
	var childDefs []Definition
	var lines []string

	for key, val := range value {
		solType, nestedDefs := inferSolidityType(key, val)
		childDefs = append(childDefs, nestedDefs...)
		lines = append(lines, fmt.Sprintf("        %s %s;", solType, key))
	}

	structText := fmt.Sprintf("    struct %s {\n%s\n    }", structName, strings.Join(lines, "\n"))
	return append(childDefs, Definition{
		Name: structName,
		Text: structText,
	})
}

// inferSolidityType picks a Solidity type for the given JSON value,
// returning any new nested struct definitions if it's an object/array.
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
		// If array, infer from first element type
		var firstNonNull interface{}
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
	case nil:
		// fallback: treat as string
		return "string", nil
	default:
		// fallback: treat as string
		return "string", nil
	}
}

func capitalize(str string) string {
	if len(str) == 0 {
		panic("invalid input: string cannot be empty")
	}
	return strings.ToUpper(str[:1]) + str[1:]
}
