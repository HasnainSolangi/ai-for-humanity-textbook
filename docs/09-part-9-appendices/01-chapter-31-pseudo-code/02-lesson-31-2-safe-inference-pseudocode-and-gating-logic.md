---
id: 02-lesson-31-2-safe-inference-pseudocode-and-gating-logic
title: "Safe Inference Pseudocode and Gating Logic"
sidebar_label: "Safe Inference Logic"
---

# Safe Inference Pseudocode and Gating Logic

This pattern is the "Safety Sandwich." It wraps the risky LLM call in deterministic checks.

## The Python Wrapper

```python
class SafeAgent:
    def __init__(self, model, safety_policy):
        self.model = model
        self.policy = safety_policy

    def generate_response(self, user_prompt: str) -> str:
        # 1. INPUT GUARDRAIL
        # Check for Prompt Injection or PII.
        if self.policy.contains_pii(user_prompt):
            log_security_event("PII Attempt", user_prompt)
            return "I cannot process personal data."

        if self.policy.is_jailbreak(user_prompt):
            log_security_event("Jailbreak Attempt", user_prompt)
            return "I cannot comply with that request."

        # 2. MODEL INFERENCE
        try:
            raw_response = self.model.predict(
                user_prompt, 
                temperature=0.0 # Deterministic mode
            )
        except APITimeout:
            # Fallback to cached or safe generic response
            return "I am experiencing heavy load. Please try again."

        # 3. OUTPUT GUARDRAIL
        # Check for Hallucination or Toxic Output.
        score = self.policy.toxicity_score(raw_response)
        if score > 0.8:
            log_safety_event("Toxic Output Generated", raw_response)
            return "My response was flagged as unsafe."

        if self.policy.hallucination_check(user_prompt, raw_response):
            return "I am not sure I have enough information to answer that accurately."

        # 4. SUCCESS
        return raw_response
```

This code ensures that the LLM is never the "final authority" on what gets sent to the user.
