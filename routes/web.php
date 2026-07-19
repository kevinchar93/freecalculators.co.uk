<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::inertia('/mortgage-calculator', 'MortgageCalculatorPage')->name('mortgage-calculator');
