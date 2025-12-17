---
id: 01-lesson-8-1-zero-trust-for-ai-services-and-data-flows
title: "Zero Trust for AI Services and Data Flows"
sidebar_label: "Zero Trust for AI Services and Data Flows"
---

# Zero Trust for AI Services and Data Flows

Traditional security perimeters—firewalls that trust everything "inside" the network—are severely insufficient for modern AI architectures. AI services are distributed across clouds, edge devices, and third-party APIs (like OpenAI or Anthropic). The industry standard for securing this sprawling topology is **Zero Trust**: the assumption that the network is always hostile and that every request must be explicitly authenticated and authorized.

## Identity Propagation

In a complex chain of AI services (User -> Web App -> Orchestrator -> Vector DB -> LLM), the context of "Who is asking?" often gets lost, leading to catastrophic security holes.

*   **The Confused Deputy Problem:** If the Web App has "Admin" access to the Vector DB, a malicious user might trick the Web App into retrieving secrets (like CEO salaries) that they shouldn't see. The App is the "deputy" acting blindly on behalf of the attacker.
*   **On-Behalf-Of (OBO) Flows:** Modern identity standards (like OAuth 2.0 and OIDC) propagate the *user's* identity all the way down the service stack. The Vector DB checks permissions not for the "Web App," but for "User John Doe" via the propagated token. If John doesn't have access to the "HR Documents" collection, the query fails—even if the App has global access.

## Securing the Inference Endpoint

The model inference endpoint is a high-value target and a high-cost resource.

*   **Rate Limiting & Quotas (DoS Protection):** Protecting against Denial-of-Service and "Denial-of-Wallet" attacks. LLM inference is computationally expensive. A compromised API key or a simple loop bug in a client script could drain an entire month's budget in minutes. Granular rate limits per user, per tenant, and per IP are mandatory defensive measures.
*   **Input Validation (The AI Firewall):** Before the payload ever hits the model, it passes through specialized Web Application Firewalls (WAFs) tuned for AI. These scanners look for massive payloads (buffer overflow attempts) and recognizable prompt injection patterns designed to hijack the model.

## Data Flow Encryption

Data is most vulnerable when it is moving.

*   **mTLS (Mutual TLS):** Services identify each other using cryptographic certificates. The Orchestrator knows it is talking to the *real* Model Service (not a spoofer), and the Model Service knows it is being called by the *real* Orchestrator. Effectively, this is "Two-Factor Authentication" for servers.
*   **Field-Level Encryption:** For highly sensitive fields (like SSNs), data is encrypted at the application layer before it even hits the database. Even if the database administrator dumps the entire table, they see only ciphertext.

Zero Trust ensures that even if one component is compromised (e.g., a hacker breaches the Web App), the attacker cannot pivot to drain the entire intellectual property of the model or the mass database of user vector embeddings.