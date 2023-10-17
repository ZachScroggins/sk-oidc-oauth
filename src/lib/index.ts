import { AuthService } from './services';

export * from './components/Auth';
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
