# Publishing Contracts

This is an overview of how to publish the contract's source code in this repo.
We use Cargo's default registry [crates.io](https://crates.io/) for publishing contracts written in Rust.

## Preparation

Ensure the `Cargo.toml` file in the repo is properly configured. In particular, you want to
choose a name starting with `cw-`, which will help a lot finding CosmWasm contracts when
searching on crates.io. For the first publication, you will probably want version `0.1.0`.
If you have tested this on a public net already and/or had an audit on the code,
you can start with `1.0.0`, but that should imply some level of stability and confidence.
You will want entries like the following in `Cargo.toml`:

```toml
name = "cw-escrow"
version = "0.1.0"
description = "Simple CosmWasm contract for an escrow with arbiter and timeout"
repository = "https://github.com/confio/cosmwasm-examples"
```

You will also want to add a valid [SPDX license statement](https://spdx.org/licenses/),
so others know the rules for using this crate. You can use any license you wish,
even a commercial license, but we recommend choosing one of the following, unless you have
specific requirements.

* Permissive: [`Apache-2.0`](https://spdx.org/licenses/Apache-2.0.html#licenseText) or [`MIT`](https://spdx.org/licenses/MIT.html#licenseText)
* Copyleft: [`GPL-3.0-or-later`](https://spdx.org/licenses/GPL-3.0-or-later.html#licenseText) or [`AGPL-3.0-or-later`](https://spdx.org/licenses/AGPL-3.0-or-later.html#licenseText)
* Commercial license: `Commercial` (not sure if this works, I cannot find examples)

It is also helpful to download the LICENSE text (linked to above) and store this
in a LICENSE file in your repo. Now, you have properly configured your crate for use
in a larger ecosystem.

### Updating schema

To allow easy use of the contract, we can publish the schema (`schema/*.json`) together
with the source code.

```sh
cargo schema
```

Ensure you check in all the schema files, and make a git commit with the final state.
This commit will be published and should be tagged. Generally, you will want to
tag with the version (eg. `v0.1.0`), but in the `cosmwasm-examples` repo, we have
multiple contracts and label it like `escrow-0.1.0`. Don't forget a
`git push && git push --tags`

### Note on build results

Build results like Wasm bytecode or expected hash don't need to be updated since
they don't belong to the source publication. However, they are excluded from packaging
in `Cargo.toml` which allows you to commit them to your git repository if you like.

```toml
exclude = ["artifacts"]
```

A single source code can be built with multiple different optimizers, so
we should not make any strict assumptions on the tooling that will be used.

## Publishing

Now that your package is properly configured and all artifacts are committed, it
is time to share it with the world.
Please refer to the [complete instructions for any questions](https://rurust.github.io/cargo-docs-ru/crates-io.html),
but I will try to give a quick overview of the happy path here.

### Registry

You will need an account on [crates.io](https://crates.io) to publish a rust crate.
If you don't have one already, just click on "Log in with GitHub" in the top-right
to quickly set up a free account. Once inside, click on your username (top-right),
then "Account Settings". On the bottom, there is a section called "API Access".
If you don't have this set up already, create a new token and use `cargo login`
to set it up. This will now authenticate you with the `cargo` cli tool and allow
you to publish.

### Uploading

Once this is set up, make sure you commit the current state you want to publish.
Then try `cargo publish --dry-run`. If that works well, review the files that
will be published via `cargo package --list`. If you are satisfied, you can now
officially publish it via `cargo publish`.

Congratulations, your package is public to the world.

### Sharing

Once you have published your package, people can now find it by
[searching for "cw-" on crates.io](https://crates.io/search?q=cw).
But that isn't exactly the simplest way. To make things easier and help
keep the ecosystem together, we suggest making a PR to add your package
to the [`cawesome-wasm`](https://github.com/cosmwasm/cawesome-wasm) list.

### Organizations

Many times you are writing a contract not as a solo developer, but rather as
part of an organization. You will want to allow colleagues to upload new
versions of the contract to crates.io when you are on holiday.
[These instructions show how]() you can set up your crate to allow multiple maintainers.

You can add another owner to the crate by specifying their github user. Note, you will
now both have complete control of the crate, and they can remove you:

`cargo owner --add ethanfrey`

You can also add an existing github team inside your organization:

`cargo owner --add github:confio:developers`

The team will allow anyone who is currently in the team to publish new versions of the crate.
And this is automatically updated when you make changes on github. However, it will not allow
anyone in the team to add or remove other owners.
