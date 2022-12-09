#!/bin/bash
export GOPATH=~/go
export PATH=$PATH:$GOPATH/bin

# remove existing daemon
rm -rf ~/.ethermintd

# build ethermint binary
make install

cd tests/solidity

if command -v yarn &> /dev/null; then
    yarn install
else
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt update && sudo apt install yarn
    yarn install
fi

yarn test --network ethermint $@