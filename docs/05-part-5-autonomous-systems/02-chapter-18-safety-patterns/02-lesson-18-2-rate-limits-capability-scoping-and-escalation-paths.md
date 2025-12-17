---
id: 02-lesson-18-2-rate-limits-capability-scoping-and-escalation-paths
title: "Rate Limits, Capability Scoping, and Escalation Paths"
sidebar_label: "Rate Limits and Scoping"
---

# Rate Limits, Capability Scoping, and Escalation Paths

What happens if an agent goes into an infinite loop? If that loop involves "Sending Emails," you get a spam disaster. If it involves "Booking Servers," you go bankrupt.

## Behavioral Rate Limiting
Standard API rate limits (100 req/sec) are for DoS protection. Agent rate limits are for sanity protection.
*   **The "Budget" Pattern:** Each agent run is given a "Token Budget" (e.g., $2.00) or a "Step Budget" (e.g., 10 turns). If it hasn't solved the problem by then, it is killed. This prevents infinite loops of "I'm thinking... I'm thinking..."
*   **Velocity Checks:** "This agent is trying to send 50 emails in 1 minute. That is superhuman speed and likely a bug." -> Freeze Account.

## Capability Scoping (Least Privilege)
An agent designed to "Read Calendars" should not have "Write" permission.
*   **Scope Down:** OAuth scopes must be granular. `Calendar.Read` is safe. `Calendar.ReadWrite` is dangerous. `Directory.Admin` is insane.
*   **Ephemeral Credentials:** The agent is issued a token that lasts only for the duration of the task (5 minutes) and is valid only for the specific resources needed.

## The Escalation Path (Throwing Exceptions)
When an agent is stuck, it currently tends to hallucinate a fake success ("I sent the email" - when it didn't).
*   **The "Help" Function:** Agents should be trained to call a special tool function: `escalate_to_human(reason="I am stuck")`. This transfers the session state to a human support agent's dashboard, allowing the human to finish the job.

Design for failure. Assume the agent will get stuck, and give it a dignified way to ask for help.
