# Faucet

We built a custom faucet that runs `fusiond` to send tokens from the faucet
account.

Usage:

```sh
curl localhost:8000 -XPOST -d'{"address":"qredo1ud49m3n00jkmtayj9w7k35zka3fqcl4lqp2j03"}'
OK
```


## Locally

The faucet can be run locally with:

```sh
go run ./cmd/faucet 
```

by default it will use the `shulgin` account.


## Docker

The faucet image can be built with:

```sh
docker build \
    --build-arg GITHUB_TOKEN=$GITHUB_TOKEN \
    --build-arg GITLAB_TOKEN=$GITLAB_TOKEN \
    --target faucet \
    . -t fusionchain-faucet
```

And can be run with:

```sh
docker run --rm -it \
    -e NODE=tcp://host.docker.internal:26657 \
    -e MNEMONIC="exclude try nephew main ..." \
    -p 8000:8000 \
    fusionchain-faucet
```
