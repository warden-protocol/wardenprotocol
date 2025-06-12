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
CUSTOMER_PRIVATE_KEY="0x55DF3893B1A9F634C7CF04BDB868F2BB979D0A5A57851C10B5DA2E84A4BF3DD7"
ANVIL_CHAIN_ID="31337"
WARDEN_CHAIN_ID="12345"

# Get first argument as origin contract, second as destination contract
if [[ $# -lt 2 ]]; then
  log_error "Usage: $0 <origin_contract> <destination_contract> <plugin> <input>"
  exit 1
fi
ORIGIN_CONTRACT="$1"
DESTINATION_CONTRACT="$2"
PLUGIN="${3:-echo}"
PAYLOAD="${4:-foobar}"

# Check if payload is file and read it if it is
if [[ -f "$PAYLOAD" ]]; then
  log_info "Reading payload from file: $PAYLOAD"
  PAYLOAD=$(cat "$PAYLOAD")
else
  log_info "Using payload: $PAYLOAD"
fi

log_main "Calling contract"
DESTINATION_CONTRACT_CUT=$(echo $DESTINATION_CONTRACT |cut -d'x' -f2 )
DESTINATION_CONTRACT_40B="0x$(printf '%024s' 0 $DESTINATION_CONTRACT_CUT)"
PAYLOAD=$(docker run --rm --platform=linux/amd64 \
  ghcr.io/foundry-rs/foundry:stable \
  "cast abi-encode \"tuple(string,string)\" \"$PLUGIN\" '$PAYLOAD'")

FEES=$(docker run --rm --platform=linux/amd64 \
  ghcr.io/foundry-rs/foundry:stable \
    "cast call \
      --rpc-url \"$ANVIL_RPC_URL\" \
      --private-key \"$CUSTOMER_PRIVATE_KEY\" \
      $ORIGIN_CONTRACT \"quoteDispatch(uint32,bytes32,bytes)\" \
      $WARDEN_CHAIN_ID $DESTINATION_CONTRACT_40B $PAYLOAD")
FEES=$(printf '%d' $FEES)
log_info "Checked fees: $FEES"

CALL=$(docker run --rm --platform=linux/amd64 \
  ghcr.io/foundry-rs/foundry:stable \
    "cast send \
      --rpc-url \"$ANVIL_RPC_URL\" \
      --private-key \"$CUSTOMER_PRIVATE_KEY\" \
      --value $FEES \
      --gas-limit 1000000 \
      $ORIGIN_CONTRACT \"dispatch(uint32,bytes32,bytes)\" \
      $WARDEN_CHAIN_ID $DESTINATION_CONTRACT_40B $PAYLOAD \
      --json")

STATUS=$(echo "$CALL" | jq -r '.status')
if [ "$STATUS" == "0x1" ]; then
  STATUS="success"
else
  STATUS="fail"
fi
GAS_USED=$(echo "$CALL" | jq -r '.gasUsed')

log_main "Call result"
log_info "Status: $STATUS"
log_info "Gas used: $GAS_USED"

# Wait for the callback
log_main "Waiting for callback to be processed"
INIT_VALUE=$(docker run --rm --platform=linux/amd64 \
  ghcr.io/foundry-rs/foundry:stable \
    "cast call \
      --rpc-url \"$ANVIL_RPC_URL\" \
      $DESTINATION_CONTRACT \"destinationMsg()\"")
NEW_VALUE=$INIT_VALUE
while [[ "$INIT_VALUE" == "$NEW_VALUE" ]]; do
  sleep 5
  NEW_VALUE=$(docker run --rm --platform=linux/amd64 \
    ghcr.io/foundry-rs/foundry:stable \
      "cast call \
        --rpc-url \"$ANVIL_RPC_URL\" \
        $DESTINATION_CONTRACT \"destinationMsg()\"")
done
log_info "Callback processed successfully"
log_main "Output"
OUTPUT=$(docker run --rm --platform=linux/amd64 \
  ghcr.io/foundry-rs/foundry:stable \
    "cast to-ascii \"$NEW_VALUE\"")
echo "${OUTPUT}"
exit 0
