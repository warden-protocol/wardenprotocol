---
sidebar_position: 2
---

# Warden Agent capabilities

All **Warden Agents** generated with [Warden Code](developer-tools/warden-code) support the following key capabilities:

<table style={{ width: "100%", tableLayout: "fixed" }}>
  <colgroup>
    <col style={{ width: "110px" }} />
    <col />
    <col style={{ width: "220px" }} />
  </colgroup>

  <tr>
    <th>Feature</th>
    <th>How to use</th>
    <th>Docs</th>
  </tr>

  <tr>
    <td><strong>Warden compatibility</strong></td>
    <td>
      All Agents are immediately compatible with
      [Warden](https://help.wardenprotocol.org).
      After publicly hosting an Agent, you can publish and manage it using Warden Studio.
    </td>
    <td>
      [Publish on Warden](publish-on-warden)
    </td>
  </tr>

  <tr>
    <td><strong>x402 payments</strong></td>
    <td>
      You can monetize your Agent outside of Warden using
      [x402 payments](https://www.x402.org).
      Enable this feature when creating an Agent with Warden Code or configure later.
    </td>
    <td>
      [Create a new Agent](build-an-agent/create-a-new-agent)<br />
      [Configure the Agent](build-an-agent/configure-the-agent#configure-x402-payments)
    </td>
  </tr>

  <tr>
    <td><strong>ERC-8004 registration</strong></td>
    <td>
      After publicly hosting your Agent, you can register it on
      [ERC-8004 identity registries](https://eips.ethereum.org/EIPS/eip-8004)
      using Warden Code.
    </td>
    <td>
      [Register on ERC-8004](register-on-erc-8004)
    </td>
  </tr>

  <tr>
    <td><strong>A2A compatibility</strong></td>
    <td>
      All Agents can immediately interact with others through
      [A2A protocol](https://a2a-protocol.org/latest/).
      You can update the Agent Card at any time and test the A2A endpoints locally or in production.
    </td>
    <td>
      [A2A endpoints](developer-tools/warden-code#a2a-endpoints)<br />
      [Configure the Agent](build-an-agent/configure-the-agent#update-the-a2a-agent-card)<br />
      [Test the Agent locally](build-an-agent/test-the-agent-locally#chat-using-the-api)<br />
      [Host your Agent](host-your-agent#chat-using-the-api)
    </td>
  </tr>

  <tr>
    <td><strong>LangGraph API</strong></td>
    <td>
      All Agents are immediately compatible with the
      [LangGraph Agent Server API](https://docs.langchain.com/langsmith/server-api-ref).
      You can test the supported endpoints locally or in production.
    </td>
    <td>
      [LangGraph endpoints](developer-tools/warden-code#langgraph-endpoints)<br />
      [Test the Agent locally](build-an-agent/test-the-agent-locally)<br />
      [Host your Agent](host-your-agent)
    </td>
  </tr>

  <tr>
    <td><strong>Chat UI</strong></td>
    <td>
      All Agents include a chat frontend. It allows you to interact with your Agent and test x402 payments through a user interface, locally or in production.
    </td>
    <td>
      [Test the Agent locally](build-an-agent/test-the-agent-locally#chat-using-the-ui)<br />
      [Host your Agent](host-your-agent#chat-using-the-ui)
    </td>
  </tr>
</table>
