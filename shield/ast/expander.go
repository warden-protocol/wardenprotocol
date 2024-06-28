package ast

import "context"

type Expander interface {
	// Expand expands an identifier into another AST node.
	//
	// The expansion is done as a pre-processing step when an Action is
	// created, like a macro in some programming languages.
	// Custom modules can implement this interface to provide custom
	// expansions for their identifiers.
	//
	// A no-op expansion is to return the input identifier as a single-element.
	//
	// After the pre-processing step, the identifiers that are left must be
	// able to be resolved by the x/act modules.
	Expand(ctx context.Context, ident *Identifier) (*Expression, error)
}
