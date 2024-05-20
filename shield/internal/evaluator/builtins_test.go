package evaluator

import (
	"testing"
)

type anyTestCaseSuccess struct {
	input    string
	expected bool
	env      map[string]bool
}

type anyTestCaseError struct {
	input string
	env   map[string]bool
}

var anyTestCasesSuccess = []anyTestCaseSuccess{
	{`any(2, [true, true, true])`, true, nil},
	{`any(2, [true, true, false])`, true, nil},
	{`any(2, [true, false, false])`, false, nil},
	{`any(2, [false, false, true])`, false, nil},
	{`any(2, [false, true, true])`, true, nil},
	{`any(2, [false, false, false])`, false, nil},
	{`any(2, [true, true, true, false, true])`, true, nil},
	{`any(2, [])`, false, nil},

	{`any(2, [warden123, warden456, warden789])`, true, map[string]bool{
		"warden123": true,
		"warden456": false,
		"warden789": true,
	}},
	{`any(2, [warden123, warden456, warden789])`, false, map[string]bool{
		"warden123": false,
		"warden456": false,
		"warden789": true,
	}},
	{`any(2, [warden123, warden456, warden789])`, true, map[string]bool{
		"warden123": true,
		"warden456": true,
		"warden789": true,
	}},
}

var anyTestCasesError = []anyTestCaseError{
	{`any(2, [0, true, false])`, nil}, // integer instead of bool
	{`any(2, [warden123, warden456, warden789])`, map[string]bool{
		"warden123": true,
		"warden789": true,
	}}, // undefined variable
}

var allTestCasesSuccess = []anyTestCaseSuccess{
	{`all([true, true, true])`, true, nil},
	{`all([true, true, false])`, false, nil},
	{`all([true, false, false])`, false, nil},
	{`all([false, false, true])`, false, nil},
	{`all([false, true, true])`, false, nil},
	{`all([false, false, false])`, false, nil},
	{`all([true, true, true, false, true])`, false, nil},
	{`all([])`, true, nil},

	{`all([warden123, warden456, warden789])`, false, map[string]bool{
		"warden123": true,
		"warden456": false,
		"warden789": true,
	}},
	{`all([warden123, warden456, warden789])`, false, map[string]bool{
		"warden123": false,
		"warden456": false,
		"warden789": true,
	}},
	{`all([warden123, warden456, warden789])`, true, map[string]bool{
		"warden123": true,
		"warden456": true,
		"warden789": true,
	}},
}

var allTestCasesError = []anyTestCaseError{
	{`all(123, [0, true, false])`, nil}, // wrong number of arguments
	{`all([], [0, true, false])`, nil},  // wrong number of arguments
	{`all([0, true, false])`, nil},      // integer instead of bool
	{`all([warden123, warden456, warden789])`, map[string]bool{
		"warden123": true,
		"warden789": true,
	}}, // undefined variable
}

type containsTestCaseSuccess struct {
	input    string
	expected bool
}

type containsTestCaseError struct {
	input string
}

var containsTestCasesSuccess = []containsTestCaseSuccess{
	{`contains(1, [1])`, true},
	{`contains(1, [])`, false},
	{`contains("foo string", [1, "foo string"])`, true},
	{`contains(false, [true, true, false])`, true},
	{`contains(true, [true, true, false])`, true},
}

var containsTestCasesError = []containsTestCaseError{
	{`contains()`},
	{`contains(1)`},
	{`contains(1, 1)`},
	{`contains([], 1)`},
	{`contains([], [[]])`},
	{`contains([1, 2, 3], [[], [1, 2, 3]])`},
}

func TestAny(t *testing.T) {
	for _, tt := range anyTestCasesSuccess {
		evaluated := testEval(tt.input, tt.env)
		testBooleanObject(t, evaluated, tt.expected, "input: %s", tt.input)
	}

	for _, tt := range anyTestCasesError {
		evaluated := testEval(tt.input, tt.env)
		testErrorObject(t, evaluated, "input: %s", tt.input)
	}
}

func TestAll(t *testing.T) {
	for _, tt := range allTestCasesSuccess {
		evaluated := testEval(tt.input, tt.env)
		testBooleanObject(t, evaluated, tt.expected, "input: %s", tt.input)
	}

	for _, tt := range allTestCasesError {
		evaluated := testEval(tt.input, tt.env)
		testErrorObject(t, evaluated, "input: %s", tt.input)
	}
}

func TestContains(t *testing.T) {
	for _, tt := range containsTestCasesSuccess {
		evaluated := testEval(tt.input, nil)
		testBooleanObject(t, evaluated, tt.expected, "input: %s", tt.input)
	}

	for _, tt := range containsTestCasesError {
		evaluated := testEval(tt.input, nil)
		testErrorObject(t, evaluated, "input: %s", tt.input)
	}
}
