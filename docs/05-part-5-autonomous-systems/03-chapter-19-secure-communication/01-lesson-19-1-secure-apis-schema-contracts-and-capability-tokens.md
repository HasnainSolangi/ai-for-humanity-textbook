---
id: 01-lesson-19-1-secure-apis-schema-contracts-and-capability-tokens
title: "Secure APIs, Schema Contracts, and Capability Tokens"
sidebar_label: "Secure APIs and Contracts"
---

# Secure APIs, Schema Contracts, and Capability Tokens

Agents talk to the world through APIs. If the API is loose, the agent is a vulnerability. We must harden the interface.

## The Schema Contract
Agents are notoriously bad at guessing JSON formats.
*   **OpenAPI Specs (Swagger):** Every tool exposed to an agent must have a rigorous OpenAPI definition. It defines types (`int`, `string`), constraints (`min: 0`, `max: 100`), and descriptions.
*   **Type-Safe Parsing:** The system should not just pass the agent's output to the function. It should parse it into a Type-Safe Object (e.g., using Pydantic). If parsing fails, the error is returned to the agent ("You sent a string for 'age', please send an integer") rather than crashing the app.

## Capability Tokens (The Keys to the Kingdom)
We do not hardcode API keys into the agent's prompt.
*   **Token Injection:** When the agent needs to call the `GoogleCalendar` tool, the runtime injects a temporary OAuth token into the request header.
*   **Scoped Access:** This token has `Scopes`. Example: `calendar.read`. If the agent tries to call `delete_event`, the API Gateway rejects it with `403 Forbidden`, regardless of what the agent "thinks" it can do.

## The "Human Approval" Scope
Some actions require a special token that only a human can mint.
*   **Action:** Agent tries to `wire_money`.
*   **System:** "I need a `2fa_token` to complete this."
*   **Agent:** Asks user "Please provide the 2FA code sent to your phone."
*   **Result:** The agent cannot act alone; it is physically blocked until the human provides the cryptographic key.
