ANVIL_CHAIN_ID="31337"
OWNER=shulgin
DENOM=award

TOKEN_EXCHANGE_RATE=200000000000000
ANVIL_GAS_PRICE=1000000007
ANVIL_GAS_OVERHEAD=10

echo "==  Create noop ism  =="
wardend tx hyperlane ism create-noop --from $OWNER -y --log_level disabled
sleep 2
ISM_ID=$(wardend q hyperlane ism isms -o json | jq -r '.isms[0].id')
echo "==  ISM ID: $ISM_ID  =="

sleep 2
echo "==  Create mailbox  =="
wardend tx hyperlane mailbox create $ISM_ID $ANVIL_CHAIN_ID --from $OWNER -y
sleep 2
MAILBOX_ID=$(wardend q hyperlane mailboxes -o json | jq -r '.mailboxes[0].id')
echo "==  MAILBOX ID: $MAILBOX_ID  =="

sleep 2
echo "==  Create merkle tree hook  =="
wardend tx hyperlane hooks merkle create $MAILBOX_ID --from $OWNER -y
sleep 2
MERKLE_HOOK_ID=$(wardend q hyperlane hooks merkle-tree-hooks -o json | jq -r '.merkle_tree_hooks[0].id')
echo "==  MERKLE TREE ID: $MERKLE_HOOK_ID  =="

sleep 2
echo "==  Create IGP hook  =="
wardend tx hyperlane hooks igp create $DENOM --from $OWNER -y
sleep 2
IGP_ID=$(wardend q hyperlane hooks igps -o json | jq -r '.igps[0].id')
echo "==  IGP ID: $IGP_ID  =="

sleep 2
echo "==  Set destination gas configs  =="
wardend tx hyperlane hooks igp set-destination-gas-config $IGP_ID $ANVIL_CHAIN_ID $TOKEN_EXCHANGE_RATE $ANVIL_GAS_PRICE $ANVIL_GAS_OVERHEAD --from $OWNER -y
sleep 2
GAS_CONFIGS=$(wardend q hyperlane hooks destination-gas-configs $IGP_ID -o json)
echo "==  GAS CONFIGS: $GAS_CONFIGS  =="

sleep 2
echo "==  Configurate mailbox  =="
wardend tx hyperlane mailbox set $MAILBOX_ID --default-hook $IGP_ID --required-hook $MERKLE_HOOK_ID --from $OWNER -y
sleep 2
MAILBOX_CONFIG=$(wardend q hyperlane mailbox $MAILBOX_ID -o json)
echo "==  MAILBOX CONFIG: $MAILBOX_CONFIG  =="