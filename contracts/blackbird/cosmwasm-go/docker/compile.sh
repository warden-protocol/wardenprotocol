#!/bin/bash

set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

function print_usage() {
  echo "Usage: $0 [path_to_compile]"
  echo "This must be a valid directory with a main.go file for tinygo compilation"
  echo ""
  echo "e.g. $0 ./example/hackatom"
  echo "e.g. $0 ."
  echo ""
  echo "Outputs [basename].wasm in the given directory"
  echo ""
  echo "Options: export CHECK=1 STRIP_FLOATS=1 to turn on extra features"
  echo "Options: export PAGES=30 to set 30 pages of memory"
}

if [ "$#" -ne 1 ]; then
    print_usage
    exit 1
fi

DIR=$(realpath "$(pwd)/${1}")

if [ ! -d "$DIR" ]; then
    echo "Invalid directory: '$DIR'"
    exit 2
fi

if [ ! -f "$DIR/main.go" ]; then
    echo "No main.go entry point: '$DIR'"
    exit 3
fi

CONTRACT=$(basename "$DIR")
WASM_FILE="/work/$CONTRACT.wasm"
WAT_FILE="/work/$CONTRACT.wat"

echo "Compiling $CONTRACT with tinygo..."
tinygo build -tags "cosmwasm tinyjson_nounsafe" -no-debug -target wasi -o "$WASM_FILE" "${DIR}/main.go"

# debug output
ls -l "$WASM_FILE"

wasm2wat "$WASM_FILE" > "$WAT_FILE"

if [ ! -z "${CHECK+x}" ]; then
  echo "Checking ${CONTRACT}..."
  echo ""
  echo "** IMPORTS **"
  grep import "${WAT_FILE}"

  echo ""
  echo "** Floating point ops **"
  if grep f64 "${WAT_FILE}"; then
    echo "Float ops found"
    exit 4
  fi
fi

if [ ! -z "${STRIP+x}" ]; then
  echo "Stripping floats from ${CONTRACT}..."
  echo ""
  sed -E 's/^(\s*)f[[:digit:]]{2}\.[^()]+/\1unreachable/' "${WAT_FILE}" | \
    sed -E 's/^(\s*)i[[:digit:]]{2}\.trunc_[^()]+/\1unreachable/' | \
    sed -E 's/^(\s*)i[[:digit:]]{2}\.reinterpret_[^()]+/\1unreachable/' > "${WAT_FILE}-rewrite"
  mv "${WAT_FILE}-rewrite" "${WAT_FILE}"
fi

# default of 20 memory pages, unless explicitly set
PAGES="${PAGES:-20}"

echo "Increasing memory $CONTRACT to $PAGES pages..."
sed -i "s/(memory (;0;) 2)/(memory (;0;) $PAGES)/" "${WAT_FILE}"

wat2wasm "$WAT_FILE" -o "$WASM_FILE"

ls -l "${WASM_FILE}"
sha256sum "${WASM_FILE}"

echo mv "$WASM_FILE" "$DIR"
mv "$WASM_FILE" "$DIR"