/*
The MIT License (MIT)

Copyright (c) 2015 Marc Abi Khalil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


Christopher Morris chris@qredo.com 		2021

*/

package boolparser

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_Misc(t *testing.T) {
	assert.True(t, BoolSolve("1 * 1"), "Bool operation fails")
	assert.False(t, BoolSolve("1 * 0"), "Bool operation fails")

	assert.True(t, BoolSolve("2 - 1"), "Bool operation fails")
	assert.False(t, BoolSolve("1 - 1"), "Bool operation fails")

	assert.True(t, BoolSolve("!0"), "Bool operation fails")
	assert.False(t, BoolSolve("!1"), "Bool operation fails")

	assert.False(t, BoolSolve("$"), "Bool operation fails")
	assert.True(t, BoolSolve("     1        +        2       "), "Bool operation fails")
	assert.False(t, BoolSolve(""), "Bool operation fails")

}

func Test_Substitution(t *testing.T) {
	assert.True(t, BoolSolve("0 + 1 + 1 > 1 & 1"), "Bool operation fails")
	assert.True(t, BoolSolve("0 + 1 + (0 + 1 + 1 > 1 & 1) > 1 & 1"), "Bool operation fails")
}

func Test_Unary_Bool(t *testing.T) {
	assert.True(t, BoolSolve("1 & 1 & 1 & 1 & 1 & 1 | 1 | 1 | 1 & 1 & 1"), "Bool operation fails")

	assert.False(t, BoolSolve("!1 & !1"), "Bool operation fails")
	assert.False(t, BoolSolve("1 & !1"), "Bool operation fails")
	assert.False(t, BoolSolve("0 & 0"), "Bool operation fails")
	assert.False(t, BoolSolve("!1 & 1"), "Bool operation fails")
	assert.True(t, BoolSolve("1 & 1"), "Bool operation fails")
	assert.True(t, BoolSolve("!0 & !0"), "Bool operation fails")
	assert.True(t, BoolSolve("(!0) & (!0)"), "Bool operation fails")
	assert.False(t, BoolSolve("(!1) & (!0)"), "Bool operation fails")

	assert.True(t, BoolSolve("0 + 1 + 1 > 1 & 1"), "Bool operation fails")
	assert.True(t, BoolSolve("!0"), "Bool operation fails")
	assert.False(t, BoolSolve("!1"), "Bool operation fails")
	assert.False(t, BoolSolve("!(0 | 1)"), "Bool operation fails")
	assert.True(t, BoolSolve("!(0 | 0)"), "Bool operation fails")
	assert.True(t, BoolSolve("(1+1+1+1 > 3)"), "Bool operation fails")
	assert.False(t, BoolSolve("!(1+1+1+1 > 3)"), "Bool operation fails")
	assert.True(t, BoolSolve("!0 & !0"), "Bool operation fails")
	assert.False(t, BoolSolve("!0 & !1"), "Bool operation fails")
	assert.False(t, BoolSolve("!0 & !1)"), "Bool operation fails")
	assert.True(t, BoolSolve("1 & !0)"), "Bool operation fails")
	assert.True(t, BoolSolve("1 & 1 | !(0 & 0 & 0)"), "Bool operation fails")
	assert.True(t, BoolSolve("1 & 1 | !(1 & 0 & 0)"), "Bool operation fails")
	assert.True(t, BoolSolve("1 & 1 | !(0 & 1 & 0)"), "Bool operation fails")
	assert.True(t, BoolSolve("1 & 1 | !(0 & 0 & 1)"), "Bool operation fails")
	assert.True(t, BoolSolve("1 & 1 | !(!0 & !0 & 1)"), "Bool operation fails")
	assert.False(t, BoolSolve("1 & 1 | !(!0 & !0 & !1)"), "Bool operation fails")
	assert.True(t, BoolSolve("1 & 1"), "Bool operation fails")
	assert.False(t, BoolSolve("!(1 & 1)"), "Bool operation fails")
	assert.True(t, BoolSolve("!(!(1 & 1))"), "Bool operation fails")
}

func Test_And_Bool(t *testing.T) {
	assert.False(t, BoolSolve("0 & 0"), "Bool operation fails")
	assert.False(t, BoolSolve("1 & 0"), "Bool operation fails")
	assert.False(t, BoolSolve("0 & 1"), "Bool operation fails")
	assert.True(t, BoolSolve("1 & 1"), "Bool operation fails")
}

func Test_Or_Bool(t *testing.T) {
	assert.False(t, BoolSolve("0 | 0"), "Bool operation fails")
	assert.True(t, BoolSolve("1 | 0"), "Bool operation fails")
	assert.True(t, BoolSolve("0 | 1"), "Bool operation fails")
	assert.True(t, BoolSolve("1 | 1"), "Bool operation fails")
}

func Test_Parens_Bool(t *testing.T) {
	assert.False(t, BoolSolve("(0|0)&(1)"), "Bool operation fails")
	assert.True(t, BoolSolve("(1|1)&(1)"), "Bool operation fails")
	assert.True(t, BoolSolve("(1|1)&(1)"), "Bool operation fails")
}

func Test_Threshold_Bool(t *testing.T) {
	assert.True(t, BoolSolve("1+1+1+1 > 3"), "Bool operation fails")
	assert.True(t, BoolSolve("(1+1+1+1) > 3"), "Bool operation fails")
	assert.True(t, BoolSolve("(1+1+1+1 > 3)"), "Bool operation fails")
	assert.False(t, BoolSolve("(1+1+1+1 > 4)"), "Bool operation fails")

	assert.True(t, BoolSolve("0+1+1+1 > 2)"), "Bool operation fails")
	assert.True(t, BoolSolve("0 | 0+1+1+1 > 2)"), "Bool operation fails")
	assert.False(t, BoolSolve("0 | 0+1+1+0 > 2)"), "Bool operation fails")
	assert.False(t, BoolSolve("0+1+1+0 > 2 | 0+1+1+0 > 2"), "Bool operation fails")
	assert.True(t, BoolSolve("0+1+1+0 > 2 | 0+1+1+1 > 2"), "Bool operation fails")
	assert.True(t, BoolSolve("0+1+1+0 > 2 | 0+1+1+0 > 2 | 1"), "Bool operation fails")
	assert.True(t, BoolSolve("1 | 0+1+1+0 > 2 | 0+1+1+0 > 2"), "Bool operation fails")
}

func Test_Decode1_Bool(t *testing.T) {
	//A couple of integrationtests for my specific use case
	keys := make(map[string]string)
	keys["P"] = "1"
	keys["C"] = "1"
	keys["B"] = "1"
	keys["T1"] = "1"
	keys["T2"] = "1"
	keys["T3"] = "1"
	keys["T4"] = "1"

	rule := "P & C & (T1 + T2 + T3 + T4 > 3)"
	testString := decode(keys, rule)
	assert.True(t, BoolSolve(testString), "Bool Solve should fail")
}
func Test_Decode2_Bool(t *testing.T) {
	//A couple of integrationtests for my specific use case
	keys := make(map[string]string)
	keys["P"] = "1"
	keys["C"] = "1"
	keys["B"] = "1"
	keys["T1"] = "1"
	keys["T2"] = "1"
	keys["T3"] = "1"
	keys["T4"] = "1"

	rule := "P & C & (T1 + T2 + T3 + T4 > 3)"
	testString := decode(keys, rule)
	assert.True(t, BoolSolve(testString), "Bool Solve should pass")
}

func decode(keys map[string]string, rule string) string {
	for key := range keys {
		rule = strings.ReplaceAll(rule, key, keys[key])
	}
	return rule
}
