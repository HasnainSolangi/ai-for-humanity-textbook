---
id: 01-lesson-17-1-reactive-agents-planning-agents-and-hybrid-systems
title: "Reactive Agents, Planning Agents, and Hybrid Systems"
sidebar_label: "Agent Taxonomy"
---

# Reactive Agents, Planning Agents, and Hybrid Systems

The term "Agent" has become a buzzword, conflating simple chatbots with sophisticated autonomous programs. To build safe systems, we must rigorously define the taxonomy of agency.

## 1. Reactive Agents (The Reflex Arc)
These are the simplest forms of agents. They operate on a purely stimulus-response basis.
*   **Mechanism:** `If (User says X) Then (Run Tool Y)`. They have no memory of past actions and no concept of future goals.
*   **Use Case:** Customer support bots that reset passwords.
*   **Safety Profile:** High. Their behavior is deterministic and easy to audit.

## 2. Planning Agents (The Chess Player)
These agents utilize "Chain of Thought" reasoning to break a complex goal into a sequence of steps.
*   **Mechanism:** The agent receives a goal ("Book a flight to Paris"). It then generates a plan: (1) Ask for dates, (2) Search flights, (3) Compare prices, (4) Book. It maintains a state of "Work in Progress."
*   **Use Case:** Research assistants, coding agents, travel concierges.
*   **Safety Profile:** Medium. The agent might hallucinate a step in the plan or get stuck in a "reasoning loop."

## 3. Hybrid Systems (Cognitive Architectures)
The most advanced systems combine reactive speed with planning depth.
*   **Dual Process Theory:** Borrowing from Kahneman's "System 1 vs. System 2" thinking. The agent uses a fast, cheap model (System 1) for routine tasks but escalates to a slow, expensive planner (System 2) when it encounters ambiguity or high risk.
*   **Memory Systems:** These agents have Long-Term Memory (Vector Database) allowing them to recall user preferences from months ago, creating a persistent sense of identity and continuity.

Understanding which type of agent you are building is the first step in defining its safety constraints.
