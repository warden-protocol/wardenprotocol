### wasmd ###
FROM cosmwasm/wasmd:v0.18.0 as wasmd

### rust-optimizer ###
FROM cosmwasm/rust-optimizer:0.11.5 as rust-optimizer

FROM gitpod/workspace-full:latest

COPY --from=wasmd /usr/bin/wasmd /usr/local/bin/wasmd
COPY --from=wasmd /opt/* /opt/

RUN sudo apt-get update \
    && sudo apt-get install -y jq \
    && sudo rm -rf /var/lib/apt/lists/*

RUN rustup update stable \
   && rustup target add wasm32-unknown-unknown
