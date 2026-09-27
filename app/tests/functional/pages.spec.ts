import { test } from '@japa/runner';

test.group('Pages', () => {
  const pages = {
    '/': 'welcome',
    '/calculators': 'calculators-page',
    '/calculators/mortgage': 'mortgage-calculator-page/index',
    '/calculators/mortgage/assumptions': 'mortgage-calculator-page/assumptions',
    '/blog': 'blog-page',
    '/about-us': 'about-us-page',
    '/privacy-policy': 'privacy-policy-page',
    '/terms-of-service': 'terms-of-service-page',
  };

  for (const [url, component] of Object.entries(pages)) {
    test('{url} renders the {component} page')
      .with([{ url, component }])
      .run(async ({ client, assert }, row) => {
        const response = await client
          .get(row.url)
          .header('X-Inertia', 'true')
          .header('X-Inertia-Version', '1');

        response.assertStatus(200);
        assert.equal(response.body().component, row.component);
      });
  }
});
