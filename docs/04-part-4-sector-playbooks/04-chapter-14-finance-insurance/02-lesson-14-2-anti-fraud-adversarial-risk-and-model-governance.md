---
id: 02-lesson-14-2-anti-fraud-adversarial-risk-and-model-governance
title: "Anti-Fraud, Adversarial Risk, and Model Governance"
sidebar_label: "Anti-Fraud and Adversarial Risk"
---

# Anti-Fraud, Adversarial Risk, and Model Governance

The war between Fraudsters and Banks is an evolutionary arms race. As Banks deploy AI to detect fraud, fraudsters deploy AI to generate it (Deepfakes, Synthetic Identities).

## The Synthetic Identity Attack

Fraudsters use GenAI to create "Frankenstein Identities"—combining a real SSN (often from a child) with a fake name and synthetic credit history.

*   **Graph Neural Networks (GNNs):** Traditional models look at rows in a table. GNNs look at the *relationships*. "Why do these 50 different customers all share the same phone number? Why are they all logging in from the same subnet?" GNNs are incredibly effective at detecting these organized fraud rings that traditional rules miss.

## Adversarial Attacks on Fraud Models

*   **Model Evasion:** Attackers "probe" the model. They try small transactions, tweaking variables (time of day, amount, merchant) to figure out where the model's blind spots are. Once found, they exploit the blind spot with a massive attack.
*   **Defense:** We use "Active Learning." The model is constantly updated (daily or even hourly) on the latest fraud patterns. We also use "Randomization" in the defense triggers to confuse the attackers about the exact rules.

## Deepfakes in KY (Know Your Customer)

The "Video Selfie" verification is now vulnerable.

*   **Liveness Detection:** Advanced AI looks for subtle biological signals—micro-movements of the skin (pulse detection), reflection in the eyes, proper lighting physics—that deepfakes typically fail to render perfectly.
*   **Voice Auth Vulnerability:** Voice biometrics are increasingly unsafe due to voice cloning. Multi-factor authentication is now mandatory; voice alone is not enough.

Governance in fraud is about speed. The model governance cycle cannot be "Quarterly" when the attack vectors change "Daily."
