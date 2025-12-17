---
id: 03-lesson-16-3-incident-safety-certification-and-maintainability
title: "Incident Safety Certification and Maintainability"
sidebar_label: "Safety Certification"
---

# Incident Safety Certification and Maintainability

In software, you push a patch on Friday. In manufacturing, you certify a process for 10 years.

## The SIL (Safety Integrity Level) Barrier

Industrial standards (IEC 61508) define SIL levels mandated for safety functions.

*   **The Challenge:** Most Deep Learning models are non-deterministic "Black Boxes." They cannot easily be certified to SIL 3 or SIL 4, which require mathematical proof of failure probabilities.
*   **The Solution:** We confine AI to non-safety-critical roles (Quality Inspection logs) or wrap it in a Certified Safety Monitor (The "Doer-Checker" pattern). The AI (The Doer) proposes an action; the Certified Code (The Checker) validates it.

## Long-Term Maintainability

Factories run on 20-year lifecycles. AI moves on 6-month lifecycles.

*   **The "Version Lock":** Once a manufacturing line is certified, you cannot just auto-update the model from the cloud. That invalidates the certification.
*   **The Update Procedure:** Updating an industrial AI requires a formal "Change Management" process: (1) Offline Validation, (2) Limited Sandbox Test, (3) Operator Training, (4) Documentation Update, (5) Full Deployment. It is deliberate and slow by design.

## Operator Trust

The factory worker is the user.

*   **Explainable Defects:** If the AI rejects a part, it must highlight the scratch or dent on an oversized monitor. The operator must be able to say, "No, that's just a grease smudge," and override it. This feedback improves the model.
*   **Fear of Replacement:** Successful deployment requires positioning the AI as a tool that handles the boring, eye-straining inspection tasks, allowing the human to focus on complex troubleshooting.

Respecting the "long hardware" lifecycle is the key to industrial AI success.
