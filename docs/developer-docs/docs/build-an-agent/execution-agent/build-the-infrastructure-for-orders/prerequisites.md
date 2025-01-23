---
sidebar_position: 1
---

# Prerequisites

## Development environment

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

## Warden knowledge base

1. **Warden Agent Kit understanding**

   - Basic Agent creation and management
   - Understanding of Agent capabilities
   - Familiarity with Agent-precompile interaction

2. **Precompile familiarity**

   - Warden precompile (`x/warden`)
     - Key management system
     - Sign request handling

     ```solidity
     interface IWarden {
         function newSignRequest(...) external returns (bool);
         function keyById(...) external returns (KeyResponse);
     }
     ```

   - Slinky precompile (`x/slinky`)
     - Price feed system
     - Data retrieval methods

     ```solidity
     interface ISlinky {
         function getPrice(string base, string quote) 
             external returns (GetPriceResponse);
     }
     ```

   - Async precompile (`x/async`)
     - Future-based operations
     - Price prediction system

     ```solidity
     interface IAsync {
         function addFuture(...) external returns (uint64);
         function futureById(...) external returns (FutureResponse);
     }
     ```

## Required Solidity knowledge

1. **Core concepts**
   - Contract inheritance
   - Interface implementation
   - Events and error handling
   - Factory pattern understanding

2. **Smart contract patterns**

   - Understanding of:

     ```solidity
     abstract contract Base {
         // Base functionality
     }

     interface IExecution {
         // Execution interface
     }

     contract Implementation is Base, IExecution {
         // Implementation details
     }
     ```

## Project structure

```
orders/
├── src/
│   ├── AbstractOrder.sol    # Base contract
│   ├── BasicOrder.sol       # Basic implementation
│   ├── AdvancedOrder.sol    # Advanced implementation
│   ├── Types.sol           # Shared types
│   └── Registry.sol        # Transaction registry
├── test/
└── scripts/
```

## GitHub repository

For complete implementation details, refer to:
[Warden Protocol Orders Repository](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity)

## Next steps

After ensuring you have:

- Set up your development environment
- Understanding of Warden Agent Kit
- Familiarity with precompiles
- Basic Solidity knowledge

After meeting these prerequisites, you can start [creating helpers and utils](create-helpers-and-utils).
