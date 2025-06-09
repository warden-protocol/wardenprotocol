#!/usr/bin/env bash
set -euo pipefail

# ANSI color codes
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
NC="\033[0m" # No Color
BLUE="\033[0;34m"

log_main() {
  echo -e "${BLUE}==  $1  ==${NC}"
}

log_info() {
  echo -e "${GREEN}$1${NC}"
}

log_warn() {
  echo -e "${YELLOW}$1${NC}"
}

log_error() {
  echo -e "${RED}$1${NC}" >&2
}

# Configuration variables
ANVIL_RPC_URL="http://host.docker.internal:8546"
WARDEN_RPC_URL="http://host.docker.internal:8545"
WARDEN_CHAIN_ID="devnet_12345-1"
OWNER_PRIVATE_KEY="0xF8B19B3BF55451B76E838E1BAE544EFF50FA552048DAD981BE83401B4CC57BF4"

# File paths for mailbox YAMLs
AGENT_CONFIG="configs/agent-config.json"

# Ensure addresses can be found
if [[ ! -f "$AGENT_CONFIG" ]]; then
  log_error "Agent config file not found: $AGENT_CONFIG"
  exit 1
fi

# Extract mailbox addresses
log_main "Initialising configuration"
log_info "Extracting Anvil mailbox address from $AGENT_CONFIG"
ANVIL_MAILBOX=$(jq -r .chains.anvilnode1.mailbox "$AGENT_CONFIG") || {
  log_error "Failed to parse YAML: $AGENT_CONFIG"
  exit 1
}
if [[ -z "$ANVIL_MAILBOX" || "$ANVIL_MAILBOX" == "null" ]]; then
  log_error "anvilnode1 'mailbox' key missing in $AGENT_CONFIG"
  exit 1
fi

log_info "Anvil mailbox: $ANVIL_MAILBOX"

log_info "Extracting Warden mailbox address from $AGENT_CONFIG"
WARDEN_MAILBOX=$(jq -r .chains.wardenprotocoltestnet.mailbox "$AGENT_CONFIG") || {
  log_error "Failed to parse YAML: $AGENT_CONFIG"
  exit 1
}
if [[ -z "$WARDEN_MAILBOX" || "$WARDEN_MAILBOX" == "null" ]]; then
  log_error "wardenprotocoltestnet 'mailbox' key missing in $AGENT_CONFIG"
  exit 1
fi

log_info "Warden mailbox: $WARDEN_MAILBOX"

# Verify contracts directory and contract files
if [[ ! -d "contracts" ]]; then
  log_error "Directory 'contracts' not found."
  exit 1
fi
if [[ ! -f "contracts/callback.sol" ]]; then
  log_error "contracts/callback.sol not found"
  exit 1
fi

# Use Foundry Docker image to deploy
# Add --platform=linux/amd64 to ensure correct glibc compatibility on ARM hosts
WARDEN_ROOT_DIR="${PWD%/*/*}"

log_main "Deploying contracts"
log_info "Deploying Origin contract to Anvil (RPC: $ANVIL_RPC_URL)"
ORIGIN_ADDRESS=$(docker run --rm --platform=linux/amd64 \
  -v "$(pwd)/contracts":/contracts \
  -v "${WARDEN_ROOT_DIR}/precompiles":/precompiles \
  -w /contracts \
  ghcr.io/foundry-rs/foundry:stable \
    "forge create \
      --rpc-url \"$ANVIL_RPC_URL\" \
      --private-key \"$OWNER_PRIVATE_KEY\" \
      --root . \
      callback.sol:Origin \
      --broadcast \
      --evm-version paris \
      --constructor-args \"$ANVIL_MAILBOX\" \
      |grep \"Deployed to:\" |cut -d' ' -f3") || {
    log_error "Origin deployment failed."
    exit 1
}

log_info "Origin address: $ORIGIN_ADDRESS"

DESTINATION_ADDRESS=$(docker run --rm --platform=linux/amd64 \
  -v "$(pwd)/contracts":/contracts \
  -v "${WARDEN_ROOT_DIR}/precompiles":/precompiles \
  -w /contracts \
  ghcr.io/foundry-rs/foundry:stable \
    "forge create \
      --rpc-url \"$WARDEN_RPC_URL\" \
      --private-key \"$OWNER_PRIVATE_KEY\" \
      --root . \
      callback.sol:Destination \
      --broadcast \
      --evm-version paris \
      --constructor-args \"$WARDEN_MAILBOX\" \
      |grep \"Deployed to:\" |cut -d' ' -f3") || {
    log_error "Destination deployment failed."
    exit 1
}

log_info "Destination address: $DESTINATION_ADDRESS"

log_main "Funding destination contract"
WARDEN_DESTINATION_ADDRESS=$(docker exec -u warden dockerenv-val-0-1 bash -c \
  "wardend debug addr $DESTINATION_ADDRESS |grep Acc| cut -d' ' -f3") || {
    log_error "Failed to get Warden destination address."
    exit 1
}
log_info "Warden destination address: $WARDEN_DESTINATION_ADDRESS"
log_info "Funding Warden destination contract with 100 WARDEN"
if ! docker exec -u warden dockerenv-val-0-1 bash -c \
  "wardend tx bank send val0 $WARDEN_DESTINATION_ADDRESS \
  100000000000000000000000award --keyring-backend test --home /data/.warden \
  --chain-id $WARDEN_CHAIN_ID --yes > /dev/null 2>&1"; then
  log_error "Failed to fund Warden destination contract."
  exit 1
fi


# Final success message
log_main "Contracts deployed successfully"
echo -e "Origin:      ${GREEN}$ORIGIN_ADDRESS${NC}"
echo -e "Destination: ${GREEN}$DESTINATION_ADDRESS${NC}"

exit 0
