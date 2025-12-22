---
id: 03-lesson-31-3-agent-capability-permission-pseudocode
title: "ایجنٹ کی صلاحیت اور اجازت (Permission) کا سیوڈو کوڈ (Pseudocode)"
sidebar_label: "ایجنٹ کی اجازتیں"
---

# ایجنٹ کی صلاحیت اور اجازت (Permission) کا سیوڈو کوڈ (Pseudocode)

ہم ایجنٹ کی اجازتوں کو ایک "صلاحیتوں کے آبجیکٹ" (Capabilities Object) کے ذریعے مینیج کرتے ہیں۔

## صلاحیتوں کی تعریف (Capabilities Definition)

```python
from enum import Enum, auto

class Capability(Enum):
    SEARCH_WEB = auto()
    READ_EMAIL = auto()
    SEND_EMAIL = auto()
    DELETE_FILE = auto()

class AgentProfile:
    def __init__(self, role: str, allowed_caps: list[Capability]):
        self.role = role
        self.allowed_caps = allowed_caps

# پہلے سے طے شدہ پروفائلز
RESEARCHER = AgentProfile("Researcher", [Capability.SEARCH_WEB])
ASSISTANT = AgentProfile("Assistant", [Capability.SEARCH_WEB, Capability.READ_EMAIL])
ADMIN = AgentProfile("Admin", [Capability.DELETE_FILE]) # بہت کم استعمال ہوتا ہے
```

## نفاذ کا مڈل ویئر (Enforcement Middleware)

```python
def execute_tool(agent_profile: AgentProfile, tool_name: str, args: dict):
    # ٹول کے لیے ضروری صلاحیت کی جانچ کریں
    required_cap = TOOL_REGISTRY[tool_name].required_capability
    
    # اجازت چیک کریں
    if required_cap not in agent_profile.allowed_caps:
        raise PermissionDeniedError(
            f"ایجنٹ '{agent_profile.role}' نے ٹول '{tool_name}' استعمال کرنے کی کوشش کی "
            f"لیکن اس کے پاس '{required_cap}' کی اجازت نہیں ہے۔"
        )

    # انسانی منظوری کے لیے خصوصی چیک
    if TOOL_REGISTRY[tool_name].requires_human_approval:
        approval = request_human_approval(tool_name, args)
        if not approval.granted:
            return "صارف نے اس عمل کی اجازت نہیں دی۔"

    # کام مکمل کریں
    return run_tool(tool_name, args)
```
