---
id: 01-lesson-15-1-low-resource-constraints-and-inclusive-deployment
title: "Low-Resource Constraints and Inclusive Deployment"
sidebar_label: "Low-Resource Constraints"
---

# Low-Resource Constraints and Inclusive Deployment

The majority of humanity does not live with 5G connectivity and unlimited cloud credits. Designing AI for the "Global South" or for crisis zones requires a fundamental rethink of the "Cloud-Native" assumptions ingrained in Silicon Valley.

## The Offline-First Mandate

In a refugee camp or a remote village, the internet is intermittent, expensive, or non-existent.

*   **Edge Inference:** The AI must run on the device (usually a mid-range Android phone), not on a server in Virginia. This requires "Quantization" (shrinking the model from 32-bit floats to 4-bit integers) and "Distillation" (teaching a small student model to mimic a large teacher model).
*   **Store-and-Forward Sync:** The application should function fully offline—allowing a health worker to diagnose a patient using AI—and then sync the data only when the worker returns to a Wi-Fi hub at the main clinic.

## Compute Constraints

*   **Battery Life:** A model that drains a phone battery in 30 minutes is useless to a farmer away from a power grid for 12 hours. Optimizing "Inference Joules per Token" is a critical metric.
*   **Legacy Hardware:** We cannot assume the latest iPhone. We must test on $100 Android devices with limited RAM.

## Language and Literacy

*   **Audio-Centric Interfaces:** For populations with low literacy rates, text chatbots are exclusionary. Voice-in / Voice-out interfaces in local dialects (Swahili, Hindi, Bengali) are the only viable UX.
*   **Pictographic UI:** Interfaces should rely on universally understood icons rather than text labels.

Designing for constraints breeds innovation. The techniques invented to run AI in a village (efficiency, robustness) often end up improving the product for users in a skyscraper.
