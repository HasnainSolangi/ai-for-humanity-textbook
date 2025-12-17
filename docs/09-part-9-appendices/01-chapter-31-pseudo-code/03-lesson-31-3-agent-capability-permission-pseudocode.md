---
id: 03-lesson-31-3-agent-capability-permission-pseudocode
title: "Agent Capability Permission Pseudocode"
sidebar_label: "Agent Permissions"
---

# Agent Capability Permission Pseudocode

We manage agent permissions using a "Capabilities Object."

## The Capabilities Definition

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

# Pre-defined Profiles
RESEARCHER = AgentProfile("Researcher", [Capability.SEARCH_WEB])
ASSISTANT = AgentProfile("Assistant", [Capability.SEARCH_WEB, Capability.READ_EMAIL])
ADMIN = AgentProfile("Admin", [Capability.DELETE_FILE]) # Rarely used
```

## The Enforcement Middleware

```python
def execute_tool(agent_profile: AgentProfile, tool_name: str, args: dict):
    # Map tool to required capability
    required_cap = TOOL_REGISTRY[tool_name].required_capability
    
    # Check permission
    if required_cap not in agent_profile.allowed_caps:
        raise PermissionDeniedError(
            f"Agent '{agent_profile.role}' tried to use tool '{tool_name}' "
            f"but lacks capability '{required_cap}'."
        )

    # Special Check for Human-in-the-Loop
    if TOOL_REGISTRY[tool_name].requires_human_approval:
        approval = request_human_approval(tool_name, args)
        if not approval.granted:
            return "Action denied by user."

    # Execute
    return run_tool(tool_name, args)
```
