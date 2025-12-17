---
id: 01-lesson-32-1-pre-deployment-safety-checklist
title: "Pre-Deployment Safety Checklist"
sidebar_label: "Safety Checklist"
---

# Pre-Deployment Safety Checklist

Do not ship until all boxes are checked.

## 1. Data & Privacy
- [ ] **PII Scrubbed:** Have we verified that the training/RAG data contains no PII?
- [ ] **Data Lineage:** Can we trace every data point back to its source and license?
- [ ] **Opt-Out:** Is there a mechanism for users to delete their data?

## 2. Model Performance
- [ ] **Golden Set Pass:** Did the model achieve >90% accuracy on the regression test suite?
- [ ] **Bias Test:** Did we test performance across Gender, Race, and Geography? Is the disparity less than 5%?
- [ ] **Latency:** Is the P99 latency under 2 seconds?

## 3. Security & Abuse
- [ ] **Red Teamed:** Did the security team try to jailbreak it? Were patches applied?
- [ ] **Rate Limits:** Are per-user and per-IP rate limits enabled?
- [ ] **Output Filters:** Is the content moderation layer active?

## 4. Governance
- [ ] **Human in the Loop:** Is there an escalation path to a human for bad results?
- [ ] **Legal Review:** Did Legal approve the Terms of Service and Liability Disclaimers?
- [ ] **Rollback Plan:** If we deploy and it fails, can we revert in less than 5 minutes?
