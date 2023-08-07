#!/usr/bin/env bash

# --------------
# Commands to run locally
# docker run --network host --rm -v $(CURDIR):/workspace --workdir /workspace tendermintdev/sdk-proto-gen:v0.7 sh ./protocgen.sh
#
set -eo pipefail

echo "Generating gogo proto code"
proto_dirs=$(find ./proto -path -prune -o -name '*.proto' -print0 | xargs -0 -n1 dirname | sort | uniq)
for dir in $proto_dirs; do
  proto_files=$(find "${dir}" -maxdepth 1 -name '*.proto')
  for file in $proto_files; do
    # Check if the go_package in the file is pointing to evmos
    if grep -q "option go_package.*ethermint" "$file"; then
      buf generate --template proto/buf.gen.gogo.yaml "$file"
    fi
  done
done

# TODO: command to generate docs using protoc-gen-doc was deleted here

# move proto files to the right places
cp -r github.com/evmos/ethermint/* ./
rm -rf github.com

