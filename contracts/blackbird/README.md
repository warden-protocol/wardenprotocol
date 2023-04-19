## Overview

This is a demo for cosmwasm-go build, it is in beta state, and compatible with CosmWasm 1.0.

This is currently in a **developer pre-release**. It runs properly, but is not meant for general
consumption (eg. writing contracts), but rather used by developers who want to work on the
build system itself.

This is a relatively low-level API, exposing raw byte queries to storage and other items.
While usable as is, Archway is working on a higher level framework to make writing go contracts simpler
and significantly less boilerplate.

## Features

The following areas have been tested, both in unit tests and in integration
tests using `go-cosmwasm` to ensure compatibility. Please look at the 
[`hackatom` contract](./example/hackatom) for a good example with test coverage.

* Export `instantiate`, `execute`, `query`, `migrate` and return success response or errors
* Get and Set from persistent storage
* Canonicalize and Humanize addresses with the Api
* Query into the bank module and other contracts (using querier)
* Efficiently parse json structs
* Simple API so you can focus on the business logic
* Easy setup and similar format for unit test and integration tests, to allow
  easy porting them.
* Remove from storage
* Storage iterators
* Support for Uint128 (parsing strings, dealing with large integers)
  
The following areas have some code but have not been tested and *possibly buggy*:

* Querying staking modules

This can be called, but will likely not function 100% and will require some debugging to get them working.

## Caveats

Beyond the "likely buggy" Apis above, the following features are 
definitely not implemented:

* Exporting IBC entry points
* Calling into the crypto precompiles exposed by CosmWasm VM
* Sudo entry point
* Reply entry point (and thus submessages)

## JSON

We have a major fork of [easyjson](https://github.com/mailru/easyjson)
that removes all calls to reflect and net and fmt and encoding/json. It also removes
all floats and parses numbers directly into ints.

We call it [tinyjson](https://github.com/CosmWasm/tinyjson).
v0.8.x is the first version after forking (easyjson is at 0.7.x)
and already working quite well.

It works like `encoding/json`, but uses code generation to create
`MarshalJSON` and `UnmarshalJSON` methods on all structs when you
run a generation stage. After that, you can simply call those
methods on the structs to do all parsing.

It handles slices and pointers and all kinds of other things just
like `encoding/json`. It automatically snake_cases's the variable
names if you compile with `snake_case`, which saves some work in the structs.
It turns `[]byte` into base64 strings, and it properly escapes other `string`s.

A special feature is the custom `emptyslice` option, which you can add
just like `omitempty`. With that, it means any slice of length 0 will
serialize as `[]` rather than `null` (the default behavior).
This avoids the need for most of the custom JSON marshallers that we just doing this.  
### Usage

We require `docker` installed and executable by the current user. This
is used to compile the contracts to Wasm. You can code contracts and
write unit test with only a normal Golang installation (requires 1.14+)

You can try the following top-level commands:

```
# Run unit tests on the standard library as well as `erc20` and `hackatom` contracts.
# Also compiles the contracts to wasm and runs integration tests
make test

# This will compile wasm binaries for all contracts and leave them in this directory
make examples
```

To try out a contract, either check out [hackatom](./example/hackatom),
running the tests and editing the code. Or start your own contract
by going to the [template](./example/template) directory and follow the
instructions on how to get started.

Both of these support the following commands: `make unit-test`, `make build`, 
and `make test`.

## Performance

Many people ask how these compare to the rust contracts. I have yet to
do a detailed comparion, but now that we have two versions of the same
hackatom contract, we can do a rough side-by-side analysis.

Once this is more or less feature-complete, we need to do a more detailed
analysis. I assume contract size will be significantly larger when it has
all the features we have in Rust.

**The good:**

The contract size is significantly lower than the Rust version, that is
97kB for the TinyGo version compared to 179kB for the Rust version.
(There is a sha256 algorithm in the Rust version missing from the Go version,
but that is only about 20Kb of the size)

**The bad:**

Before I switched to tinyjson, this used significantly more gas.
Now, it seems to use about 1.5-2x more gas than the Rust contracts.
And the compiled size is about 50% of the Rust size.

## Development

This library is **very experimental**. If you want to try to build contracts
or hack on the library itself, please check out [DEVELOPMENT.md](./DEVELOPMENT.md)
for more details.
