import type { UserManagerSettings as sourceUserManagerSettings } from 'oidc-client-ts';

/**
 * Settings used to configure the {@link https://authts.github.io/oidc-client-ts/classes/UserManager.html | User Manager}.
 *
 * **Required**: `authority`, `client_id`, `redirect_uri`
 *
 * @see {@link https://authts.github.io/oidc-client-ts/interfaces/UserManagerSettings.html | User Manager Settings}
 *
 * @example
 * ```ts
 * const settings: UserManagerSettings = {
 *   authority: `https://login.microsoftonline.com/${PUBLIC_AZURE_TENANT_ID}/v2.0`,
 *   client_id: PUBLIC_AZURE_CLIENT_ID,
 *   redirect_uri: 'http://localhost:5173/auth/callback/azure',
 * };
 * ```
 */
export interface UserManagerSettings extends sourceUserManagerSettings {}
