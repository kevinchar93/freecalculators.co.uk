import env from '#start/env';

/**
 * Gates the entire app behind HTTP Basic Auth so staging can be reached
 * over the open internet without being publicly indexable. Only the
 * password's bcrypt hash is stored here — never the plaintext. Generate
 * one with `node ace hash:password`. Disabled by default so it can
 * never accidentally end up live for production visitors.
 */
const stagingConfig = {
  basicAuth: {
    enabled: env.get('STAGING_BASIC_AUTH_ENABLED', false),
    user: env.get('STAGING_BASIC_AUTH_USER', ''),
    passwordHash: env.get('STAGING_BASIC_AUTH_PASSWORD_HASH')?.release() ?? '',
  },
};

export type StagingBasicAuthConfig = typeof stagingConfig.basicAuth;

export default stagingConfig;
