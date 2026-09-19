# Reliability and adoption validation

Review branches dated 2026-09-11 implement stricter retrieval boundaries,
acknowledged audit delivery, durable database effects, and a combined synthetic
workflow. Pull requests below are the source of truth for merge and CI status.
The six releases below were published after that review. Their wheel and source
distributions were rechecked on PyPI on 2026-09-19. Later source changes are not
part of those releases unless a new version is explicitly listed.

| Package | Verified published version |
|---|---|
| enterprise-rag-patterns | [0.47.0](https://pypi.org/project/enterprise-rag-patterns/0.47.0/) |
| regulated-ai-governance | [0.45.0](https://pypi.org/project/regulated-ai-governance/0.45.0/) |
| integration-automation-patterns | [0.44.0](https://pypi.org/project/integration-automation-patterns/0.44.0/) |
| ferpa-haystack | [0.3.0](https://pypi.org/project/ferpa-haystack/0.3.0/) |
| voice-ai-governance | [0.3.0](https://pypi.org/project/voice-ai-governance/0.3.0/) |
| confidence-escalation | [0.2.0](https://pypi.org/project/confidence-escalation/0.2.0/) |

## Follow-up review: 2026-09-19

The acceptance criteria for this pass are: reproduce a concrete defect, add a
regression check, pass the repository's existing checks, build affected packages,
and verify GitHub CI on the merged revision. Passing checks cover the tested
behavior; they do not establish that every feature or deployment is error-free.

| Repository | Confirmed gap and source change | Review |
|---|---|---|
| enterprise-rag-patterns | Standalone LlamaIndex postprocessing bypassed shared identity/category policy; sync and async paths now use it, with real query-engine tests | [PR 61](https://github.com/ashutoshrana/enterprise-rag-patterns/pull/61) |
| haystack-ferpa-filter | Malformed identity configuration and cross-institution grants were accepted; configuration is now validated | [PR 14](https://github.com/ashutoshrana/haystack-ferpa-filter/pull/14) |
| integration-automation-patterns | Nested MCP resource URLs produced the wrong route/origin; configured paths now work and malformed URLs fail validation | [PR 53](https://github.com/ashutoshrana/integration-automation-patterns/pull/53) |
| voice-ai-governance | Mutable metadata aliases, terminal-session reopening, and PII in mapping keys required additional boundary checks; sensitive values are classified using the original key before custom label redaction | [PR 18](https://github.com/ashutoshrana/voice-ai-governance/pull/18), independent-review correction [PR 19](https://github.com/ashutoshrana/voice-ai-governance/pull/19) |
| confidence-escalation | Async tools needed an awaited pre-action gate and real OpenAI Agents SDK guardrail coverage | [PR 20](https://github.com/ashutoshrana/confidence-escalation/pull/20) |
| ard-spec | A failed registry startup could lead the demo to probe another process on its fixed port; startup failure now stops the demo | [PR 2](https://github.com/ashutoshrana/ard-spec/pull/2) |
| regulated-ai-governance | No new supported defect found in the bounded authorization/audit review; 2,789 tests and the configured lint/type/build checks passed | Existing source retained |
| ferpa-haystack | Legacy publisher remains disabled; the canonical package is maintained in haystack-ferpa-filter | Existing source retained |
| ltngoutDemo / heroku | Historical mockup and placeholder documentation still match their repository contents; the mockup's JavaScript syntax checks passed | No speculative AI features added |

These follow-up source changes are **not included in the published versions
listed above**. Follow each PR and its checks for the current source status.

### Current ecosystem guidance applied

- [MCP security guidance](https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices)
  requires tokens intended for the receiving server and addresses session,
  origin, and scope boundaries. The integration review tests the configured
  resource boundary; it does not claim complete protocol certification.
- [MCP Python SDK v2 migration guidance](https://py.sdk.modelcontextprotocol.io/v2/migration/#fastmcp-renamed-to-mcpserver)
  documents a breaking server API change. A range-only dependency upgrade failed
  the existing tests, so SDK v1 remains supported until a tested migration exists.
- [OpenTelemetry's GenAI conventions](https://github.com/open-telemetry/semantic-conventions-genai)
  now have a dedicated repository. Existing shared-trace tests remain explicit
  about their schema and payload limits rather than implying full conformance.
- [GitHub artifact attestations](https://docs.github.com/en/actions/concepts/security/artifact-attestations)
  establish build provenance, not application security. Package validation must
  still test artifact contents and installation, in addition to source tests.

## Original implementation evidence

| Repository | Implemented behavior | Validation and review |
|---|---|---|
| regulated-ai-governance | Immutable audit snapshots, mandatory synchronous acknowledgment, correlated outcomes and explicit post-action failure markers | 2,787 local tests; lint/types/build and Python 3.10–3.12 CI. [PR 53](https://github.com/ashutoshrana/regulated-ai-governance/pull/53) |
| voice-ai-governance | Complete handoff redaction, Redis transactions across managers, terminal retry preservation | 130 local tests including real Redis; portable Linux CI fixture. [PR 15](https://github.com/ashutoshrana/voice-ai-governance/pull/15) |
| confidence-escalation | Pre-action guard, finite/range validation, explicit missing evidence and reproducible threshold evaluation | 114 local tests; six-case synthetic benchmark. [PR 17](https://github.com/ashutoshrana/confidence-escalation/pull/17) |
| enterprise-rag-patterns | Strict private metadata, explicit public classification, real framework/store-to-model enforcement | 1,900 local tests, 2 optional skips; real LangChain 0.3.0/1.6.3 and Haystack 2.20.0/3.1.1 checks. [PR 60](https://github.com/ashutoshrana/enterprise-rag-patterns/pull/60) |
| haystack-ferpa-filter | Canonical package links, tenant-safe serialization, metadata enforcement and async parity | 63 local tests including real Haystack. [PR 13](https://github.com/ashutoshrana/haystack-ferpa-filter/pull/13) |
| ferpa-haystack | Legacy source points to canonical repository; conflicting publication disabled | Workflow/metadata validation. Historical source preserved. [PR 1](https://github.com/ashutoshrana/ferpa-haystack/pull/1) |
| integration-automation-patterns | SQLite outbox/deduplicated effects, real MCP authentication and scoped tools, acknowledged audit, combined workflow | Protocol, crash/replay, concurrency, package, lint/type and dedicated demo CI checks. [PR 51](https://github.com/ashutoshrana/integration-automation-patterns/pull/51) |
| ard-spec | Distinct strict/basic/incomplete results, malformed manifest handling | Four subprocess regression tests and a local registry demo. Personal fork, not upstream adoption. [PR 1](https://github.com/ashutoshrana/ard-spec/pull/1) |
| ashutoshrana | Library selection, upstream contribution roles and this validation index | Documentation links checked. [PR 1](https://github.com/ashutoshrana/ashutoshrana/pull/1) |
| ltngoutDemo | Documentation matches the static historical demo; absent deployment steps removed | Repository tree and link checks. [PR 1](https://github.com/ashutoshrana/ltngoutDemo/pull/1) |
| heroku | Historical placeholder status made explicit | Repository tree check. [PR 1](https://github.com/ashutoshrana/heroku/pull/1) |

## Reproduce the combined workflow

See the [demo setup and limits](https://github.com/ashutoshrana/integration-automation-patterns/blob/main/docs/GOVERNED_SERVICE_DEMO.md)
and its [dedicated CI job](https://github.com/ashutoshrana/integration-automation-patterns/actions/workflows/governed-service-demo.yml).
The CI workflow pins sibling source revisions and OpenTelemetry SDK 1.44.0.
The [September 19 pin refresh](https://github.com/ashutoshrana/integration-automation-patterns/pull/54)
updates both the workflow and its documented revision table to the reviewed
main-branch commits. Fresh installation of those revisions passed the combined
regression and dependency checks; the PR records its CI result.

The workflow uses an authorized retrieval fixture, a recording model stand-in,
a persisted synthetic approval, a current-policy recheck, database effects, and
a scrubbed voice handoff. One worker exits after a committed effect but before
the outbox acknowledgment; a new process replays it without a duplicate effect.

Observed in the defined local fixture run:

- Unauthorized disclosures and actions: **0**.
- Duplicate business effects after crash/replay: **0**.
- Handoff fixture redaction failures: **0**.
- Escalation classifications: **4/4** expected fixture outcomes.
- Final business effects: the allowed request and the approved request only.
- Revoked and denied requests: no business effect.
- Local telemetry: **13 spans in one trace**, with no fixture payload content.
- Measured local elapsed time: approximately **0.6 seconds** in one run; this
  is neither a latency SLA nor an estimate of model/network overhead.

## Limits and next evidence

- Model output, reviewer identity and business data are synthetic. The benchmark
  is a reproducible evaluation method, not empirical production calibration.
- SQLite deduplication covers effects committed in the same database transaction.
  It does not provide exactly-once writes to arbitrary external APIs.
- Real local framework/store integrations were tested; hosted vector database
  security and live voice/CRM deployments need deployment-specific validation.
- OpenTelemetry exports are local. Shared traces do not certify compliance with
  every developing GenAI semantic convention.
- Control catalogs require authoritative applicability review. Supplied policy
  booleans are not independently verified evidence or legal conclusions.
- Package publication is verified above. No external adopter results, upstream
  acceptance of these changes, or production rollout is claimed.

Expansion should follow a concrete integration need, a supported-version test,
and measured behavior. More framework names or jurisdiction examples alone do
not establish enforcement or adoption.
