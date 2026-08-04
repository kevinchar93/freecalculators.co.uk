# Remortgage Calculator

## Description

Compares a borrower's current mortgage deal against a new remortgage deal, factoring in arrangement/exit fees, to show whether switching saves money. Supports equity release and SVR-switch scenarios.

## Inputs

| Input | Type | Notes |
|---|---|---|
| Outstanding mortgage balance | Currency (£) | Current remaining balance |
| Current interest rate | % | Default reflects current avg SVR from `market_rates.json` |
| Remaining term | Years | On current mortgage |
| New borrowing amount | Currency (£) | Defaults to outstanding balance; can be higher (equity release) |
| Property value | Currency (£) | Used to compute new LTV |
| New deal rate | % | Defaulted from `market_rates.json` by deal term |
| New deal term | Years | 2, 5, 10 |
| New mortgage term | Years | Term for the new deal (may differ from remaining term) |
| New deal fees | Currency (£) | Arrangement/product fee, added to loan or paid upfront (toggle) |
| Exit/early repayment fee on current deal | Currency (£) | Optional, if leaving current deal early |

## Outputs

- Current monthly repayment
- New monthly repayment
- Monthly saving (or increase) £ and %
- New LTV %
- Total fees payable on switching
- Total cost over new deal term (repayments + fees) vs. staying on current deal
- Break-even point (months until fees are recovered via savings)
- Equity released (£), if new borrowing > outstanding balance

## Calculations

- Current and new monthly repayments both use the standard amortising mortgage formula:
  `M = P * [i(1+i)^n] / [(1+i)^n - 1]`
- New LTV: `(New borrowing amount / Property value) * 100`
- Monthly saving: `Current monthly repayment - New monthly repayment`
- Total cost over deal term: `(New monthly repayment * deal term in months) + new deal fees + any exit fee`, compared against `(Current monthly repayment * same period)`
- Break-even (months): `Total fees payable / Monthly saving` (only meaningful when saving > 0)
- Equity released: `New borrowing amount - Outstanding mortgage balance` (shown only if positive)

## pSEO Variations

| URL | Preloaded defaults |
|---|---|
| `/remortgage-calculator` | None (blank/default state) |
| `/remortgage-calculator/release-equity` | New borrowing amount higher than current debt |
| `/remortgage-calculator/switch-from-svr` | Current rate set to 7.5% SVR to emphasize savings |
| `/remortgage-calculator/2-year-fix` | Comparing current deal against a 2-year fix |
