# Hackatom contract

This is a port of the
[basic testing contract](https://github.com/CosmWasm/cosmwasm/blob/master/contracts/hackatom/src/contract.rs)
from the Rust CosmWasm, often known as "hackatom" in honor of the birth of CosmWasm

We use that for a lot of end to end testing and checking error handling, so
the wasm blob we produce here is useful to ensure compatibility in a number
of other repos integration tests.

This also uses most aspects of the Api. Multiple messages, state access,
api usage, external queries. The two elements that are not covered are
the iterator, and queries besides Bank. These should not be relied upon
yet, but the rest has been tested to work (including via `wasmvm`
in the production VM).

You can read through this contract to see a basic example of how to write
a cosmwasm contract in Golang. This is very early and no APIs are solidified,
many helpers are likely needed. Please give feedback and help shape it.

## Organization

`main.go` only has the entrypoints and this is used by TinyGo to build the Wasm
blob. (Like `lib.rs` in the Rust contracts)

`src` contains all contract logic, as well as unit tests that can be run in pure
Go (not in the wasm environment). This is a great help to allow 
`fmt.Printf("%#v\n")`, breakpoints, and other debugging tools.  It contains the
following:

* `msg.go` - defines InitMsg, HandleMsg, QueryMsg, and MigrateMsg
* `state.go` - defines accessors to the storage layer
* `contract.go` - all the actual logic of the contract
* `contract_test.go` - unit tests for the contract, using a mock environment

`integration` contains integration tests, which depend on a wasm output
previously compiles. They load that wasm code into a `wasmvm` VM, the
same environment that is used in `wasmd`. We mock out the callbacks, so it
doesn't provide the same power as `wasmd` tests, for checking system interactions,
but it is a great way to test all code inside the restricted wasm environment
and hunt down issues (particularly with json lib, or reflection issues).

## Usage

```
# Runs all unit tests in pure go - fast
make unit-test

# Produces a `hackatom.wasm` file - requires docker and takes a minute or so
make build

# Recompiles the wasm file (as above), then runs full integration tests on it
make intergration-test

# Run unit tests, build wasm, then run integration tests
make test
```
