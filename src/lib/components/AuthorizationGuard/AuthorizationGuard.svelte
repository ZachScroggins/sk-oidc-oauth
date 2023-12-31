<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';

  import { AuthService } from '$lib/services';

  import Loading from '../Loading/Loading.svelte';

  /** Condition to pass the authorization check. */
  export let passCondition: boolean;
  /**
   * Redirect to this path if the user is not authorized.
   *
   * @default '/'
   */
  export let redirect = '/';
  /**
   * Component to render while loading/authenticating.
   *
   * @example
   * ```svelte
   * <div
   *   class="flex h-full min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center px-4 pb-16"
   * >
   *   <h1 class="mt-5 text-3xl md:text-5xl">Authenticating...</h1>
   * </div>
   * ```
   */
  export let loadingComponent: typeof SvelteComponent<any, any, any> | null = null;

  const { isLoading } = AuthService;
</script>

<!-- 
@component
Authorization wrapper.

@example
```svelte
<Authorization passCondition={$isAuthenticated && !$isLoading} redirect="/auth/login">
  <slot />
</Authorization>
```
 -->

{#if $isLoading && loadingComponent}
  <svelte:component this={loadingComponent} />
{:else if $isLoading}
  <Loading />
{:else if !passCondition && browser}
  <div style="visibility: hidden;">
    {goto(redirect, { replaceState: true })}
  </div>
{:else}
  <slot />
{/if}
