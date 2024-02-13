// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
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
