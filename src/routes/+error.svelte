<script lang="ts">
  import { page } from '$app/stores';
  console.log('page', $page);
</script>

<h1>{$page?.status}: {$page?.error?.message}</h1>

<p>custom <code class="code">src/routes/+error.svelte</code></p>
