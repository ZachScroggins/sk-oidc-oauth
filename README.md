![Logo](https://raw.githubusercontent.com/ZachScroggins/sk-oidc-oauth/main/static/sk-oidc-oauth.svg)

# Welcome to SvelteKit OIDC OAuth 👋

[![NPM version](https://badgen.net/npm/v/sk-oidc-oauth)](https://www.npmjs.com/package/sk-oidc-oauth)
[![License: MIT](https://img.shields.io/github/license/ZachScroggins/sk-oidc-oauth)](https://github.com/ZachScroggins/sk-oidc-oauth/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://sk-oidc-oauth.zachscroggins.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/ZachScroggins/sk-oidc-oauth/graphs/commit-activity)
![Code coverage badge - lines](https://gist.githubusercontent.com/ZachScroggins/b8b49faa30e1c89ee7edefe90be9ca6f/raw/lines-badge.svg)
![Minimum SvelteKit version](https://badgen.net/badge/SvelteKit/^1.20.4/ff3e00)
[![Twitter: scroggins_zach](https://img.shields.io/twitter/follow/scroggins_zach.svg?style=social)](https://twitter.com/scroggins_zach)

> ⚠️ Under Construction!

OIDC/OAuth2 authentication and authorization **for prerendered/client-side-rendered** SvelteKit apps.

### 🏠 [Homepage](https://sk-oidc-oauth.zachscroggins.com)

## Installation

```shell
npm i -D sk-oidc-oauth
```

## Usage

For full usage information, see the [docs](https://sk-oidc-oauth.zachscroggins.com).

### Quick Start

1. Register the `Authentication` provider in your root `+layout.svelte`.

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { Authentication, type UserManagerSettings } from 'sk-oidc-oauth';

  const userManagerSettings: UserManagerSettings = {
    authority: 'https://login.microsoftonline.com/tenant-id/v2.0',
    client_id: '1234',
    redirect_uri: 'http://localhost:5173/auth/callback/azure',
    loadUserInfo: true,
  };
</script>

<Authentication {userManagerSettings}>
  <slot />
</Authentication>
```

2. Add a callback route for your `redirect_uri`.

```svelte
<!-- 
  src/routes/auth/callback/azure/+page.svelte

  We just need the route to be defined, so this file can/should be empty.
 -->
```

You're all set! You can use all of the library's components, functions, and stores _anywhere inside the root layout_.

#### Protect Routes

Use the `AuthorizationGuard` in a nested `+layout.svelte` to protect all of the routes within:

```svelte
<!-- src/routes/private/+layout.svelte -->
<script lang="ts">
  import { AuthorizationGuard, isFullyAuthenticated } from 'sk-oidc-oauth';

  $: yourCustomCondition = false;
</script>

<AuthorizationGuard
  passCondition={$isAuthenticated && yourCustomCondition}
  redirect="/auth/signin"
>
  <slot />
</AuthorizationGuard>
```

#### Sign In / Out

```svelte
<!-- src/lib/components/AuthButton/AuthButton.svelte -->
<script lang="ts">
  import {
    isFullyAuthenticated,
    startSigninRedirect,
    startSignoutRedirect,
  } from 'sk-oidc-oauth';
</script>

{#if $isFullyAuthenticated}
  <button type="button" on:click={startSignoutRedirect}>Sign out</button>
{:else}
  <button type="button" on:click={startSigninRedirect}>Sign in</button>
{/if}
```

#### User Info

```svelte
<!-- src/lib/components/User/User.svelte -->
<script lang="ts">
  import { userInfo } from 'sk-oidc-oauth';
</script>

<ul>
  <li>{$userInfo.name}</li>
  <li>Email: {$userInfo.email}</li>
</ul>
```

## 👨‍💻 Author

**Zach Scroggins**

- Website: https://zachscroggins.com
- Twitter: [@scroggins_zach](https://twitter.com/scroggins_zach)
- Github: [@ZachScroggins](https://github.com/ZachScroggins)
- LinkedIn: [@zachscroggins](https://linkedin.com/in/zachscroggins)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ZachScroggins/sk-oidc-oauth/issues). You can also take a look at the [contributing guide](https://github.com/ZachScroggins/sk-oidc-oauth/blob/main/CONTRIBUTING.md).

## ✨ Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Zach Scroggins](https://github.com/ZachScroggins).<br />
This project is [MIT](https://github.com/ZachScroggins/sk-oidc-oauth/blob/main/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
