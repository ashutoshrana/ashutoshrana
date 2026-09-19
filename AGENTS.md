# Common Failure Patterns

| Symptom | Root cause | Fix |
|---|---|---|
| Portfolio report denies a release that has already shipped | A pre-release validation report was reused after publication | Check current PyPI version metadata, link the verified releases, and distinguish later source changes from released artifacts |
