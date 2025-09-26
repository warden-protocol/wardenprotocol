package metadata

import (
	"github.com/warden-protocol/wardenprotocol/shield/ast"
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
func ExtractMetadata(expr *ast.Expression) Metadata {
	var metadata Metadata
	processNode(expr, &metadata)

	return metadata
}

func processNode(node *ast.Expression, metadata *Metadata) {
	switch n := node.Value.(type) {
	case *ast.Expression_Identifier:
		metadata.AddIdentifier(n.Identifier.Value)
	case *ast.Expression_PrefixExpression:
		processNode(n.PrefixExpression.Right, metadata)
	case *ast.Expression_InfixExpression:
		processNode(n.InfixExpression.Left, metadata)
		processNode(n.InfixExpression.Right, metadata)
	case *ast.Expression_CallExpression:
		metadata.AddFunction(n.CallExpression.Function.Value)

		for _, arg := range n.CallExpression.Arguments {
			processNode(arg, metadata)
		}
	case *ast.Expression_ArrayLiteral:
		for _, e := range n.ArrayLiteral.Elements {
			processNode(e, metadata)
		}
	}
}
