<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::prefix('calculators')->group(function () {
    Route::inertia('/', 'calculators-page')->name('calculators');
    Route::inertia('/mortgage', 'mortgage-calculator-page')->name('mortgage-calculator');
});

Route::inertia('/blog', 'blog-page')->name('blog');
Route::inertia('/about-us', 'about-us-page')->name('about-us');
Route::inertia('/privacy-policy', 'privacy-policy-page')->name('privacy-policy');
Route::inertia('/terms-of-service', 'terms-of-service-page')->name('terms-of-service');
