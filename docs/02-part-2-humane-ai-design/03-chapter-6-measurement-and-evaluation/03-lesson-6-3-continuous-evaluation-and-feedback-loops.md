---
id: 01-lesson-6-3-continuous-evaluation-and-feedback-loops
title: "Continuous Evaluation and Feedback Loops"
sidebar_label: "Continuous Evaluation and Feedback Loops"
---

# Continuous Evaluation and Feedback Loops

Deploying a model is not the end of the engineering journey; it is the beginning of the maintenance phase. AI models are not static code artifacts; they are dynamic dependencies on a changing world. A model trained on data from last year may be hopelessly out of touch today. This lesson covers **MLOps for Reliability**: the systems that keep AI healthy, safe, and useful in the wild.

## The Drift Problem

"Drift" is the silent killer of AI performance. It occurs when the reality of the world diverges from the frozen reality the model learned during training.

*   **Data Drift:** The input data changes distribution. (e.g., A computer vision system trained on summer images suddenly seeing snow; or a financial model seeing a new type of currency transaction).
*   **Concept Drift:** The fundamental relationship between input and output changes. (e.g., The definition of "Spam" evolves—what was a normal email yesterday is a phishing attack today).
*   **Behavioral Drift:** User expectations and language evolve. Users might start asking shorter queries, using new slang, or expecting different types of answers that the model wasn't optimized for.

## Continuous Evaluation Pipelines

To combat drift, evaluation never stops. It moves from the lab to the production line.

*   **Shadow Mode:** New model versions are often deployed in "Shadow Mode" alongside the production model. They receive the same live inputs, but their outputs are not shown to users. Instead, they are logged and compared to the current champion model. Only when the Shadow model proves it is strictly better is it promoted to live status.
*   **Online Metrics:** We track real-time proxies for quality. A sudden spike in "retry" rates (users rephrasing their prompt) or "thumbs down" feedback is an immediate alarm bell that something has broken, even if the server returns "200 OK."
*   **Smart Sampling:** We cannot manually review every interaction. Smart sampling strategies flag interactions with low confidence scores, high toxicity probability, or negative sentiment, sending this "high-signal" data to human annotators for review.

## The Human-in-the-Loop Feedback Cycle

The most valuable data comes from the users themselves. Feedback loops allow the system to self-correct.

*   **Implicit Feedback:** Behavioral signals are powerful. Did the user copy the code snippet? (Good signal). Did they close the tab immediately after the answer? (Bad signal).
*   **Explicit Feedback:** Corrections. If a user edits the AI's generated draft, that "diff" (the difference between what the AI wrote and what the user wanted) is gold dust. This data is fed back into fine-tuning pipelines (Reinforcement Learning from Human Feedback - RLHF) to improve the model for the next release.

## The Kill Switch and Sunsetting

Responsible engineering includes knowing when to turn it off.

*   **Circuit Breakers:** Automated systems that block the AI if error rates spike or if output toxicity exceeds a define threshold. This prevents a runaway model from causing widespread damage.
*   **Sunsetting Criteria:** Models should have an expiration date. If a model cannot be maintained, audited, or retrained (e.g., due to lost access to training data or key personnel), it should be retired. Allowing a "zombie model" to degrade into obsolescence is a major safety risk.

Continuous evaluation turns AI from a "fire and forget" missile into a guided service, constantly correcting its course to stay aligned with human needs and values.