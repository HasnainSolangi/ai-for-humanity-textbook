---
id: 04-lesson-11-4-example-architecture-emr-integration-model-inference-audit-trail
title: "Example Architecture: EMR Integration, Model Inference, Audit Trail"
sidebar_label: "Example Architecture: EMR Integration"
---

# Example Architecture: EMR Integration, Model Inference, Audit Trail

Integrating AI into an Electronic Medical Record (EMR) system (like Epic or Cerner) is a challenge of interoperability. We use the **SMART on FHIR** standard to create portable, secure integrations.

## The Architecture Stack

1.  **The EMR (Source of Truth):**
    The EMR holds the patient records. It is the "host" application. We do not copy data out of the EMR if we can help it; we query it.

2.  **The Integration Layer (FHIR):**
    *   **FHIR (Fast Healthcare Interoperability Resources):** The universal JSON standard for health data.
    *   **The Orchestrator:** Polls the EMR for new events (e.g., "New Lab Result"). It normalizes the data into a standard FHIR format.

3.  **The De-Identification Gateway:**
    Before data is sent to the AI model (especially if the model is cloud-hosted), a gateway strips PII attributes or hashes the Patient ID to a temporary Session ID.

4.  **The Inference Engine:**
    The model runs its prediction (`Risk: 85%`).

5.  **The Write-Back (CDS Hook):**
    The system does not just log the result; it sends a "Card" back to the EMR user interface.
    *   *The Card:* A small pop-up inside the doctor's view. "Warning: Sepsis Risk Detection. Recommended Action: Order Lactate Test."

## The Audit Trail (Medico-Legal)

Every pixel of this interaction involves legal liability.

*   **The "Device History Record":** We log: "At 10:42 AM, Dr. X viewed the patient. The AI received Data Version Y. The AI predicted Risk Z. The 'Alert Card' was displayed. Dr. X clicked 'Dismiss' at 10:43 AM."
*   **Why?** If the patient sues malpractice years later, we must prove whether the doctor ignored the AI, or if the AI gave bad advice. This audit trail is the defense for both the software provider and the clinician.

By decoupling the AI from the monolithic EMR using standard APIs (FHIR), we create a modular system that can be upgraded without bringing down the hospital's core operations.
