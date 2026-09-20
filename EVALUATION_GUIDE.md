# Reproduce the package boundaries

This guide is for engineers evaluating whether a package is useful in their own
application. The examples use synthetic data. They do not establish production
adoption, compliance certification, calibrated confidence or live-call delivery.
Check [release status](RELIABILITY_VALIDATION.md) before choosing a PyPI version:
some reviewed main-branch changes may still await publication.

## Pick one workflow

Clone the selected repository at the revision you intend to evaluate, create an
isolated Python environment, install its documented test/framework extras, and
record the commit and installed versions. You do not need all five libraries.

| Workflow | Runnable source | What to inspect |
|---|---|---|
| Retrieval authorization | [Enterprise benchmark](https://github.com/ashutoshrana/enterprise-rag-patterns/blob/main/benchmarks/retrieval_boundary.py) | Actual final prompt, denied content, authorized recall, native baseline and bypass control |
| Haystack component | [No-key tutorial](https://github.com/ashutoshrana/haystack-ferpa-filter/blob/main/examples/basic_usage.py) | Authorized and blocked synthetic records through a real retrieval pipeline |
| Proceed or escalate | [Held-out evaluation instructions](https://github.com/ashutoshrana/confidence-escalation/blob/main/benchmarks/README.md) | Validation-only threshold selection, independent groups, accepted errors, coverage and unknown outcomes |
| Voice context handoff | [Handoff contract](https://github.com/ashutoshrana/voice-ai-governance/blob/main/docs/HANDOFF_CONTRACT.md) | Publication versus connection, intended recipient, errors, cancellation and late/duplicate receipts |
| Retry and recovery | [Failure contract](https://github.com/ashutoshrana/integration-automation-patterns/blob/main/docs/FAILURE_CONTRACT.md) | Same-database effects versus remote effects, lost acknowledgments, real process crashes and confirmed lock contention |

Run the small examples first. The retrieval and integration harnesses offer larger
synthetic workloads; record hardware, versions, source hashes and timing scope.
Never compare measurements collected under different load conditions as if they
were controlled performance results.

[Recorded synthetic runs and release checks](validation/2026-09-20/README.md)
include the source hashes, environment details and raw outcomes from this review.

## Evaluation acceptance

For retrieval, both protection and useful authorized results must pass. The
deliberate bypass must expose a canary so that a broken recorder cannot produce a
false success. A deny-all implementation is not a useful result. Tests of local
grant snapshots and reused candidates do not establish external authorization
freshness or production cache behavior.

For escalation, define the outcome label and error/review budget before inspecting
test data. Use independently labeled task groups. Compare the composite with a
simpler signal and a separate risk rule. Unknown labels are not successful tasks;
zero automated tasks cannot establish useful coverage. Synthetic mechanics checks
do not establish predictive improvement.

For voice, a packet submission is not a connected human. The sample receipts are
synthetic and unauthenticated. A live trial needs separately authorized operator-owned
numbers, actual provider receipts, an explicit recipient policy and a tested failure
return. Do not copy the fixture receipt handler into production as an authentication
or durable event system.

For integrations, preserve the distinction between a committed local transaction
and a remote action. If a remote service commits but its response is lost, the
client initially has an unknown outcome. Downstream idempotency or reconciliation
is required; a local outbox cannot make arbitrary HTTP effects exactly once.

## Record an independent reproduction

Keep the report factual. Do not publish private records, tokens, raw conversations,
organization names or quotes without permission.

```text
Repository and exact commit:
Installed version and optional dependencies:
Environment and command:
Expected boundary:
Observed result (including failures):
Native/simple baseline:
Integration changes required:
Time to first successful run:
Reason to retain or reject the dependency:
Upgrade version tested and result:
Unresolved limitations:
Permission to publish any identifying details: yes/no
```

Maintainer-authored examples, internal code review, external reproduction, upstream
review and production use are different evidence categories. Record them separately.
Two independent reproductions, an upgrade trial and an external technical review
are proposed adoption goals; this guide does not claim they have occurred.

## Expansion gates

Add an OpenFGA recipe when a user needs changing relationship permissions. Add a
durable-runtime recipe when a user already runs that runtime. Migrate the MCP major
version only with its executable authentication/schema/replay contract intact.
Add privacy recognizers only after labeled evaluation shows enough benefit for the
latency and maintenance cost. These are conditional work items, not reasons to
invent another policy engine, scheduler, call platform or agent runner.
