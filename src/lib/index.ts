import { AuthService } from './services';

export { default as Authentication } from './components/Authentication/Authentication.svelte';
export { default as AuthorizationGuard } from './components/AuthorizationGuard/AuthorizationGuard.svelte';
export * from './types';

export const {
  accessToken,
  authError,
  idToken,
  isAuthenticated,
  isLoading,
  userInfo,
  clearLocalStaleState,
  endSigninRedirect,
  endSignoutRedirect,
  getUser,
  popupSignin,
  popupSignout,
  querySessionStatus,
  removeLocalUser,
  revokeAccessToken,
  silentSignin,
  startSigninRedirect,
  startSignoutRedirect,
} = AuthService;
