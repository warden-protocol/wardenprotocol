#!/bin/bash

# Set mnemonic from environment variable or use a default value
# For security, prefer setting this as an environment variable
PRIVATE="0x7b3cffc9f592d702245d75ff9dac1c5712c00c5cb3a249f7541760f3e8d46e77"

# common execution data
amount="1"
token_addresses="[0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14, 0xE5a71132Ae99691ef35F68459aDde842118A86a5]"
recipient="0xF58a3793c6417217289dA6f8140A8e2409878EBF"
deadline="1774527591"
          1776244446
swapCalldata=$(cast calldata "swapExactETHForTokens(uint256,address[],address,uint256)" \
    "$amount" \
    "$token_addresses" \
    "$recipient" \
    "$deadline")
instructions="[\([\(0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3,\"${swapCalldata}\",100000000000000\)],11155111\)]"
feeToken="\(0x0000000000000000000000000000000000000000,11155111\)"

# signRequestData
keyId="1"
analyzers="[]"
encryptionKey="0x"
spaceNonce="0"
actionTimeoutHeight="1000000"
expectedApproveExpression="0x616e7928312c2077617264656e2e73706163652e6f776e65727329"
expectedRejectExpression="0x616e7928312c2077617264656e2e73706163652e6f776e65727329"
signRequestData="\(\"${keyId}\",\"${analyzers}\",\"${encryptionKey}\",\"${spaceNonce}\",\"${actionTimeoutHeight}\",\"${expectedApproveExpression}\",\"${expectedRejectExpression}\"\)"

commonExecutionData="\(\"${instructions}\",\"${feeToken}\",\"${signRequestData}\"\)"

maxKeychainFees="[]"

scheduler="0x6EA8AC1673402989E7B653AE4E83B54173719C30"
registry="0xdcC18f39AD8ab4eD3CE5c713B4e07A6AF58cd3FF"
args="\"${commonExecutionData}\" \"${maxKeychainFees}\" \"${scheduler}\" \"${registry}\""

forge create \
    --via-ir \
    --verbose \
    --rpc-url https://evm.devnet.wardenprotocol.org \
    --private-key "$PRIVATE" \
    --root ./orders \
    ./src/orders/TemplateOrderV1.sol:TemplateOrderV1 \
    --constructor-args "$args"