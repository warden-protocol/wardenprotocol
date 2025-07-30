---
sidebar_position: 2
---

# Prerequisites

## The development environment

Before you start, set up the development environment:

1. [Install Foundry](https://getfoundry.sh/introduction/installation/) by running the following command:

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

## The project structure

Create the following project structure:
   
```
orders/
├── mocks/            # Mock services
├── script/           # Deployment scripts
├── src/              # Core contracts
│   └── factories/    # Factories
│   └── lib/          # Libraries
│   └── orders/       # Orders
│   └── types/        # Types
└── test/             # Tests
```

:::note Full code
You can find the full code of the example on GitHub: [`orders`](https://github.com/warden-protocol/wardenprotocol/tree/v0.6.3/solidity/orders)
:::

## Required knowledge

You should learn about the following Warden features:

- [Warden Agent Kit](/category/warden-agent-kit)  
- [Warden precompiles](/build-an-app/interact-with-warden-modules/introduction)
   - `x/warden`: Managing keys and handling signature requests  
     Functions: [keyById()](/build-an-app/interact-with-warden-modules/interact-with-x-warden/manage-keys#query-a-key-by-id), [newSignRequest()](/build-an-app/interact-with-warden-modules/interact-with-x-warden/manage-signature-requests#create-a-new-signature-request)  
   - `x/oracle`: The price feed system and data retrieval methods  
     Functions: [getPrice()](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/precompiles/slinky/ISlinky.sol)
   - `x/async`: Task-based operations and the price prediction system   
     Functions: [addTask()](/build-an-app/interact-with-warden-modules/interact-with-x-async#create-a-new-task), [taskById()](/build-an-app/interact-with-warden-modules/interact-with-x-async#query-a-task-by-id)  

Guides in this section require the knowledge of the following Solidity concepts:

   - Contract inheritance
   - Interface implementation
   - Events and error handling
   - Factory patterns

You should be also familiar with the following smart contract patterns:

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

## Next steps

After meeting these prerequisites, you can start [building the infrastructure for Orders](build-the-infrastructure).
