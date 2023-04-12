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

echo "Stripping out floating point symbols from ${FILE}"

WATFILE=$(echo "${FILE}" | sed 's/\.wasm/\.wat/')
docker run --rm -v "${ROOT}:/code" ${EMSCRIPTEN} wasm2wat "/code/${FILE}" > "${WATFILE}"

# this just replaces all the floating point ops with unreachable. It still leaves them in the args and local variables
sed -E 's/^(\s*)f[[:digit:]]{2}\.[^()]+/\1unreachable/' "${WATFILE}" | \
  sed -E 's/^(\s*)i[[:digit:]]{2}\.trunc_[^()]+/\1unreachable/' | \
  sed -E 's/^(\s*)i[[:digit:]]{2}\.reinterpret_[^()]+/\1unreachable/' > "${WATFILE}-rewrite"
mv "${WATFILE}-rewrite" "${WATFILE}"

docker run --rm -w /code -v "${ROOT}:/code" ${EMSCRIPTEN} wat2wasm "/code/${WATFILE}"
rm ${WATFILE}

echo ""
ls -l "${FILE}"
sha256sum "${FILE}"

