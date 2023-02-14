# Importing

In [Publishing](./Publishing.md), we discussed how you can publish your contract to the world.
This looks at the flip-side, how can you use someone else's contract (which is the same
question as how they will use your contract). Let's go through the various stages.

## Verifying Artifacts

Before using remote code, you most certainly want to verify it is honest.

The simplest audit of the repo is to simply check that the artifacts in the repo
are correct. This involves recompiling the claimed source with the claimed builder
and validating that the locally compiled code (hash) matches the code hash that was
uploaded. This will verify that the source code is the correct preimage. Which allows
one to audit the original (Rust) source code, rather than looking at wasm bytecode.

We have a script to do this automatic verification steps that can
easily be run by many individuals. Please check out
[`cosmwasm-verify`](https://github.com/CosmWasm/cosmwasm-verify/blob/master/README.md)
to see a simple shell script that does all these steps and easily allows you to verify
any uploaded contract.

## Reviewing

Once you have done the quick programatic checks, it is good to give at least a quick
look through the code. A glance at `examples/schema.rs` to make sure it is outputing
all relevant structs from `contract.rs`, and also ensure `src/lib.rs` is just the
default wrapper (nothing funny going on there). After this point, we can dive into
the contract code itself. Check the flows for the execute methods, any invariants and
permission checks that should be there, and a reasonable data storage format.

You can dig into the contract as far as you want, but it is important to make sure there
are no obvious backdoors at least.

## Decentralized Verification

It's not very practical to do a deep code review on every dependency you want to use,
which is a big reason for the popularity of code audits in the blockchain world. We trust
some experts review in lieu of doing the work ourselves. But wouldn't it be nice to do this
in a decentralized manner and peer-review each other's contracts? Bringing in deeper domain
knowledge and saving fees.

Luckily, there is an amazing project called [crev](https://github.com/crev-dev/cargo-crev/blob/master/cargo-crev/README.md)
that provides `A cryptographically verifiable code review system for the cargo (Rust) package manager`.

I highly recommend that CosmWasm contract developers get set up with this. At minimum, we
can all add a review on a package that programmatically checked out that the json schemas
and wasm bytecode do match the code, and publish our claim, so we don't all rely on some
central server to say it validated this. As we go on, we can add deeper reviews on standard
packages.

If you want to use `cargo-crev`, please follow their
[getting started guide](https://github.com/crev-dev/cargo-crev/blob/master/cargo-crev/src/doc/getting_started.md)
and once you have made your own *proof repository* with at least one *trust proof*,
please make a PR to the [`cawesome-wasm`]() repo with a link to your repo and
some public name or pseudonym that people know you by. This allows people who trust you
to also reuse your proofs.

There is a [standard list of proof repos](https://github.com/crev-dev/cargo-crev/wiki/List-of-Proof-Repositories)
with some strong rust developers in there. This may cover dependencies like `serde` and `snafu`
but will not hit any CosmWasm-related modules, so we look to bootstrap a very focused
review community.
