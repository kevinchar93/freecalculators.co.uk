import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { BaseCommand, args, flags } from '@adonisjs/core/ace';
import type { CommandOptions } from '@adonisjs/core/types/ace';
import { isMap, isSeq, parseDocument } from 'yaml';

const PLACEHOLDER = 'REPLACE_ME_LOCALLY';

export default class BuildDeploySpec extends BaseCommand {
  static commandName = 'deploy:build-spec';
  static description =
    'Fill the secret placeholders in an infrastructure/digitalocean template and write a gitignored copy for doctl';

  static options: CommandOptions = {};

  @args.string({ description: 'staging or production' })
  declare environment: string;

  @flags.string({
    description:
      'Directory containing the spec templates (defaults to ../infrastructure/digitalocean)',
  })
  declare dir?: string;

  async run() {
    if (!['staging', 'production'].includes(this.environment)) {
      this.logger.error('Environment must be "staging" or "production".');
      this.exitCode = 1;

      return;
    }

    const specsPath =
      this.dir ?? this.app.makePath('..', 'infrastructure', 'digitalocean');

    const templatePath = `${specsPath}/app-platform-template-${this.environment}.yaml`;
    const outputPath = `${specsPath}/app-platform-${this.environment}.generated.yaml`;

    if (!existsSync(templatePath)) {
      this.logger.error(`Template not found: ${templatePath}`);
      this.exitCode = 1;

      return;
    }

    if (
      existsSync(outputPath) &&
      !(await this.prompt.confirm(`${outputPath} already exists. Overwrite?`))
    ) {
      this.exitCode = 1;

      return;
    }

    const spec = parseDocument(await readFile(templatePath, 'utf8'));
    const services = spec.get('services');

    for (const service of isSeq(services) ? services.items : []) {
      const envs = isMap(service) ? service.get('envs') : null;

      for (const env of isSeq(envs) ? envs.items : []) {
        if (
          !isMap(env) ||
          env.get('type') !== 'SECRET' ||
          env.get('value') !== PLACEHOLDER
        ) {
          continue;
        }

        const key = String(env.get('key'));
        const value = await this.prompt.secure(`Value for ${key}`);

        if (!value) {
          this.logger.error(`No value entered for ${key}.`);
          this.exitCode = 1;

          return;
        }

        env.set('value', value);
      }
    }

    await writeFile(outputPath, spec.toString());

    this.logger.log(`Wrote ${outputPath}`);
    this.logger.log(
      'This file is gitignored — pass it to doctl, never commit it.',
    );
  }
}
