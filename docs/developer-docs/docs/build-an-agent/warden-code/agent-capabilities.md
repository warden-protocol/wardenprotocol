---
sidebar_position: 2
---

# Agent capabilities

All Agents generated with Warden Code support the following key capabilities:

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
      [Warden](https://app.wardenprotocol.org).
      After publicly hosting an Agent, you can publish and manage it using Warden Studio.
    </td>
    <td>
      [Warden Studio](../warden-studio)<br />
      [Publish on Warden](../publish-on-warden)
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
      [x402 payments](x402-payments)<br />
      [Create a new Agent](../build-an-agent/create-a-new-agent)<br />
      [Configure the Agent](../build-an-agent/configure-the-agent#update-agent-settings)      
    </td>
  </tr>

  <tr>
    <td><strong>ERC-8004 registration</strong></td>
    <td>
      After publicly hosting your Agent, you can register it on
      [ERC-8004 Identity Registry](https://eips.ethereum.org/EIPS/eip-8004)
      using Warden Code.
    </td>
    <td>
      [ERC-8004 registration](erc-8004-registration)
      [Register on ERC-8004](../register-on-erc-8004)
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
      [A2A endpoints & methods](a2a-endpoints-and-methods)<br />
      [Configure the Agent](../build-an-agent/configure-the-agent#update-the-a2a-agent-card)<br />
      [Test the Agent locally](../build-an-agent/test-the-agent-locally#chat-using-the-api)<br />
      [Host your Agent](../host-your-agent#chat-using-the-api)
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
      [LangGraph endpoints](langgraph-endpoints)
    </td>
  </tr>

  <tr>
    <td><strong>Build mode</strong></td>
    <td>
      Warden Code supports the AI-powered build mode allowing you to implement custom Agent logic with an AI assistant
    </td>
    <td>
      [Build mode](basics#build-mode)<br />
      [Implement custom logic](../build-an-agent/implement-custom-logic#build-with-ai)
    </td>
  </tr>

  <tr>
    <td><strong>Frontend</strong></td>
    <td>
      All Agents include a chat frontend. It allows you to interact with your Agent and test x402 payments through a user interface, locally or in production.
    </td>
    <td>
      [Frontend](basics#frontend)<br /> 
      [Test the Agent locally](../build-an-agent/test-the-agent-locally#chat-using-the-ui)<br />
      [Host your Agent](../host-your-agent#chat-using-the-ui)     
    </td>
  </tr>

</table>
