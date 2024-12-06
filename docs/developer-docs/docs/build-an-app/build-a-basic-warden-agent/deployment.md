---
sidebar_position: 6
---

# Deploy Trading Agent

## The following implementation will guide you through the process of how To Deploy & Test the Warden Agent

### Deployment Steps

1.Set up the environment file (.env)

```bash
PRIVATE_KEY=your_private_key
UNISWAP_ROUTER=0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
TOKEN_IN=token_address
TOKEN_OUT=token_address
PRICE_FEED=price_feed_address
RPC_URL=your_rpc_url
```

2.Install dependencies:

```bash
forge install
```

3.Compile the contract:

```bash
forge build
```

4.Deploy the contract:

```bash
forge script script/Deploy.s.sol:DeployScript \
--rpc-url $RPC_URL \
--broadcast \
--verify
```

5.Verify deployment:

```bash
cast call $FACTORY_ADDRESS "agentOwners(address)" $AGENT_ADDRESS
```

### Using the Trading Agent

1.Find deployed addresses from deployment output:

```bash
FACTORY=<factory_address>
AGENT=<agent_address>
```

2.Monitor agent status:

```bash
# Check if conditions met
cast call $AGENT "checkConditions()" --rpc-url $RPC_URL

# Check execution status
cast call $AGENT "isExecuted()" --rpc-url $RPC_URL
```

3.Create new agent through factory:

```bash
# Approve tokens first
cast send $TOKEN_IN "approve(address,uint256)" $AGENT 1000000000000000000

# Create agent with config
cast send $FACTORY "createAgent((...))" --rpc-url $RPC_URL
```

4.Execute trade when conditions met:

```bash
cast send $AGENT "executeTrade()" --rpc-url $RPC_URL
```

5.View Events:

```bash
cast logs $AGENT "TradeExecuted(address,address,uint256,uint256)"
```
