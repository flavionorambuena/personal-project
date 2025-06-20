This repository contains a minimal Angular application located in `shop-app`.

## Continuous Integration

GitHub Actions automatically install dependencies and build the project on every
 push or pull request to `main`. The workflow also runs a SonarQube scan if the
 required secrets are available. Configure `SONAR_TOKEN` and
 `SONAR_HOST_URL` secrets in your repository to enable code analysis. When these
 secrets are not set, the scan step is skipped so the rest of the CI workflow
 can complete successfully.

## GitHub Pages Deployment

The project is automatically deployed to GitHub Pages from the `main` branch.
After each successful build, the production files are published to the
`gh-pages` branch inside a `/personal-project/` folder. Visiting
`https://<username>.github.io/` will redirect to
`https://<username>.github.io/personal-project/` once GitHub Pages is enabled in
the repository settings.

# personal-project
