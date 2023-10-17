import { type Writable, writable } from 'svelte/store';
import { type ILogger, Log, Logger, UserManager } from 'oidc-client-ts';

import type { UserManagerSettings } from '$lib/types';

export class AuthService {
  static mgr: UserManager;
  private static _isLoading = writable(true);
  private static _isAuthenticated = writable(false);
  private static _accessToken = writable('');
  private static _idToken = writable('');
  private static _userInfo: Writable<Record<string, any>> = writable({});
  private static _authError: Writable<string | null> = writable(null);

  constructor(
    settings: UserManagerSettings,
    userManager = UserManager,
    logger: ILogger = console,
    logLevel: Log = Log.ERROR, // ERROR default
  ) {
    Log.setLogger(logger);
    Log.setLevel(logLevel);

    AuthService.mgr = userManager ? new userManager(settings) : new UserManager(settings);

    AuthService.mgr.events.addAccessTokenExpiring(() => {
      Logger.info('AuthService', 'token expiring');

      AuthService.mgr
        .signinSilent()
        .then(function (user) {
          Logger.info('AuthService', 'silent renew success', user);
        })
        .catch(function (e) {
          Logger.error('AuthService', 'silent renew error', e.message);
        });
    });

    AuthService.mgr.events.addAccessTokenExpired(() => {
      Logger.info('AuthService', 'token expired');
    });

    AuthService.mgr.events.addSilentRenewError((e) => {
      Logger.error('AuthService', 'silent renew error', e.message);
    });

    AuthService.mgr.events.addUserLoaded((user) => {
      AuthService.isAuthenticated.set(true);
      AuthService.accessToken.set(user.access_token);
      AuthService.idToken.set(user?.id_token ?? '');
      AuthService.userInfo.set(user.profile);

      Logger.info('AuthService', 'user loaded', user);
    });

    AuthService.mgr.events.addUserUnloaded(() => {
      AuthService.isAuthenticated.set(false);
      AuthService.accessToken.set('');
      AuthService.idToken.set('');
      AuthService.userInfo.set({});

      Logger.info('AuthService', 'user unloaded');
    });

    AuthService.mgr.events.addUserSignedIn(() => {
      Logger.info('AuthService', 'user logged in to the token server');
    });

    AuthService.mgr.events.addUserSignedOut(() => {
      Logger.info('AuthService', 'user logged out of the token server');
    });
  }

  public static get isLoading() {
    return AuthService._isLoading;
  }

  public static get isAuthenticated() {
    return AuthService._isAuthenticated;
  }

  public static get accessToken() {
    return AuthService._accessToken;
  }

  public static get idToken() {
    return AuthService._idToken;
  }

  public static get userInfo() {
    return AuthService._userInfo;
  }

  public static get authError() {
    return AuthService._authError;
  }

  public static async clearLocalStaleState() {
    try {
      await AuthService.mgr.clearStaleState();
      Logger.info('AuthService', 'clearState success');
    } catch (err: any) {
      Logger.error('AuthService', 'clearState error', err?.message);
    }
  }

  public static async getUser() {
    try {
      const user = await AuthService.mgr.getUser();
      Logger.info('AuthService', 'got user', user);
      return user;
    } catch (err: any) {
      Logger.error('AuthService', 'getUser error', err?.message);
      return null;
    }
  }

  public static async removeLocalUser() {
    try {
      await AuthService.mgr.removeUser();
      Logger.info('AuthService', 'user removed');
    } catch (err: any) {
      Logger.error('AuthService', 'removeUser error', err?.message);
    }
  }

  public static async querySessionStatus() {
    try {
      const status = await AuthService.mgr.querySessionStatus();
      Logger.info('AuthService', "user's session status", status);
    } catch (err: any) {
      Logger.error('AuthService', 'querySessionStatus error', err?.message);
    }
  }

  public static async revokeAccessToken() {
    try {
      await AuthService.mgr.revokeTokens();
      Logger.info('AuthService', 'access token revoked');
    } catch (err: any) {
      Logger.info('AuthService', 'revokeAccessToken error', err.message);
    }
  }

  public static async startSigninRedirect(redirectTo?: string) {
    try {
      await AuthService.mgr.signinRedirect({
        state: {
          pathname: redirectTo ?? window.location.pathname,
          search: window.location.search,
        },
      });
      Logger.info('AuthService', 'signinRedirect done');
    } catch (err: any) {
      Logger.error('AuthService', 'startSigninMainWindow error', err?.message);
    }
  }

  public static async endSigninRedirect() {
    try {
      const user = await AuthService.mgr.signinCallback();
      // custom state after the login in user.state
      Logger.info('AuthService', "here's our post-login custom state", user);
      return user;
    } catch (err: any) {
      Logger.error('AuthService', 'endSigninMainWindow error', err?.message);
    }
  }

  public static async popupSignin() {
    try {
      const user = await AuthService.mgr.signinPopup();
      Logger.info('AuthService', 'signed in', user);
    } catch (err: any) {
      Logger.error('AuthService', 'popupSignin error', err?.message);
    }
  }

  public static async popupSignout() {
    try {
      await AuthService.mgr.signoutPopup();
      Logger.info('AuthService', 'signed out');
    } catch (err: any) {
      Logger.error('AuthService', 'popupSignout error', err?.message);
    }
  }

  public static async silentSignin() {
    try {
      const user = await AuthService.mgr.signinSilent();
      Logger.info('AuthService', 'signed in silent', user);
    } catch (err: any) {
      Logger.error('AuthService', 'iframeSignin error', err?.message);
    }
  }

  public static async startSignoutRedirect() {
    try {
      const resp = await AuthService.mgr.signoutRedirect({
        state: {
          pathname: window.location.pathname,
          search: window.location.search,
        },
      });
      Logger.info('AuthService', 'signed out', resp);
    } catch (err: any) {
      Logger.error('AuthService', 'startSignoutMainWindow error', err?.message);
    }
  }

  public static async endSignoutRedirect() {
    try {
      const resp = await AuthService.mgr.signoutCallback();
      Logger.info('AuthService', 'signed out', resp);
    } catch (err: any) {
      Logger.error('AuthService', 'endSignoutMainWindow error', err?.message);
    }
  }
}
