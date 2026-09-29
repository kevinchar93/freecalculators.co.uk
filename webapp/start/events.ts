/*
|--------------------------------------------------------------------------
| Events file
|--------------------------------------------------------------------------
|
| The events file is used to register listeners for application and
| framework events.
|
*/

import emitter from '@adonisjs/core/services/emitter';
import { pathsExcludedFromRequestLogs } from '#middleware/request_logger_middleware';

/**
 * Converts a `process.hrtime()` [seconds, nanoseconds] tuple into
 * milliseconds, rounded to one decimal place.
 */
function hrTimeToMilliseconds([seconds, nanoseconds]: [
  number,
  number,
]): number {
  return Math.round((seconds * 1e3 + nanoseconds / 1e6) * 10) / 10;
}

/**
 * Logs how each request was resolved. The framework fires this once the
 * response has been sent, so the duration covers the whole request.
 */
emitter.on('http:request_completed', ({ ctx, duration }) => {
  if (pathsExcludedFromRequestLogs.has(ctx.request.url())) {
    return;
  }

  const status = ctx.response.getStatus();
  const level = status >= 500 ? 'error' : 'info';

  ctx.logger[level](
    {
      method: ctx.request.method(),
      url: ctx.request.url(true),
      status,
      durationMs: hrTimeToMilliseconds(duration),
    },
    'request completed',
  );
});
