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
package casing

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestToKebabCase(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "empty string",
			input:    "",
			expected: "",
		},
		{
			name:     "single word",
			input:    "word",
			expected: "word",
		},
		{
			name:     "two words",
			input:    "twoWords",
			expected: "two-words",
		},
		{
			name:     "three words",
			input:    "threeWordsHere",
			expected: "three-words-here",
		},
		{
			name:     "acronym",
			input:    "acronymABC",
			expected: "acronym-a-b-c",
		},
		{
			name:     "first letter uppercase",
			input:    "FirstLetterUppercase",
			expected: "first-letter-uppercase",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			actual := ToKebabCase(tt.input)
			require.Equal(t, tt.expected, actual)
		})
	}
}
