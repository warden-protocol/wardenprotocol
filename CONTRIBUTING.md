# Contributing

## Git conventions

- Pull Requests are merged using "Squash and merge".
- Pull Requests that are not in draft should have a title that follows
  [conventional commits](https://www.conventionalcommits.org/).
- Keep your Pull Requests as atomic as possible. They should leave the system
  in a working state.


## Requirements

- go 1.21+
- make
- docker (used to regenerate protobufs)


## Run locally

Clone the repo:

```bash
git clone git@github.com:qredo/fusionchain.git
```


### Run the chain

The `blockchain` directory contains the Cosmos SDK blockchain code. We can run
a local node with the following:

```bash
cd blockchain
./init.sh
```

This will run a local node with a couple of pre-funded accounts.


### Run the mocked keyring

In a separate terminal, switch to the mocked keyring (`mokr`) and run it:

```bash
cd mokr && go run .
```

`mokr` will automatically monitor the chain and generate new keys and
signatures when requested.


### Make transactions

To interact with the chain you can use the `fusiond` CLI tool.

It's suggested to create an alias like this:

```
alias fchain="fusiond --node tcp://localhost:27657 --home ~/.fusiond/ --from shulgin --gas-prices 1000000000nQRDO"
```

that includes some common flags:

- `--node tcp://localhost:27657`, the Tendermint RPC endpoint
- `--home ~/.fusiond/`, the directory containing keys data
- `--from shulgin`, the account being used to sign transactions
- `--gas-prices 1000000000nQRDO`, the fee for transactions

To create some transactions and get a hands-on experience, follow our [guide](./GUIDE.md)

### Run the web UI

Instead of running queries in the CLI, it might be easier to use a GUI.

The Web UI is a React app bundled with Vite. You can run it locally with:

```
cd web
npm install
npm run dev
```

The output will include a link to open it in your browser.

Providing a full-fledged front-end is out of scope, the web UI is intended to
be useful as a monitoring and debugging tool during development.


## Regenerating protobufs

If you modify any of the `.proto` files, you'll need to regenerate the
Go definitions. You can do this with:

```
cd application
make proto-all
```