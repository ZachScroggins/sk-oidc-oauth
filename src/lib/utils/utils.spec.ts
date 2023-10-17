import { afterEach, describe, expect, it, vi } from 'vitest';

import { cn, doesPathMatch, errorToast, getInitials, isMinWidthSm } from './utils';

describe('ui.utils.ts', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('cn', () => {
    it("should return 'foo bar'", () => {
      expect(cn('foo', true && 'bar')).toBe('foo bar');
    });
  });

  describe('doesPathMatch', () => {
    it('should return true', () => {
      expect(doesPathMatch('/', '/')).toBeTruthy();
    });
    it('should return false', () => {
      expect(doesPathMatch('/patient', '/')).toBeFalsy();
    });
  });

  describe('getInitials', () => {
    it("should return 'MS'", () => {
      expect(getInitials('Michael Scott')).toBe('MS');
    });
    it("should return 'NA'", () => {
      expect(getInitials(undefined)).toBe('NA');
    });
  });

  describe('isMinWidthSm', () => {
    it('returns false when the window width is less than 640px', () => {
      isMinWidthSm().subscribe((x) => {
        expect(x.valueOf()).toBe(false);
      });
    });
  });

  describe('errorToast', () => {
    it('calls toastStore.trigger with the message', () => {
      const mockToastStore = {
        trigger: vi.fn(),
      };
      const storeSpy = vi.spyOn(mockToastStore, 'trigger');

      const message = 'test message';
      const expected = {
        message,
        background: 'variant-ghost-error',
        classes: 'break-words',
        hoverable: true,
        timeout: 15000,
      };

      errorToast(mockToastStore as any, message);

      expect(storeSpy).toHaveBeenCalledWith(expected);
    });
  });
});
