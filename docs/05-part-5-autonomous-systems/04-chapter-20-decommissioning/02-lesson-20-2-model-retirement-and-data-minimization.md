---
id: 02-lesson-20-2-model-retirement-and-data-minimization
title: "Model Retirement and Data Minimization"
sidebar_label: "Model Retirement"
---

# Model Retirement and Data Minimization

Models are not pets; they are cattle. Eventually, they must be put down.

## The Zombie Model Risk
Leaving an old model running ("because some legacy API uses it") is a security risk.
*   **Drift:** Old models are trained on old data. They don't know about current events or new slang. They become increasingly inaccurate.
*   **Vulnerabilities:** They likely use old libraries (PyTorch v1.0) with known security CVEs.

## The Decommissioning Protocol
1.  **Identify Consumers:** Look at the logs. Who is still calling `v1.0`?
2.  **Scream Test:** Turn `v1.0` off for 1 hour. See who complains.
3.  **Brownout:** Turn it off for increasing periods (1 hour, 1 day, 1 week) to force users to migrate.
4.  **Deletion:** Delete the weights, the endpoint, and the training data.

## Data Minimization impact
*   **Right to be Forgotten:** When we delete a model, we must often also delete the specific "fine-tuning" data associated with it, if that data was user-provided.
*   **Machine Unlearning:** If a user revokes consent, ideally we "unlearn" their data. Since reliable unlearning is still research-grade, the practical approach is to `Retrain from Scratch` without their data on the next cycle (e.g., monthly).

Clean up your digital waste.
