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
	"encoding/hex"
	"runtime/debug"
	"time"
)

var (
	linkedCommit string // overwritten by -ldflag "-X 'github.com/qredo/fusionchain/keyring/pkg/common.linkedCommit=$commit_hash'"
	linkedDate   string // overwritten by -ldflag "-X 'github.com/qredo/fusionchain/keyring/pkg/common.linkedDate=$build_date'"
)

// CommitHash https://icinga.com/blog/2022/05/25/embedding-git-commit-information-in-go-binaries/
var CommitHash = func() string {
	if len(linkedCommit) > 7 {
		mustHexDecode(linkedCommit[0:8]) // will panic if build has been generated with a malicious $commit_hash value
		return linkedCommit[0:8]
	}
	var commit string
	if info, ok := debug.ReadBuildInfo(); ok {
		for _, setting := range info.Settings {
			if setting.Key == "vcs.revision" {
				commit = setting.Value
			}
		}
	}
	if commit == "" {
		return "00000000"
	}
	mustHexDecode(commit)
	return commit
}()

// Date returns a build date generator
var Date = func() string {
	if linkedDate != "" {
		return linkedDate
	}
	return time.Now().Format(time.RFC3339)
}()

func mustHexDecode(input string) {
	_, err := hex.DecodeString(input)
	if err != nil {
		panic(err)
	}
}
