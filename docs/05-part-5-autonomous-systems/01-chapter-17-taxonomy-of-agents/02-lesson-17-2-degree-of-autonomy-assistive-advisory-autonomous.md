---
id: 02-lesson-17-2-degree-of-autonomy-assistive-advisory-autonomous
title: "Degree of Autonomy: Assistive, Advisory, Autonomous"
sidebar_label: "Degree of Autonomy"
---

# Degree of Autonomy: Assistive, Advisory, Autonomous

Autonomy is not a binary switch; it is a spectrum. We define three distinct levels of agentic independence.

## Level 1: Assistive (The Tool)
The AI does nothing until the human asks.
*   **Example:** A grammar checker or a code auto-completer.
*   **Interaction:** 1:1. One human command equals one AI action.
*   **Liability:** Entirely on the user. The AI is just a "fancy paintbrush."

## Level 2: Advisory (The Co-Pilot)
The AI proactively monitors the situation and offers suggestions, but takes no action without approval.
*   **Example:** A trading bot that watches the market and alarms the trader: "Tesla is down 5%, should I buy?"
*   **Interaction:** Nudge-based. The AI inserts itself into the workflow but hits a "Confirmation Block" before executing.
*   **Liability:** Shared. If the advice is consistently bad, the system is at fault.

## Level 3: Autonomous (The Agent)
The AI is given a high-level goal and authorized to take actions to achieve it without human review.
*   **Example:** A High-Frequency Trading algorithm or a self-driving car.
*   **Interaction:** "Fire and Forget." The human sets the parameters (Goal, Budget, Constraints) and walks away.
*   **Liability:** Entirely on the developer/operator. The system is acting as a legal agent of the owner.

## The Drift to Autonomy
There is a dangerous tendency for Level 2 systems to drift into Level 3. If a user clicks "Approve" 1,000 times in a row without looking, they have effectively automated the process. Designers must add friction (e.g., "Captcha-style" confirmations) to ensure meaningful oversight remains in place for risky actions.
