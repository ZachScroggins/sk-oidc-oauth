<script lang="ts">
  import { fade } from 'svelte/transition';

  import { AuthService } from '$lib/services';

  export let title: string;

  const { accessToken, authError, idToken, isAuthenticated, isLoading, userInfo } = AuthService;

  $: user = JSON.stringify($userInfo, null, 2) ?? '';
</script>

<div
  class="flex h-full min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center px-4 pb-16"
  in:fade
>
  <div class="space-y-5">
    <h1 class="h1">{title}</h1>
    <p>
      Start by exploring:
      <button
        class="variant-filled-tertiary btn"
        type="button"
        on:click|preventDefault={AuthService.startSigninRedirect}>Sign in</button
      >
      <button
        class="variant-filled-secondary btn"
        type="button"
        on:click|preventDefault={AuthService.startSignoutRedirect}>Sign out</button
      >
    </p>
    <div class="divide table-container grid max-w-2xl grid-cols-3 grid-rows-4 gap-2 rounded">
      <button class="btn btn-sm" type="button" on:click={AuthService.clearLocalStaleState}
        >clear stale state</button
      >
      <button class="btn btn-sm" type="button" on:click={AuthService.getUser}>get user</button>
      <button class="btn btn-sm" type="button" on:click={AuthService.removeLocalUser}
        >remove user</button
      >
      <button class="btn btn-sm" type="button" on:click={AuthService.querySessionStatus}
        >query user status at token server</button
      >
      <button class="btn btn-sm" type="button" on:click={AuthService.revokeAccessToken}
        >revoke access token</button
      >
      <button class="btn btn-sm" type="button" on:click={AuthService.startSigninRedirect}
        >start signin main window</button
      >
      <button class="btn btn-sm" type="button" on:click={AuthService.endSigninRedirect}
        >end signin main window</button
      >
      <button class="btn btn-sm" type="button" on:click={AuthService.silentSignin}
        >signin silent/renew access token</button
      >
      <button class="btn btn-sm" type="button" on:click={AuthService.startSignoutRedirect}
        >start signout main window</button
      >
      <button class="btn btn-sm" type="button" on:click={AuthService.endSignoutRedirect}
        >end signout main window</button
      >
      <button class="btn btn-sm" type="button" on:click={AuthService.popupSignin}
        >signin with popup</button
      >
      <button class="btn btn-sm" type="button" on:click={AuthService.popupSignout}
        >signout with popup</button
      >
    </div>
    <div class="table-container max-w-2xl">
      <table class="table">
        <thead>
          <tr><th style="width: 20%;">store</th><th style="width: 80%;">value</th></tr>
        </thead>
        <tbody>
          <tr><td>isLoading</td><td>{$isLoading}</td></tr>
          <tr><td>isAuthenticated</td><td class="!whitespace-normal">{$isAuthenticated}</td></tr>
          <tr><td>accessToken</td><td class="!whitespace-normal break-all">{$accessToken}</td></tr>
          <tr><td>idToken</td><td class="!whitespace-normal break-all">{$idToken}</td></tr>
          <tr>
            <td>userInfo</td>
            <td>
              <pre class="pre">
                <code>{user}</code>
              </pre>
            </td>
          </tr>
          <tr><td>authError</td><td class="!whitespace-normal break-all">{$authError}</td></tr>
        </tbody>
      </table>
    </div>
    <ul>
      <li><code class="code">/src/routes/+layout.svelte</code> - barebones layout</li>
      <li><code class="code">/src/app.postcss</code> - app wide css</li>
      <li>
        <code class="code">/src/routes/+page.svelte</code> - this page, you can replace the contents
      </li>
    </ul>
    <div class="h-40 bg-surface-900"></div>
    <div class="h-40 bg-surface-50"></div>
  </div>
</div>
