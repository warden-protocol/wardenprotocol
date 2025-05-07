FROM golang:1.24-bookworm

# Install dependencies
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://just.systems/install.sh | bash -s -- --to /usr/local/bin && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY . .

# Install the binary
RUN just wardend install

# Command to run the app
CMD ["just", "localnet"]
