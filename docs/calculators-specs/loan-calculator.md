# Loan Repayment Calculator

## Description

Calculates monthly repayments and total interest for unsecured personal loans and car finance (HP/PCP-style flat repayment, not lease). Generic amortising loan template reused across several personal finance pSEO pages.

## Inputs

| Input | Type | Notes |
|---|---|---|
| Loan amount | Currency (£) | Default £10,000 |
| Loan term | Years (or months) | Default 5 years |
| Interest rate (APR) | % | Defaulted from `market_rates.json` by loan type |
| Loan type | Enum | Personal loan / Car finance / Home improvement / Debt consolidation (drives copy + defaults, not formula) |
| Arrangement fee | Currency (£) | Optional, added to loan or paid upfront |

## Outputs

- Monthly repayment (£)
- Total amount repayable over the term
- Total interest paid (£)
- Total cost of credit (interest + fees)
- Amortisation schedule (optional table: balance remaining per year)

## Calculations

- Standard amortising loan formula:
  `M = P * [i(1+i)^n] / [(1+i)^n - 1]`
  where `P` = loan amount (plus fee, if added to loan), `i` = monthly interest rate (APR / 12), `n` = number of monthly payments.
- Total repayable: `M * n`
- Total interest paid: `Total repayable - P`
- Total cost of credit: `Total interest paid + upfront fees` (if fee not added to loan principal)

## pSEO Variations

| URL | Preloaded defaults |
|---|---|
| `/loan-calculator` | None (blank/default state) |
| `/loan-calculator/10000-personal-loan` | £10,000 amount, 5-year term |
| `/loan-calculator/20000-personal-loan` | £20,000 amount, 5-year term |
| `/loan-calculator/car-finance` | £15,000 amount |
| `/loan-calculator/home-improvement` | £25,000 amount, 10-year term |
| `/loan-calculator/debt-consolidation` | Copy focuses on total interest paid over time |
