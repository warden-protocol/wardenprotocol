#!/bin/sh
set -e

CONFIG=$1
if [ -z $CONFIG ]; then
    echo "No config file supplied"
    exit 1
fi
shift

DATA=$1
if [ -z $DATA ]; then
    echo "No data directory supplied"
    exit 1
fi
shift

geth --datadir $DATA init $CONFIG
pwdfile=$(mktemp /tmp/password.XXXXXX)
tmpfile=$(mktemp /tmp/validator-key.XXXXXX)

cat > $pwdfile << EOF
$PASSWORD
EOF

# import validator key
validator_key=$(python -c """
from eth_account import Account
Account.enable_unaudited_hdwallet_features()
print(Account.from_mnemonic('$VALIDATOR1_MNEMONIC').key.hex().replace('0x',''))
""")

cat > $tmpfile << EOF
$validator_key
EOF
geth --datadir $DATA --password $pwdfile account import $tmpfile

# import community key
community_key=$(python -c """
from eth_account import Account
Account.enable_unaudited_hdwallet_features()
print(Account.from_mnemonic('$COMMUNITY_MNEMONIC').key.hex().replace('0x',''))
""")

cat > $tmpfile << EOF
$community_key
EOF
geth --datadir $DATA --password $pwdfile account import $tmpfile

rm $tmpfile

# start up
geth --networkid 9000 --datadir $DATA --http --http.addr localhost --http.api 'personal,eth,net,web3,txpool,miner' \
-unlock '0x57f96e6b86cdefdb3d412547816a82e3e0ebf9d2' --password $pwdfile \
--mine --miner.threads 1 --allow-insecure-unlock --ipcdisable \
$@

rm $pwdfile
