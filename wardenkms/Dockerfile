FROM debian:bookworm-slim

RUN apt update && \
    apt install ca-certificates curl -y && \
    rm -rf /var/lib/apt/lists/* && \
    useradd -M -u 1000 -U -s /bin/sh -d /data warden && \
    install -o 1000 -g 1000 -d /data
COPY ./wardenkms /usr/bin/wardenkms

ARG LIBWASM_VERSION
ADD --chmod=444 --chown=nobody:nogroup https://github.com/CosmWasm/wasmvm/releases/download/${LIBWASM_VERSION}/libwasmvm.x86_64.so /lib/libwasmvm.x86_64.so

USER warden
CMD ["wardenkms"]
