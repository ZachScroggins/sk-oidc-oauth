# SvelteKit OIDC OAuth Contributing Guide

Created with [create-svelte](https://www.npmjs.com/package/create-svelte).

## PRs

### Generating changelogs

For changes to be reflected in package changelogs, run `npx changeset` and follow the prompts.

## Releases

The [Changesets GitHub action](https://github.com/changesets/action#with-publishing) will create and update a PR that applies changesets and publishes new versions of changed packages to npm.

## Development

Make changes to the package in [`src/lib`](./src/lib/) and the Docs site in [`src/routes`](./src/routes/).

### Build

To build the library:

```bash
npm run package
```

To create a production version of the Docs site:

```bash
npm run build
```

### Test

You can use the documentation site at [`src/routes`](./src/routes/) to experiment with your changes locally.

#### Unit Tests

```bash
npm run test
```

#### Unit Test Coverage

```bash
npm run test:cov
```

#### Unit Test Coverage [with UI](https://vitest.dev/guide/ui.html)

```bash
npm run test:cov:ui
```

### Lint & Format

```bash
npm run lint
```

```bash
npm run format
```
