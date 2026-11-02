# Common Failure Patterns

| Symptom | Root cause | Fix |
|---|---|---|
| Portfolio report denies a release that has already shipped | A pre-release validation report was reused after publication | Check current PyPI version metadata, link the verified releases, and distinguish later source changes from released artifacts |

| Public demo evidence includes a local output directory | The runnable demo reports its output location alongside measured results | Remove the output-location field from public evidence, retain substantive results, and validate all exported JSON for local paths |
| A known book appears unverifiable when its retailer page is blocked | Live access failure was conflated with missing bibliographic evidence | Match the exact ASIN and ISBN against a dated public capture, preserve its access limit, and verify the byline role before listing |
