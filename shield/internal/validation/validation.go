package validation

import (
	"fmt"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
)

func Validate(root *ast.Expression, maxNestingDepth int) error {
	maxDepth := AnalyzeFunctionsNesting(root, 0)

	if maxDepth > maxNestingDepth {
		return fmt.Errorf("max allowed functions nesting depth is %d. Got %d", maxNestingDepth, maxDepth)
	}

	return nil
}
