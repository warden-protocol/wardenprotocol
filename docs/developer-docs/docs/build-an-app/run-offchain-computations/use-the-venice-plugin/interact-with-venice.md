---
sidebar_position: 4
---

# Interact Venice AI Contract

In the previous guide you learned how to deploy `venice ai` smart contract. In this guide we will interact with it.

## Simple Testing

### 1. Test with a simple question

```bash
cast send $CONTRACT_ADDRESS \
"askVenice(string)" \
"What is the capital of France?" \
--rpc-url $RPC_URL \
--private-key $PRIVATE_KEY \
--gas-limit 5000000 --gas-price 0
```

**Expected output:**

```bash
Transaction hash: 0xabcd...efgh
```

### 2. Get Task ID

```bash
TASK_ID=$(cast call $CONTRACT_ADDRESS "latestTaskId()" --rpc-url $RPC_URL)
echo "Latest Task ID: $TASK_ID"
```

**Expected output:**

```bash
Latest Task ID: 1
```

### 3. Check Task Status

```bash
wardend q async task-by-id --id $TASK_ID
```

**Expected output:**

```bash
task:
  id: "1"
  status: "PENDING"
  plugin: "venice"
  input: "{\"model\":\"default\",\"temperature\":0.0,\"top_p\":0.9,\"max_completion_tokens\":1000,\"message\":\"What is the capital of France?\"}"
  output: ""
```

### 4. Wait for Completion and Check Response

```bash
# Wait a few seconds, then check again
wardend q async task-by-id --id $TASK_ID
```

**Expected output:**

```bash
task:
  id: "1"
  status: "COMPLETED"
  plugin: "venice"
  input: "{\"model\":\"default\",\"temperature\":0.0,\"top_p\":0.9,\"max_completion_tokens\":1000,\"message\":\"What is the capital of France?\"}"
  output: "VGhlIGNhcGl0YWwgb2YgRnJhbmNlIGlzIFBhcmlzLg=="
```

### 5. Decode Response

```bash
echo "VGhlIGNhcGl0YWwgb2YgRnJhbmNlIGlzIFBhcmlzLg==" | base64 -d
```

**Expected output:**

```bash
The capital of France is Paris.
```

## Advance Testing

### 1. Test with a custom parameters

```bash
cast send $CONTRACT_ADDRESS \
  "askVeniceWithParams(string,string,uint256,uint256,uint256)" \
  "Write a haiku about blockchain" \
  "default" \
  800 \
  950 \
  50 \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY \
  --gas-limit 5000000 --gas-price 0
```

**Expected output:**

```bash
Transaction hash: 0xabcd...efgh
```

### 2. Monitor Response

```bash
TASK_ID=$(cast call $CONTRACT_ADDRESS "latestTaskId()" --rpc-url $RPC_URL)
wardend q async task-by-id --id $TASK_ID
```

**Expected output:**

```bash
task:
  id: "2"
  status: "COMPLETED"
  plugin: "venice"
  input: "{\"model\":\"default\",\"temperature\":0.8,\"top_p\":0.95,\"max_completion_tokens\":50,\"message\":\"Write a haiku about blockchain\"}"
  output: "Q2hhaW5zIG9mIGNvZGUgZW50d2luZWQKU2VjdXJlIGFuZCB0cmFuc3BhcmVudCBkYW5jZQpUcnVzdCBpbiBkaWdpdGFs"
```

### 3. Decode Creative Response

```bash
echo "Q2hhaW5zIG9mIGNvZGUgZW50d2luZWQKU2VjdXJlIGFuZCB0cmFuc3BhcmVudCBkYW5jZQpUcnVzdCBpbiBkaWdpdGFs" | base64 -d
```

**Expected output:**

```bash
Chains of code entwined
Secure and transparent dance
Trust in digital
```

## Contract Interaction Functions

### 1. Check Task Completion

```bash
cast call $CONTRACT_ADDRESS "isTaskCompleted(uint64)" $TASK_ID --rpc-url $RPC_URL
```

**Expected output:**

```bash
true
```

### 2. Get Task Response

```bash
cast call $CONTRACT_ADDRESS "getTaskResponse(uint64)" $TASK_ID --rpc-url $RPC_URL
```

**Expected output:**

```bash
Chains of code entwined
Secure and transparent dance
Trust in digital
```

### 3. Get Task User

```bash
cast call $CONTRACT_ADDRESS "getTaskUser(uint64)" $TASK_ID --rpc-url $RPC_URL
```

**Expected output:**

```bash
0xYOUR_ADDRESS
```

## Troubleshooting

### 1. "execution reverted" on deployment

```bash
# Check account balance
cast balance YOUR_ADDRESS --rpc-url $RPC_URL
```

Expected output:

```bash
1000000000000000000
```

### 2. "402 Payment Required" in task results

- Check Venice AI API

### 3. Task not completing

```bash
# Check Venice plugin status
wardend q async plugins
```

**Expected output:**

```bash
- creator: warden1949xxdxj72ah8swpqmx27k67s0z6g7470a0ktk
  fee:
    fee: []
    plugin_creator_reward_in_percent: "0.000000000000000000"
  id: venice
  timeout: 24h0m0s
```

### 4. "server returned null response" error

- Transaction usually succeeds despite error

- Check latest task ID to confirm:

```bash
cast call $CONTRACT_ADDRESS "latestTaskId()" --rpc-url $RPC_URL
```
