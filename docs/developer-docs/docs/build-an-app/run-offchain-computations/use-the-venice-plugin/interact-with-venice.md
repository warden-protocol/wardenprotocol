---
sidebar_position: 4
---

# Interact with the contract

## Overview

This tutorial will guide you through interacting with Venice AI through your smart contract.

You'll call different functions of the contract to create either basic requests or requests with custom parameters and monitor Tasks.

## Create a basic request 

1. To create a basic request without parameters, call the `askVenice()` function of your contract:

   ```bash
   cast send $CONTRACT_ADDRESS \
   "askVenice(string)" \
   "What is the capital of France?" \
   --rpc-url $RPC_URL \
   --private-key $PRIVATE_KEY \
   --gas-limit 5000000 --gas-price 0
   ```

   **Expected output**

   ```bash
   Transaction hash: 0xabcd...efgh
   ```

2. Then get the Task ID to monitor the response:

   ```bash
   TASK_ID=$(cast call $CONTRACT_ADDRESS "latestTaskId()" --rpc-url $RPC_URL)
   echo "Latest Task ID: $TASK_ID"
   ```

   **Expected output**

   ```bash
   Latest Task ID: 1
   ```

3. Now check the Task status:
   
   ```bash
   wardend q async task-by-id --id $TASK_ID
   ```
   
   **Expected output**
   
   ```bash
   task:
     id: "1"
     status: "PENDING"
     plugin: "venice"
     input: "{\"model\":\"default\",\"temperature\":0.0,\"top_p\":0.9,\"max_completion_tokens\":1000,\"message\":\"What is the capital of France?\"}"
   ```

4. Wait a few seconds for the Task completion and check the response:

   ```bash
   wardend q async task-by-id --id $TASK_ID
   ```

   **Expected output**

   ```bash
   task:
     id: "1"
     status: "COMPLETED"
     plugin: "venice"
     input: "{\"model\":\"default\",\"temperature\":0.0,\"top_p\":0.9,\"max_completion_tokens\":1000,\"message\":\"What is the capital of France?\"}"
     output: "VGhlIGNhcGl0YWwgb2YgRnJhbmNlIGlzIFBhcmlzLg=="
   ```

5. Finally, decode the response:
   
   ```bash
   echo "VGhlIGNhcGl0YWwgb2YgRnJhbmNlIGlzIFBhcmlzLg==" | base64 -d
   ```
   
   **Expected output**
   
   ```bash
   The capital of France is Paris.
   ```

## Create a request with parameters

1. To create a request with custom parameters, call the `askVeniceWithParams()` function of your contract. You can find more details about the required parameters in the [contract code](implement-venice-ai#1-create-a-contract).
   
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

   **Expected output**
   
   ```bash
   Transaction hash: 0xabcd...efgh
   ```

2. Then get the Task ID to monitor the response:
   
   ```bash
   TASK_ID=$(cast call $CONTRACT_ADDRESS "latestTaskId()" --rpc-url $RPC_URL)
   wardend q async task-by-id --id $TASK_ID
   ```

   **Expected output**

   ```bash
   Latest Task ID: 1
   ```

3. Now check the Task status:
   
   ```bash
   wardend q async task-by-id --id $TASK_ID
   ```
   
   **Expected output**
   
   ```bash
   task:
     id: "1"
     status: "PENDING"
     plugin: "venice"
     input: "{\"model\":\"default\",\"temperature\":0.0,\"top_p\":0.9,\"max_completion_tokens\":1000,\"message\":\"What is the capital of France?\"}"
   ```

4. Wait a few seconds for the Task completion and check the response:

   ```bash
   wardend q async task-by-id --id $TASK_ID
   ```
   
   **Expected output**
   
   ```bash
   task:
     id: "2"
     status: "COMPLETED"
     plugin: "venice"
     input: "{\"model\":\"default\",\"temperature\":0.8,\"top_p\":0.95,\"max_completion_tokens\":50,\"message\":\"Write a haiku about blockchain\"}"
     output: "Q2hhaW5zIG9mIGNvZGUgZW50d2luZWQKU2VjdXJlIGFuZCB0cmFuc3BhcmVudCBkYW5jZQpUcnVzdCBpbiBkaWdpdGFs"
   ```

3. Finally, decode the response:

   ```bash
   echo "Q2hhaW5zIG9mIGNvZGUgZW50d2luZWQKU2VjdXJlIGFuZCB0cmFuc3BhcmVudCBkYW5jZQpUcnVzdCBpbiBkaWdpdGFs" | base64 -d
   ```

   **Expected output**
   
   ```bash
   Chains of code entwined
   Secure and transparent dance
   Trust in digital
   ```

## Commands for Task monitoring

Below you'll find additional commands for Task monitoring:

### Check the Task completion

To check the Task completion, call `isTaskCompleted()`:

   ```bash
   cast call $CONTRACT_ADDRESS "isTaskCompleted(uint64)" $TASK_ID --rpc-url $RPC_URL
      ```
      
   **Expected output**
   
   ```bash
   true
   ```

### Get the Task response

To get the Task response, call `getTaskResponse()`:
   
   ```bash
   cast call $CONTRACT_ADDRESS "getTaskResponse(uint64)" $TASK_ID --rpc-url $RPC_URL
   ```
   
   **Expected output**
   
   ```bash
   Chains of code entwined
   Secure and transparent dance
   Trust in digital
   ```
 
### Get the creator address

To get the address of the Task creator, call `getTaskUser()`:
   
   ```bash
   cast call $CONTRACT_ADDRESS "getTaskUser(uint64)" $TASK_ID --rpc-url $RPC_URL
   ```
   
   **Expected output**
   
   ```bash
   0xYOUR_ADDRESS
   ```
   
## Troubleshooting

Below you'll find some of the common deployment issues and solutions for them.

### Execution reverted

If you see the `execution reverted` error during deployment, check your account balance:

```bash
cast balance YOUR_ADDRESS --rpc-url $RPC_URL
```
   
**Expected output**

```bash
1000000000000000000
```

### Payment required

If you see the `402 Payment Required` error in the Task result, check the Venice AI API.

### Task not completing

If your Task isn't completing, check the Venice Plugin status:
   
```bash
wardend q async plugins
```
   
**Expected output**

```bash
- creator: warden1949xxdxj72ah8swpqmx27k67s0z6g7470a0ktk
  fee:
    fee: []
    plugin_creator_reward_in_percent: "0.000000000000000000"
  id: venice
  timeout: 24h0m0s
```
   
### Null response

You may see the `server returned null response` error, but transactions usually succeeds despite this. Check latest Task ID to confirm:
   
```bash
cast call $CONTRACT_ADDRESS "latestTaskId()" --rpc-url $RPC_URL
```

**Expected output**

```bash
Latest Task ID: 1
```
