// Package cosmoshield provides some utility from integrating the main `shield`
// package with Cosmos SDK apps.
package cosmoshield

import (
	"context"
	"strings"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
)

// NamespaceExpander is an ast.Expander that can be registered into an
// ExpanderManager to expand identifiers based on their namespace.
type NamespaceExpander struct {
	base      ast.Expander
	Namespace string
}

func NewPrefixedExpander(namespace string, expander ast.Expander) NamespaceExpander {
	return NamespaceExpander{
		base:      expander,
		Namespace: namespace,
	}
}

func (e NamespaceExpander) Expand(ctx context.Context, ident *ast.Identifier) (*ast.Expression, error) {
	return e.base.Expand(ctx, ident)
}

// ExpanderManager implements ast.Expander and allows to register multiple
// NameSpaceExpanders to dispatch the expansion of identifiers based on their
// namespace.
type ExpanderManager struct {
	expanders map[string]ast.Expander
}

func NewExpanderManager(expanders ...NamespaceExpander) ExpanderManager {
	m := make(map[string]ast.Expander, len(expanders))
	for _, expander := range expanders {
		m[expander.Namespace] = expander
	}

	return ExpanderManager{
		expanders: m,
	}
}

func (e ExpanderManager) Expand(ctx context.Context, ident *ast.Identifier) (*ast.Expression, error) {
	namespace, path := path(ident.Value)

	if namespace == "" {
		// if no namespace is present, leave the identifier as is
		return ast.NewIdentifier(ident), nil
	}

	expander, ok := e.expanders[namespace]
	if !ok {
		// if no expander is registered for this namespace, leave the
		// identifier as is
		return ast.NewIdentifier(ident), nil
	}

	return expander.Expand(ctx, ast.NewIdent(path))
}

func path(name string) (string, string) {
	parts := strings.SplitN(name, ".", 2)
	if len(parts) == 1 {
		return "", name
	}
	return parts[0], parts[1]
}
