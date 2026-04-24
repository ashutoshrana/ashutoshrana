[![LinkedIn](https://img.shields.io/badge/LinkedIn-ashutoshrana-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/ashutoshr)
[![Medium](https://img.shields.io/badge/Medium-@rana.ashutosh-black?style=flat&logo=medium)](https://medium.com/@rana.ashutosh)
[![Google Scholar](https://img.shields.io/badge/Google%20Scholar-citations-4285F4?style=flat&logo=google-scholar)](https://scholar.google.co.in/citations?user=51PebpQAAAAJ)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0007--5838--1204-A6CE39?style=flat&logo=orcid)](https://orcid.org/0009-0007-5838-1204)

[![PyPI enterprise-rag-patterns](https://img.shields.io/pypi/v/enterprise-rag-patterns?label=enterprise-rag-patterns&color=blue)](https://pypi.org/project/enterprise-rag-patterns/)
[![PyPI regulated-ai-governance](https://img.shields.io/pypi/v/regulated-ai-governance?label=regulated-ai-governance&color=blue)](https://pypi.org/project/regulated-ai-governance/)
[![PyPI integration-automation-patterns](https://img.shields.io/pypi/v/integration-automation-patterns?label=integration-automation-patterns&color=blue)](https://pypi.org/project/integration-automation-patterns/)
[![PyPI haystack-ferpa-filter](https://img.shields.io/pypi/v/haystack-ferpa-filter?label=haystack-ferpa-filter&color=blue)](https://pypi.org/project/haystack-ferpa-filter/)

---

Enterprise architect building production AI systems, cloud integration, and enterprise workflow automation for regulated operating environments.

My background is in the infrastructure layer where AI, CRM, ERP, and workflow systems converge. The hard problems are not at the demo level — they are in the operational seams: compliance-aware knowledge retrieval, cross-channel context continuity, bi-directional system-of-record synchronisation, and governed AI handoffs.

## Current focus

- Compliance-aware RAG architecture for regulated enterprise environments (FERPA, HIPAA, GDPR, GLBA)
- Governed agentic AI workflows covering OWASP Agentic AI Top 10 2026 and EU AI Act
- Enterprise integration patterns across CRM and ERP platforms
- Multi-agent orchestration across multi-cloud and hybrid environments

## Open-source libraries

**6,658 combined PyPI downloads/week across all packages (April 2026)**

### [enterprise-rag-patterns](https://github.com/ashutoshrana/enterprise-rag-patterns) · ![PyPI](https://img.shields.io/pypi/v/enterprise-rag-patterns?color=blue) ![CI](https://github.com/ashutoshrana/enterprise-rag-patterns/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/ashutoshrana/enterprise-rag-patterns/graph/badge.svg)](https://codecov.io/gh/ashutoshrana/enterprise-rag-patterns)

Reference patterns for FERPA/HIPAA/GDPR-compliant retrieval-augmented workflows, context continuity, and governed AI integration. Pre-retrieval enforcement — access control before documents enter the LLM context window. Covers 65+ regulations across 25 jurisdictions. Works with LangChain, LlamaIndex, Haystack, CrewAI, AutoGen, Semantic Kernel, Google ADK.

```bash
pip install enterprise-rag-patterns
```

### [regulated-ai-governance](https://github.com/ashutoshrana/regulated-ai-governance) · ![PyPI](https://img.shields.io/pypi/v/regulated-ai-governance?color=blue) ![CI](https://github.com/ashutoshrana/regulated-ai-governance/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/ashutoshrana/regulated-ai-governance/graph/badge.svg)](https://codecov.io/gh/ashutoshrana/regulated-ai-governance)

Pre-execution governance layer for AI agents operating under FERPA, HIPAA, GDPR, CCPA, GLBA, EU AI Act, OWASP Agentic AI Top 10 2026, and 25 jurisdictions. Drop-in adapters for 10 major AI frameworks. Every decision produces a structured audit record with a regulation citation.

```bash
pip install regulated-ai-governance
```

### [integration-automation-patterns](https://github.com/ashutoshrana/integration-automation-patterns) · ![PyPI](https://img.shields.io/pypi/v/integration-automation-patterns?color=blue) ![CI](https://github.com/ashutoshrana/integration-automation-patterns/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/ashutoshrana/integration-automation-patterns/graph/badge.svg)](https://codecov.io/gh/ashutoshrana/integration-automation-patterns)

Reliable enterprise integration patterns: event-driven workflows, system-of-record synchronisation, circuit breaker, saga orchestration, transactional outbox, CDC, and Kafka envelope handling.

```bash
pip install integration-automation-patterns
```

### [haystack-ferpa-filter](https://github.com/ashutoshrana/haystack-ferpa-filter) · ![PyPI](https://img.shields.io/pypi/v/haystack-ferpa-filter?color=blue) ![CI](https://github.com/ashutoshrana/haystack-ferpa-filter/actions/workflows/ci.yml/badge.svg)

FERPA-compliant pre-retrieval metadata filter for Haystack RAG pipelines. Enforces 34 CFR § 99 access control before documents are retrieved — satisfies FERPA § 99.32 disclosure record-keeping requirements.

```bash
pip install haystack-ferpa-filter
```

## Published writing

- [Every Enterprise AI Framework Has a Compliance Gap — Here's the Architecture That Closes It](https://dev.to/ashutoshrana/every-enterprise-ai-framework-has-a-compliance-gap-heres-the-architecture-that-closes-it-20np) *(dev.to, April 2026)*
- [FERPA Compliance in RAG Pipelines: Five Rules Your Enterprise System Probably Breaks](https://dev.to/ashutoshrana/ferpa-compliance-in-rag-pipelines-five-rules-your-enterprise-system-probably-breaks-5762) *(dev.to, April 2026)*
- [Implementation Note 02 — FERPA-Compliant RAG: Identity-Scoped Retrieval in Production](https://github.com/ashutoshrana/enterprise-rag-patterns/blob/main/docs/implementation-note-02.md)
- [Implementation Note 03 — Context Assembly for Multi-Source Enterprise RAG](https://github.com/ashutoshrana/enterprise-rag-patterns/blob/main/docs/implementation-note-03.md)

## Published book

**[Silos to Synergy: Practical Strategies for Enterprise AI Integration](https://www.amazon.com/dp/B0GX11TVWP)** — Covers compliance-aware AI deployment, multi-system orchestration, and enterprise integration patterns for regulated environments.

## Live demos

- [FERPA RAG Compliance Demo](https://huggingface.co/spaces/ashuenterprise/enterprise-context-demo) — live filtering demonstration on HuggingFace Spaces

## Technical background

- Production RAG deployment with compliance-aware knowledge retrieval across regulated environments
- Enterprise CRM and ERP integration across multiple platforms and generations
- Multi-cloud architecture: AWS, GCP, Azure, OCI
- AI/ML: LLM orchestration, multi-agent systems, agentic workflow governance
- Cloud-native integration design for regulated and operationally sensitive environments

---

*Production AI systems that stay inside policy boundaries. Enterprise integration that survives operational complexity. Patterns that are platform-agnostic and adoptable across vendor stacks, cloud environments, and regulatory contexts.*
