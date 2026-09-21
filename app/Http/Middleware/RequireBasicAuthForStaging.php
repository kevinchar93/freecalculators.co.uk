<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class RequireBasicAuthForStaging
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! config('app.staging_basic_auth_enabled')) {
            return $next($request);
        }

        if (! $this->hasValidCredentials($request)) {
            return response('Authentication required.', 401, [
                'WWW-Authenticate' => 'Basic realm="Staging"',
                'X-Robots-Tag' => 'noindex',
            ]);
        }

        return $next($request)->header('X-Robots-Tag', 'noindex');
    }

    private function hasValidCredentials(Request $request): bool
    {
        $expectedUser = (string) config('app.staging_basic_auth_user');
        $passwordHash = (string) config('app.staging_basic_auth_password_hash');

        if ($expectedUser === '' || $passwordHash === '') {
            return false;
        }

        $user = (string) $request->getUser();
        $password = (string) $request->getPassword();

        return hash_equals($expectedUser, $user) && Hash::check($password, $passwordHash);
    }
}
