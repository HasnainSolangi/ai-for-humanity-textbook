---
id: 03-lesson-32-3-incident-response-disclosure-template
title: "Incident Response and Disclosure Template"
sidebar_label: "Incident Response Template"
---

# Incident Response and Disclosure Template

When a failure occurs, communicate clearly.

## Incident Severity Levels
*   **SEV-1 (Critical):** Immediate harm to users or massive data breach. (Wake up CEO).
*   **SEV-2 (High):** Feature broken for >10% of users. (Wake up Engineering Lead).
*   **SEV-3 (Medium):** Minor bug or latency. (Fix next business day).

## Public Disclosure Draft (Example)

**Title:** Issue with [Feature Name] on [Date]

**Summary:**
Between [Start Time] and [End Time], a subset of users experienced [Symptom]. We have identified the root cause and implemented a fix.

**What Happened:**
We deployed a new model version (`v2.1`) intended to improve reasoning. However, a data formatting error caused the model to hallucinate dates in 5% of responses.

**Impact:**
Approximately [Number] users received incorrect date information. No personal data was exposed.

**Preventative Measures:**
We have added a specific unit test for Date Formatting to our CI/CD pipeline to prevent this from recurring.

**Apology:**
We care deeply about accuracy and apologize for the confusion this caused.
