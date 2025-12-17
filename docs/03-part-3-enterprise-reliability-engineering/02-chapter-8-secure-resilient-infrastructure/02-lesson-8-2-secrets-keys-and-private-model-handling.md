---
id: 01-lesson-8-2-secrets-keys-and-private-model-handling
title: "Secrets, Keys, and Private Model Handling"
sidebar_label: "Secrets, Keys, and Private Model Handling"
---

# Secrets, Keys, and Private Model Handling

AI applications are notoriously "leaky" with secrets. API keys for model providers often end up hardcoded in scripts or committed to public code repositories. Furthermore, proprietary model weights—which may represent millions of dollars in R&D investment—are valuable Intellectual Property (IP) that must be guarded. This lesson covers the strict cryptographic hygiene required for modern AI deployments.

## The Death of the Hardcoded Key

Using an API key in an environment variable is the bare minimum, but it is not enough for enterprise-grade security.

*   **Secret Management Services:** Applications should utilize a "Check-in/Check-out" system. They request a key from a dedicated Vault (like HashiCorp Vault or Cloud KMS) only at runtime. The key lives in the application's memory only for as long as needed and is never written to disk or logs.
*   **Short-Lived Tokens:** Instead of static API keys that last forever (and must be manually rotated if leaked), systems use ephemeral tokens that expire automatically after a short period (e.g., 1 hour). If a token is leaked, its "blast radius" is minimal because it becomes useless quickly.

## Protecting Model Weights (IP Protection)

For organizations training their own models, the model weights *are* the company. Losing them is an existential threat.

*   **Encryption at Rest:** Model artifacts in the registry and object storage are encrypted with customer-managed keys (CMK), ensuring that not even the cloud provider can read the raw files.
*   **Trusted Execution Environments (TEEs) / Enclaves:** "Confidential Computing" allows models to run inside a hardware-encrypted enclave (e.g., Intel SGX, AMD SEV, Nvidia Confidential Computing). The model data is decrypted *only* inside the CPU/GPU die itself. This means that even if a hacker has root access to the server—or if the cloud provider itself is malicious—they cannot peek at the model weights or the user data in memory. This level of security is increasingly standard for healthcare and finance applications.

## Supply Chain Security

Modern AI models are built on a complex stack of open-source libraries (PyTorch, TensorFlow, Hugging Face transformers).

*   **Model Signing:** Like code signing, model artifacts should be cryptographically signed by the training pipeline. The inference server verifies this digital signature before loading the weights. This prevents "Model Poisoning" attacks, where an attacker swaps a good model for a backdoored one in the storage system.
*   **SBOM (Software Bill of Materials) for AI:** A comprehensive manifesto of every library, dataset, and pre-trained weight used to build the system. Automated scanners check this SBOM against vulnerability databases (CVEs) to ensure the system isn't running on compromised dependencies.

Security in AI is about locking the front door (the API) and the vault (the Weights) while ensuring the supply chain isn't poisoning the water.