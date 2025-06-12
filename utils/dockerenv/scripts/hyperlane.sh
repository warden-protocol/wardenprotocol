#!/bin/bash

# Color definitions
GREEN="\e[32m"
BLUE="\e[34m"
YELLOW="\e[33m"
RED="\e[31m"
RESET="\e[0m"

set -euo pipefail

# --- Configuration ---
ANVIL_CONTAINER_NAME="anvilnode1"
ANVIL_CHAIN_ID=31337
ANVIL_RPC_PORT=8546
WARDEN_CHAIN_ID=12345
WARDEN_RPC_PORT=8545
ANVIL_BALANCE=${ANVIL_BALANCE:-0x8AC7230489E80000}
ORACLE_WARDEN_GAS_PRICE=1399995380
ORACLE_WARDEN_TOKEN_EXCHANGE_RATE=500000
ORACLE_ANVIL_GAS_PRICE=1000000007
ORACLE_ANVIL_TOKEN_EXCHANGE_RATE=200000000000000

# Private keys for Hyperlane 
RELAYER_KEY="041024D968145CBB2732FDEB8DAE7B7D63291A8AE2FC80FCBA2C74F82AE82842"
OWNER_KEY="F8B19B3BF55451B76E838E1BAE544EFF50FA552048DAD981BE83401B4CC57BF4"
BENEFICIARY_KEY="BF4CFEFA1B97008597054C0599189EDEFEFC2193147ADB4EB52D195800C9E06D"

# Addresses in key:value format 
declare -A ADDRESSES=(
  ["relayer"]="0xB558efbA945A17c4dCF28bd460ba5853c641Ee29"
  ["owner"]="0xF7bFA2bc2C4c18eB68CAeDad58e5cAAB2A77c7F7"
  ["beneficiary"]="0xE5C25663E60cA459b7630FD7880A99Bc45c054F6"
  ["customer"]="0x56c302c956dfb7Ad81A9b3054485040F1B51dDc4"
)

# Paths on host
CHAINS_DIR_HOST="$(pwd)/chains"
CORE_CONFIG_HOST="core-config.yaml"
CONFIGS_DIR_HOST="$(pwd)/configs"
DATABASE_DIR_HOST="$(pwd)/hyperlane_db"
AGENT_CONFIG_HOST="$(pwd)/configs/agent-config.json"

# Utility: print error and exit
error_exit() {
  echo -e "${RED}[Error] $1${RESET}" 1>&2
  exit 1
}

# Funding function
fund_address() {
  for key in "${!ADDRESSES[@]}"; do
    address="${ADDRESSES[$key]}"
    echo -e "${YELLOW}Funding ${key} (${address}) with balance ${ANVIL_BALANCE}...${RESET}"

    local payload
    payload=$(jq -n \
      --arg addr "$address" \
      --arg bal "$ANVIL_BALANCE" \
      '{jsonrpc:"2.0",method:"anvil_setBalance",params:[$addr,$bal],id:10}')

    if curl --silent --output /dev/null --show-error --fail \
         -H "Content-Type: application/json" \
         -X POST \
         --data "$payload" \
         "http://localhost:$ANVIL_RPC_PORT"; then
      echo -e "${GREEN}Successfully funded ${key} (${address}).${RESET}"
    else
      echo -e "${RED}Failed to fund ${key} (${address}).${RESET}"
    fi
  done
}

# Start Anvil node
echo -e "${BLUE}=== Starting Anvil node in Docker (chainId=${ANVIL_CHAIN_ID}, RPC port=${ANVIL_RPC_PORT}) ===${RESET}"
if docker ps -aq -f name="$ANVIL_CONTAINER_NAME" >/dev/null; then
  echo -e "${YELLOW}Removing existing container: $ANVIL_CONTAINER_NAME${RESET}"
  docker rm -f "$ANVIL_CONTAINER_NAME" || error_exit "Failed to remove existing Anvil container"
fi

