---
sidebar_position: 6
---

# Deploy Trading Agent

## To Deploy the Warden Agent

### Basic Deployment Steps

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
