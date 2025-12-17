---
id: 01-lesson-20-1-safe-model-rollback-and-hotfix-strategies
title: "Safe Model Rollback and Hotfix Strategies"
sidebar_label: "Safe Model Rollback"
---

# Safe Model Rollback and Hotfix Strategies

When an autonomous system fails, you don't rewrite code. You rewind time.

## The Atomic Rollback
*   **Blue/Green Switching:** We maintain the previous version of the agent (`v1.4`) on standby while `v1.5` is live.
*   **The Big Red Button:** If metrics dive, a single API call routes 100% of traffic back to `v1.4`. This must happen in milliseconds.
*   **Database Schema Compatibility:** The hardest part. If `v1.5` changed the database schema, `v1.4` might crash. We enforce "Backward Compatible" schema changes only.

## Hotfixing Prompts
Sometimes a full rollback is too much. We just need to stop the agent from talking about a specific bad topic.
*   **System Prompt Injection:** We have a dynamic "System Prompt" layer. We can inject a new rule ("Do not discuss Topic X") into the live prompt *without* redeploying the binary. This is a "Config Update," not a "Code Deploy," allowing for instant patches.

## Incident Comm
*   **Status Page:** "We are investigating an issue with the Search Agent."
*   **Degraded Mode:** We switch the UI to show "Search is currently offline" rather than letting users see broken spinning wheels.

Reliability is the ability to recover faster than the user notices the failure.
