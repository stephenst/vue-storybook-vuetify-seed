# Vue-Storybook-Vuetify-seed [![Build Status](https://travis-ci.org/stephenst/vue-storybook-vuetify-seed.svg?branch=master)](https://travis-ci.org/stephenst/vue-storybook-vuetify-seed) [![Coverage Status](https://coveralls.io/repos/github/stephenst/vue-storybook-vuetify-seed/badge.svg?branch=3-add-unit-tests)](https://coveralls.io/github/stephenst/vue-storybook-vuetify-seed?branch=3-add-unit-tests)

This is a Storybook setup using Vue, Vuetify 2, and Storybook all together.  It was a giant pain to get running; so sharing this seed to modify and base off of.

## Project setup

```bash
npm install -g @vue/cli
npm install -g prettier
npm install
```

## Docker and Docker-Compose

To run the vue-components application locally using docker, download the repo.

`docker-compose up` in a terminal.

Open a browser:

- <http://localhost:8000> Vue UI Admin site
- <http://localhost:6006> Storybook site (primary for now)
- <http://localhost:6060> Styleguide site

### Vue UI

First you'll need to import the local docker ui directory.
Then you'll have access to the tasks within vue ui.
The tasks option (last on on the left bar, 5th down) is where you'll find most of what you're looking for.

## Local Development

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Unit Tests

```bash
npm run test:unit
```

Unit tests are in the /tests/unit folder.  They all end with `*.spec.js`.  They are written in [Jest](https://jestjs.io/).

#### Test Coverage

You can find test coverage after running `npm run test:unit` in the `/coverage/` directory.

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
