import { BaseCommand } from '@adonisjs/core/ace';
import hash from '@adonisjs/core/services/hash';
import type { CommandOptions } from '@adonisjs/core/types/ace';

export default class HashPassword extends BaseCommand {
  static commandName = 'hash:password';
  static description =
    'Hash a password without printing or storing the plaintext';

  static options: CommandOptions = {
    startApp: true,
  };

  async run() {
    const password = await this.prompt.secure('Password to hash');

    if (!password) {
      this.logger.error('No password entered.');
      this.exitCode = 1;

      return;
    }

    const hashedPassword = await hash.make(password);

    this.logger.log(hashedPassword);
    this.logger.log('');
    this.logger.log(
      'For a .env file, escape each $ so Adonis does not treat it as a variable:',
    );
    this.logger.log(
      `STAGING_BASIC_AUTH_PASSWORD_HASH=${hashedPassword.replaceAll('$', '\\$')}`,
    );
  }
}
