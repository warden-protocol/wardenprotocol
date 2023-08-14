#!/bin/sh
set -e
cd "$(dirname "$0")"

# explicitly set a short TMPDIR to prevent path too long issue on macosx
export TMPDIR=/tmp

echo "build test contracts"
cd ../tests/integration_tests/hardhat
HUSKY_SKIP_INSTALL=1 npm install
npm run typechain
cd ..
pytest -vv -s
