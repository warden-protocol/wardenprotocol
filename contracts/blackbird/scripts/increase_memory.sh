#!/bin/bash

set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

# EMSCRIPTEN="polkasource/webassembly-wabt:v1.0.11"
EMSCRIPTEN="demo/builder:latest"

SCRIPT_DIR="$(realpath "$(dirname "$0")")"
ROOT="$(dirname "$SCRIPT_DIR")"

function print_usage() {
  echo "Usage: $0 [wasm_file] (memory_pages)"
  echo ""
  echo "e.g. $0 hackatom.wasm 12"
  echo "This file must have been compiled by compile.sh before and located in $ROOT"
  echo "If no memory pages is set, defaults to 20"
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

PAGES="${2:-20}"

WATFILE="${FILE//\.wasm/\.wat}"

echo "Increasing memory pages of $FILE to $PAGES"

docker run --rm -v "${ROOT}:/code" ${EMSCRIPTEN} wasm2wat "/code/${FILE}" > "${WATFILE}"
if [[ "$OSTYPE" == "darwin"* ]]; then
  # OR just install GNU sed locally
  sed -i "s/(memory (;0;) 2)/(memory (;0;) $PAGES)/" "${WATFILE}"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  sed -i "s/(memory (;0;) 2)/(memory (;0;) $PAGES)/" "${WATFILE}"
else
  echo "unsupported os type $OSTYPE"
  exit 1
fi
docker run --rm -v "${ROOT}:/code" ${EMSCRIPTEN} wat2wasm "/code/${WATFILE}" -o "/code/$FILE"

echo ""
ls -l "${FILE}"
sha256sum "${FILE}"

