#!/bin/bash

set -e

CHAIN_NAME=${1:-"devnet_12345-1"}
NUM_VALS=${2:-"3"}
TOKEN=${3:-"award"}
WARDEN_IMAGE="ghcr.io/warden-protocol/wardenprotocol/wardend"
WARDEN_VERSION="latest"
FAUCET_VERSION="71e9ca4"
KMS_VERSION="f1bcb1b"
SPACEWARD_VERSION="ecbbba5"
WARDEND_HOME="/data/.warden"
WARDEND_HOME_ROOT="/root/.warden"
CONFIG_FOLDER=/root/.warden/config
ADDRESSES=""
NODE_IDS=""
COSMOVISOR="${4:-"false"}"
COSMOVISOR_VERSION=v1.7.0
COSMOVISOR_URL="https://github.com/cosmos/cosmos-sdk/releases/download/cosmovisor/${COSMOVISOR_VERSION}/cosmovisor-${COSMOVISOR_VERSION}-linux-amd64.tar.gz"
KMS_FAUCET_MNEMONIC="exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"
KMS_KEYRING_MNENONIC="liberty lucky weapon argue blast borrow matrix fabric topple auto tomato age simple obvious mushroom hire edge vault federal climb step element divorce problem"
RELAYER_MNEMONIC="certain leg path engine comfort common mosquito shuffle where page kangaroo jungle disease isolate nature crouch black test improve squeeze wrap fly spoil soap"
OWNER_MNEMONIC="canyon grunt drama merry number before vast come lend attitude sure empower twist pattern frame rail horse shoe enjoy green win owner provide purse"
COSMOVISOR_ENV="""DAEMON_ALLOW_DOWNLOAD_BINARIES: true
      DAEMON_HOME: /data/.warden
      DAEMON_NAME: wardend"""
ENVIRONMENT="""WARDEND_MINIMUM_GAS_PRICES: "0award"
      WARDEND_API_ENABLE: true
      WARDEND_API_ADDRESS: tcp://0.0.0.0:1317
      WARDEND_API_ENABLED_UNSAFE_CORS: true
      WARDEND_GRPC_ADDRESS: 0.0.0.0:9090
      WARDEND_RPC_LADDR: tcp://0.0.0.0:26657
      WARDEND_RPC_CORS_ALLOWED_ORIGINS: \"*\"
      WARDEND_JSON_RPC_ADDRESS: 0.0.0.0:8545
      WARDEND_JSON_RPC_ENABLE: true
      WARDEND_KEYRING_BACKEND: test
      WARDEND_HOME: /data/.warden"""
ASYNC_PLUGINS='["echo", "http", "pricepred", "venice", "quantkit"]'
if [[ "$COSMOVISOR" == "true" ]]; then
  ENTRYPOINT='entrypoint: ["/data/.warden/cosmovisor/bin/cosmovisor","run","start"]'
  ENVIRONMENT="$ENVIRONMENT
      $COSMOVISOR_ENV"
else
  ENTRYPOINT='entrypoint: ["/usr/bin/wardend","start","--x-crisis-skip-assert-invariants"]'
fi
echo $ENVIRONMENT
CHAIN_EVM_ID=$(echo "$CHAIN_NAME" | sed -n 's/.*_\([0-9]*\)-.*/\1/p')
WARDEND_PRECOMPILES='["0x0000000000000000000000000000000000000100","0x0000000000000000000000000000000000000400","0x0000000000000000000000000000000000000800","0x0000000000000000000000000000000000000801","0x0000000000000000000000000000000000000802","0x0000000000000000000000000000000000000803","0x0000000000000000000000000000000000000804","0x0000000000000000000000000000000000000805","0x0000000000000000000000000000000000000900","0x0000000000000000000000000000000000000901","0x0000000000000000000000000000000000000902","0x0000000000000000000000000000000000000903","0x0000000000000000000000000000000000000904","0x0000000000000000000000000000000000000905"]'
WARDEND_KEYCHAINS='[{"id": "1","creator": "warden169rxlgynf9nn5lgrw92n4smqp6mg3t30z7hh2a","name": "OCP KMS","admins": ["warden169rxlgynf9nn5lgrw92n4smqp6mg3t30z7hh2a"],"writers": ["warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"],"fees": {"key_req": [],"sig_req": []},"description": "OCP KMS","url": "","keybase_id": null}]'
# Define colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color (reset to default)

# This is to guard when namespace context is passed to script but is actually empty 
if [[ "$CHAIN_NAME" == "" ]]; then
  echo -e "${RED}Chain name must be provided ${NC}"
  exit 1
