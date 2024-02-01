# relayer-eth

Relay signed transactions from Warden Protocol to Ethereum.


## Run

You can run this service locally with:

```sh
$ ETH_URL=$ETH_URL \
  WARDEN_URL=127.0.0.1:9090 \
  WALLET_TYPE=ETH_SEPOLIA \
  CHAIN_ID=11155111 \
  go run ./cmd/relayer
```

This will pick transactions for the Sepolia Ethereum network (chain id
`11155111`) from the Warden Protocol running locally (`127.0.0.1:9090`).

You need to provide the url of an Ethereum node in the `ETH_URL` variable. One
can be easily obtained by registering to https://infura.io.


## Buildtx

As a separate tool we also provide a little cli for building unsigned Ethereum
transactions, ready to be sent to Warden Protocol for signing:

```sh
# generate an ETH transfer:
$ go run ./cmd/buildtx/ -nonce 0 -to 0x99b967EF1E6Ce023e5bF804e1C8eAE9BB2572497 -amount 4000000000000000

nonce: 0
to: 0x99b967EF1E6Ce023e5bF804e1C8eAE9BB2572497
amount: 4000000000000000 WEI
gasLimit: 21000
gasPrice: 20000000000
data:
Are you sure to build this transaction? (y/n)
y
unsigned tx: eb808504a817c8008252089499b967ef1e6ce023e5bf804e1c8eae9bb2572497870e35fa931a000080808080

# send it to Warden Protocol for signing
$ w tx treasury new-sign-transaction-request 0 'eb808504a817c8008252089499b967ef1e6ce023e5bf804e1c8eae9bb2572497870e35fa931a000080808080'

# the signed transaction will be automatically picked up by relayer-eth and broadcasted to the Ethereum network
```

