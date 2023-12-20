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
package main

import (
	"github.com/qredo/fusionchain/cmd/scaffolder/cmd"
)

// Command scaffolder helps in generating code needed to add new messages and
// queries to existing Cosmos SDK modules.
//
// We are developing this to be a simpler version of Ignite compatible with
// Fusion and focused on our needs.
func main() {
	cmd.Execute()
}
