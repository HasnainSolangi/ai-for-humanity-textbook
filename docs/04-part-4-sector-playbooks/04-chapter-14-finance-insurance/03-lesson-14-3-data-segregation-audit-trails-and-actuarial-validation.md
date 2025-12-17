---
id: 03-lesson-14-3-data-segregation-audit-trails-and-actuarial-validation
title: "Data Segregation, Audit Trails, and Actuarial Validation"
sidebar_label: "Data Segregation and Actuarial Validation"
---

# Data Segregation, Audit Trails, and Actuarial Validation

Insurance is the business of pricing risk. AI promises hyper-personalized pricing, but this threatens the fundamental concept of "Risk Pooling" (shared liability).

## The Fairness of Hyper-Personalization

If an AI uses satellite imagery to count the trees in your yard and tripling your fire insurance premium, is that fair?

*   **Actuarial Validity:** The AI must prove a causal link. Is there rigorous statistical evidence that "Number of Twitter followers" predicts "Car accident risk"? If not, using that feature is discrimination, not actuarial science.
*   **Redlining via Proxy:** AI must be forbidden from using proxies for race or religion (e.g., buying habits, zip code) to segregate risk pools in a way that effectively denies coverage to protected classes.

## Data Segregation (The Chinese Wall)

Financial institutions often have multiple business lines (Trading, Banking, Advisory).

*   **Material Non-Public Information (MNPI):** An AI trading bot cannot be trained on the private email data of the Merger & Acquisition team.
*   **Role-Based Access Control (RBAC) for Data:** Training datasets must be strictly segregated. The "Training Pipeline" runs with a specific service account that has access *only* to the authorized data lake partition, enforcing the "Chinese Wall" at the code level.

## The Immutable Audit Trail

For every trade executed by an AI and every policy priced:

*   **Snapshotting:** We store a snapshot of the *exact* input vector and the *exact* model version ID.
*   **Reproduction:** An auditor 3 years from now must be able to re-run that specific input through that specific model binary and get the exact same output (to the 8th decimal place). This proves that the bank was not arbitrarily changing prices.

In insurance, trust is the product. If customers believe the "Black Box" is rigging the prices against them, the market collapses.
