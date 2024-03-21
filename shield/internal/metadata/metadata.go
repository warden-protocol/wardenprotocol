package metadata

import (
	"github.com/warden-protocol/wardenprotocol/shield/internal/ast"
)

// Metadata contains informations about a parsed program.
type Metadata struct {
	// Identifiers is a list of all identifiers found in the program.
	// Except for function names.
	Identifiers []string

	// FunctionIdentifiers is a list of all function names found in the program.
	FunctionIdentifiers []string
}

func (m *Metadata) AddIdentifier(identifier string) {
	m.Identifiers = append(m.Identifiers, identifier)
}

func (m *Metadata) AddFunction(identifier string) {
	m.FunctionIdentifiers = append(m.FunctionIdentifiers, identifier)
}

// ExtractMetadata extracts metadata from an expression.
func ExtractMetadata(expr ast.Expression) Metadata {
	var metadata Metadata
	processNode(expr, &metadata)
	return metadata
}

func processNode(node ast.Expression, metadata *Metadata) {
	switch n := node.(type) {
	case *ast.Identifier:
		metadata.AddIdentifier(n.Value)
	case *ast.InfixExpression:
		processNode(n.Left, metadata)
		processNode(n.Right, metadata)
	case *ast.CallExpression:
		metadata.AddFunction(n.Function.Value)
		for _, arg := range n.Arguments {
			processNode(arg, metadata)
		}
	case *ast.ArrayLiteral:
		for _, e := range n.Elements {
			processNode(e, metadata)
		}
	}
}
