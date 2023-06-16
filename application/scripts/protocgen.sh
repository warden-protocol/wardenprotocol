#!/usr/bin/env bash

set -eo pipefail

proto_dirs=$(find ./proto -path -prune -o -name '*.proto' -print0 | xargs -0 -n1 dirname | sort | uniq)
for dir in $proto_dirs; do
  buf protoc \
  -I "proto" \
  -I "third_party/proto" \
  --gocosmos_out=plugins=interfacetype+grpc,\
Mgoogle/protobuf/any.proto=github.com/cosmos/cosmos-sdk/codec/types:. \
  --grpc-gateway_out=logtostderr=true:. \
  $(find "${dir}" -maxdepth 1 -name '*.proto')

done

# command to generate docs using protoc-gen-doc
buf protoc \
-I "proto" \
-I "third_party/proto" \
--doc_out=./docs/api \
--doc_opt=./docs/protodoc-markdown.tmpl,proto-docs.md \
$(find "$(pwd)/proto" -maxdepth 5 -name '*.proto')
# go mod tidy

# move proto files to the right places
cp -r gitlab.qredo.com/qrdochain/fusionchain/* ./
rm -rf gitlab.qredo.com/
