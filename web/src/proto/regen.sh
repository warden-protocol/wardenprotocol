#!/bin/bash -e

pushd ../../../blockchain
buf generate --template buf.ts.gen.yaml 
popd
