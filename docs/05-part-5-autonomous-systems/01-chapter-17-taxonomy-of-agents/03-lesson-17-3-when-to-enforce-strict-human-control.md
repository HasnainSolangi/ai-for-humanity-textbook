---
id: 03-lesson-17-3-when-to-enforce-strict-human-control
title: "When to Enforce Strict Human Control"
sidebar_label: "Enforcing Human Control"
---

# When to Enforce Strict Human Control

Not all tasks are suitable for agents. We must define "No-Go Zones" where human control is mandatory.

## The "Kill Chain" Concept
In military and cybersecurity terms, the "Kill Chain" is the sequence of actions leading to a destructive effect.
*   **Rule:** An autonomous agent may NEVER complete a Kill Chain. No algorithm should be allowed to fire a weapon, shut down a power grid, or delete a production database without a human physically breaking the glass.

## Moral Weight
Decisions involving significant moral judgment cannot be offloaded.
*   **Hiring and Firing:** An AI can rank resumes (Advisory), but it should never send a rejection email (Autonomous). Being fired by a bot is a violation of human dignity.
*   **Medical Triage:** An AI can prioritize the queue, but a human nurse must make the final call on who sees the doctor first.

## Reversible vs. Irreversible Actions
*   **Reversible:** Adding an item to a calendar. (Safe for Agent).
*   **Irreversible:** Sending an email to the CEO or transferring wire funds. (Unsafe for Agent).

We categorize tools by their "Blast Radius." High-blast tools are locked behind Human-in-the-Loop (HITL) gates.
