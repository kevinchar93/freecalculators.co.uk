import { defineConfig } from '@adonisjs/inertia';

const inertiaConfig = defineConfig({
  /**
   * Root Edge template rendered on the first page visit.
   */
  rootView: 'inertia_layout',
});

export default inertiaConfig;
