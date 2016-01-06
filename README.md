# Travel App

> A web app that enables individuals and groups to organize travel itineraries.

## Team

  - __Product Owner__: Brian Nguyen
  - __Development Team Members__: Brian Nguyen, Max Gaffney, Ryan Price, Zachary Smith

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Running With TRIPEXPERT_KEY](#running-with-tripexpert_key)
    1. [Issues](#issues)
    1. [Test Coverage](#test-coverage)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.12.7
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Running With TRIPEXPERT_KEY

This app requires a TripExpert api_key, which is accessed in the code thus: `process.env.TRIPEXPERT_KEY`. To set this env var in a bash shell, start your commaned with `TRIPEXPERT_KEY=secrethash123`. Eg: `TRIPEXPERT_KEY=secrethash123 npm run dev`.

### Issues

View the project GitHub issues [here](https://waffle.io/HRR10-Ryans-to-the-Max/travel-app)

### Test Coverage

Run test coverage thus:

```sh
npm run coverage
```

This generates 3 reports in a `coverage/` dir at the project dir level. Note that Karma does not automatically close, so you will need to manually exit out of the script. The script is complete when you see a "Coverage Summary" in your shell terminal.

To open up the reports in Chrome, run:

```sh
npm run coverageView
```

The coverage report for the client tests on Chrome will be at `coverage/Chrome.../index.html`.

The coverage report for the client tests on Firefox will be at `coverage/Firefox.../index.html`.

The coverage report for the server tests will be at `coverage/lcov-report/index.html`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
