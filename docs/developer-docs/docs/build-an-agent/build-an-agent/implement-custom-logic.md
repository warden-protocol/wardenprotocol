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

You can edit your Agent through the CLI, in the **AI-powered build mode**.

For a list of commands available in this mode, see [Build mode](../developer-tools/warden-code#build-mode).

To start building with AI, take these steps:

1. If your Agent is running, stop it with **CTRL+C**. Navigate to your project's root directory and initiate Warden Code:

   ```bash
   warden
   ```

2. Then enter the build mode:

   ```bash
   /build
   ```

3. On the first run, you'll be prompted to select an LLM provider (**OpenAI** or **Anthropic**) and set a **model** and the **API key**.

   :::tip
   You can configure multiple providers. The configuration file is located in the user home directory at `.warden/config.json` and shared across all projects.
   :::

4. If needed, add another provider or switch between providers and models:

   ```bash
   /model
   ```

   Switching models within the same provider preserves your conversation history. To go back during selection, press **ESC**. 

5. Prompt the assistant to update the main Agent code or any file in the project. Responses stream token-by-token with real-time display.

   :::tip
   If you update your Agent's skills, [reflect it in the Agent Card](configure-the-agent#update-the-a2a-agent-card).
   :::

6. After the AI applies code changes, the project is automatically rebuilt.

   You can also manually rebuild your Agent:

   ```bash
   /rebuild
   ```
   
   :::note
   Code changes trigger `npm run build`. If `package.json` was modified, `npm install` runs first. If the build fails, the error output is fed back to the AI for automatic correction (up to 2 retries).
   :::

7. In a separate terminal window, navigate to your project and run the Agent:

   ```bash
   npm start
   ```

8. To verify the update, return to the window where Warden Code is running and chat with the Agent:

   ```bash
   /chat
   ```
   
   The Agent URL is resolved automatically from the `AGENT_URL` in your `.env` file. By default, it's set to `http://localhost:3000`. If needed, you can pass the URL explicitly:

   ```bash
   /chat http://localhost:3000
   ```

9. To exit the chat and the build modes, use this:

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
