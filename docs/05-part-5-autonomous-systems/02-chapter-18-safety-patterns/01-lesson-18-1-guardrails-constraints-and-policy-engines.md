---
id: 01-lesson-18-1-guardrails-constraints-and-policy-engines
title: "Guardrails, Constraints, and Policy Engines"
sidebar_label: "Guardrails and Constraints"
---

# Guardrails, Constraints, and Policy Engines

An agent is a powerful engine. Guardrails are the brakes and the steering linkage. Without them, the engine drives off a cliff.

## The Input/Output Guardrail Pattern (NeMo)
We treat the LLM as an untrusted component. We wrap it in a sandwich of deterministic code.

1.  **Input Guardrail:**
    *   **Topic Check:** "Is this user talking about politics?" -> Block.
    *   **Jailbreak Check:** "Is the user trying to override my instructions?" -> Block.
    *   **PII Check:** "Is there a credit card number?" -> Mask.

2.  **The LLM Integration:** The model runs only if the Input Guardrail passes.

3.  **Output Guardrail:**
    *   **Hallucination Check:** Does the output contain facts not present in the context?
    *   **Format Check:** Is the output valid JSON? If not, the Guardrail forces a retry without showing the user the broken code.

## Policy Engines (OPA - Open Policy Agent)
Hard-coding rules in Python ("if user == 'admin'") is brittle. We use Policy-as-Code.
*   **Rego Policies:** We write rules in a declarative language. "Allow tool access ONLY if user is 'verified' AND time is 'business_hours' AND transaction is less than $500."
*   **Decoupled Logic:** The agent asks the Policy Engine "Can I do X?" The Engine answers "Yes" or "No." This keeps the agent code clean and the business rules centralized.

Safe agents are "Constrained Agents." The more we restrict the search space, the more reliable the agent becomes.
