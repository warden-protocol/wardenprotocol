package policy

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_NewPolicyAnyInGroup(t *testing.T) {
	tests := []struct {
		name          string
		group         []string
		signaturesMap map[string]bool
		expectedErr   bool
	}{
		{
			name:          "empty",
			group:         []string{},
			signaturesMap: map[string]bool{},
			expectedErr:   true,
		},
		{
			name:          "single",
			group:         []string{"foo"},
			signaturesMap: map[string]bool{"foo": true},
		},
		{
			name:          "foo signed",
			group:         []string{"foo", "bar"},
			signaturesMap: map[string]bool{"foo": true},
		},
		{
			name:          "bar signed",
			group:         []string{"foo", "bar"},
			signaturesMap: map[string]bool{"bar": true},
		},
		{
			name:          "all signed",
			group:         []string{"foo", "bar"},
			signaturesMap: map[string]bool{"foo": true, "bar": true},
		},
		{
			name:          "unknown signed",
			group:         []string{"foo", "bar"},
			signaturesMap: map[string]bool{"baz": true},
			expectedErr:   true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			p := NewAnyInGroupPolicy(tt.group)
			err := p.Verify(tt.signaturesMap, EmptyPolicyPayload())
			if tt.expectedErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
