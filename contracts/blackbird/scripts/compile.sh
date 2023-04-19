#!/bin/bash

set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

# VERSION=${VERSION:-0.23.0}
# TINYGO_IMAGE="cosmwasm/tinygo:${VERSION}"
TINYGO_IMAGE="cosmwasm/tinygo:latest"

# TINYGO_IMAGE="demo/builder:latest"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
ROOT="$(dirname "$SCRIPT_DIR")"

function print_usage() {
  echo "Usage: $0 [contract_name]"
  echo ""
  echo "e.g. $0 hackatom"
  echo "This must be a valid directory name under example/"
  echo ""
  echo "Outputs [contract_name].wasm in top level directory"
}

if [ "$#" -ne 1 ]; then
    print_usage
    exit 1
fi

CONTRACT="$1"
DIR="${ROOT}/${CONTRACT}"

if [ ! -d "$DIR" ]; then
    print_usage
    exit 1
fi

echo "Compiling $CONTRACT with tinygo..."
docker run --rm -w /code -v "${ROOT}:/code" "${TINYGO_IMAGE}" tinygo build -tags "cosmwasm tinyjson_nounsafe" -no-debug -target wasi -o "/code/${CONTRACT}.wasm" "/code/${CONTRACT}/main.go"
echo "${ROOT}/${CONTRACT}.wasm"
ls -l "${ROOT}/${CONTRACT}.wasm"
