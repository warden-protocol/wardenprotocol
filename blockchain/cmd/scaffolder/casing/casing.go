// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package casing

import "strings"

func ToKebabCase(s string) string {
	return toCase(s, '-')
}

func ToSnakeCase(s string) string {
	return toCase(s, '_')
}

func toCase(s string, sep rune) string {
	var b strings.Builder
	for i, r := range s {
		if i > 0 && isUpper(r) {
			if _, err := b.WriteRune(sep); err != nil {
				panic(err)
			}
		}
		if isUpper(r) {
			r += ('a' - 'A')
		}
		if _, err := b.WriteRune(r); err != nil {
			panic(err)
		}
	}
	return b.String()
}

func isUpper(r rune) bool {
	return r >= 'A' && r <= 'Z'
}

func ToLower(s string) string {
	return strings.ToLower(s)
}

func ToUpper(s string) string {
	return strings.ToUpper(s)
}
