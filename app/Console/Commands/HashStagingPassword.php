<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class HashStagingPassword extends Command
{
    protected $signature = 'staging:hash-password';

    protected $description = 'Hash a password for STAGING_BASIC_AUTH_PASSWORD_HASH without printing or storing the plaintext';

    public function handle(): int
    {
        $password = $this->secret('Password to hash');

        if ($password === null || $password === '') {
            $this->error('No password entered.');

            return self::FAILURE;
        }

        $this->line(Hash::make($password));

        return self::SUCCESS;
    }
}
