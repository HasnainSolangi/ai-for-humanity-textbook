---
id: 01-lesson-31-1-data-contract-examples-and-schema-patterns
title: "Data Contract Examples and Schema Patterns"
sidebar_label: "Data Contract Examples"
---

# Data Contract Examples and Schema Patterns

A Data Contract is an API Spec for data. It prevents upstream changes (e.g., changing "CustomerID" to "cust_id") from breaking downstream models.

## The JSON Schema Contract

This file (`contract.yaml`) lives in the Git repo of the *Producer* (the specific microservice team).

```yaml
apiVersion: datacontract.com/v2
kind: DataContract
metadata:
  name: user-interaction-events
  owner: team-mobile-app
  sla: 99.9%
  quality_gate: strict

models:
  - name: clickstream_event
    fields:
      - name: user_id
        type: string
        description: "The UUID of the user. Hashed if guest."
        pii: true
        quality:
          - pattern: "^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$"
      
      - name: timestamp
        type: timestamp
        description: "ISO 8601 UTC."
        quality:
          - max_age: "1h" # Data delivered 1 hour late is rejected.

      - name: action_type
        type: string
        enum: ["click", "view", "purchase", "dismiss"]
        description: "The interaction type."

policy:
  retention: "30d"
  purpose: "recommendation-training"
```

## The Enforcement Hook (Python)

This code runs in the CI/CD pipeline of the producer.

```python
from datacontract import Validator

def test_schema_compliance(new_data_batch):
    contract = load_contract("contract.yaml")
    validator = Validator(contract)
    
    # If the producer changed the schema without updating the contract, this fails.
    if not validator.validate(new_data_batch):
        raise BrokenContractError(
            "You broke the AI team's pipeline! "
            "Field 'timestamp' format changed."
        )
```
