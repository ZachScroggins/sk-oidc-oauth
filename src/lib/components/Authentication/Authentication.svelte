<script lang="ts">
  import { onDestroy, onMount, setContext, SvelteComponent } from 'svelte';

  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';

  import { AuthService } from '$lib/services';
  import type { UserManagerSettings } from '$lib/types';

  import Loading from '../Loading/Loading.svelte';

  export let userManagerSettings: UserManagerSettings;

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

  const authService = new AuthService(userManagerSettings);
  setContext('authService', authService);

  const { isAuthenticated, authError, isLoading, accessToken, idToken, userInfo } = AuthService;

  let params: URLSearchParams;

  if (browser) {
    params = new URLSearchParams(window.location.search);

    const handleOnMount = async () => {
      // Use 'error' and 'code' to test if the component is being executed as a part of a login callback. If we're not
      // running in a login callback, and the user isn't logged in, see if we can capture their existing session.
      if (!params.has('error') && !params.has('code') && !$isAuthenticated) {
        try {
          const user = await AuthService.getUser();

          if (user) {
            await AuthService.silentSignin();

            isAuthenticated.set(true);
            accessToken.set(user.access_token);
            idToken.set(user?.id_token ?? '');
            userInfo.set({ ...user });
          }
        } catch (err: any) {
          isAuthenticated.set(false);
          accessToken.set('');
          idToken.set('');
          userInfo.set({});
          authError.set(err?.message ?? 'An unknown error occurred.');
        }
      }

      // Check if something went wrong during login redirect
      // and extract the error message
      if (params.has('error')) {
        authError.set(params.get('error_description'));
      }

      // if code then login success
      if (params.has('code')) {
        // handle the callback
        const response = await AuthService.endSigninRedirect();
        let state: Record<string, any> = response?.state ?? { pathname: window.location.pathname };
        // Can be smart here and redirect to original path instead of root
        const url = state.pathname;
        state = { ...state, isRedirectCallback: true };

        // redirect to the last page we were on when login was configured if it was passed.
        goto(url, { replaceState: true, state });

        // clear errors on login.
        authError.set(null);
      }

      // if code was not set and there was a state, then we're in an auth callback and there was an error. We still
      // need to wrap the sign-in silent. We need to sit down and chart out the various success and fail scenarios and
      // what the uris loook like. I fear this may be problematic in other auth flows in the future.
      else if (params.has('state')) {
        const response = await AuthService.endSigninRedirect();
        console.log('oidc.signinCallback::response', response);
      }

      isLoading.set(false);
    };

    onMount(handleOnMount);
    onDestroy(() => {});
  }
</script>

<!-- 
@component
Authentication provider. This component is meant to be used as a wrapper around the application.

@example
```svelte
<Authentication userManagerSettings={...settings}>
  <slot />
</Authentication>
```
 -->

{#if $isLoading && params?.has('code') && loadingComponent}
  <svelte:component this={loadingComponent} />
{:else if $isLoading && params?.has('code')}
  <Loading />
{:else}
  <slot />
{/if}
