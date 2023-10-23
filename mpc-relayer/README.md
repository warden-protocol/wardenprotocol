# mpc-relayer

An implementation of Fusion keyring compatible with Qredo dMPC.


## Test

```
make test
```

## Run

```
make run
```

## Configuration

An example config yaml file can be found in `./docker-compose/config-example.yml`. You must supply a gRPC endpoint for fusiond.
For local setup, raise a `fusiond` client by executing

```
cd ../blockchain
./init.sh
```

Then

```
cd ~$HOME/go/src/github.com/qredo/fusionchain/mpc-relayer/cmd/mpc-relayer
go run .
```

to start the MPC relayer service.

## APIs

### 1) /status (GET)

The `/status` call requests information about the liveness of the mpc-relayer and will always repond "OK" if the service is up. 

```go
StatusCode: 200
JSON:
{
    "service":"mpc-relayer",
    "version":"0.1.0",
    "message":"OK"
}
```

### 2) /healthcheck (GET)

The `/healthcheck` call requests information about the current health of the mpc-relayer and its connections. On receiving this request the mpc-relayer pings its local `fusiond` client as well as the mpc keyring to obtain information.

```go
StatusCode: 200
JSON:
{
    "service":"mpc-relayer",
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
    "service":"mpc-relayer",
    "version":"0.1.0",
    "message" "",
    "failures": ["'key':<failure error message>"]
} 
```

### 3) /pubkeys (GET)

The `/pubkeys` call requests a list of workspace keys that have been saved to the  application's local database.

```go
StatusCode: 200
JSON:
{
    "service":"mpc-relayer",
    "version":"0.1.0",
    "message":"OK",
    "pubkeys": []
}
```