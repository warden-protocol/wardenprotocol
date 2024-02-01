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
package version

import (
	"fmt"
	"runtime"
	"runtime/debug"
	"time"

	"github.com/ethereum/go-ethereum/common/hexutil"
)

var (
	GitCommit = ""
	BuildDate = ""
	GoVersion = ""
	GoArch    = ""

	linkedCommit string // overwritten by -ldflag "-X 'github.com/warden-protocol/wardenprotocol/blockchain/version.linkedCommit=$commit_hash'"
	linkedDate   string // overwritten by -ldflag "-X 'github.com/warden-protocol/wardenprotocol/blockchain/version.linkedDate=$build_date'"
	linkedSemVer string // overwritten by -ldflag "-X 'github.com/warden-protocol/wardenprotocol/blockchain/version.linkedSemVer=$semantic_version'"
)

// CommitHash returns the first 8 characters of the git commit hash
// https://icinga.com/blog/2022/05/25/embedding-git-commit-information-in-go-binaries/
var CommitHash = func() string {
	if len(linkedCommit) > 7 {
		_ = hexutil.MustDecode("0x" + linkedCommit[0:8]) // will panic if build has been generated with a malicious $commit_hash value
		return linkedCommit[0:8]
	}
	if info, ok := debug.ReadBuildInfo(); ok {
		for _, setting := range info.Settings {
			if setting.Key == "vcs.revision" {
				return setting.Value
			}
		}
	}
	return "00000000"
}()

// SemanticVersion returns the semantic version
// https://icinga.com/blog/2022/05/25/embedding-git-commit-information-in-go-binaries/
var SemanticVersion = func() string {
	if linkedSemVer != "" {
		return linkedSemVer
	}
	return "0.0.0"
}()

// Date returns the compilation build time
var Date = func() string {
	if linkedDate != "" {
		return linkedDate
	}
	return time.Now().Format(time.RFC3339)
}()

func init() {
	if len(SemanticVersion) == 0 {
		SemanticVersion = "0.0.0"
	}

	GoVersion = runtime.Version()
	GoArch = runtime.GOARCH
	GitCommit = CommitHash[0:8]
	BuildDate = Date
}

func Version() string {
	return fmt.Sprintf(
		"Version %s (GitCommit %s)\nCompiled at %s using Go %s (%s)",
		SemanticVersion,
		GitCommit,
		BuildDate,
		GoVersion,
		GoArch,
	)
}