fi

# Check if Docker CLI is available
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker CLI is not installed or not available in PATH ${NC}"
    exit 1
fi

# Docker is available, proceed with the script
echo -e "${GREEN}Docker CLI is available ${NC}"

# Check OS and apply appropriate sed command
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    SED="$(which sed) -i ''"
else
    # Linux and other OS
    SED="$(which sed) -i"
fi

# Create all validators and get their addresses
echo -e "${GREEN}Creating $NUM_VALS validators ${NC}"
for (( i=0; i < $NUM_VALS; i++ )); do
  docker volume create val-$i  > /dev/null 2>&1
  docker run --rm --user 0 -d --name "val-$i" \
    -v val-$i:$WARDEND_HOME_ROOT \
    --entrypoint /bin/bash \
    $WARDEN_IMAGE:$WARDEN_VERSION \
    -c "sleep 10000s" > /dev/null 2>&1
    
  docker exec "val-$i" /bin/bash -c "apt update ; apt install jq curl -y && wardend init --chain-id $CHAIN_NAME validator-$i && wardend keys add val$i --keyring-backend test && mkdir -p $CONFIG_FOLDER/gentx" > /dev/null 2>&1
  ADDRESSES+=" "$(docker exec "val-$i" /bin/bash -c "wardend keys show val$i -a --keyring-backend test") > /dev/null 2>&1
  NODE_IDS+=$(docker exec "val-$i" /bin/bash -c "wardend tendermint show-node-id")"@dockerenv-val-$i-1:26656," > /dev/null 2>&1
done

# Add all validators to genesis
for addr in $ADDRESSES; do
  echo -e "${GREEN}Adding $addr to genesis ${NC}"
  docker exec val-0 /bin/bash -c "wardend genesis add-genesis-account $addr 60000000000000000000000000$TOKEN" > /dev/null 2>&1
done

# Add KMS & Faucet addresses
echo -e "${GREEN}Adding KMS & Faucet addresses to genesis ${NC}"
docker exec val-0 /bin/bash -c "echo \"$KMS_FAUCET_MNEMONIC\" | wardend keys add faucet --recover --keyring-backend test" > /dev/null 2>&1
docker exec val-0 /bin/bash -c "wardend keys show faucet -a --keyring-backend test | xargs -I {} wardend genesis add-genesis-account {} 1000000000000000000000000$TOKEN" > /dev/null 2>&1
docker exec val-0 /bin/bash -c "echo \"$KMS_KEYRING_MNENONIC\" | wardend keys add kms --recover --keyring-backend test" > /dev/null 2>&1
docker exec val-0 /bin/bash -c "wardend keys show kms -a --keyring-backend test | xargs -I {} wardend genesis add-genesis-account {} 1000000000000000000000000$TOKEN" > /dev/null 2>&1
docker exec val-0 /bin/bash -c "echo \"$RELAYER_MNEMONIC\" | wardend keys add relayer --recover --keyring-backend test" > /dev/null 2>&1
docker exec val-0 /bin/bash -c "wardend keys show relayer -a --keyring-backend test | xargs -I {} wardend genesis add-genesis-account {} 1000000000000000000000000$TOKEN" > /dev/null 2>&1
docker exec val-0 /bin/bash -c "echo \"$OWNER_MNEMONIC\" | wardend keys add owner --recover --keyring-backend test" > /dev/null 2>&1
docker exec val-0 /bin/bash -c "wardend keys show owner -a --keyring-backend test | xargs -I {} wardend genesis add-genesis-account {} 1000000000000000000000000$TOKEN" > /dev/null 2>&1


