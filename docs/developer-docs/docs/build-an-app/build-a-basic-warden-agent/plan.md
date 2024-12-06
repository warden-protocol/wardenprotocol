---
sidebar_position: 1
---

# Build a Basic Warden Agent

## Overview

This tutorial will guide you through the process of building a basic **Warden Agent.** In this basic version of the tutorial, we'll focus on automated token trading based on price conditions. It will allow you to create orders that automatically execute token swaps on Uniswap when certain price thresholds are met.

In the more advanced tutorial you will learn how to build a **Warden Agent** that executes orders based on AI predictions.

You can find the full sample code on [GitHub](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity)

## Architecture

The Agent architecture will include the following components:

- **OrderAgent:** Core contract that monitors prices and executes trades
- **AgentFactory:** Creates and manages agent instances
- **Registry:** Tracks all agents and their transaction history
- **Configuration:** Defines trading parameters and conditions
- **External Integrations:** Price feeds and transaction authorization

The system follows a factory pattern with the `OrderFactory` creating `BasicOrder` instances, which are tracked in the Registry. The orders interact with external services through precompiles for `price feeds` and `transaction signing.`

## User flow

1. Define trading strategy:
    - Price threshold and condition (greater/less than)
    - Token pair to monitor
    - Swap details (amount, path, recipient, deadline)
    - Transaction signing details
2. Implement agent contract:
    - OrderFactory deploys a new BasicOrder contract and registers it in the Registry
3. The BasicOrder continuously monitors price conditions through Slinky price feed
4. When price conditions are met:
    - Order constructs the swap transaction
    - Sends it to Warden for signing
    - Records the transaction in Registry
    - Executes the swap on Uniswap
5. Transaction details are stored in Registry for verification/tracking
6. Deploy and create agent instances
7. Monitor and manage agents

## Prerequisites

### You are expected to posses the following knowledge

- Solidity (especially inheritance, interfaces, events)
- Basic understanding of Uniswap V2
- Familiarity with price oracles
- Understanding of RLP encoding for transactions

### Environment Setup

1.Install required dependencies:

```bash
forge install OpenZeppelin/openzeppelin-contracts
forge install Uniswap/v2-periphery
```

2.Configure foundry.toml:

```bash
[profile.default]
auto_detect_solc = false
block_timestamp = 1_680_220_800
bytecode_hash = "none"
evm_version = "paris"
fuzz = { runs = 1_000 }
gas_reports = ["*"]
optimizer = true
optimizer_runs = 10_000
solc = "0.8.25"

[fmt]
bracket_spacing = true
int_types = "long"
line_length = 120
multiline_func_header = "all"
number_underscore = "thousands"
quote_style = "double"
tab_width = 4
wrap_comments = true
```

### Directory Structure

```bash
  uniswap-trading-agent
├── src/
├── test/
├── script/
└── mocks/
```

In the next chapter you will learn how to implement the basic structure for trading agent.
