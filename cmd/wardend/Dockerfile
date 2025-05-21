FROM debian:bookworm-slim

RUN apt update && \
    apt install ca-certificates curl -y && \
    rm -rf /var/lib/apt/lists/* && \
    useradd -M -u 1000 -U -s /bin/sh -d /data warden && \
    install -o 1000 -g 1000 -d /data
COPY ./wardend /usr/bin/wardend

USER warden
CMD ["wardend", "start"]