# # Update Genesis
GENESIS_PARAMS="""sed -i \"s/stake/$TOKEN/g\" $CONFIG_FOLDER/genesis.json
sed -i \"s/aevmos/$TOKEN/g\" $CONFIG_FOLDER/genesis.json
jq '.app_state[\"staking\"][\"params\"][\"unbonding_time\"] = \"240s\"' $CONFIG_FOLDER/genesis.json > tmp/genesis.json && mv tmp/genesis.json $CONFIG_FOLDER/genesis.json
jq '.app_state[\"gov\"][\"params\"][\"voting_period\"] = \"60s\"' $CONFIG_FOLDER/genesis.json > tmp/genesis.json && mv tmp/genesis.json $CONFIG_FOLDER/genesis.json
jq '.app_state[\"gov\"][\"params\"][\"max_deposit_period\"] = \"30s\"' $CONFIG_FOLDER/genesis.json > tmp/genesis.json && mv tmp/genesis.json $CONFIG_FOLDER/genesis.json
jq '.app_state[\"gov\"][\"params\"][\"expedited_voting_period\"] = \"30s\"' $CONFIG_FOLDER/genesis.json > tmp/genesis.json && mv tmp/genesis.json $CONFIG_FOLDER/genesis.json
jq '.app_state.evm.params.active_static_precompiles += $WARDEND_PRECOMPILES' $CONFIG_FOLDER/genesis.json > tmp/genesis.json && mv tmp/genesis.json $CONFIG_FOLDER/genesis.json
jq '.app_state.warden.keychains += $WARDEND_KEYCHAINS' $CONFIG_FOLDER/genesis.json > tmp/genesis.json && mv tmp/genesis.json $CONFIG_FOLDER/genesis.json
jq '.app_state.async.active_plugins += $ASYNC_PLUGINS' $CONFIG_FOLDER/genesis.json > tmp/genesis.json && mv tmp/genesis.json $CONFIG_FOLDER/genesis.json
jq '.consensus[\"params\"][\"abci\"][\"vote_extensions_enable_height\"] = \"2\"' $CONFIG_FOLDER/genesis.json > tmp/genesis.json && mv tmp/genesis.json $CONFIG_FOLDER/genesis.json
jq '.app_state[\"feemarket\"][\"params\"][\"base_fee_change_denominator\"]=\"1\"' $CONFIG_FOLDER/genesis.json > tmp/genesis.json && mv tmp/genesis.json $CONFIG_FOLDER/genesis.json
jq '.app_state[\"feemarket\"][\"params\"][\"elasticity_multiplier\"]=\"1\"' $CONFIG_FOLDER/genesis.json > tmp/genesis.json && mv tmp/genesis.json $CONFIG_FOLDER/genesis.json
jq '.app_state[\"evm\"][\"params\"][\"evm_denom\"]=\"award\"' $CONFIG_FOLDER/genesis.json > tmp/genesis.json && mv tmp/genesis.json $CONFIG_FOLDER/genesis.json"""

echo "$GENESIS_PARAMS" | while read -r param; do
  echo -e "${GREEN}Changing genesis param: ${NC} $param"
  docker exec val-0 /bin/bash -c "$param" > /dev/null 2>&1
done

# Create gentxs
echo -e "${GREEN}Creating gentxs ${NC}"
docker cp val-0:$CONFIG_FOLDER/genesis.json /tmp/genesis.json > /dev/null 2>&1
for (( i=0; i < $NUM_VALS; i++ )); do
  docker cp /tmp/genesis.json val-$i:$CONFIG_FOLDER/genesis.json > /dev/null 2>&1
  docker exec val-$i /bin/bash -c "wardend genesis gentx val$i 30000000000000000000000000$TOKEN --commission-rate 0.1 --commission-max-rate 0.2 --commission-max-change-rate 0.1 --chain-id $CHAIN_NAME --keyring-backend test" > /dev/null 2>&1
done

# Collect gentx finalize genesis
echo -e "${GREEN}Collecting gentxs and finalizing genesis ${NC}"
mkdir /tmp/gentx
for (( i=1; i < $NUM_VALS; i++ )); do
  docker cp val-$i:$CONFIG_FOLDER/gentx/ /tmp/ > /dev/null 2>&1
done
docker cp /tmp/gentx/ val-0:$CONFIG_FOLDER/ > /dev/null 2>&1
docker exec -it val-0 /bin/bash -c "wardend genesis collect-gentxs && wardend genesis validate-genesis" > /dev/null 2>&1

# Copy genesis accross all validators
docker cp val-0:$CONFIG_FOLDER/genesis.json /tmp/genesis.json > /dev/null 2>&1
for (( i=1; i < $NUM_VALS; i++ )); do
  docker cp /tmp/genesis.json val-$i:$CONFIG_FOLDER/genesis.json > /dev/null 2>&1
done

