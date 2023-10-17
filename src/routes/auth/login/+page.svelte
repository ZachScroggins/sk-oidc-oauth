<script lang="ts">
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';

  import type { AuthService } from '$lib/services';

  const auth = getContext<AuthService>('authService');
</script>

<div
  class="flex h-full min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center px-4 pb-16"
  in:fade
>
  <div class="space-y-5">
    <h1 class="h1">Login</h1>
    <div class="divide table-container grid max-w-2xl grid-cols-3 grid-rows-4 gap-2 rounded">
      <button class="btn btn-sm" type="button" on:click={auth.clearLocalStaleState}
        >clear stale state</button
      >
      <button class="btn btn-sm" type="button" on:click={auth.getUser}>get user</button>
      <button class="btn btn-sm" type="button" on:click={auth.removeLocalUser}>remove user</button>
      <button class="btn btn-sm" type="button" on:click={auth.querySessionStatus}
        >query user status at token server</button
      >
      <button class="btn btn-sm" type="button" on:click={auth.revokeAccessToken}
        >revoke access token</button
      >
      <button class="btn btn-sm" type="button" on:click={auth.startSigninRedirect}
        >start signin main window</button
      >
      <button class="btn btn-sm" type="button" on:click={auth.endSigninRedirect}
        >end signin main window</button
      >
      <button class="btn btn-sm" type="button" on:click={auth.silentSignin}
        >signin silent/renew access token</button
      >
      <button class="btn btn-sm" type="button" on:click={auth.startSignoutRedirect}
        >start signout main window</button
      >
      <button class="btn btn-sm" type="button" on:click={auth.endSignoutRedirect}
        >end signout main window</button
      >
      <button class="btn btn-sm" type="button" on:click={auth.popupSignin}>signin with popup</button
      >
      <button class="btn btn-sm" type="button" on:click={auth.popupSignout}
        >signout with popup</button
      >
    </div>
  </div>
</div>
