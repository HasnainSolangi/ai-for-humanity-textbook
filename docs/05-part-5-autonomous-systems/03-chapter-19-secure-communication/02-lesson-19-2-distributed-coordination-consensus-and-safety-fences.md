---
id: 02-lesson-19-2-distributed-coordination-consensus-and-safety-fences
title: "Distributed Coordination, Consensus, and Safety Fences"
sidebar_label: "Distributed Coordination"
---

# Distributed Coordination, Consensus, and Safety Fences

The future is Multi-Agent Systems (MAS). A "Research Agent" finds data, a "Writer Agent" drafts the report, and a "Critique Agent" reviews it. They must coordinate without chaos.

## The Shared Blackboard Pattern
How do agents share state?
*   **The Blackboard:** A central, shared memory space (database). Agent A writes "Found 3 sources." Agent B reads it and writes "Draft V1."
*   **Locking:** We use database locks. While Agent B is writing the draft, Agent C cannot delete the sources. This prevents race conditions where agents undercut each other.

## Consensus Protocols (Voting)
When agents disagree, how do we decide?
*   **Majority Vote:** Three agents generate an answer. We pick the one that 2 out of 3 agree on. This "Ensemble Consistency" vastly reduces hallucination.
*   **Manager Agent:** A specialized "Manager" agent reviews the outputs of worker agents and synthesizes them. The Manager has the final authority (The "Tie-Breaker").

## Safety Fences (Geofencing)
Agents act in an environment.
*   **Virtual Geofence:** In robotics, we define a 3D box. If the drone's coordinates leave the box, the power is cut instantly (Hardware Kill).
*   **Logical Geofence:** For a trading bot, we set a "Max Drawdown" fence. If the portfolio loses 2% in an hour, the bot is locked out, and all positions are liquidated to cash.

Safety is enforced by the *environment*, not the agent.
