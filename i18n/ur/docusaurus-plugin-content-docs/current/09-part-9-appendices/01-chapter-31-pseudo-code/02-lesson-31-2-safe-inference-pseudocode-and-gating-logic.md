---
id: 02-lesson-31-2-safe-inference-pseudocode-and-gating-logic
title: "محفوظ تجزیہ (Inference) اور گیٹنگ (Gating) کی منطق"
sidebar_label: "محفوظ تجزیہ کی منطق"
---

# محفوظ تجزیہ (Inference) اور گیٹنگ (Gating) کی منطق

یہ نمونہ ایک "حفاظتی غلاف" (Safety Sandwich) کی طرح کام کرتا ہے۔ یہ خطرناک ایل ایل ایم (LLM) کال کو پہلے سے طے شدہ حفاظتی جانچ کے دائرے میں رکھتا ہے۔

## پائتھن ریپر (Python Wrapper)

```python
class SafeAgent:
    def __init__(self, model, safety_policy):
        self.model = model
        self.policy = safety_policy

    def generate_response(self, user_prompt: str) -> str:
        # 1. ان پٹ گارڈ ریل
        # پرامپٹ انجیکشن یا ذاتی معلومات (PII) کی جانچ کریں۔
        if self.policy.contains_pii(user_prompt):
            log_security_event("PII Attempt", user_prompt)
            return "میں ذاتی ڈیٹا پر کام نہیں کر سکتا۔"

        if self.policy.is_jailbreak(user_prompt):
            log_security_event("Jailbreak Attempt", user_prompt)
            return "میں اس درخواست پر عمل نہیں کر سکتا۔"

        # 2. ماڈل کا جواب
        try:
            raw_response = self.model.predict(
                user_prompt, 
                temperature=0.0 # مکمل طور پر طے شدہ موڈ
            )
        except APITimeout:
            # اگر سسٹم سست ہو تو محفوظ جواب دیں
            return "سسٹم مصروف ہے۔ براہِ کرم تھوڑی دیر بعد کوشش کریں۔"

        # 3. آؤٹ پٹ گارڈ ریل
        # غلط بیانی یا برے جواب کی جانچ کریں۔
        score = self.policy.toxicity_score(raw_response)
        if score > 0.8:
            log_safety_event("Toxic Output Generated", raw_response)
            return "میرا جواب غیر محفوظ قرار دیا گیا ہے۔"

        if self.policy.hallucination_check(user_prompt, raw_response):
            return "مجھے ایسا لگتا ہے کہ میرے پاس اس کا صحیح جواب دینے کے لیے کافی معلومات نہیں ہیں۔"

        # 4. کامیابی
        return raw_response
```

یہ کوڈ اس بات کو یقینی بناتا ہے کہ صارف کو موصول ہونے والے جواب پر حتمی اختیار ایل ایل ایم (LLM) کا نہیں بلکہ سسٹم کا ہے۔
