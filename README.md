# [Social Media Client](https://github.com/Winna95/social-media-client)

[![Automated Unit Testing](https://github.com/Winna95/social-media-client/actions/workflows/unitTest.yml/badge.svg)](https://github.com/Winna95/social-media-client/actions/workflows/unitTest.yml)

[![Automated E2E Testing](https://github.com/Winna95/social-media-client/actions/workflows/e2e.yml/badge.svg)](https://github.com/Winna95/social-media-client/actions/workflows/e2e.yml)
### Repo and branching 
The default branch for this repo is: master.
The default branch has the following branch protection rules:
- Require a pull request before merging
- The pull request require approvals from one reviewer 
- Require status checks to pass before merging (see testing below for more details)
- Require conversation resolution before merging.

This means that all new features should be created on a separate branch and the pull request should be open if you want to merge changes in to the master branch.

This repo has a workflow named pages.yml which runs on push to master, and builds the project and publishes it to gitHub [pages](https://winna95.github.io/social-media-client/).

### Pre Commit Hooks
This application uses huskey and lint-staged to preform some actions prior to each commit. The actions preformed:
 - prettier: will format any stages HTML, SCSS and js files in /src/js
 - Eslint: will look for issues and try to automatically fix them in all staged js files under /src/js

## Testing 
### Unit Tests 
This application uses jest for unit tests. All unit tests are automatically run on gitHub when creating a pull request. 
To manually start unit tests run the following command `npm run test-unit`.
The jest specs should reside in the same folder as the source code, and should be named as "sourceCodeFile".test.js

### e2e Tests
This application uses Cypress for e2e tests. All e2e tests are automatically run on gutHub when creating a pull request.
To manually start e2e tests in the cli, run the following command `npm run test-e2e-cli`.
To manually start e2e tests in a graphical user interface, run the following command `npm run test-e2e`.
The cypress specs should reside in the following location: /cypress/e2e/

### All tests
To manually starts both the unit tests and e2e tests run the following command `npm run test`.
