<?php

use Illuminate\Support\Facades\Hash;

it('lets requests through untouched when disabled', function () {
    config(['app.staging_basic_auth_enabled' => false]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertHeaderMissing('X-Robots-Tag');
});

it('rejects requests without credentials when enabled', function () {
    config([
        'app.staging_basic_auth_enabled' => true,
        'app.staging_basic_auth_user' => 'testuser',
        'app.staging_basic_auth_password_hash' => Hash::make('correct-horse'),
    ]);

    $response = $this->get(route('home'));

    $response->assertStatus(401);
    $response->assertHeader('WWW-Authenticate', 'Basic realm="Staging"');
    $response->assertHeader('X-Robots-Tag', 'noindex');
});

it('rejects the wrong password', function () {
    config([
        'app.staging_basic_auth_enabled' => true,
        'app.staging_basic_auth_user' => 'testuser',
        'app.staging_basic_auth_password_hash' => Hash::make('correct-horse'),
    ]);

    $response = $this->withHeaders([
        'Authorization' => 'Basic '.base64_encode('testuser:wrong-password'),
    ])->get(route('home'));

    $response->assertStatus(401);
});

it('accepts the correct username and password checked against the stored hash', function () {
    config([
        'app.staging_basic_auth_enabled' => true,
        'app.staging_basic_auth_user' => 'testuser',
        'app.staging_basic_auth_password_hash' => Hash::make('correct-horse'),
    ]);

    $response = $this->withHeaders([
        'Authorization' => 'Basic '.base64_encode('testuser:correct-horse'),
    ])->get(route('home'));

    $response->assertOk();
    $response->assertHeader('X-Robots-Tag', 'noindex');
});
