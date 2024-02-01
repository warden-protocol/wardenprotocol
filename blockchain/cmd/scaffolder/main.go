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
package main

import (
	"github.com/warden-protocol/wardenprotocol/cmd/scaffolder/cmd"
)

// Command scaffolder helps in generating code needed to add new messages and
// queries to existing Cosmos SDK modules.
//
// We are developing this to be a simpler version of Ignite compatible with
// Warden and focused on our needs.
func main() {
	cmd.Execute()
}
