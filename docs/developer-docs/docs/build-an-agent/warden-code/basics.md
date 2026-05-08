---
sidebar_position: 3
---

# Basics

## Installation

Use the `npm` commands below to install, update, and run Warden Code. This requires [Node.js](https://nodejs.org/en/download) 18 or higher.

Install globally:

```bash
npm install -g warden-code
```

Update:

```bash
npm install -g warden-code
```

Run:

```bash
warden
```

## CLI commands

With Warden Code, you can use the command line to generate a project, edit your code with an AI assistant, configure your Agent, and much more.

Run `warden` to initiate Warden Code and use the following commands:

<table style={{ width: "100%", tableLayout: "fixed" }}>
  <colgroup>
    <col style={{ width: "110px" }} />
    <col />
    <col style={{ width: "220px" }} />
  </colgroup>

  <tr>
    <th>Command</th>
    <th>Description</th>
    <th>Guides</th>
  </tr>

  <tr>
    <td>`/new`</td>
    <td>Create a new Agent interactively</td>
    <td>
      [Create a new Agent](../build-an-agent/create-a-new-agent)
    </td>
  </tr>

  <tr>
    <td>`/build`</td>
    <td>Enter the AI-powered mode to build your Agent</td>
    <td>
      [Implement custom logic](../build-an-agent/implement-custom-logic#build-with-ai)
       </td>
  </tr>

  <tr>
    <td>`/chat`</td>
    <td>Chat with a running Agent using A2A or LangGraph</td>
    <td>
      [Test the Agent locally](../build-an-agent/test-the-agent-locally#chat-using-the-cli)
    </td>
  </tr>

  <tr>
    <td>`/config`</td>
    <td>View and edit the Agent configuration</td>
    <td>
      [Configure the Agent](../build-an-agent/configure-the-agent)
    </td>
  </tr>

  <tr>
    <td>`/register`</td>
    <td>Register the Agent onchain (ERC-8004)</td>
    <td rowSpan={3}>
      [Register on ERC-8004](../register-on-erc-8004)
    </td>
  </tr>

  <tr>
    <td>`/activate`</td>
    <td>Activate a registered Agent onchain (ERC-8004)</td>
  </tr>

  <tr>
    <td>`/deactivate`</td>
    <td>Deactivate a registered Agent onchain (ERC-8004)</td>
  </tr>

  <tr>
    <td>`/help`</td>
    <td>Show available commands</td>
    <td>N/A</td>
  </tr>

  <tr>
    <td>`/clear`</td>
    <td>Clear the terminal screen</td>
    <td>N/A</td>
  </tr>

  <tr>
    <td>`/exit`</td>
    <td>Exit the CLI</td>
    <td>N/A</td>
  </tr>

</table>

## Running the Agent

The `npm` commands below allow you to build and initiate your Agent. Navigate to your project's root directory and run them in a separate terminal window.

Build:

```bash
npm run build
```

Run:

```bash
npm start
```

Run with [x402 payments](x402-payments) temporarily disabled:

```bash
X402=false npm start
```

## Project structure

When you [create a new Agent](../build-an-agent/create-a-new-agent#3-create-an-agent), Warden Code generates the following project structure:

```
my-agent/
├── src/
│   ├── agent.ts      # Your Agent's logic: the handler function
│   ├── server.ts     # Server setup, static file serving, protocol routing
│   └── payments.ts   # x402 payment setup (created only if you enable x402)
├── public/
│   ├── index.html    # The chat frontend: auto-loads the A2A Agent Card, x402 wallets
│   └── .well-known/
│       ├── agent-card.json           # The A2A Agent Card: the identity, capabilities, skills
│       └── agent-registration.json   # ERC-8004 registration metadata
├── package.json
├── tsconfig.json
├── Dockerfile
├── .env.example
└── .gitignore
```

:::tip
The `src/public/` directory is served as static files. Add any additional assets (icons, stylesheets, scripts) and they will be available at their corresponding URL paths.
:::

## Agent models

Depending on the choices you make when [creating an Agent](../build-an-agent/create-a-new-agent#3-create-an-agent), Warden Code uses one of the supported Agent models:

- **OpenAI + Streaming**: A GPT-powered Agent with streaming responses
- **OpenAI + Multi-turn**: A GPT-powered Agent with conversation history
- **Blank + Streaming**: A minimal streaming Agent that echoes input
- **Blank + Multi-turn**: A minimal multi-turn conversation agent

## Build mode

You can edit your Agent through the CLI, in the **AI-powered build mode**. It supports the following LLM providers:

- **OpenAI** (default)
- **Anthropic**

To start, use the `/build` command and set up an LLM provider. For a full step-by-step guide, see [Build with AI](../build-an-agent/implement-custom-logic#build-with-ai).

In the build mode, you can prompt the assistant and use the following commands:

| Command | Description |
| ------- | ----------- |
| `/model` | Switch between LLM providers and models at any moment. |
| `/rebuild` | Rebuild the project. This triggers `npm run build`. |
| `/chat` | Chat with the Agent. The URL is resolved from `.env`. |
| `/exit` | Exit the build mode. |

## Frontend

Every generated Agent includes a **chat frontend** allowing you to interact with Agents through a user interface.

[In production](../host-your-agent), the frontend available on your Agent's public URL. When [testing an Agent locally](../build-an-agent/test-the-agent-locally), you can access it on the local host:

```text
http://localhost:3000/
```

This frontend implementation supports the following features:

- **Chat**  
  You can chat with your Agent through a user interface. Responses are rendered as GitHub-flavored Markdown, including headings, code blocks, lists, tables, and links.
- **Agent Card**  
  The frontend loads the [Agent Card](a2a-endpoints-and-methods#get-agent-card) from `src/public/.well-known/agent-card.json` and displays the Agent name, description, capabilities, and provider info. If the Agent Card has an image field, it's used as the page favicon. Skills are shown as clickable example prompts.
- **x402 payments**  
  When [x402 payments](x402-payments) are enabled, the frontend reads `src/public/.well-known/agent-registration.json` on page load and displays a button for connecting to MetaMask. Transaction hashes included in payment responses link to a block explorer.

![The user interface for chatting with Agents, provided by Warden Code](../../../static/img/warden-code-ui.png)

## API server

Agents generated with Warden Code use a server that is compatible with the **A2A protocol** and  **LangGraph Agent Server API**. By default, the server requires [API key authentication](#api-key-authentication).

:::note
You can find the server setup in `src/server.ts`.
:::

For details about the exposed endpoints, see the reference sections below:

- [A2A endpoints](a2a-endpoints-and-methods)
- [LangGraph ednpoints](langgraph-endpoints)

For usage examples, see these articles:

- [Test the Agent locally](../build-an-agent/test-the-agent-locally#chat-using-the-api)
- [Host your Agent](../host-your-agent#chat-using-the-api)

## API key authentication

When you create an Agent, Warden Code generates a random **Agent API key**. By default, the [API server](#api-server) requires it for **authentication**.

:::important 
The Agent API key is stored in the `.env` file as `AGENT_API_KEY`.
:::

This key is used in the following ways:

- **API requests**  
  POST requests require authentication, while GET requests remain public. The key must be passed as a Bearer token in the `Authorization` header:

  ```bash
  -H "Authorization: Bearer AGENT_API_KEY"
  ```

- **CLI usage**  
  If you chat with your Agent using the `/chat` command, it automatically reads `AGENT_API_KEY` from `.env`. If no key is found or the key is rejected, Warden Code prompts you for a valid key.

- **Usage with x402**  
  When [x402 payments](x402-payments) are enabled, API key authentication takes priority. Requests with a valid Bearer token bypass the payment middleware entirely. Requests without a valid key fall through to the x402 payment flow.

:::tip Tips
- To rotate the key, replace the value and restart or redeploy the Agent server.
- To disable authentication, remove the `AGENT_API_KEY` line from `.env`. In production, omit the variable from the [hosting service configuration](../host-your-agent#3-deploy-your-agent).
:::
