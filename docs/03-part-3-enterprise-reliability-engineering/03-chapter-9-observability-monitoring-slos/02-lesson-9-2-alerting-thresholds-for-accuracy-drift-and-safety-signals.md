---
id: 01-lesson-9-2-alerting-thresholds-for-accuracy-drift-and-safety-signals
title: "Alerting: Thresholds for Accuracy, Drift, and Safety Signals"
sidebar_label: "Alerting: Thresholds for Accuracy, Drift, and Safety Signals"
---

# Alerting: Thresholds for Accuracy, Drift, and Safety Signals

A dashboard that no one looks at is useless. Effective observability relies on **Alerting**: proactive notifications that wake an engineer up only when something truly matters. In AI, we must alert not just on "Server Down" but on "Model Dumb." This lesson covers the specific signals that indicate an AI system is degrading.

## The Drift Alert

Drift detection is the "Smoke Alarm" of AI. It triggers when the statistical properties of the live data diverge from the training baseline.

*   **Feature Drift:** "The distribution of input lengths has shifted. We used to see 50-word queries; now we see 5,000-word documents." This might indicate a change in user behavior that the model wasn't optimized for.
*   **Prediction Drift:** "The model used to predict 'Fraud' 1% of the time. Suddenly, it's predicting 'Fraud' 15% of the time." Unless there is a massive actual fraud wave, the model is likely broken.
*   **Setting Thresholds:** Thresholds must be dynamic. A static rule ("Alert if >5%") causes false alarms. Modern systems use "Anomaly Detection" algorithms that learn the normal daily heartbeat (e.g., lower traffic on weekends) and alert only on true statistical outliers (e.g., 3 standard deviations from the mean).

## Safety Signal Alerts

If the safety filters start catching more debris than usual, something is wrong.

*   **Jailbreak Attempt Spike:** A sudden 500% increase in prompts flagged as "Jailbreak Attempts" suggests a coordinated attack. This warrants a P0 (highest priority) alert to the Security Operations Center (SOC).
*   **Toxicity Rate:** If the model's output toxicity score creeps up from 0.01% to 0.05%, it might indicate that the model has been "poisoned" by new training data or that a prompt injection technique is bypassing the input filters.

## Accuracy Proxies (When Ground Truth is Missing)

In production, we don't have labeled "Ground Truth" (we don't know the right answer instantly). So how do we alert on accuracy? We use proxies.

*   **The "I Don't Know" Rate:** If the model's refusal rate ("I cannot answer that") spikes, it might be broken or too conservative.
*   **User Feedback Ratio:** A sudden drop in the ratio of "Thumbs Up" to "Thumbs Down" is the most reliable indicator of perceived quality degradation.
*   **Rewrite Distance:** In writing assistants, if users consistently delete and rewrite 80% of what the AI generated, the model is failing to provide value.

## Alert Fatigue Management

The enemy of response time is alert fatigue. If the pager rings all day for non-critical issues, engineers stop listening.

*   **Symptom-Based Alerting:** Alert on the *symptom* ("Users are seeing high latency"), not the *cause* ("CPU usage is high"). Users don't care about CPU; they care about speed.
*   **Service Level Objectives (SLOs):** We define an error budget (e.g., "We allow 0.1% bad responses per month"). Alerts fire only when we are burning through this budget too quickly. This prevents paging the on-call engineer for a single transient glitch that resolves itself.