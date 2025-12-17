---
id: 04-lesson-31-4-audit-logging-and-tamper-evident-trace-pseudocode
title: "Audit Logging and Tamper-Evident Trace Pseudocode"
sidebar_label: "Audit Logging"
---

# Audit Logging and Tamper-Evident Trace Pseudocode

Audit logs must be structured and immutable.

## The Log Schema

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
    "arguments": {"user_id": 45} # PII Masking applied?
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

## Cryptographic Chaining (The Blockchain Pattern)

To prevent an admin from deleting a log line to hide a mistake, we chain the hashes.

```python
def write_log(entry):
    previous_hash = get_last_log_hash()
    
    # Create the crypto link
    payload = json.dumps(entry) + previous_hash
    current_hash = sha256(payload).hexdigest()
    
    entry['previous_hash'] = previous_hash
    entry['signature'] = current_hash
    
    # Write to Write-Once-Read-Many (WORM) storage
    s3_worm_bucket.put(entry)
```

If any log entry is modified later, the hash chain breaks, alerting the auditors.
