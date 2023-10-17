<script lang="ts">
  import '../app.css';

  import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
  import { Drawer, initializeStores, Modal, storePopup, Toast } from '@skeletonlabs/skeleton';

  import { PUBLIC_AZURE_CLIENT_ID, PUBLIC_AZURE_TENANT_ID } from '$env/static/public';

  import { Authentication } from '$lib/components';

  initializeStores();

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Toast />
<Modal />
<Drawer />

<div class="flex h-8 items-center justify-center space-x-6">
  <a class="anchor" href="/">Home</a>
  <a class="anchor" href="/about">About</a>
  <a class="anchor" href="/about/nested">Nested</a>
  <a class="anchor" href="/blog/hello-world">hello-world</a>
</div>
<div class="flex h-8 items-center justify-center space-x-6">
  <a class="anchor" href="/rando">Rando</a>
  <a class="anchor" href="/rando/nested">Rando Nested</a>
  <a class="anchor" href="/blogzz/hello-world">hello-worldzz</a>
</div>

<Authentication
  userManagerSettings={{
    authority: `https://login.microsoftonline.com/${PUBLIC_AZURE_TENANT_ID}/v2.0`,
    client_id: `${PUBLIC_AZURE_CLIENT_ID}`,
    redirect_uri: 'http://localhost:5173/auth/callback/azure-test',
    loadUserInfo: true,
  }}
>
  <slot />
</Authentication>
