<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::prefix('calculators')->group(function () {
    Route::inertia('/mortgage', 'MortgageCalculatorPage')->name('mortgage-calculator');
});
