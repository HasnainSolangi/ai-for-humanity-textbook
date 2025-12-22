---
id: 01-lesson-31-1-data-contract-examples-and-schema-patterns
title: "ڈیٹا کنٹریکٹ کی مثالیں اور اسکیما کے نمونے"
sidebar_label: "ڈیٹا کنٹریکٹ کی مثالیں"
---

# ڈیٹا کنٹریکٹ کی مثالیں اور اسکیما کے نمونے

ڈیٹا کنٹریکٹ (Data Contract) ڈیٹا کے لیے اے پی آئی (API) کی ایک وضاحت ہے۔ یہ اس بات کو یقینی بناتا ہے کہ پیچھے سے ہونے والی تبدیلیاں (مثلاً "CustomerID" کا نام بدل کر "cust_id" رکھنا) آگے چلنے والے ماڈلز کو خراب نہ کریں۔

## JSON اسکیما کنٹریکٹ

یہ فائل (`contract.yaml`) ڈیٹا تیار کرنے والی ٹیم (Producer) کے پاس ہونی چاہیے۔

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
        description: "صارف کی مخصوص آئی ڈی (UUID)۔"
        pii: true
        quality:
          - pattern: "^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$"
      
      - name: timestamp
        type: timestamp
        description: "وقت کا ریکارڈ (ISO 8601 UTC)۔"
        quality:
          - max_age: "1h" # ایک گھنٹے سے زیادہ پرانا ڈیٹا مسترد کر دیا جائے گا۔

      - name: action_type
        type: string
        enum: ["click", "view", "purchase", "dismiss"]
        description: "صارف کا عمل۔"

policy:
  retention: "30d"
  purpose: "recommendation-training"
```

## نفاذ کا کوڈ (Python)

یہ کوڈ ڈیٹا تیار کرنے کے عمل (CI/CD pipeline) میں کام کرتا ہے۔

```python
from datacontract import Validator

def test_schema_compliance(new_data_batch):
    contract = load_contract("contract.yaml")
    validator = Validator(contract)
    
    # اگر کسی نے معاہدہ اپ ڈیٹ کیے بغیر ڈیٹا کی شکل بدلی، تو یہاں غلطی آئے گی۔
    if not validator.validate(new_data_batch):
        raise BrokenContractError(
            "آپ نے ڈیٹا کا معاہدہ توڑ دیا ہے! "
            "ٹائم اسٹیمپ (timestamp) کا فارمیٹ بدل گیا ہے۔"
        )
```
