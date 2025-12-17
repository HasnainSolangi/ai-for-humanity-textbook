---
id: 01-lesson-27-1-case-study-hospital-clinical-decision-support-at-scale
title: "Hospital: Clinical Decision Support at Scale"
sidebar_label: "Hospital Case Study"
---

# Hospital: Clinical Decision Support at Scale

## 1. The Problem
St. Mary's Health System faced a high rate of **Sepsis Mortality**. Early detection is key, but signs are subtle.

## 2. The Approach
Deployed a "Sepsis Watch" model (RNN) integrated into the Epic EMR.

## 3. Architecture
*   **Data:** Vitals signs every 15 mins.
*   **Inference:** Hourly batch job.
*   **Alert:** Paged the Rapid Response Nurse (Human-in-the-loop), NOT the physician (to reduce alarm fatigue).

## 4. Outcomes
*   **Mortality:** Reduced by 20%.
*   **Adoption:** 85% of nurses reported the tool was "helpful."

## 5. Lessons Learned
*   **Explainability:** Nurses rejected the tool until "Why?" features were added (e.g., "Lactate is rising").
*   **Workflows:** The tool failed when it just added a popup. It succeeded when it changed the *staffing protocol*.
