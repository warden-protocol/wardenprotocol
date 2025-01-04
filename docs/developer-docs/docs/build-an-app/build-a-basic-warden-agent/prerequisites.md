---
sidebar_position: 2
---

# Prerequisites

This guide assumes familiarity with the following topics:

- Solidity (especially inheritance, interfaces, events)
- The basics of Uniswap V2
- Price oracles
- RLP encoding for transactions

Before you start, take the following steps:

1. [Install Foundry](https://book.getfoundry.sh/getting-started/installation) by running the following command:

   ```bash
   curl -L https://foundry.paradigm.xyz | bash \ 
   foundryup
   ```

2. Install the required dependencies:
   
   ```bash
   forge install OpenZeppelin/openzeppelin-contracts
   forge install Uniswap/v2-periphery
   ```

3. Configure `foundry.toml`:
   
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

4. Prepare the directory structure:
   
   ```bash
   basic-warden-agent/
   ├── src/              # Core contracts
   ├── scripts/          # Deployment scripts
   ├── test/             # Test files
   └── mocks/            # Mock services
   ```
   
After meeting these prerequisites, you can start [creating the trading Agent structure](structure).