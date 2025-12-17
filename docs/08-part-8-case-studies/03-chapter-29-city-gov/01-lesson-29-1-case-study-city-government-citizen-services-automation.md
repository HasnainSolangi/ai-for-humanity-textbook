---
id: 01-lesson-29-1-case-study-city-government-citizen-services-automation
title: "City Gov: Citizen Services Automation"
sidebar_label: "City Gov Case Study"
---

# City Gov: Citizen Services Automation

## 1. The Problem
The "311" Call Center was overwhelmed. Wait times > 45 minutes.

## 2. The Approach
Deployed a Multilingual Chatbot for common queries ("Trash pickup schedule," "Pay parking ticket").

## 3. Architecture
*   **Frontend:** Web Widget + WhatsApp Integration.
*   **Backend:** RAG (Retrieval Augmented Generation) over the City Knowledge Base.
*   **Safety:** "Hard Constraints" prevented the bot from answering legal questions.

## 4. Outcomes
*   **Deflection:** 30% of calls were resolved by the bot.
*   **Access:** Spanish and Chinese speakers received 24/7 service for the first time.

## 5. Lessons Learned
*   **Hallucination:** The bot once invented a "Free Parking Day."
*   **Fix:** Implementation of a "Verified Facts" database that the bot must cite.
