---
id: 02-lesson-13-2-procurement-vendor-risk-and-open-standards
title: "Procurement, Vendor Risk, and Open Standards"
sidebar_label: "Procurement and Vendor Risk"
---

# Procurement, Vendor Risk, and Open Standards

The government procurement process is the primary gatekeeper for AI safety. If the Request for Proposal (RFP) does not ask for safety, the vendor will not provide it. We must modernize procurement to buy not just "software," but "responsible outcomes."

## The "Vendor Lock-In" Trap

Governments are notoriously bad at buying tech, often getting locked into multi-year contracts with vendors who own the data and the model.

*   **Data Sovereignty Clauses:** Contracts must explicitly state that the Government owns the data *and the insights derived from it*. The vendor cannot hold the citizen data hostage to force a contract renewal.
*   **Model Portability:** The RFP should require models to be exportable in standard formats (ONNX, Docker containers) so that if the vendor goes bankrupt, the government can host the model itself or migrate to a new provider.

## Buying Responsible AI

Price cannot be the only factor.

*   **The "Safety Tax":** Safe AI costs more than unsafe AI. It requires auditing, red-teaming, and better data curation. Procurement officers must be trained to understand that the "Cheapest Bidder" is likely skipping these essential safety steps.
*   **Mandatory Disclosures:** Vendors must be required to submit a "Model Card" and a "Third-Party Audit Report" as part of their bid package. No transparency, no contract.

## Open Standards and Interoperability

Government systems must talk to each other.

*   **API-First Design:** AI systems should be exposed via standard APIs, allowing different agencies to conduct valid data exchanges without building custom, brittle bridges.
*   **Data Standards:** Adopting universal schemas (like the National Information Exchange Model - NIEM) ensures that "First Name" means the same thing to the Police Department as it does to the Court System, reducing errors in identity matching.

Procurement is policy. By writing better contracts, governments can force the entire market to raise its safety standards.
