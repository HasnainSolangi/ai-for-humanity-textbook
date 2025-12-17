---
id: 01-lesson-10-2-cost-latency-and-capacity-planning
title: "Cost, Latency, and Capacity Planning"
sidebar_label: "Cost, Latency, and Capacity Planning"
---

# Cost, Latency, and Capacity Planning

AI is expensive. The compute density required to run inference on billion-parameter models is orders of magnitude higher than traditional web hosting. Without rigorous "FinOps" (Financial Operations) and capacity planning, an AI pilot can bankrupt a department or crash under its own weight during a viral traffic spike.

## The Unit Economics of AI

We must understand the cost drivers.

*   **Token-Based Pricing:** Most commercial APIs charge per token (approx. 0.75 words). Inputs are usually cheaper than outputs.
    *   *Strategy:* "Prompt Compression." Optimizing the context sent to the model (removing HTML tags, condensing history) directly saves money.
*   **GPU Hosting (Self-Hosted):** If running open-source models (like Llama or Mistral), you pay for "GPU Hours."
    *   *Strategy:* "Bin Packing." Using batching techniques to send multiple requests to the GPU simultaneously to maximize utilization. A GPU sitting idle is wasted money.

## Latency Engineering

Speed is a feature.

*   **Time to First Token (TTFT):** The time it takes for the *first* word to appear. This determines the user's perception of "snappiness." Streaming the response (typing it out character by character) masks the generation time and improves perceived performance.
*   **Total Generation Time:** The time to finish the thought.
    *   *Optimization:* "Chain of Thought" is powerful but slow. For simple tasks, use a smaller, faster model (distillation). Use the massive model only for complex reasoning.
*   **Semantic Caching:** Before calling the expensive model, check a vector database cache. "Has a user asked a semantically similar question recently?" If so, return the cached answer. This cuts latency from 2 seconds to 50 milliseconds and costs zero dollars.

## Capacity Planning strategies

AI traffic is often bursty.

*   **Autoscaling limitations:** GPUs are heavy resources. They take minutes to spin up, not seconds. Traditional CPU autoscaling logic fails here.
*   **Predictive Scaling:** Using historical traffic patterns to pre-provision GPUs *before* the morning rush hour.
*   **Request Queueing:** When the system is saturated, instead of crashing, we gracefully queue requests with a message: "We are experiencing heavy load, you are #4 in line." This preserves system stability.

## Cost Guardrails

*   **The Budget Cap:** A hard limit on daily spend. If the API bill hits $500, the non-critical features turn off automatically.
*   **Rate Limits per User:** Preventing a single power user from consuming 50% of the GPU cluster.

Balancing performance (Latency), availability (Capacity), and stewardship (Cost) is the "Iron Triangle" of AI engineering.
