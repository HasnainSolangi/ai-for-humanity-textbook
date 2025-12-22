---
id: 04-lesson-31-4-audit-logging-and-tamper-evident-trace-pseudocode
title: "آڈٹ لاگنگ اور ٹمپر ایویڈنٹ (Tamper-Evident) ٹریس کا سیوڈو کوڈ"
sidebar_label: "آڈٹ لاگنگ"
---

# آڈٹ لاگنگ اور ٹمپر ایویڈنٹ (Tamper-Evident) ٹریس کا سیوڈو کوڈ

آڈٹ لاگز کا ڈھانچہ واضح ہونا چاہیے اور ان میں تبدیلی کرنا ناممکن ہونا چاہیے۔

## لاگ اسکیما (Log Schema)

```json
{
  "event_id": "uuid-v4",
  "timestamp": "2025-10-12T14:30:00Z",
  "actor": {
    "type": "model",
    "id": "gpt-4-0613",
    "session_id": "user-session-123"
  },
  "action": {
    "type": "tool_call",
    "name": "lookup_user_balance",
    "arguments": {"user_id": 45} # کیا یہاں حساس معلومات کو چھپایا گیا ہے؟
  },
  "result": {
    "status": "success",
    "duration_ms": 240
  },
  "context": {
    "prompt_version": "v3.2",
    "rag_chunks_used": ["doc-88", "doc-92"]
  },
  "signature": "sha256-hash-of-previous-entry-plus-this-entry"
}
```

## کرپٹوگرافک چیننگ (Cryptographic Chaining)

کسی کو لاگ میں موجود معلومات مٹانے سے روکنے کے لیے، ہم ہیشز (hashes) کو ایک زنجیر کی طرح آپس میں جوڑ دیتے ہیں۔

```python
def write_log(entry):
    previous_hash = get_last_log_hash()
    
    # کرپٹو لنک بنائیں
    payload = json.dumps(entry) + previous_hash
    current_hash = sha256(payload).hexdigest()
    
    entry['previous_hash'] = previous_hash
    entry['signature'] = current_hash
    
    # اسے ایسی جگہ محفوظ کریں جہاں سے مٹایا نہ جا سکے (WORM storage)
    s3_worm_bucket.put(entry)
```

اگر مستقبل میں کسی لاگ میں کوئی تبدیلی کی گئی تو یہ ہیش زنجیر ٹوٹ جائے گی، جس سے آڈٹ کرنے والوں کو فوری طور پر پتہ چل جائے گا۔
