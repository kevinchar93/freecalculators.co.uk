# Buy-to-Let Mortgage Calculator

## Description

Calculates mortgage payments for a buy-to-let (BTL) property, typically on an interest-only basis, alongside gross rental yield and a basic Interest Coverage Ratio (ICR) check used by lenders to assess affordability.

## Inputs

| Input | Type | Notes |
|---|---|---|
| Property price | Currency (£) | |
| Deposit | Currency (£) or % | Toggle; BTL typically requires 25%+ |
| Mortgage term | Years | Default 25 |
| Repayment type | Enum | Interest-only (default for BTL) / Repayment |
| Interest rate | % | Defaulted from `market_rates.json` (BTL rates) |
| Expected monthly rental income | Currency (£) | Used for yield and ICR |
| Ownership structure | Enum | Personal / Limited company (SPV) — affects tax copy only, not core calc |
| Lender stress rate / ICR requirement | % | Default 125% (or 145% for higher-rate taxpayers), editable |

## Outputs

- Monthly mortgage payment (interest-only or repayment)
- Loan-to-value (LTV) %
- Gross rental yield %
- Net monthly cash flow (rental income − mortgage payment, before other costs)
- Interest Coverage Ratio (ICR) %
- Pass/fail indicator against lender's minimum ICR requirement (using stressed rate)

## Calculations

- Interest-only monthly payment: `M = P * i` (where `i` = monthly interest rate)
- Repayment monthly payment (if selected): standard amortising formula `M = P * [i(1+i)^n] / [(1+i)^n - 1]`
- LTV: `(Loan amount / Property price) * 100`
- Gross rental yield: `(Annual rental income / Property price) * 100`, where `Annual rental income = Monthly rental income * 12`
- Net monthly cash flow: `Monthly rental income - Monthly mortgage payment`
- ICR: `Annual rental income / (Loan amount * stress rate)`, expressed as a percentage; pass if `ICR >= lender's minimum requirement (e.g. 125%)`

## pSEO Variations

| URL | Preloaded defaults |
|---|---|
| `/buy-to-let-mortgage-calculator` | None (blank/default state) |
| `/buy-to-let-mortgage-calculator/interest-only` | Interest-only toggle locked on |
| `/buy-to-let-mortgage-calculator/75-percent-ltv` | 25% deposit, typical BTL minimum |
| `/buy-to-let-mortgage-calculator/rental-yield` | Highlights the gross yield output |
| `/buy-to-let-mortgage-calculator/limited-company` | Standard calculation; copy focuses on SPV tax differences |
