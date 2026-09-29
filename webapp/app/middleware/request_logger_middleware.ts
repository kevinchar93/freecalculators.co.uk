import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

/**
 * Paths that are not worth logging, such as the platform health check
 * that is polled every few seconds.
 */
export const pathsExcludedFromRequestLogs = new Set(['/up']);

/**
 * Logs a line as each request comes in. The matching "request completed"
 * line is logged from the `http:request_completed` listener in
 * start/events.ts; both carry the same request_id.
 *
 * Headers, cookies and bodies are deliberately left out, since they can
 * hold credentials (e.g. the basic auth Authorization header).
 */
export default class RequestLoggerMiddleware {
  handle(ctx: HttpContext, next: NextFn) {
    if (!pathsExcludedFromRequestLogs.has(ctx.request.url())) {
      ctx.logger.info(
        {
          method: ctx.request.method(),
          url: ctx.request.url(true),
          ip: ctx.request.ip(),
          userAgent: ctx.request.header('user-agent'),
        },
        'request received',
      );
    }

    return next();
  }
}
