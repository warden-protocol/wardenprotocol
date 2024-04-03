package shield

import (
	"fmt"

	"github.com/warden-protocol/wardenprotocol/shield/env"
	"github.com/warden-protocol/wardenprotocol/shield/internal/evaluator"
	"github.com/warden-protocol/wardenprotocol/shield/internal/lexer"
	"github.com/warden-protocol/wardenprotocol/shield/internal/metadata"
	"github.com/warden-protocol/wardenprotocol/shield/internal/parser"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

type Environment = env.Environment

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

type Metadata = metadata.Metadata

// Validate is a static check for parsing the code, ensuring the syntax is correct.
// It also extracts metadata from the code while doing it.
// It returns an error if the input is empty or if there are parsing errors.
func Validate(input string) (Metadata, error) {
	if input == "" {
		return Metadata{}, fmt.Errorf("empty input")
	}

	l := lexer.New(input)
	p := parser.New(l)
	expr := p.Parse()
	if len(p.Errors()) > 0 {
		return Metadata{}, fmt.Errorf("parser errors: %v", p.Errors())
	}

	return metadata.ExtractMetadata(expr), nil
}
