#!/bin/bash

# Local variables for calldata generation
amount="1"
token_addresses="[0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14, 0xE5a71132Ae99691ef35F68459aDde842118A86a5]"
recipient="0x245afc3995437DF931C577729d6789DD1C8C6038"
deadline="1735383853"

# Generate calldata
calldata=$(cast calldata "swapExactETHForTokens(uint256,address[],address,uint256)" \
    "$amount" \
    "$token_addresses" \
    "$recipient" \
    "$deadline")

# Local variables for order creation
threshold_price="3403674186"
price_condition="0"
price_pair='\("ETH","USD"\)'
tx_fields="\(100000000000000,11155111,0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3,\"${calldata}\"\)"
key_id="2"
space_nonce="2"
action_timeout_height="1000000000"
expected_approve_expression="0x616e7928312c205b77617264656e3172716d6778346a63396c75396b6a6e77736a3976777436343378726333646167786a7630656c2c77617264656e316765616536786372647137677a6163347430356571677574613663613233736c38737461336e5d29"
expected_reject_expression="0x616e7928312c2077617264656e2e73706163652e6f776e65727329"
salt="0x245afc3995437DF931C577729d6789DD1C8C60386f776e65727329616e792888"
factory_address="0xfe20b64194DD392C37711027A7f38dB10F499B28"
rpc_url="https://evm.devnet.wardenprotocol.org"
chain_id="12345"
# Used only if mnemonic is not provided
private=""

# Execute the Just command for creating a basic order
just create-basic-order \
    "$threshold_price" \
    "$price_condition" \
    "$price_pair" \
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