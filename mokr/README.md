# mokr (mocked keyring)

Basic implementation of a keyring service for Fusion Chain.

It can generate ECDSA (secp256k1) keys and signatures, using the
`github.com/ethereum/go-ethereum/crypto/secp256k1` implementation.

This service is a program that continously polls the Fusion Chain for new
`KeyRequests` and `SignatureRequests`. Mokr responds to new requests by
fulfilling them and sending the response back to the Fusion Chain.

Mokr stores its data in-memory, when restarted all the generated keys are lost
and it won't be able to generate new signatures for those.


## Run

You can run `mokr` locally with:

```
go run .
```

It will connect to the Fusion Chain running locally, using the keyring ID `0`
and the `shulgin` account. Both the keyring ID and the account are generated
when launching the chain using the `init.sh` script, no further actions are
necessary.


## Configuration

Configuration is done using environment variables.

| Variable | Default value | Description |
| --- | --- | --- |
| `MNEMONIC` | `exclude try ...` | The identity used by mokr for writing back to the Fusion Chain. Defaults to `shulgin` account, created in the `init.sh` script. |
| `DERIVATION_PATH` | `m/44'/60'/0'/0/0` | Used together with `MNEMONIC` to derive the private key. |
| `KEYRING_ID` | `0` | The keyring ID for this instace. You can run multiple keyrings with different IDs. |
| `FUSION_URL` | `localhost:9790` | URL of the gRPC interface of Fusion Chain |
| `CHAIN_ID` | `fusion_420-1` | Chain ID of the Fusion Chain |
