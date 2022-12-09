#!/bin/bash

CNT=0
ITER=$1
SLEEP=$2
NUMBLOCKS=$3
NODEADDR=$4

if [ -z "$1" ]; then
  echo "Invalid argument: missing number of iterations"
  echo "sh test_localnet_liveness.sh <iterations> <sleep> <num-blocks> <node-address>"
  exit 1
fi

if [ -z "$2" ]; then
  echo "Invalid argument: missing sleep duration"
  echo "sh test_localnet_liveness.sh <iterations> <sleep> <num-blocks> <node-address>"
  exit 1
fi

if [ -z "$3" ]; then
  echo "Invalid argument: missing number of blocks"
  echo "sh test_localnet_liveness.sh <iterations> <sleep> <num-blocks> <node-address>"
  exit 1
fi

if [ -z "$4" ]; then
  echo "Invalid argument: missing node address"
  echo "sh test_localnet_liveness.sh <iterations> <sleep> <num-blocks> <node-address>"
  exit 1
fi

docker_containers=($(docker ps -q -f name=ethermintd --format='{{.Names}}'))

while [ ${CNT} -lt $ITER ]; do
  curr_block=$(curl -s $NODEADDR:26657/status | jq -r '.result.sync_info.latest_block_height')

  if [ ! -z ${curr_block} ]; then
    echo "Current block: ${curr_block}"
  fi

  if [ ! -z ${curr_block} ] && [ ${curr_block} -gt ${NUMBLOCKS} ]; then
    echo "Success: number of blocks reached"
    exit 0
  fi

  sleep $SLEEP
done

echo "Failed: timeout reached"
exit 1