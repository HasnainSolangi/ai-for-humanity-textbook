---
id: 02-lesson-22-2-contracts-slas-and-liability-considerations
title: "Contracts, SLAs, and Liability Considerations"
sidebar_label: "Contracts and Liability"
---

# Contracts, SLAs, and Liability Considerations

How do you invoke a Service Level Agreement (SLA) on a probabilistic machine?

## The "Accuracy" SLA

Traditional SLAs cover Uptime ("99.9% availability"). AI customers want Accuracy SLAs ("90% correct answers").

*   **The Ambiguity Problem:** Defining "Correct" is subjective.
*   **The Proxy Metric:** Contracts often settle on "Relevance Score" as measured by a specific test set. "If the model's performance on the Golden Set drops below 85%, we owe you credits."

## Liability: Strict vs. Negligence

*   **Negligence:** "We tried our best, but the AI failed." (Standard Software Defense).
*   **Strict Liability:** "Your product hurt someone; you pay, regardless of intent." (Product Liability Law).
*   **The Shift:** Courts are moving toward Strict Liability for AI, especially in Physical AI (robots, cars) and Medical AI. The "Black Box" defense ("We didn't know how it worked") is no longer a shield; it is an admission of guilt.

## Intellectual Property (Copyright)

*   **Input Liability:** Did you train on copyrighted books? (NYT v. OpenAI).
*   **Output Liability:** Did your model generate a Mickey Mouse image?
*   **The Safe Harbor:** Platforms try to claim DMCA Safe Harbor ("We just host the user's prompt"), but generation is different from hosting. This legal area is unsettled and high-risk.

Lawyers must be involved in the design phase, not just the cleanup phase.
