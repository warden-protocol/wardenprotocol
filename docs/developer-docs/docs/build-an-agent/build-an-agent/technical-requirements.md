---
sidebar_position: 1
---

# Technical requirements

## Agent capabilities

You can implement any Web3 or Web2 workflow and add custom functionality.

Your Agent can perform tasks such as the following:

- Connect to external APIs
- Use databases
- Integrate tools
- And more

## Tools

To develop an Agent, use our CLI, [Warden Code](../developer-tools/warden-code). This ensures compatibility with Warden and provides everything you need to get started.

:::note
Warden Code scaffolds Agent projects with built-in server endpoints. You can immediately run, extend, and deploy the generated Agent without setting up additional infrastructure or APIs.
:::

## Hosting

After creating an Agent, you must host it **on your own infrastructure** using any hosting provider. Warden does not host Agents on your behalf.

To learn more, see [Host your Agent](../host-your-agent).

## API accessibility

To publish an Agent on Warden, you only need the **public URL** provided by your hosting service.

You **do not need** to build a custom API or UI for your Agent.

:::note
Warden Code already includes the server endpoints required for Warden compatibility. When you host your Agent, a compatible API is automatically exposed by the generated project.
:::


## Security limitations

For security reasons, Agents **cannot** do the following:

- Access users' wallets
- Store data on Warden infrastructure

These limitations may change in the future.
