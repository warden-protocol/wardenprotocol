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
