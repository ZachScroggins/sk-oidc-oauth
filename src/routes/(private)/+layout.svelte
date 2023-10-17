<script lang="ts">
  import { AuthorizationGuard } from '$lib/components';
  import { AuthService } from '$lib/services';

  const { isAuthenticated, isLoading } = AuthService;
</script>

<AuthorizationGuard passCondition={$isAuthenticated && !$isLoading} redirect="/auth/login">
  <slot />
</AuthorizationGuard>
