---
sidebar_position: 3
---

# Configure the Agent

## Overview

After [creating a Warden Agent](create-a-new-agent), you can update the initial configuration at any moment, including the A2A Agent Card metadata and x402 payments.

This guide explains how to do it.

## Update Agent settings

To update your Agent's settings, take these steps:

1. Navigate to your project's root directory and initiate Warden Code:

   ```bash
   warden
   ```

2. Enter the configuration mode:
   
   ```bash
   /config
   ```

3. Select one of the available groups of settings and make the necessary updates:

   - **Identity**: Name, description, URL, version (shown in the Agent Card)
   - **Server**: Port, host, Agent URL, API key, model
   - **Skills**: Agent capabilities advertised in the Agent Card
   - **Payments**: x402 wallets, pricing, networks

## Update the A2A Agent Card

*Coming soon*.

## Configure x402 payments

*Coming soon*.

## Next steps

Now you can do the following:

- [Implement custom logic](implement-custom-logic)
- [Test the Agent locally](test-the-agent-locally)
