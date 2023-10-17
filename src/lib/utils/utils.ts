import type { ToastStore } from '@skeletonlabs/skeleton';
import { mediaQuery } from 'svelte-legos';
import { type ClassNameValue, twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassNameValue[]) => twMerge(...inputs);

/**
 * Checks if the current path matches the path to match.
 * @param currentPath the current path of the app
 * @param pathToMatch the path to match
 * @returns boolean
 */
export const doesPathMatch = (currentPath: string, pathToMatch: string) => {
  return currentPath === pathToMatch;
};

export const getInitials = (name: string | null | undefined) => {
  if (!name) {
    return 'NA';
  }

  const firstInitial = name.charAt(0).toUpperCase();
  const lastInitial = name.charAt(name.lastIndexOf(' ') + 1).toUpperCase();

  return firstInitial + lastInitial;
};

export const isMinWidthSm = () => mediaQuery('(min-width: 640px)');

/**
 * Shows an error toast.
 * @param toastStore - the {@link https://www.skeleton.dev/utilities/toasts#toast-store | skeleton toast store}
 * @param message - the message to show
 */
export const errorToast = (toastStore: ToastStore, message: string) => {
  toastStore.trigger({
    message,
    background: 'variant-ghost-error',
    classes: 'break-words',
    hoverable: true,
    timeout: 15000, // 15 seconds
  });
};

export const doubleThem = (a: number, b: number) => a * b;
