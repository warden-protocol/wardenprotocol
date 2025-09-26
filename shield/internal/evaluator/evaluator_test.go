package evaluator

import (
	"fmt"
	"math/big"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/shield/internal/lexer"
	"github.com/warden-protocol/wardenprotocol/shield/internal/parser"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

func TestEvalIntegerExpression(t *testing.T) {
	input := `5;`
	evaluated := testEval(input, nil)
	testIntegerObject(t, evaluated, big.NewInt(5))
}

func TestEvalBigIntegerExpression(t *testing.T) {
	input := `18446744073709551616;`
	evaluated := testEval(input, nil)
	expected, _ := new(big.Int).SetString("18446744073709551616", 10)
	testIntegerObject(t, evaluated, expected)
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
		{"-1 > 2", false},
		{"-1 > -2", true},
		{"-(4 + 3) < -(-4)", true},
		{"-(-4 + 4) == 0", true},
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
		expected *big.Int
	}{
		{"1 + 2", big.NewInt(3)},
		{"10 - 4", big.NewInt(6)},
		{"2 * 5", big.NewInt(10)},
		{"8 / 2", big.NewInt(4)},
		{"2 + 2 * 2", big.NewInt(6)},
		{"2 * 2 + 2", big.NewInt(6)},
		{"(2 + 2) * 2", big.NewInt(8)},
		{"(10 + 2) / (6 - 3) * 4", big.NewInt(16)},
		{"5 / 2 * 2", big.NewInt(4)},
		{"-5 + 5", big.NewInt(0)},
		{"-(4 + 3) - (4 + 3)", big.NewInt(-14)},
		{"9223372036854775807 + 1", new(big.Int).SetBytes([]byte{0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00})},
		{"-9223372036854775807 - 2", new(big.Int).Neg(new(big.Int).SetBytes([]byte{0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01}))},
		{"(18446744073709551616 * 8 + 24) / 4 - 1", new(big.Int).SetBytes([]byte{0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x05})},
		{"-(-18446744073709551616 * 8 + 24) / 4 - 1", new(big.Int).SetBytes([]byte{0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xf9})},
	}
	for _, tt := range tests {
		evaluated := testEval(tt.input, nil)
		testIntegerObject(t, evaluated, tt.expected)
	}
}

func TestNilEnv(t *testing.T) {
	input := "testNilEnv"
	l := lexer.New(input)
	p := parser.New(l)
	evaluated := Eval(p.Parse(), nil)
	testErrorObject(t, evaluated, fmt.Sprintf("unknown identifier '%s': passed environment is nil", input))
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

func testIntegerObject(t *testing.T, obj object.Object, expected *big.Int) {
	result, ok := obj.(*object.Integer)
	require.True(t, ok, "object is not Integer. got=%T (%+v)", obj, obj)
	// casting to string to avoid issues with different representations of 0 as big.Int
	require.Equal(t, expected.String(), result.Value.String())
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
