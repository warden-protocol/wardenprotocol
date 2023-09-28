// Copyright 2021 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package version

import (
	"fmt"
	"runtime"
	"runtime/debug"
	"time"

	"github.com/ethereum/go-ethereum/common/hexutil"
)

var (
	AppVersion = "0.0.1"
	GitCommit  = ""
	BuildDate  = ""
	GoVersion  = ""
	GoArch     = ""

	linkedCommit string // overwritten by -ldflag "-X 'github.com/qredo/fusionchain/blockchain/version.linkedCommit=$commit_hash'"
	linkedDate   string // overwritten by -ldflag "-X 'github.com/qredo/fusionchain/blockchain/version.linkedDate=$build_date'"
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

// Date returns the compilation build time
var Date = func() string {
	if linkedDate != "" {
		return linkedDate
	}
	return time.Now().Format(time.RFC3339)
}()

func init() {
	if len(AppVersion) == 0 {
		AppVersion = "dev"
	}

	GoVersion = runtime.Version()
	GoArch = runtime.GOARCH
	GitCommit = CommitHash[0:8]
	BuildDate = Date
}

func Version() string {
	return fmt.Sprintf(
		"Version %s (GitCommit %s)\nCompiled at %s using Go %s (%s)",
		AppVersion,
		GitCommit,
		BuildDate,
		GoVersion,
		GoArch,
	)
}
