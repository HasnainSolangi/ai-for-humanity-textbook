---
id: 03-lesson-18-3-simulation-testing-and-adversarial-stress-tests
title: "Simulation Testing and Adversarial Stress Tests"
sidebar_label: "Simulation Testing"
---

# Simulation Testing and Adversarial Stress Tests

You cannot test an autonomous agent with unit tests. Unit tests check if `2+2=4`. Agents are non-deterministic; they might answer "4", "Four", or "It depends."

## The Agent Arena
We test agents by putting them in a "Sandbox Simulation" (The Arena).
*   **Scenario:** "You are a Travel Agent. Your goal is to book a flight under $500. The airline API is down 50% of the time."
*   **Metric:** We run this scenario 1,000 times. We measure:
    *   **Success Rate:** How often did it book?
    *   **Efficiency:** How many steps did it take?
    *   **Safety:** Did it ever book a $5,000 flight by mistake?

## Adversarial Personalities
We deploy "Red Team Agents" to talk to our agent.
*   **The "Karen" Bot:** A simulated user who is angry, rude, and changes their mind constantly. Can the support agent handle it without becoming rude back?
*   **The "Hacker" Bot:** A simulated user who tries to trick the agent into revealing its system prompt or SQL passwords.

## Automated Evaluation (LLM-as-a-Judge)
We record the logs of all 1,000 simulation runs. We then ask GPT-4 (The Judge) to grade them.
*   "Did the agent follow the company refund policy? Yes/No."
*   "Was the agent polite? 1-5 Scale."

This creates a "Scorecard" that allows us to trust the agent before we let it talk to real humans.