if ! docker run -d \
  --name "$ANVIL_CONTAINER_NAME" \
  -p "$ANVIL_RPC_PORT":"$ANVIL_RPC_PORT" \
  ghcr.io/foundry-rs/foundry:v1.2.2 \
  "anvil --chain-id \"$ANVIL_CHAIN_ID\" --port $ANVIL_RPC_PORT --block-time 1 --host 0.0.0.0"; then
  error_exit "Failed to start Anvil container"
fi

sleep 5
echo -e "${GREEN}Anvil node started on port ${ANVIL_RPC_PORT}${RESET}"

# Fund the addresses on Anvil node
fund_address

# Prepare coreconfig.json
mkdir -p "$CONFIGS_DIR_HOST" || error_exit "Failed to create configs directory"
cat > "$CONFIGS_DIR_HOST/$CORE_CONFIG_HOST" <<EOF
defaultHook:
  type: merkleTreeHook
defaultIsm:
  relayer: "${ADDRESSES[relayer]}"
  type: trustedRelayerIsm
owner: "${ADDRESSES[owner]}"
proxyAdmin:
  owner: "${ADDRESSES[owner]}"
requiredHook:
  beneficiary: "${ADDRESSES[beneficiary]}"
  maxProtocolFee: "500000000000000000"
  owner: "${ADDRESSES[owner]}"
  type: interchainGasPaymaster
  oracleKey: '${ADDRESSES[relayer]}'
  overhead:
    wardenprotocoltestnet: 10
    anvilnode1: 10
  oracleConfig:
    wardenprotocoltestnet:
      gasPrice: "$ORACLE_WARDEN_GAS_PRICE"
      tokenExchangeRate: "$ORACLE_WARDEN_TOKEN_EXCHANGE_RATE"
    anvilnode1:
      gasPrice: $ORACLE_ANVIL_GAS_PRICE
      tokenExchangeRate: $ORACLE_ANVIL_TOKEN_EXCHANGE_RATE
EOF

# Prepare chain metadata
echo -e "${BLUE}=== Writing chain metadata (anvilnode1) ===${RESET}"
mkdir -p "$CHAINS_DIR_HOST" || error_exit "Failed to create chains directory"
cat > "$CHAINS_DIR_HOST/anvilnode1.yaml" <<EOF
# yaml-language-server: \$schema=../schema.json
chainId: $ANVIL_CHAIN_ID
displayName: anvilnode1
domainId: $ANVIL_CHAIN_ID
isTestnet: true
name: anvilnode1
nativeToken:
  decimals: 18
  name: Ether
  symbol: ETH
protocol: ethereum
rpcUrls:
  - http: http://host.docker.internal:$ANVIL_RPC_PORT
technicalStack: other
EOF

if [ ! -f "$CHAINS_DIR_HOST/anvilnode1.yaml" ]; then
  error_exit "Chain metadata file not created"
fi
echo -e "${GREEN}Chain metadata written: ${CHAINS_DIR_HOST}/anvilnode1.yaml${RESET}"

echo -e "${BLUE}=== Writing chain metadata (wardenprotocoltestnet) ===${RESET}"
cat > "$CHAINS_DIR_HOST/wardenprotocoltestnet.yaml" <<EOF
# yaml-language-server: \$schema=../schema.json
chainId: $WARDEN_CHAIN_ID
displayName: wardenprotocoltestnet
domainId: $WARDEN_CHAIN_ID
isTestnet: true
name: wardenprotocoltestnet
nativeToken:
  decimals: 18
  name: Ether
  symbol: ETH
protocol: ethereum
rpcUrls:
  - http: http://host.docker.internal:$WARDEN_RPC_PORT
technicalStack: other
EOF

if [ ! -f "$CHAINS_DIR_HOST/wardenprotocoltestnet.yaml" ]; then
  error_exit "Chain metadata file not created"
fi
echo -e "${GREEN}Chain metadata written: ${CHAINS_DIR_HOST}/wardenprotocoltestnet.yaml${RESET}"

# Initialize Hyperlane, deploy core, and generate agent-config.json
echo -e "${BLUE}=== Initializing Hyperlane Relayer ===${RESET}"
[ -f "$CONFIGS_DIR_HOST/$CORE_CONFIG_HOST" ] || error_exit "core-config.yaml not found at $CORE_CONFIG_HOST"

