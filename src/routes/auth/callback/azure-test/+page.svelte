<script lang="ts">
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';

  import type { AuthService } from '$lib/services';

  const auth = getContext<AuthService>('authService');
  const { isLoading } = auth;
</script>

<div
  class="flex h-full min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center px-4 pb-16"
  in:fade
>
  <div class="space-y-5">
    {#if $isLoading}
      <h1 class="h1">Loading...</h1>
    {/if}
  </div>
</div>
