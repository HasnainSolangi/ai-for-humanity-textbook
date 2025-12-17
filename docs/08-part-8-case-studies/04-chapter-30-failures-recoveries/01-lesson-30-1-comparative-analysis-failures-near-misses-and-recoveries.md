---
id: 01-lesson-30-1-comparative-analysis-failures-near-misses-and-recoveries
title: "Failures, Near-Misses & Recoveries"
sidebar_label: "Failures & Recoveries"
---

# Failures, Near-Misses & Recoveries

## Failure: The Dutch Childcare Benefits Scandal
*   **What happened:** An algorithm flagged "Dual Nationality" as a risk factor for fraud. Thousands of families were wrongly accused and bankrupted.
*   **Root Cause:** Bias in the target variable + Lack of Appeal Process.
*   **Lesson:** **Never** automate punitive actions (stripping benefits) without human review.

## Near-Miss: The Flash Crash Bot
*   **What happened:** A trading bot entered a feedback loop, selling assets to itself, driving price to near zero.
*   **Recovery:** The "Circuit Breaker" (Hard Rule) kicked in and halted trading.
*   **Lesson:** **Hard Rules** save systems when **Soft AI** fails.

## Recovery: The Biased Hiring Algo
*   **What happened:** A company found their Resume Screener penalized women.
*   **Recovery:** They didn't just patch it; they **scrapped it** (Decommissioning) and returned to manual review until a fair process could be proven.
*   **Lesson:** Sometimes the only safe AI is **No AI**.
