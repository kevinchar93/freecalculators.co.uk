import type { HttpContext } from '@adonisjs/core/http';
import app from '@adonisjs/core/services/app';
import type { NextFn } from '@adonisjs/core/types/http';
import BaseInertiaMiddleware from '@adonisjs/inertia/inertia_middleware';

export default class InertiaMiddleware extends BaseInertiaMiddleware {
  share(ctx: HttpContext) {
    /**
     * The share method is called everytime an Inertia page is rendered. In
     * certain cases, a page may get rendered before the session middleware
     * is executed. For example: During a 404 request.
     *
     * In that case, we must always assume that HttpContext is not fully hydrated
     * with all the properties
     */
    const { request } = ctx as Partial<HttpContext>;

    const sidebarState = request?.plainCookie('sidebar_state', {
      encoded: false,
    });

    return {
      errors: ctx.inertia.always(this.getValidationErrors(ctx)),
      name: app.config.get<string>('app.appName'),
      sidebarOpen: sidebarState === undefined || sidebarState === 'true',
    };
  }

  async handle(ctx: HttpContext, next: NextFn) {
    await this.init(ctx);

    const output = await next();
    this.dispose(ctx);

    return output;
  }
}

declare module '@adonisjs/inertia/types' {
  type MiddlewareSharedProps = InferSharedProps<InertiaMiddleware>;
  export interface SharedProps extends MiddlewareSharedProps {}
}
