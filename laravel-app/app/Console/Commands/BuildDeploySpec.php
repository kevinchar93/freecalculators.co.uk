<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Yaml\Yaml;

class BuildDeploySpec extends Command
{
    protected $signature = 'deploy:build-spec {environment : staging or production}';

    protected $description = 'Fill the secret placeholders in a .do/app-*.yaml template and write a gitignored copy for doctl';

    public function handle(): int
    {
        $environment = $this->argument('environment');

        if (! in_array($environment, ['staging', 'production'], true)) {
            $this->error('Environment must be "staging" or "production".');

            return self::FAILURE;
        }

        $templatePath = base_path(".do/app-platform-template-{$environment}.yaml");

        if (! file_exists($templatePath)) {
            $this->error("Template not found: {$templatePath}");

            return self::FAILURE;
        }

        $outputPath = base_path(".do/app-platform-{$environment}.generated.yaml");

        if (file_exists($outputPath) && ! $this->confirm("{$outputPath} already exists. Overwrite?")) {
            return self::FAILURE;
        }

        $spec = Yaml::parseFile($templatePath);

        foreach ($spec['services'] as &$service) {
            foreach ($service['envs'] as &$env) {
                if (($env['type'] ?? null) !== 'SECRET' || $env['value'] !== 'REPLACE_ME_LOCALLY') {
                    continue;
                }

                $value = $this->secret("Value for {$env['key']}");

                if ($value === null || $value === '') {
                    $this->error("No value entered for {$env['key']}.");

                    return self::FAILURE;
                }

                $env['value'] = $value;
            }
            unset($env);
        }
        unset($service);

        file_put_contents($outputPath, Yaml::dump($spec, 10, 2));

        $this->line("Wrote {$outputPath}");
        $this->line('This file is gitignored — pass it to doctl, never commit it.');

        return self::SUCCESS;
    }
}
