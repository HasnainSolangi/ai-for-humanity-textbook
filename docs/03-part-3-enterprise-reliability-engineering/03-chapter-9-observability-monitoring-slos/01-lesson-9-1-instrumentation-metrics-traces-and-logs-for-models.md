---
id: 01-lesson-9-1-instrumentation-metrics-traces-and-logs-for-models
title: "Instrumentation: Metrics, Traces, and Logs for Models"
sidebar_label: "Instrumentation: Metrics, Traces, and Logs for Models"
---

# Instrumentation: Metrics, Traces, and Logs for Models

You cannot fix what you cannot see. In standard software, if a server crashes, the logs show an error. In AI, a model can "crash" silently—by giving wrong, biased, or nonsensical answers—while the server reports a healthy "200 OK" status. Observability in AI therefore requires a new layer of instrumentation that looks inside the black box.

## The Three Pillars of AI Observability

### 1. Metrics (The Dashboard)
Metrics are aggregated numerical data points that show the high-level health of the system over time.
*   **Operational Metrics:** Latency (P50, P99), Throughput (Requests per Second), Error Rate (5xx codes), and GPU Saturation.
*   **Business Metrics:** Conversion rate, "Thumbs Up" ratio, Session length.
*   **Model Metrics:** Token usage (input vs. output), Cache hit rate, and specific Safety Violation measures (e.g., "Toxic prompts blocked per hour").

### 2. Logs (The Event Record)
Logs capture the discrete details of individual events.
*   **Structured JSON Logs:** In AI, logs must be structured. A log entry shouldn't just say "Request received." It should contain the `prompt_hash`, `model_version`, `temperature`, `user_id`, and `trace_id`.
*   **The "Payload Problem":** Standard logs are usually small. AI logs can contain massive prompts (100k+ tokens). Strategies like "sampling" (logging only 1% of full payloads) or "offloading" (storing the heavy payload in S3 and keeping a link in the logs) are required to manage costs.

### 3. Traces (The Journey)
Traces follow a request as it hops between microservices.
*   **The Chain of Thought:** In an agentic system, a single user question ("Book me a flight") might trigger twenty internal steps: (1) Search knowledge base, (2) format query, (3) call Flight API, (4) interpret results, (5) formulate answer. Distributed tracing tools (like OpenTelemetry) visualize this entire waterfall, allowing engineers to pinpoint exactly which step added 5 seconds of latency or where the logic forked incorrectly.

## Privacy-First Logging

Logging prompts and completions is essential for debugging, but it is a massive privacy risk. Users naturally type sensitive things into chat boxes (passwords, health data, code secrets).

*   **PII Redaction:** A dedicated PII scanner must sit between the application and the logging system. It automatically identifies and masks entities like `[CREDIT_CARD]`, `[EMAIL]`, or `[SSN]` before the log is written to disk.
*   **Data Masking:** For highly sensitive fields, we use hashing. We might log that User X asked about "Topic Hash A", allowing us to count frequency without seeing the raw text.

## Correlation ID

The golden thread of observability is the Correlation ID. This unique string is generated at the web frontend and passed to the backend, the database, the model, and the analytics pipeline. It allows an engineer to say, "Show me exactly what happened during that one failed interaction reported by customer #402." Without it, debugging a distributed AI system is impossible.