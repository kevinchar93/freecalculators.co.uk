import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ace from '@adonisjs/core/services/ace';
import hash from '@adonisjs/core/services/hash';
import { test } from '@japa/runner';
import { parse } from 'yaml';
import BuildDeploySpec from '#commands/build_deploy_spec';
import HashPassword from '#commands/hash_password';

test.group('hash:password', (group) => {
  group.each.setup(() => {
    ace.ui.switchMode('raw');

    return () => ace.ui.switchMode('normal');
  });

  test('prints a verifiable bcrypt hash of the entered password', async ({
    assert,
  }) => {
    const command = await ace.create(HashPassword, []);
    command.prompt.trap('Password to hash').replyWith('correct-horse');

    await command.exec();

    command.assertSucceeded();
    const [log] = command.ui.logger.getLogs();
    assert.isTrue(await hash.verify(log.message, 'correct-horse'));
  });

  test('fails when no password is entered', async () => {
    const command = await ace.create(HashPassword, []);
    command.prompt.trap('Password to hash').replyWith('');

    await command.exec();

    command.assertFailed();
  });
});

test.group('deploy:build-spec', (group) => {
  group.each.setup(() => {
    ace.ui.switchMode('raw');

    return () => ace.ui.switchMode('normal');
  });

  const template = `name: example
services:
  - name: web
    envs:
      - key: PLAIN
        value: keep-me
      # comments survive
      - key: SECRET_ONE
        value: REPLACE_ME_LOCALLY
        type: SECRET
      - key: ALREADY_SET
        value: EV[1:abc]
        type: SECRET
`;

  test('fills secret placeholders into a generated copy', async ({
    assert,
  }) => {
    const dir = await mkdtemp(join(tmpdir(), 'deploy-spec-'));
    await writeFile(join(dir, 'app-platform-template-staging.yaml'), template);

    const command = await ace.create(BuildDeploySpec, [
      'staging',
      `--dir=${dir}`,
    ]);
    command.prompt.trap('Value for SECRET_ONE').replyWith('s3cret');

    await command.exec();

    command.assertSucceeded();
    const output = await readFile(
      join(dir, 'app-platform-staging.generated.yaml'),
      'utf8',
    );
    const envs = parse(output).services[0].envs;

    assert.deepEqual(
      envs.map((env: { key: string; value: string }) => [env.key, env.value]),
      [
        ['PLAIN', 'keep-me'],
        ['SECRET_ONE', 's3cret'],
        ['ALREADY_SET', 'EV[1:abc]'],
      ],
    );
    assert.include(output, '# comments survive');
  });

  test('rejects unknown environments', async () => {
    const command = await ace.create(BuildDeploySpec, ['dev']);

    await command.exec();

    command.assertFailed();
  });
});
