---
id: 01-lesson-14-1-regulated-decision-automation-explainability-and-appeals
title: "Regulated Decision Automation, Explainability, and Appeals"
sidebar_label: "Regulated Decision Automation"
---

# Regulated Decision Automation, Explainability, and Appeals

Finance is the original algorithmic industry. From credit scoring to high-frequency trading, banks have used models for decades. However, the introduction of non-linear "Black Box" AI models (Neural Networks) clashes with strict regulations like ECOA (Equal Credit Opportunity Act) and FCRA (Fair Credit Reporting Act).

## The "Adverse Action" Requirement

In many jurisdictions, if you deny a loan, you must tell the customer *why*. "The model returned a score of 420" is not a legal reason.

*   **Reason Codes:** The system must generate specific, actionable reasons: "Your debt-to-income ratio is too high" or "The length of your credit history is too short."
*   **Shapley Values:** We use game-theoretic approaches (SHAP) to attribute the specific contribution of each feature to the final negative score. This allows us to translate complex neural network weights into the plain-English reasons required by law.

## Model Risk Management (MRM)

Banks have powerful internal regulators called MRM teams.

*   **The Three Lines of Defense:**
    1.  **Line 1 (The Builders):** The data scientists who build the model. They must document everything.
    2.  **Line 2 (The Validators - MRM):** An independent internal team that validates the model. They try to break it. They have the power to block deployment.
    3.  **Line 3 (The Auditors):** Internal/External audit that checks if Line 1 and Line 2 followed the process.
*   **Challenger Models:** The new AI model runs in "Shadow Mode" against the old Logistic Regression model for months. We only switch if the AI is significantly better *and* equally stable.

## The Right to Appeal

Automation cannot be the final word.

*   **The Escalation Path:** If a user disputes the AI's decision ("I *did* pay that bill!"), the system must seamlessly route the case to a human underwriter.
*   **Context Injection:** The human underwriter can inject "Alternative Data" (e.g., proof of rent payments not on the credit report) to override the AI's narrow view.

In finance, explainability is not just a UX feature; it is a regulatory survival requirement.
