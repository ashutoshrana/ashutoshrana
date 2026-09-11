# Reliability and adoption validation

Review branches dated 2026-09-11 implement stricter retrieval boundaries,
acknowledged audit delivery, durable database effects, and a combined synthetic
workflow. Pull requests below are the source of truth for merge and CI status.
These changes do not imply new published package versions.

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

See the [demo setup and limits](https://github.com/ashutoshrana/integration-automation-patterns/blob/codex/reliability-and-adoption-20260911/docs/GOVERNED_SERVICE_DEMO.md)
and its [dedicated CI job](https://github.com/ashutoshrana/integration-automation-patterns/actions/workflows/governed-service-demo.yml).
The CI workflow pins sibling source revisions and OpenTelemetry SDK 1.44.0.

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
- No external adopter results, upstream acceptance, PyPI publication, or
  production rollout is claimed. Add such evidence only when it actually exists.

Expansion should follow a concrete integration need, a supported-version test,
and measured behavior. More framework names or jurisdiction examples alone do
not establish enforcement or adoption.
