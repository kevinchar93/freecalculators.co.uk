<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::prefix('calculators')->group(function () {
    Route::inertia('/mortgage', 'mortgage-calculator-page')->name('mortgage-calculator');
});
