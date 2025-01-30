---
sidebar_position: 4
---

# Add Agent Capabilities

## Incorporate Existing LangChain Tools

Enhance your agent's functionality by seamlessly integrating additional tools from the LangChain ecosystem. LangChain has transformed how developers interact with language models, enabling the creation of powerful and versatile AI applications. At the heart of its appeal is the extensive ecosystem of tools and integrations, which allows developers to effortlessly enhance their agents' capabilities.

### The Power of LangChain Tools

LangChain's strength lies in its rich library of community-driven [tools](https://js.langchain.com/docs/integrations/tools/) and [integrations](https://js.langchain.com/docs/integrations/platforms/). These tools empower developers to:

-   Expand agent capabilities rapidly: Seamlessly connect with APIs, databases, and services without the need for extensive custom coding.
-   Access specialized functionalities: Utilize domain-specific tools for tasks such as image generation, social media interaction, internet search, data analysis, or blockchain operations.
-   Build multi-modal agents: Combine diverse interaction types—text, image, code—into a single, cohesive agent.
-   Stay current: Take advantage of a continuously evolving ecosystem, supported and updated by an active community.

## Adding Custom Tools

This guide explains how to add a custom tool to a Warden Agent using the **Warden Agent Kit**. A custom tool is a functionality or utility that can be accessed by the agent to perform specific tasks, such as interacting with APIs, processing data, or executing logic.

## Steps to Add a Custom Tool

Follow these steps to add a custom tool to your agent:

### 1. Initialize the Agent

First, set up and configure the agent using `WardenAgentKit`. This allows you to customize the agent's behavior and define tools it can use.

Here’s a simplified version of the initialization process:

```javascript
import { WardenAgentKit } from "@wardenprotocol/warden-agent-kit-core";
import { WardenToolkit, WardenTool } from "@wardenprotocol/warden-langchain";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

async function initializeAgent() {
    try {
        // Initialize LLM
        const llm = new ChatOpenAI({
            model: "gpt-4o-mini", // Specify the model to use
        });

        // Configure the Warden Agent Kit
        const config = {
            privateKeyOrAccount: process.env.PRIVATE_KEY || undefined, // Load private key from environment variable
        };

        // Initialize Warden Agent Kit
        const agentkit = new WardenAgentKit(config);

        // Initialize the toolkit and get existing tools
        const wardenToolkit = new WardenToolkit(agentkit);
        const tools = wardenToolkit.getTools();

        // Proceed with adding custom tools (covered below)
    } catch (error) {
        console.error("Failed to initialize agent:", error);
    }
}
```

### 2. Define the Custom Tool

A custom tool is an instance of `WardenTool` that contains a name, description, schema, and function. You can add custom logic within the `function` property, which defines what the tool will do when invoked.

Here’s the code snippet for adding a custom tool:

```javascript
// Add the custom tool
const customTool = new WardenTool(
    {
        name: "custom_tool", // Name of the tool
        description: "This is a custom tool", // Description of the tool
        schema: z.object({}), // Define the schema for the tool (optional but recommended)
        function: async () => {
            return "This is a custom tool"; // Logic that the tool will execute
        },
    },
    agentkit // Pass the agent kit to associate it with the tool
);

// Push the custom tool to the list of tools
tools.push(customTool);
```

### 3. Integrate the Tool into the Agent

Now integrate the tool. The custom tool will be available as part of the agent’s toolkit, and it will be invoked based on the agent's logic.

### Example Full File with Custom Tool Integration

Here is the complete code with the custom tool integrated into the Warden Agent setup:

```javascript
import { WardenAgentKit } from "@wardenprotocol/warden-agent-kit-core";
import { WardenToolkit, WardenTool } from "@wardenprotocol/warden-langchain";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

/**
 * Initialize the agent with Warden Agent Kit
 *
 * @returns Agent executor and config
 */
async function initializeAgent() {
    try {
        // Initialize LLM
        const llm = new ChatOpenAI({
            model: "gpt-4o-mini", // Specify the LLM model
        });

        // Configure Warden Agent Kit
        const config = {
            privateKeyOrAccount: process.env.PRIVATE_KEY || undefined,
        };

        // Initialize Warden Agent Kit
        const agentkit = new WardenAgentKit(config);

        // Initialize Warden Agent Kit Toolkit and get tools
        const wardenToolkit = new WardenToolkit(agentkit);
        const tools = wardenToolkit.getTools();

        // Add the custom tool
        const customTool = new WardenTool(
            {
                name: "custom_tool",
                description: "This is a custom tool",
                schema: z.object({}), // Define schema if needed
                function: async () => {
                    return "This is a custom tool"; // Implement the tool's logic
                },
            },
            agentkit // Associate with the agent kit
        );
        tools.push(customTool);

        // Store buffered conversation history in memory (optional)
        const memory = new MemorySaver();
        const agentConfig = {
            configurable: { thread_id: "Warden Agent Kit Custom Tool Example" },
        };

        // Create React Agent using the LLM and Warden Agent Kit tools
        const agent = createReactAgent({
            llm,
            tools,
            checkpointSaver: memory,
            messageModifier:
                "You're a helpful assistant that can help with a variety of tasks related to web3 transactions." +
                "You should only use the provided tools to carry out tasks, interpret the user's input" +
                "and select the correct tool to use for the required tasks or tasks.",
        });

        return { agent, config: agentConfig };
    } catch (error) {
        console.error("Failed to initialize agent:", error);
        throw error;
    }
}
```

## Conclusion

You’ve now added a custom tool to your Warden Agent! The tool is available in the agent's toolkit and can be invoked based on user input or other logic within the agent.

### Key Points to Remember:

-   **WardenTool** is used to define the custom tool, including its name, description, schema, and logic.
-   You can integrate the custom tool into the agent’s toolkit, alongside any other pre-configured tools.
-   The agent uses these tools to process input and execute tasks, using the defined function for each tool.
