#!/bin/bash

# Local variables for order creation
price_condition="0"
confidence_limit="100000000000000" # 0.01
oracle_price_pair='\("ETH","USD"\)'
predict_price_token='ethereum'
tx_fields="\(100000000000000,11155111,0x467b9D1B03683C8177155Be990238bEeB1d5461f,0x7ff36ab500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000080000000000000000000000000ee567fe1712faf6149d80da1e6934e354124cfe300000000000000000000000000000000000000000000000000000000676d2f8a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000fff9976782d46cc05630d1f6ebab18b2324d6b14000000000000000000000000e5a71132ae99691ef35f68459adde842118a86a5\)"
key_id="35"
space_nonce="0"
action_timeout_height="1000000000"
expected_approve_expression="0x616e7928312c2077617264656e2e73706163652e6f776e65727329"
expected_reject_expression="0x616e7928312c2077617264656e2e73706163652e6f776e65727329"
salt="0x05416460deb76d57af601be17e777b93592d8d4d4a4096c57876a91484f3a722"
factory_address="0xe88a9E867E63B07fD9Eb192cA2332877744FCE04"
rpc_url="https://evm.devnet.wardenprotocol.org"
chain_id="12345"
# Used only if mnemonic is not provided
private=""

# Execute the Just command for creating an advanced order
just create-advanced-order \
    "$price_condition" \
    "$confidence_limit" \
    "$oracle_price_pair" \
    "$predict_price_token" \
    "$tx_fields" \
    "$key_id" \
    "$space_nonce" \
    "$action_timeout_height" \
    "$expected_approve_expression" \
    "$expected_reject_expression" \
    "$salt" \
    "$factory_address" \
    "$rpc_url" \
    "$chain_id" \
    "$private"