# PR Title Linter (GitHub Action)

This GitHub action will use your repository-specific commitlint config to lint the Pull Request titles in your repository.
By default it will look for a `commitlint.config.js` in your repository root to use. You can specify a different path using the inputs, see below.

**⚠ If your config extends existing commitlint presets you need to install them manually!**

## How to use in a workflow

```yml
name: PR checks

on:
  pull_request:
    types: [opened, reopened, edited, synchronize]
    branches: [main]

jobs:
  title-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: manually install any commitlint presets that we extend from
        run: npm install --no-save @commitlint/config-conventional

      - uses: dreampulse/action-lint-pull-request-title
```

## Inputs

- `commitlintConfigFile`: Use this to specify the path to your commitlint config (default: `commitlint.config.js`)
- `helpUrl`: Use this to specify a custom url that will guide users to your specific commit rules (default: `https://www.conventionalcommits.org`)

```yml
- uses: dreampulse/action-lint-pull-request-title
  with:
    commitlintConfigFile: commitlint.config.js
    helpUrl: "https://example.com/commit-guidelines"
```
