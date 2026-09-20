# Recorded synthetic validation — 2026-09-20

These are maintainer-run results, not independent adoption or production trials.
Retrieval files record source hashes, SDK versions, synthetic corpus sizes and
both protection and utility controls. Each protected fixture has two expected
records; perfect fixture recall does not establish general retrieval quality.
Timing runs use different SDK versions and corpus sizes and are not a controlled
performance comparison.

The integration result records actual process crashes, local HTTP lost responses,
SQLite contention, direct-SQL/helper load and memory measurements. External
exactly-once delivery is not claimed. Its source hash identifies the harness;
later documentation/pin changes do not change that measured code.

The local-candidate record covers rebuilt ferpa0.3.2, voice0.4.0 and confidence0.4.0
wheels, 60 focused installed-package tests and dependency consistency. These three
versions are not published on PyPI. Companion integration0.44.1 was used for this
candidate test. Release-verification files are separate checks of actual PyPI
artifacts and their signed source identities.

See [current release status](../../RELIABILITY_VALIDATION.md) and
[reproduction instructions](../../EVALUATION_GUIDE.md).
