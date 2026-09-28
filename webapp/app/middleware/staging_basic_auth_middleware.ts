import { timingSafeEqual } from 'node:crypto';
import type { HttpContext } from '@adonisjs/core/http';
import app from '@adonisjs/core/services/app';
import hash from '@adonisjs/core/services/hash';
import type { NextFn } from '@adonisjs/core/types/http';
import type { StagingBasicAuthConfig } from '#config/staging';

/**
 * Requires HTTP Basic Auth on every request when staging basic auth is
 * enabled, and marks responses as `noindex` so staging never ends up in
 * search results.
 */
export default class StagingBasicAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const config = app.config.get<StagingBasicAuthConfig>('staging.basicAuth');

    if (!config.enabled) {
      return next();
    }

    ctx.response.header('X-Robots-Tag', 'noindex');

    if (!(await this.hasValidCredentials(ctx, config))) {
      ctx.response
        .status(401)
        .header('WWW-Authenticate', 'Basic realm="Staging"')
        .send('Authentication required.');

      return;
    }

    return next();
  }

  private async hasValidCredentials(
    { request }: HttpContext,
    { user: expectedUser, passwordHash }: StagingBasicAuthConfig,
  ): Promise<boolean> {
    if (expectedUser === '' || passwordHash === '') {
      return false;
    }

    const credentials = this.parseCredentials(request.header('authorization'));

    if (!credentials) {
      return false;
    }

    return (
      this.safeEquals(expectedUser, credentials.user) &&
      (await hash.verify(passwordHash, credentials.password))
    );
  }

  private parseCredentials(
    header: string | undefined,
  ): { user: string; password: string } | null {
    const match = header?.match(/^Basic\s+(.+)$/i);

    if (!match) {
      return null;
    }

    const decoded = Buffer.from(match[1], 'base64').toString('utf8');
    const separatorIndex = decoded.indexOf(':');

    if (separatorIndex === -1) {
      return null;
    }

    return {
      user: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  }

  private safeEquals(expected: string, actual: string): boolean {
    const expectedBuffer = Buffer.from(expected);
    const actualBuffer = Buffer.from(actual);

    return (
      expectedBuffer.length === actualBuffer.length &&
      timingSafeEqual(expectedBuffer, actualBuffer)
    );
  }
}
