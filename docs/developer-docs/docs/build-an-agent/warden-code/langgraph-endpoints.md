---
sidebar_position: 7
---

# LangGraph endpoints

## Overview

All Warden Agents are immediately compatible with the **LangGraph Agent Server API**.

Warden Code exposes a subset of this API. Below, you can find a full list of supported endpoints with links to the [LangGraph API reference](https://docs.langchain.com/langsmith/server-api-ref).

## Assistants

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| [Search Assistants](https://docs.langchain.com/langsmith/agent-server-api/assistants/search-assistants) | POST | `/assistants/search` |
| [Get Assistant](https://docs.langchain.com/langsmith/agent-server-api/assistants/get-assistant) | GET | `/assistants/{assistant_id}` |

## Threads

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| [Create Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/create-thread) | POST | `/threads` |
| [Search Threads](https://docs.langchain.com/langsmith/agent-server-api/threads/search-threads) | POST | `/threads/search` |
| [Get Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread) | GET | `/threads/{thread_id}` |
| [Get Thread State](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread-state) | GET | `/threads/{thread_id}/state` |
| [Get Thread History](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread-history) | GET | `/threads/{thread_id}/history` |
| [Delete Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/delete-thread) | DELETE | `/threads/{thread_id}` |

## Thread runs

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| [Create Background Run](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-background-run) | POST | `/threads/{thread_id}/runs` |
| [Create Run, Stream Output](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-run-stream-output) | POST | `/threads/{thread_id}/runs/stream` |
| [Create Run, Wait for Output](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-run-wait-output) | POST | `/threads/{thread_id}/runs/wait` |

## Stateless runs

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| [Create Run, Stream Output](https://docs.langchain.com/langsmith/agent-server-api/stateless-runs/create-run-stream-output) | POST | `/runs/stream` |
| [Create Run, Wait for Output](https://docs.langchain.com/langsmith/agent-server-api/stateless-runs/create-run-wait-for-output) | POST | `/runs/wait` |

## System

| Name | Method | Endpoint |
| ---- | ------ | -------- |
| [Server Information](https://docs.langchain.com/langsmith/agent-server-api/system/server-information) | GET | `/info` |
| [Health Check](https://docs.langchain.com/langsmith/agent-server-api/system/health-check) | GET | `/ok` |