# Clean up temp containers and set file permissions and configure
echo -e "${GREEN}Cleaning up temp containers and setting file permissions ${NC}"
for (( i=0; i < $NUM_VALS; i++ )); do
  docker exec val-$i /bin/bash -c "sed -i 's/persistent_peers = \"\"/persistent_peers = \"$NODE_IDS\"/' $CONFIG_FOLDER/config.toml" > /dev/null 2>&1
  if [[ "$COSMOVISOR" == "true" ]]; then
    docker exec "val-$i" /bin/bash -c \
        "mkdir -p $WARDEND_HOME_ROOT/cosmovisor/genesis/bin $WARDEND_HOME_ROOT/cosmovisor/upgrades $WARDEND_HOME_ROOT/cosmovisor/bin" || {
        echo 'Failed to create directories in container'; exit 1; }

    docker exec "val-$i" /bin/bash -c \
        "curl -s -Lo /tmp/cosmovisor.tar.gz \"$COSMOVISOR_URL\" && tar -xzf /tmp/cosmovisor.tar.gz -C /tmp && mv /tmp/cosmovisor $WARDEND_HOME_ROOT/cosmovisor/bin/cosmovisor && cp /usr/bin/wardend $WARDEND_HOME_ROOT/cosmovisor/genesis/bin/wardend" || {
        echo 'Failed to download or extract cosmovisor'; exit 1; }
  fi
  docker exec "val-$i" /bin/bash -c "chown -R 1000:1000 $WARDEND_HOME_ROOT" > /dev/null 2>&1
  docker kill "val-$i" > /dev/null 2>&1
done

# Generate docker compose file
VALIDATOR_STRING="""services:
  val-0:
    image: $WARDEN_IMAGE:$WARDEN_VERSION
    $ENTRYPOINT
    volumes:
      - val-0:$WARDEND_HOME
    environment:
      $ENVIRONMENT
    ports:
      - "0.0.0.0:26656:26656"
      - "0.0.0.0:26657:26657"
      - "0.0.0.0:9090:9090"
      - "0.0.0.0:1317:1317"
      - "0.0.0.0:8545:8545"
"""
for (( i=1; i < $NUM_VALS; i++ )); do
  VALIDATOR_STRING+="""
  val-$i:
    image: $WARDEN_IMAGE:$WARDEN_VERSION
    $ENTRYPOINT
    environment:
      $ENVIRONMENT
    volumes:
      - val-$i:$WARDEND_HOME
"""
done

echo -e "${GREEN} Generating docker-compose.yaml ${NC}"
# echo """$VALIDATOR_STRING""" > docker-compose.yaml
VALIDATOR_STRING+="""
  faucet:
    image: ghcr.io/warden-protocol/wardenprotocol/faucet:$FAUCET_VERSION
    user: root
    ports:
      - "8081:8081"
    environment:
      NODE: http://dockerenv-val-0-1:26657
      CHAIN_ID: $CHAIN_NAME
      BATCH_INTERVAL: "1s"
      DENOM: award
      DECIMALS: "18"
      MNEMONIC: "$KMS_FAUCET_MNEMONIC"

  wardenkms:
    image: ghcr.io/warden-protocol/wardenprotocol/wardenkms:$KMS_VERSION
    user: root
    environment:
      KEYCHAIN: 1
      CHAIN_ID: $CHAIN_NAME
      MNEMONIC: "$KMS_FAUCET_MNEMONIC"
      GRPC_URL: dockerenv-val-0-1:9090
      KEYRING_MNEMONIC: "$KMS_KEYRING_MNENONIC"
      KEYRING_PASSWORD: TODO
      HTTP_ADDR: ":9999"

  spaceward:
    image: ghcr.io/warden-protocol/wardenprotocol/spaceward:$SPACEWARD_VERSION
    user: root
    ports:
      - "8082:8080"
    environment:
      FAUCET_URL: http://127.0.0.1:8081
      WARDEN_RPC_URL: http://127.0.0.1:26657
      WARDEN_REST_URL: http://127.0.0.1:1317
      ADDRESS_PREFIX: warden
      WARDEN_CHAIN_NAME: Warden Protocol (local)
      WARDEN_COSMOSKIT_CHAIN_NAME: wardenprotocollocal
      WARDEN_CHAIN_ID: $CHAIN_NAME
      WARDEN_CHAIN_ID_NUM: "121"
      WARDEN_STORYBLOK_TOKEN: LTh76K2yz5nU6jUThhFG3Qtt
      WARDEN_SNAP_ORIGIN: npm:@wardenprotocol/snap
      WARDEN_EVM_URL: http://127.0.0.1:8545
      WARDEN_EVM_CHAIN_ID: "$CHAIN_EVM_ID"
volumes:"""
for (( i=0; i < $NUM_VALS; i++ )); do
  VALIDATOR_STRING+="""
  val-$i:
    external: true"""
done
echo """$VALIDATOR_STRING""" > docker-compose.yaml

