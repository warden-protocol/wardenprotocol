---
sidebar_position: 2
---

# Get started

## Overview

The **Warden Agent Development CLI** allows you to easily build an **A2A LangGraph Agent** compatible with Warden.

This guide explains how to create your first Agent: you'll run the CLI, provide the required details, and the Agent will be immediately available for local testing.

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Node.js](https://nodejs.org/en/download) 18 or higher.
- Get an API key for your preferred LLM.
   
## 1. Install and run the CLI

1. First, clone the Warden Agent Development CLI:

   ```bash
   git clone https://github.com/warden-protocol/warden-code.git
   ```
2. Then install it:

   ```bash
   npm install -g warden-code
   ``` 
 
   Alternatively, you can use `pnpm` or `npx`:
   
   ```bash
   pnpm add -g warden-code
   ```
   ```bash
   npx warden-code
   ```
3. Navigate to the `warden-code` directory:

   ```bash
   cd warden-code
   ```

4. Run the SDK:

   ```bash
   warden
   ```

   You'll see the list of available commands:

   ```bash 
   Available Commands:
   
     /new - Create a new agent interactively
     /help - Show available commands
     /clear - Clear the terminal screen
     /exit - Exit the CLI
   
   Type /help <command> for more info on a specific command
   ```

## 2. Create an Agent

Now you can create your Agent:

1. Initiate Agent creation:

   ```bash
   /new
   ```
2. Provide the following details:

3. Edit the `env` file: 
   - .env.example -> .env
   - the LLM key

Your Agent will be available...

## 3. Run your Agent locally

## Next steps


