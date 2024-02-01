# Warden KMS

A lightweight keychain client for Warden. This application acts as a server-side key management service for ECDSA and EDDSA key pairs.

Private keys are generated deterministically based on [BIP44](https://en.bitcoin.it/wiki/BIP_0044) hierarchy and master seed derivation based on [BIP39](https://en.bitcoin.it/wiki/BIP_0039). With a single master seed `wardenkms` can create up to 2,147,483,647 key pairs. Users can supply a mnemonic seed phrase generated separately or allow the application to generate the seed entropy using the [Cosmos BIP39 library](https://github.com/cosmos/go-bip39/blob/master/bip39.go#L26).

## Run

```
go run .
```

## Configuration

```
cd ../../../blockchain
./init.sh
```

Then

```
cd ~$HOME/go/src/github.com/warden-protocol/wardenprotocol/keychain/cmd/wardenkms
go run .
```

to start the `wardenkms` service. The application detects space key requests and writes public key data back to the network.

## APIs

### 1) /status (GET)

The `/status` call requests information about the liveness of the wardenkms and will always repond "OK" if the service is up. 

```go
StatusCode: 200
JSON:
{
    "service":"wardenkms",
    "version":"0.1.0",
    "message":"OK"
}
```

### 2) /healthcheck (GET)

The `/healthcheck` call requests information about the current health of the wardenkms and its connections. On receiving this request the wardenkms pings its local `wardend` client.

```go
StatusCode: 200
JSON:
{
    "service":"wardenkms",
    "version":"0.1.0",
    "message":"OK",
    "failures": []
}
```

If one or more of the checks fail then the response will contain an array of failure messages

```go
StatusCode: 503
JSON: 
{
    "service":"wardenkms",
    "version":"0.1.0",
    "message" "",
    "failures": ["'key':<failure error message>"]
} 
```

Example

```
$ curl -s localhost:8080/healthcheck | jq
{
  "message": "OK",
  "version": "v0.1.0-16f2d3ea",
  "service": "wardenkms",
  "failures": []
}

```

### 3) /pubkeys (GET)

The `/pubkeys` call requests a list of space keys that have been saved to the  application's local database. Note that this call is password protected

```go
StatusCode: 200
JSON:
{
    "service":"wardenkms",
    "version":"0.1.0",
    "message":"OK",
    "pubkeys": []
}
```

Example

```
$ curl -s -H "password: 1234" localhost:8080/pubkeys | jq
{
  "message": "OK",
  "version": "v0.1.0-16f2d3ea",
  "service": "wardenkms",
  "pubkeys": [
    {
      "key_id": "0000000000000000000000000000000000000000000000000000000000000001",
      "pubkey_data": {
        "pubkey": "0316b6b9bb0eba68485fd57e6ba89160cb1a27321a89fccfdc0da589f9520a55e0",
        "created": "2023-12-07T12:11:36Z",
        "last_used": ""
      }
    },
    {
      "key_id": "0000000000000000000000000000000000000000000000000000000000000002",
      "pubkey_data": {
        "pubkey": "02e0107c854bdc4804560c74a9700698efc3494a430a3295c225a36d57dcbf0439",
        "created": "2023-12-07T12:12:42Z",
        "last_used": ""
      }
    }
  ]
}

```

### 4) /mnemonic (GET)

`/mnemonic` is a password-protected call requesting the applications mnemonic seed phrase.

```go
StatusCode: 200
JSON:
{
    "service":"wardenkms",
    "version":"0.1.0",
    "message":"OK",
    "mnemonic": <mnemonic_seed_phrase>
    "password_protected": true
}
```

Example

```
$ curl -s -H "password: 1234" localhost:8080/mnemonic | jq
{
  "message": "OK",
  "version": "v0.1.0-22ff58b9",
  "service": "wardenkms",
  "mnemonic": "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge",
  "password_protected": true
}

```

### 5) /keychain (GET)

`/keychain` is a password-protected call requesting the identity.

```go
StatusCode: 200
JSON:
{
    "service":"wardenkms",
    "version":"0.1.0",
    "message":"OK",
    "keychain": <keychain_address>
    "keychain_signer": <keychain_signer_address>
}
```

Example

```
$ curl -s -H "password: 1234" localhost:8080/mnemonic | jq
{
  "message": "OK",
  "version": "v0.1.0-22ff58b9",
  "service": "wardenkms",
  "keychain":"wardenkeychain1ph63us46lyw56lmt585"
  "keychain_signer":"warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"
}
```
