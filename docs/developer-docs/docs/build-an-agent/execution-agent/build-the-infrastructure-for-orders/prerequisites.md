---
sidebar_position: 1
---

# Prerequisites

## Development Environment

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

## Warden Knowledge Base

1. **Warden Agent Kit Understanding**
   - Basic agent creation and management
   - Understanding of agent capabilities
   - Familiarity with agent-precompile interaction

2. **Precompile Familiarity**
   - Warden Precompile (`x/warden`)
     - Key management system
     - Sign request handling

     ```solidity
     interface IWarden {
         function newSignRequest(...) external returns (bool);
         function keyById(...) external returns (KeyResponse);
     }
     ```

   - Slinky Precompile (`x/slinky`)
     - Price feed system
     - Data retrieval methods

     ```solidity
     interface ISlinky {
         function getPrice(string base, string quote) 
             external returns (GetPriceResponse);
     }
     ```

   - Async Precompile (`x/async`)
     - Future-based operations
     - Price prediction system

     ```solidity
     interface IAsync {
         function addFuture(...) external returns (uint64);
         function futureById(...) external returns (FutureResponse);
     }
     ```

## Required Solidity Knowledge

1. **Core Concepts**
   - Contract inheritance
   - Interface implementation
   - Events and error handling
   - Factory pattern understanding

2. **Smart Contract Patterns**
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

## Project Structure

orders/
├── src/
│   ├── AbstractOrder.sol    # Base contract
│   ├── BasicOrder.sol       # Basic implementation
│   ├── AdvancedOrder.sol    # Advanced implementation
│   ├── Types.sol           # Shared types
│   └── Registry.sol        # Transaction registry
├── test/
└── scripts/

## GitHub Repository

For complete implementation details, refer to:
[Warden Protocol Orders Repository](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity)

## Next Steps

After ensuring you have:

- Set up your development environment
- Understanding of Warden Agent Kit
- Familiarity with precompiles
- Basic Solidity knowledge

After meeting these prerequisites, you can start [creating helpers and utils](create-helpers-and-utils).
