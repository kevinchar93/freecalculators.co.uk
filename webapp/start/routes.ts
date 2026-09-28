/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

/**
 * Health check for the DigitalOcean App Platform. It sits outside the
 * staging basic auth group so the platform can reach it without
 * credentials.
 */
router.get('/up', ({ response }) => response.ok('OK')).as('health');

router
  .group(() => {
    router.on('/').renderInertia('home', {}).as('home');

    router
      .group(() => {
        router.on('/').renderInertia('calculators-page', {}).as('calculators');
        router
          .on('/mortgage')
          .renderInertia('mortgage-calculator-page/index', {})
          .as('mortgage-calculator');
        router
          .on('/mortgage/assumptions')
          .renderInertia('mortgage-calculator-page/assumptions', {})
          .as('mortgage-calculator.assumptions');
      })
      .prefix('/calculators');

    router.on('/blog').renderInertia('blog-page', {}).as('blog');
    router.on('/about-us').renderInertia('about-us-page', {}).as('about-us');
    router
      .on('/privacy-policy')
      .renderInertia('privacy-policy-page', {})
      .as('privacy-policy');
    router
      .on('/terms-of-service')
      .renderInertia('terms-of-service-page', {})
      .as('terms-of-service');
  })
  .use(middleware.stagingBasicAuth());
