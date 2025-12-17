---
id: 01-lesson-10-1-ci-cd-for-models-vs-code-canaries-shadowing-gating
title: "CI/CD for Models: Canaries, Shadowing, Gating"
sidebar_label: "CI/CD for Models: Canaries, Shadowing, Gating"
---

# CI/CD for Models: Canaries, Shadowing, Gating

Integrating Large Language Models into a Continuous Integration / Continuous Deployment (CI/CD) pipeline presents unique challenges. Unlike code, which is deterministic (the same line always does the same thing), models are probabilistic and opaque. Merging a model change is more like hiring a new employee than compiling a binary. We need robust "ModelOps" patterns to deploy with confidence.

## The Deployment Pipeline stages

A mature ModelOps pipeline has specific gates that a new model version must pass through.

1.  **Build & Test (The CI Stage):** The model weights are packaged into a container. Unit tests run on the *wrapper code* (Python logic), and "Smoke Tests" run on the model (does it load? does it respond to "Hello"?).
2.  ** Evaluation (The Quality Gate):** The model is run against the "Golden Dataset" (thousands of Q&A pairs). It generates answers, and an automated Judge Model scores them.
    *   *The Gate:* If the score drops by >1% compared to the current production model, the pipeline **fails**. The deployment acts as a circuit breaker for regression.
3.  **Shadow Deployment (The Dark Launch):** If passed, the model deploys to production but receives only "shadow traffic." It answers live user queries, but its answers are logged, not shown. This tests latency and error stability under real load without risking user trust.
4.  **Canary Rollout (The Gradual Release):** The model is exposed to 1% of live users. Metrics are monitored closely for 1 hour. If healthy, it expands to 10%, 50%, then 100%.

## Canary vs. Blue/Green

*   **Blue/Green:** You spin up a full new cluster (Green) alongside the old one (Blue). You flip the switch instantly. This is safer for instant rollbacks but expensive (double the cost for a short time).
*   **Canary:** You replace servers one by one. This is cheaper but slower. For AI models, the "Canary" approach allows for "Symptom-Based Gating"—if the first 1% of users start reporting "This bot is rude," the rollout auto-halts before the other 99% are affected.

## Model Config as Code

Never change a model setting in a UI console.

*   **Hyperparameters as Config:** Temperature, Top_P, and System Prompts should be stored in Git repositories (YAML/JSON).
*   **Version Control for Prompts:** The "System Prompt" (the instructions that tell the AI how to behave) is code. It should be versioned (`prompt_v4.txt`) and diffed. A change to the prompt triggers the full CI/CD pipeline just like a code change would.

## Rollbacks

The ability to undo is more important than the ability to do.

*   **Mean Time to Recovery (MTTR):** The key metric of the pipeline. How fast can you revert to the last known good state? In a containerized Kubernetes environment, this should be seconds.
*   **Pinning:** Critical applications should likely "pin" a model version (`gpt-4-0613`) rather than using a floating tag (`gpt-4-latest`). Floating tags change without warning, potentially breaking your prompt engineering optimizations overnight.