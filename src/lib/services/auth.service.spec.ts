// import { type ILogger, Log, Logger, UserManager } from 'oidc-client-ts';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  const mockWindow: any = {
    location: {
      pathname: '/test',
      search: '?foo=bar',
    },
  };

  const mockMgrSettings = {} as any;
  const mockSigninRedirect = vi.fn<any[]>(() => console.log('foobar'));

  class UserManagerMock {
    events = {
      addUserSignedIn: vi.fn(),
      addUserSignedOut: vi.fn(),
      addUserLoaded: vi.fn(),
      addUserUnloaded: vi.fn(),
      addAccessTokenExpiring: vi.fn(),
      addAccessTokenExpired: vi.fn(),
      addSilentRenewError: vi.fn(),
    };

    signinRedirect(args: any) {
      mockSigninRedirect(args);
    }
  }

  beforeAll(() => {
    new AuthService(mockMgrSettings, UserManagerMock as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('startSigninRedirect', () => {
    it('calls signinRedirect with the correct state', async () => {
      const windowSpy = vi.spyOn(global, 'window', 'get').mockReturnValue(mockWindow);

      await AuthService.startSigninRedirect('/redirect');

      expect(mockSigninRedirect).toHaveBeenCalledWith({
        state: {
          pathname: '/redirect',
          search: '?foo=bar',
        },
      });

      windowSpy.mockRestore();
    });

    it('calls signinRedirect with the current pathname if redirectTo is not provided', async () => {
      const windowSpy = vi.spyOn(global, 'window', 'get').mockReturnValue(mockWindow);

      await AuthService.startSigninRedirect();

      expect(mockSigninRedirect).toHaveBeenCalledWith({
        state: {
          pathname: '/test',
          search: '?foo=bar',
        },
      });

      windowSpy.mockRestore();
    });

    it('logs an error if signinRedirect throws an error', async () => {
      const errorSpy = vi.spyOn(console, 'error');

      mockSigninRedirect.mockImplementationOnce(() => {
        throw new Error('test error');
      });

      await AuthService.startSigninRedirect();

      expect(errorSpy).toHaveBeenCalledWith(
        '[AuthService]',
        'startSigninMainWindow error',
        'test error',
      );
      expect(mockSigninRedirect).toHaveBeenCalledTimes(1);

      errorSpy.mockRestore();
    });
  });
});
