---
sidebar_position: 2
---

# Prerequisites

You are expected to posses the following knowledge:

- Solidity (especially inheritance, interfaces, events)
- Basic understanding of Uniswap V2
- Familiarity with price oracles
- Understanding of RLP encoding for transactions

Environment Setup:

1. Install required dependencies:

```bash
forge install OpenZeppelin/openzeppelin-contracts
forge install Uniswap/v2-periphery
```

2. Configure foundry.toml:

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

Directory Structure:

```bash
  uniswap-trading-agent
warden-trading-agent/
├── src/              # Core contracts
├── scripts/          # Deployment scripts
├── test/             # Test files
└── mocks/            # Mock services
```

In the next chapter you will learn how to implement the basic structure for trading agent.
