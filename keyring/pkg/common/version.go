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
package common

import (
	"fmt"
)

var (
	Version     = "v0.1.0"                                       // Semantic version
	FullVersion = fmt.Sprintf("%s-%v", Version, CommitHash[0:8]) // Full version with commit hash
)