docker run --rm \
  -e HYP_KEY="0x$RELAYER_KEY" \
  -v "$(pwd)":/app \
  -v "$CONFIGS_DIR_HOST":/app/configs \
  -v "$CHAINS_DIR_HOST/anvilnode1.yaml":"/root/.hyperlane/chains/anvilnode1/metadata.yaml" \
  -v "$CHAINS_DIR_HOST/wardenprotocoltestnet.yaml":"/root/.hyperlane/chains/wardenprotocoltestnet/metadata.yaml" \
  -w /app \
  hyperlane:latest \
  bash -c "
    set -euo pipefail

    # Deploy core contracts
    echo -e \"${YELLOW}Deploying Hyperlane core contracts to wardenprotocoltestnet...${RESET}\"
    hyperlane core deploy --chain wardenprotocoltestnet --yes > /dev/null 2>&1 || exit 1
    echo -e \"${YELLOW}Deploying Hyperlane core contracts to anvilnode1...${RESET}\"
    hyperlane core deploy --chain anvilnode1 --yes > /dev/null 2>&1 || exit 1
    echo -e \"${GREEN}Hyperlane core contracts deployed.${RESET}\"

    # Generate agent-config.yaml for relayer using relayer key
    echo -e \"${YELLOW}Generating agent-config.json for relayer...${RESET}\"
    hyperlane registry agent-config --chains wardenprotocoltestnet,anvilnode1 -y > /dev/null 2>&1|| exit 1
    echo -e \"${GREEN}Agent configuration (agent-config.json) generated.${RESET}\"
  " || error_exit "Hyperlane CLI operations failed"

# Get the IGP addresses
ANVIL_IGP_ADDRESS=$(jq -r '.chains.anvilnode1.interchainGasPaymaster' "$AGENT_CONFIG_HOST")
WARDEN_IGP_ADDRESS=$(jq -r '.chains.wardenprotocoltestnet.interchainGasPaymaster' "$AGENT_CONFIG_HOST")

echo -e "${GREEN}Hyperlane initialization and agent configuration complete.${RESET}"

# Start Hyperlane relayer
echo -e "${BLUE}=== Starting Hyperlane relayer ===${RESET}"
RELAY_CONTAINER_NAME="hyperlane-relayer"

mkdir -p "$DATABASE_DIR_HOST" || error_exit "Failed to create hyperlane database directory"
[ -f "$AGENT_CONFIG_HOST" ] || error_exit "agent-config.yaml not found at $AGENT_CONFIG_HOST"

if ! docker run -d \
  --name "$RELAY_CONTAINER_NAME" \
  -e CONFIG_FILES=/config/agent-config.json \
  --mount type=bind,source="$(pwd)"/configs/agent-config.json,target=/config/agent-config.json,readonly \
  --mount type=bind,source="$(pwd)"/hyperlane_db,target=/hyperlane_db \
  gcr.io/abacus-labs-dev/hyperlane-agent:agents-v1.4.0 \
  ./relayer  \
  --db /hyperlane_db \
  --relayChains wardenprotocoltestnet,anvilnode1 \
  --allowLocalCheckpointSyncers true \
  --defaultSigner.key 0x${RELAYER_KEY} \
  --chains.anvilnode1.interchainGasPaymaster $ANVIL_IGP_ADDRESS \
  --chains.wardenprotocoltestnet.interchainGasPaymaster $WARDEN_IGP_ADDRESS; then
  error_exit "Failed to start Hyperlane relayer container"
fi

echo -e "${GREEN}Relayer running in Docker container: $RELAY_CONTAINER_NAME${RESET}"

# Summary
echo -e "${BLUE}-------------------------------------------${RESET}"
echo -e "${GREEN}Anvil node RPC: http://localhost:${ANVIL_RPC_PORT}${RESET}"
echo -e "${GREEN}Warden node RPC: http://localhost:${WARDEN_RPC_PORT}${RESET}"
echo -e "${GREEN}Script execution complete.${RESET}"
echo -e "${BLUE}-------------------------------------------${RESET}"
