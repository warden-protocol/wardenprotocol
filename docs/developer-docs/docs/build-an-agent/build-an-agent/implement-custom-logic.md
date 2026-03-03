---
sidebar_position: 4
---

# Implement custom logic

## Overview

After [creating a Warden Agent](create-a-new-agent), you can update it, **implementing custom logic**.

There are two ways to do it:

- Update the Agent through the CLI, using an AI assistant
- Directly edit the Agent's code

To learn more, see the sections below.

## Build with AI

You can edit your Agent through the CLI, in the **AI-powered build mode**. It supports the following LLM providers:

- **OpenAI** (default)
- **Anthropic**

To start building with AI, take these steps:

1. If your Agent is running, stop it with CTRL + C.

2. Navigate to your project's root directory and initiate Warden Code:

   ```bash
   warden
   ```

3. Then enter the build mode:

   ```bash
   /build
   ```

4. If needed, set your LLM provider and model:

   ```bash
   /model
   ```
   :::tip
   If you created an OpenAI Agent and specified a correct API key, no action is required. Otherwise, select and configure one of the supported LLM providers: **OpenAI** or **Anthropic**.
   :::

5. Prompt the assistant to update the main Agent code or any file in the project.

   :::tip
   If you update your Agent's skills, [reflect it in the Agent Card](configure-the-agent#update-the-a2a-agent-card).
   :::

6. Build your Agent:

   ```bash
   /rebuild
   ```

7. In a separate terminal window, navigate to your project and run the Agent:

   ```bash
   npm start
   ```

8. To verify the update, return to the window where Warden Code is running and chat with the Agent:

   ```bash
   /chat
   ```
   :::tip
   The Agent URL is resolved automatically from the `AGENT_URL` in your `.env` file. By default, it's set to `http://localhost:3000`. If needed, you can pass the URL explicitly:

   ```bash
   /chat http://localhost:3000.
   ```
   :::

9. To exit the chat and the build modes, use this command:

   ```bash
   /exit
   ```

## Edit the code

You can directly edit your Agent's code in `src/agent.ts`.

To implement custom logic, use the [functions exposed by Warden Code](../developer-tools/warden-code#functions).

## Next steps

Now you can do the following:

- [Additionally test your Agent](test-the-agent-locally)
- [Publicly host the Agent](../host-your-agent)
