package main

import (
	"testing"
)

func TestConvertHexToBech32(t *testing.T) {
	testCases := []struct {
		name      string
		addr      string
		hrp       string
		expected  string
		expectErr bool
	}{
		{
			name:      "Valid hex address",
			addr:      "0x8f1ca170120dbe6a9d96554dc763c087935b06cb",
			expected:  "warden13uw2zuqjpklx48vk24xuwc7qs7f4kpktt25svn",
			expectErr: false,
		},
		{
			name:      "Invalid hex address",
			addr:      "0x123abc",
			expected:  "",
			expectErr: true,
		},
	}

	for _, tc := range testCases {
		// Capture range variable
		t.Run(tc.name, func(t *testing.T) {
			addr, err := convertHexToBech32(tc.addr)
			if tc.expectErr {
				if err == nil {
					t.Errorf("expected error but got none")
				} else {
					t.Logf("got expected error: %v", err)
				}

				return
			}

			if err != nil {
				t.Errorf("unexpected error: %v", err)
			}

			if addr != tc.expected {
				t.Errorf("expected address %q, got %q", tc.expected, addr)
			}
		})
	}
}
