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

    this.logger.log(await hash.make(password));
  }
}
