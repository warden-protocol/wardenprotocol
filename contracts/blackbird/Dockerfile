FROM cosmwasm/wabt:1.0.25 as wabt

# Using the newest CosmWasm TinyGo v0.23.0 beta (stable version: cosmwasm/tinygo:0.19.3)
FROM cosmwasm/tinygo:cw-0.23.0 as tinygo

COPY --from=wabt /usr/local/bin/wasm2wat /usr/local/bin/wasm2wat
COPY --from=wabt /usr/local/bin/wat2wasm /usr/local/bin/wat2wasm
COPY --from=wabt /usr/local/wabt /usr/local/wabt

COPY docker/compile.sh /usr/local/bin/compile.sh

RUN mkdir /work

# TODO copy more over??

WORKDIR /code
ENTRYPOINT [ "compile.sh" ]
