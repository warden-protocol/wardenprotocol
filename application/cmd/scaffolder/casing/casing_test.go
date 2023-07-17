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
