package shield

import (
	"fmt"

	"github.com/warden-protocol/wardenprotocol/shield/internal/evaluator"
	"github.com/warden-protocol/wardenprotocol/shield/internal/lexer"
	"github.com/warden-protocol/wardenprotocol/shield/internal/parser"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

type Environment = evaluator.Environment

// Run executes the code passed a string and returns the result of the evaluation.
// In case of a parsing error, it returns an error.
// In case of a runtime error, the resulting object will be an error object.
func Run(input string, env Environment) (object.Object, error) {
	l := lexer.New(input)
	p := parser.New(l)
	res := evaluator.Eval(p.Parse(), env)
	if len(p.Errors()) > 0 {
		return nil, fmt.Errorf("parser errors: %v", p.Errors())
	}
	return res, nil
}

func Validate(input string) error {
	if input == "" {
		return fmt.Errorf("empty input")
	}

	l := lexer.New(input)
	p := parser.New(l)
	p.Parse()
	if len(p.Errors()) > 0 {
		return fmt.Errorf("parser errors: %v", p.Errors())
	}
	return nil
}
