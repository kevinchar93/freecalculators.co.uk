# Overpayment Calculator

## Description

Calculates the time and interest saved by making mortgage overpayments, either as a regular monthly amount or a one-off lump sum. Lets users see the trade-off between shortening the mortgage term and reducing monthly payments.

## Inputs

| Input | Type | Notes |
|---|---|---|
| Outstanding mortgage balance | Currency (£) | Current remaining balance |
| Interest rate | % | Current rate, assumed constant for projection |
| Remaining term | Years | Original remaining term before overpaying |
| Overpayment type | Enum | Regular monthly / One-off lump sum |
| Regular overpayment amount | Currency (£) | Monthly, if type = Regular |
| Lump sum amount | Currency (£) | One-off, if type = Lump sum |
| Overpayment goal | Enum | Shorten term (keep payment same) / Reduce payment (keep term same) |

## Outputs

- Original monthly repayment
- New monthly repayment (if goal = reduce payment) or unchanged (if goal = shorten term)
- Original mortgage payoff date / term
- New mortgage payoff date / term
- Time saved (years and months)
- Total interest saved (£)
- Total interest paid: original scenario vs. with overpayments

## Calculations

- Baseline monthly repayment via standard amortising formula:
  `M = P * [i(1+i)^n] / [(1+i)^n - 1]`
- With overpayments, simulate month-by-month amortisation:
  - Each month: `interest = balance * monthly_rate`; `principal_paid = payment + overpayment - interest`; `balance -= principal_paid`
  - For lump sum: apply as a one-time reduction to balance at the specified month (default: immediately), then continue standard amortisation on the reduced balance and original term (to compute "reduce payment" outcome) or continue original payment amount (to compute "shorten term" outcome)
- Time saved: difference in number of months to reach zero balance, original schedule vs. overpaid schedule
- Interest saved: `Total interest (original schedule) - Total interest (overpaid schedule)`

## pSEO Variations

| URL | Preloaded defaults |
|---|---|
| `/overpayment-calculator` | None (blank/default state) |
| `/overpayment-calculator/100-a-month` | £100 regular monthly overpayment |
| `/overpayment-calculator/200-a-month` | £200 regular monthly overpayment |
| `/overpayment-calculator/lump-sum` | £10,000 one-off lump sum |
| `/overpayment-calculator/shorten-term` | UI focused on the "years saved" metric |
