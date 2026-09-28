import { defineConfig } from '@adonisjs/core/hash';
import { BcryptjsHashDriver } from '#services/bcryptjs_hash_driver';

const hashConfig = defineConfig({
  default: 'bcrypt',

  list: {
    /**
     * Uses standard `$2y$`-style bcrypt hashes so hashes created by the
     * previous Laravel app (and PHP's password_hash) keep verifying.
     */
    bcrypt: () => new BcryptjsHashDriver({ rounds: 12 }),
  },
});

export default hashConfig;

/**
 * Inferring types for the list of hashers you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface HashersList extends InferHashers<typeof hashConfig> {}
}
