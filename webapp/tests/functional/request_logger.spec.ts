import { IncomingMessage } from 'node:http';
import { Socket } from 'node:net';
import type { HttpContext } from '@adonisjs/core/http';
import emitter from '@adonisjs/core/services/emitter';
import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';
import RequestLoggerMiddleware from '#middleware/request_logger_middleware';

type LoggedLine = {
  level: 'info' | 'error';
  bindings: Record<string, unknown>;
  message: string;
};

/**
 * Creates an HTTP context for the given url whose logger records the
 * lines written to it instead of printing them.
 */
async function createContext(
  url: string,
): Promise<{ ctx: HttpContext; logged: LoggedLine[] }> {
  const req = new IncomingMessage(new Socket());
  req.method = 'GET';
  req.url = url;
  req.headers['user-agent'] = 'test-agent';

  const ctx = await testUtils.createHttpContext({ req });
  const logged: LoggedLine[] = [];

  for (const level of ['info', 'error'] as const) {
    ctx.logger[level] = ((
      bindings: Record<string, unknown>,
      message: string,
    ) => {
      logged.push({ level, bindings, message });
    }) as (typeof ctx.logger)[typeof level];
  }

  return { ctx, logged };
}

test.group('Request logging: request received', () => {
  test('logs the method, url, ip and user agent', async ({ assert }) => {
    const { ctx, logged } = await createContext('/calculators/mortgage?x=1');

    await new RequestLoggerMiddleware().handle(ctx, async () => { });

    assert.lengthOf(logged, 1);
    assert.equal(logged[0].message, 'request received');
    assert.containSubset(logged[0].bindings, {
      method: 'GET',
      url: '/calculators/mortgage?x=1',
      userAgent: 'test-agent',
    });
    assert.property(logged[0].bindings, 'ip');
  });

  test('logs the client ip forwarded by the proxy', async ({ assert }) => {
    const { ctx, logged } = await createContext('/');
    ctx.request.request.headers['x-forwarded-for'] = '203.0.113.7';

    await new RequestLoggerMiddleware().handle(ctx, async () => { });

    assert.equal(logged[0].bindings.ip, '203.0.113.7');
  });

  test('skips the health check', async ({ assert }) => {
    const { ctx, logged } = await createContext('/up');

    await new RequestLoggerMiddleware().handle(ctx, async () => { });

    assert.lengthOf(logged, 0);
  });
});

test.group('Request logging: request completed', () => {
  test('logs the status and duration at info level', async ({ assert }) => {
    const { ctx, logged } = await createContext('/calculators/mortgage');
    ctx.response.status(200);

    await emitter.emit('http:request_completed', {
      ctx,
      duration: [0, 12_345_678],
    });

    assert.lengthOf(logged, 1);
    assert.equal(logged[0].level, 'info');
    assert.equal(logged[0].message, 'request completed');
    assert.deepEqual(logged[0].bindings, {
      method: 'GET',
      url: '/calculators/mortgage',
      status: 200,
      durationMs: 12.3,
    });
  });

  test('logs server errors at error level', async ({ assert }) => {
    const { ctx, logged } = await createContext('/calculators/mortgage');
    ctx.response.status(500);

    await emitter.emit('http:request_completed', {
      ctx,
      duration: [0, 1_000_000],
    });

    assert.equal(logged[0].level, 'error');
  });

  test('skips the health check', async ({ assert }) => {
    const { ctx, logged } = await createContext('/up');

    await emitter.emit('http:request_completed', {
      ctx,
      duration: [0, 1_000_000],
    });

    assert.lengthOf(logged, 0);
  });
});
