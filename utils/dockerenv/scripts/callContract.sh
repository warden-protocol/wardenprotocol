#!/usr/bin/env bash
set -euo pipefail

STAGES=("Anvil" "Relayer" "Warden" "Relayer" "Anvil")
STAGE_INDEX=-1

# ANSI color codes
CURRENT="\033[0;36m"
VISITED="\033[0;37m"
PENDING="\033[0;34m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
NC="\033[0m"
BLUE="\033[0;34m"

# draw the arrow on one line, overriding the previous line with \r
draw_progress() {
  local pos=$1                              # 0-based index of current stage
  local line=""                             # we build the string here

  for i in "${!STAGES[@]}"; do
    case $i in
      # already passed
      [0-9]*)
        if (( i < pos ));   then line+="${VISITED}${STAGES[$i]}${NC}"
        elif (( i == pos )); then line+="${CURRENT}${STAGES[$i]}${NC}"
        else                     line+="${PENDING}${STAGES[$i]}${NC}"
        fi
    esac

    # arrow between stages except after last one
    [[ $i -lt $((${#STAGES[@]}-1)) ]] && line+=" ─▶ "
  done

  echo -e "\r$line"
}

# bump to the next stage (call this when you finish a hop)
advance_stage() {
  STAGE_INDEX=$((STAGE_INDEX+1))
  draw_progress "$STAGE_INDEX"
}


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

log_info "Using plugin: $PLUGIN"
# Check if payload is file and read it if it is
if [[ -f "$PAYLOAD" ]]; then
  log_info "Reading payload from file: $PAYLOAD"
  PAYLOAD=$(cat "$PAYLOAD")
else
  log_info "Using payload: $PAYLOAD"
fi
PAYLOAD_BASE64=$(echo -n "$PAYLOAD" | base64)

log_main "Calling contract $ORIGIN_CONTRACT on Anvil"
advance_stage
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
FEES=$(printf '%d' "$FEES")
FEES_USED=$(printf '%.18f' "$(echo "$FEES / 1000000000000000000" | bc -l)")
log_info "Checked fees: $FEES_USED ETH"

CALL=$(docker run --rm --platform=linux/amd64 \
  ghcr.io/foundry-rs/foundry:stable \
    "cast send \
      --rpc-url \"$ANVIL_RPC_URL\" \
      --private-key \"$CUSTOMER_PRIVATE_KEY\" \
      --value $FEES \
      --gas-limit 10000000 \
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
GAS_USED=$(printf '%d' "$GAS_USED")
GAS_USED=$(printf '%.18f' "$(echo "$GAS_USED / 1000000000000000000" | bc -l)")
log_info "Gas used: $GAS_USED ETH"
advance_stage
sleep 5

# Query the initial value of the Origin contract
INIT_VALUE=$(docker run --rm --platform=linux/amd64 \
  ghcr.io/foundry-rs/foundry:stable \
    "cast call \
      --rpc-url \"$ANVIL_RPC_URL\" \
      $ORIGIN_CONTRACT \"destinationMsg()\"")

# Get the current task number from Warden
TASK_NUMBER=$(wardend q async tasks --node $WARDEN_NODE_URL -o json \
| jq --arg payload "$PAYLOAD_BASE64" -r '
    .tasks[]                        
    | select(.task.input == $payload)
    | .task.id
    ' |tail -1)
while [[ "$TASK_NUMBER" == "" ]]; do
  sleep 2
  TASK_NUMBER=$(wardend q async tasks --node $WARDEN_NODE_URL -o json \
| jq --arg payload "$PAYLOAD_BASE64" -r '
    .tasks[]                        
    | select(.task.input == $payload)
    | .task.id
  ' |tail -1
)
done
advance_stage

log_main "Waiting for callback to be processed on Warden"
# Wait until task is processed
CB_STATUS="false"
while [[ $CB_STATUS != "CALLBACK_STATUS_SUCCEED" ]]; do
  sleep 2
  CB_STATUS=$(wardend q sched callback-by-id --id $TASK_NUMBER \
    --node $WARDEN_NODE_URL -o json \
    |jq -r '.callback_response.result.status')
done
log_info "Callback processed successfully"
advance_stage

# Wait for the callback
NEW_VALUE=$INIT_VALUE
while [[ "$INIT_VALUE" == "$NEW_VALUE" ]]; do
  sleep 2
  NEW_VALUE=$(docker run --rm --platform=linux/amd64 \
    ghcr.io/foundry-rs/foundry:stable \
      "cast call \
        --rpc-url \"$ANVIL_RPC_URL\" \
        $ORIGIN_CONTRACT \"destinationMsg()\"")
done
log_info "Callback returned to Origin address"
advance_stage
log_main "Reading output from Origin contract ($ORIGIN_CONTRACT)"
OUTPUT=$(docker run --rm --platform=linux/amd64 \
  ghcr.io/foundry-rs/foundry:stable \
    "cast decode-abi \"t()(bytes)\" \"$NEW_VALUE\" | xargs cast to-utf8")
echo "${OUTPUT}"
exit 0
