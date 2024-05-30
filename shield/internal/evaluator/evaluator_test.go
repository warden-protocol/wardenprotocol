package evaluator

import (
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/shield/internal/lexer"
	"github.com/warden-protocol/wardenprotocol/shield/internal/parser"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

func TestEvalIntegerExpression(t *testing.T) {
	input := `5;`
	evaluated := testEval(input, nil)
	testIntegerObject(t, evaluated, 5)
}

func TestEvalCallExpression(t *testing.T) {
	input := `any(2, [warden123, warden987]);`
	evaluated := testEval(input, map[string]bool{
		"warden123": true,
		"warden987": true,
	})
	require.NotNil(t, evaluated)
}

func TestEvalBooleanExpression(t *testing.T) {
	tests := []struct {
		input    string
		expected bool
	}{
		{"true;", true},
		{"false;", false},
		{"true || true && false;", true},
		{"true == true", true},
		{"false == false", true},
		{"true != false", true},
		{"false != true", true},
		{"false == true", false},
		{"true == false", false},
		{"1 == 1", true},
		{"10 > 1", true},
		{"1 < 10", true},
		{"10 >= 10", true},
		{"10 >= 999", false},
		{"999 <= 999", true},
		{"999 <= 10", false},
		{`"1" == "1"`, true},
		{`"10" > "1"`, true},
		{`"1" < "10"`, true},
		{`"10" >= "10"`, true},
		{`"10" >= "999"`, false},
		{`"999" <= "999"`, true},
		{`"999" <= "10"`, false},
		{"2 + 2 == 2 * 2", true},
		{"20 / 2 > 3 + 7", false},
		// disabled for now as we don't support mixed string to int comparisons
		// {`"10" > 1`, true},
		// {`"1" < 10`, true},
	}
	for _, tt := range tests {
		evaluated := testEval(tt.input, nil)
		testBooleanObject(t, evaluated, tt.expected)
	}
}

func TestArithmeticInteger(t *testing.T) {
	tests := []struct {
		input    string
		expected int64
	}{
		{"1 + 2", 3},
		{"10 - 4", 6},
		{"2 * 5", 10},
		{"8 / 2", 4},
		{"2 + 2 * 2", 6},
		{"2 * 2 + 2", 6},
		{"(2 + 2) * 2", 8},
		{"(10 + 2) / (6 - 3) * 4", 16},
		{"5 / 2 * 2", 4},
	}
	for _, tt := range tests {
		evaluated := testEval(tt.input, nil)
		testIntegerObject(t, evaluated, tt.expected)
	}
}

func testEval(input string, envMap map[string]bool) object.Object {
	l := lexer.New(input)
	p := parser.New(l)
	env := object.NewEnvironment()
	for k, v := range envMap {
		env.Set(k, &object.Boolean{Value: v})
	}
	return Eval(p.Parse(), env)
}

func testIntegerObject(t *testing.T, obj object.Object, expected int64) {
	result, ok := obj.(*object.Integer)
	require.True(t, ok, "object is not Integer. got=%T (%+v)", obj, obj)
	require.Equal(t, expected, result.Value)
}

func testBooleanObject(t *testing.T, obj object.Object, expected bool, msgAndArgs ...any) {
	result, ok := obj.(*object.Boolean)
	require.True(t, ok, "object is not Boolean. got=%T (%+v)", obj, obj)
	require.Equal(t, expected, result.Value, msgAndArgs...)
}

func testErrorObject(t *testing.T, obj object.Object, msgAndArgs ...any) {
	require.NotNil(t, obj, msgAndArgs...)
	require.EqualValues(t, object.ERROR_OBJ, obj.Type(), msgAndArgs...)
}
