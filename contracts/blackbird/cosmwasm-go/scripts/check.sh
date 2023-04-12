#!/bin/bash

set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

# EMSCRIPTEN="polkasource/webassembly-wabt:v1.0.11"
EMSCRIPTEN="demo/builder:latest"


SCRIPT_DIR="$(realpath "$(dirname "$0")")"
ROOT="$(dirname "$SCRIPT_DIR")"

function print_usage() {
  echo "Usage: $0 [wasm_file]"
  echo ""
  echo "e.g. $0 hackatom.wasm"
  echo "This file must have been compiled by compile.sh before and located in $ROOT"
}

if [ "$#" -ne 1 ]; then
    print_usage
    exit 1
fi

FILE="${1}"

if [ ! -f "$FILE" ]; then
    print_usage
    exit 1
fi

echo "Checking $FILE"
WATFILE="${FILE//\.wasm/\.wat}"

docker run --rm -v "${ROOT}:/code" ${EMSCRIPTEN} wasm2wat "/code/${FILE}" > "${WATFILE}"

echo ""
echo "** IMPORTS **"
grep import "${WATFILE}"

echo ""
echo "** Floating point ops **"
grep f64 "${WATFILE}" || true

echo ""
ls -l "${FILE}"
sha256sum "${FILE}"

