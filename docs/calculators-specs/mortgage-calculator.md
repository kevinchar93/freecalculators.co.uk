# Mortgage Repayment Calculator

## Description

Calculates monthly repayments for a residential mortgage, and highlights the "payment shock" a borrower faces when their initial deal term ends and they roll onto the lender's Standard Variable Rate (SVR). Core template for `/mortgage-calculator` and its pSEO variants.

## Inputs

| Input                       | Type              | Default                  | Required |
| --------------------------- | ----------------- | ------------------------ | -------- |
| Property price              | Currency (£)      | £250,000                 | Yes      |
| Deposit                     | Currency (£) or % | 10%                      | Yes      |
| Mortgage term               | Years             | 25 years                 | Yes      |
| Repayment type              | Enum              | Repayment                | Yes      |
| Start date                  | Month/Year        | Next Month               | No       |
| I have a fixed/tracker deal | Boolean checkbox  | Unchecked                | No       |
| Deal type                   | Enum              | Fixed                    | No       |
| Deal term                   | Years             | 2 years                  | No       |
| Interest rate               | %                 | From `market-rates.json` | Yes*     |
| Base rate                   | %                 | From `market-rates.json` | No       |
| Margin                      | %                 | From `market-rates.json` | No       |
| SVR (post-deal rate)        | %                 | From `market-rates.json` | No       |

*Notes*

- Deposit
  - can toggle between amount and percentage
  - must be validated to ensure minimum of 95% LTV
  - we'll show a LTV percentage underneath these controls (Property Price / Deposit)

- Repayment type
  - options:
    - Repayment
    - Interest-only

- Interest rate
  - required, unless user selects the "tracker" deal type
  - must be greater than 0% (a 0% rate is not a real commercial mortgage; for trackers this applies to the effective `base rate + margin`)

- I have a fixed/tracker deal
  - checkbox to unhide elements on the form for deal period information
  - will show: Deal type, Deal term, SVR

- Deal type
  - radio button: Fixed / Tracker
  - required, when "I have a fixed/tracker deal" is checked
  - when Tracker selected "Interest rate" is disabled & "Base rate" + "Margin" appear

- Deal term
  - required, when "I have a fixed/tracker deal" is checked

- Base rate
  - required, when deal type is "tracker"

- Margin
  - required, when deal type is tracker

- SVR (post-deal rate)
  - required, when "Include deal" period is checked

## Calculations

### Loan amount

- what it is:
  - The actual amount of money lent for the mortgage, this becomes the "Principal" of the loan∏ 
- symbol: `loanAmount`
- calculation
  - `propertyPrice - deposit`

### Loan to value percentage

- what is is:
  - The percentage of a property's value that is being borrowed as a mortgage.
- symbol: `loanToValuePercentage`
- calculation
  - `(loanAmount / propertyPrice) * 100`

### Monthly repayment

- what is is:
  - The monthly payment that has to be made each month through the mortgage term to fully pay of the mortgage.
- symbol: `monthlyRepayment`
- calculation
  - `P` = loan amount at the start of the period being calculated
  - `r` = annual rate / 12
  - `n` = total number of monthly payments over which `P` is being amortised
  - `monthlyRepayment = P * ( r(1+r)^n / ((1+r)^n - 1) )`
  - IF r = 0 THEN monthlyRepayment = P / n            // defensive guard only
    - `r = 0` is rejected at input validation (see Interest rate note), so this branch should be unreachable; kept as cheap insurance against a bad default from `market-rates.json`. `P / n` is the correct zero-interest limit.

### Monthly repayment interest only

- what it is:
  - The monthly payment made each month through the mortgage if only interest is being paid.
- symbol: `monthlyRepaymentInterestOnly`
- calculation
  - `P` = loan amount at the start of the period being calculated
  - `r` = annual rate / 12
  - `monthlyRepaymentInterestOnly = P * r`
  - IF r = 0 THEN monthlyRepaymentInterestOnly = 0            // defensive guard only
    - `r = 0` is rejected at input validation (see Interest rate note), so this branch should be unreachable; a 0% interest-only loan means being lent money you never repay.


### Remaining balance after k payments

- what it is
  - The balance remaining on the mortgage after K payments have been made
-  symbol: `remainingBalanceKPayments`
- calculation:
  - `k` = The number of payments that have already been completed
  - `P` = loan amount at the start of the period being calculated
  - `r` = annual rate / 12
  - `n` = total number of monthly payments over which `P` is being amortised
  - `remainingBalanceKPayments = P * ([(1+r)^n - (1+r)^k] / [(1+r)^n - 1])`
  - IF r = 0 THEN remainingBalanceKPayments = P * (1 - k / n)            // defensive guard only
    - `r = 0` is rejected at input validation (see Interest rate note), so this branch should be unreachable; `P * (1 - k / n)` is the correct zero-interest (linear paydown) limit.

### Whole-loan total interest

- what it is
  - The total interest paid throughout the entire loan
- symbol: `wholeLoanTotalInterest`
- calculation:
  - `P` = loan amount at the start of the period being calculated
  - `n` = total number of monthly payments over which `P` is being amortised
  - `M` = the fixed monthly payment
  - `wholeLoanTotalInterest = (n * M) - P`

### Amortisation Schedule

- what it is
  - The table breaking down the monthly payments into what goes to paying interest and what goes to the principal
- symbol: `amortisationSchedule`
- calculation:
```
INPUT:
  P    = amount borrowed          (250000)
  rate = annual interest rate     (0.045)
  years = length of the loan      (25)

r = rate / 12                     // monthly interest rate  -> 0.00375
n = years * 12                    // total number of payments -> 300

M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)   // the fixed monthly payment

balance = P

FOR k = 1 TO n:
    interest  = balance * r
    principal = M - interest
    balance   = balance - principal

    OUTPUT k, interest, principal, balance
END FOR
```

### Month principal first exceeds interest

- what it is
  - the first month where the principal portion of the monthly payment exceeds the interest portion
- symbol: `monthPrincipalFirstExceedsInterest`
- calculation:
  - `r` = annual rate / 12
  - `n` = total number of monthly payments over which the loan is being amortised
  - `monthPrincipalFirstExceedsInterest = CEILING(n + 1 - (ln(2) / ln(1 + r)))`

Depends only on rate and term — the loan size doesn't matter.

## Outputs

### When user has NOT checked "I have a fixed/tracker deal"

- Single Card
  - Title: Your Results
  - Monthly Payment: £Y
  - House Price: £Y
  - Deposit: £Y (Y%)
  - Loan Amount: £Y
  - Total Paid (Y Monthly payments): £Y
  - Total Interest: £Y
  - Principal / Interest split: Y% principal / Y% interest
  - Payoff date: Month Year
  - Payment Schedule Table

**Calculations**
  - Monthly Payment
    - `= monthlyRepayment`
    - *interest-only* `= monthlyRepaymentInterestOnly`

  - Loan Amount
    - `= loanAmount`

  - Total Paid
    - `= monthlyRepayment * mortgageTermInMonths`
    - *interest-only* `= monthlyRepaymentInterestOnly * mortgageTermInMonths`
  
  - Total Interest
    - `= wholeLoanTotalInterest`
    - *interest-only* `= totalPaid`
  
  - Principal / Interest split: 
    - `principal = (loanAmount / totalPaid) * 100`
    - `interest = (wholeLoanTotalInterest / totalPaid) * 100`
    - *interest-only* hidden. Always 0% principal / 100% interest under interest-only, so it's not informative.
  
  - Payoff date
    - `addMonths(startDate, mortgageTermInMonths)`
    - *interest-only* same calculation but relabelled to "Mortgage term ends". Balance never reaches zero under interest-only, so "payoff" is misleading.
  
  - Payment Schedule Table
    - `= amortisationSchedule`
    - *interest-only* kept as-is. Principal column will always read 0 and Balance will stay flat at the loan amount, but showing that flatness is itself useful to the user.

  - Repayment vehicle notice
    - shown only for *interest-only*. Not present for standard repayment mortgages, since those amortize to zero and need no such warning. Warns the user that they are just paying interest and will need a method to repay the balance in full at the end.
  
### When user HAS checked "I have a fixed/tracker deal"

- 3 Cards

- Card 1
  - Title: "During Your Deal"
  - Monthly Payment: £Y
  - Total Paid (Y Monthly payments): £Y
  - Balance at end of deal: £Y
  - Total Interest: £Y
  - Principal / Interest split: Y% principle / Y% interest
  - Deal end date: Month Year
  - Payment Schedule Table

**Calculations**
- Loan Amount
    - `= loanAmount`
- Monthly Payment
  - `= monthlyRepayment`
    - use `mortgageTermInMonths` for input, payment will only be for `dealTermInMonths` months
- Total Paid
  - `totalPaidDealPeriod = dealTermInMonths * monthlyRepayment`
- Balance at end of deal:
  - `balanceAtEndOfDealPeriod = remainingBalanceKPayments`
    - where `K` is `dealTermInMonths`
    - use `mortgageTermInMonths` for input, payment will only be for `dealTermInMonths` months
- Total Interest
  - `totalInterest = totalPaidDealPeriod - (loanAmount - balanceAtEndOfDealPeriod)`
- Principal / Interest split:
  - `totalPrincipal = totalPaidDealPeriod - totalInterest`
  - `principal = (totalPrincipal / totalPaidDealPeriod) * 100`
  - `interest = (totalInterest / totalPaidDealPeriod) * 100`
- Deal end date
    - `addMonths(startDate, dealTermInMonths)`
- Payment Schedule Table
    - `= amortisationSchedule`


**Interest-only adjustments (Card 1)**
- Balance at end of deal — will equal the original loan amount, since nothing is amortized. Kept as-is; demonstrates the balance hasn't moved.
- Total Interest — will equal Total Paid. Kept as a separate field rather than collapsed; the equality itself signals "you're building zero equity."
- Principal / Interest split — hidden, same reasoning as the single-card case.
- Payment Schedule Table — kept as-is, same flat Principal/Balance behaviour as the single-card case.

- Card 2
  - Title: "After Your Deal"
  - subtitle: on Y% SVR
  - Monthly Payment: £Y
    - sub text: £Y increase, Y% change
  - Total Paid (Y Monthly payments): £Y
  - Total Interest: £Y
  - Principal / Interest split: Y% principle / Y% interest
  - End date: Month Year
  - Payment Schedule Table

**Calculations**

- Monthly Payment
  - changes
- Total Paid
- Total Interest
- Principal / Interest split
- End date: Month Year
- Payment Schedule Table

**Interest-only adjustments (Card 2)**
- Total Interest — will equal Total Paid, same reasoning as Card 1.
- Principal / Interest split — hidden, same reasoning as Card 1.
- Payment Schedule Table — kept as-is, same flat Principal/Balance behaviour as Card 1.

- Card 3
  - Title: "Summary"
  - House Price: £Y
  - Deposit: £Y (Y%)
  - Loan Amount: £Y
  - Total Paid (Y Monthly payments): £Y
  - Total Interest: £Y
  - Principal / Interest split: Y% principle / Y% interest

**Calculations**

- Loan Amount
- Total Paid
- Total Interest
- Principal / Interest split

**Interest-only adjustments (Card 3)**
- Total Interest — will equal Total Paid, same reasoning as Cards 1 & 2.
- Principal / Interest split — hidden, same reasoning as Cards 1 & 2.
- Repayment vehicle notice — shown only for interest-only, same reasoning as the single-card case. Not present for standard repayment mortgages.


- each payment schedule table is an amortization table with these columns
    - Year
    - Interest
    - Principal
    - Balance

### Deal period (Cards 1, 2, 3)

`n_total` = Mortgage term in months. `n_deal` = Deal term in months. `n_remaining` = `n_total - n_deal`.

Card 1 — During Your Deal

`P` = Loan amount, `n` = `n_total`, `i` = deal rate / 12 (Interest rate for Fixed, or `Base rate + Margin` for Tracker), throughout.

- Monthly Payment: Monthly repayment (repayment type) formula, or interest-only formula if Repayment type = Interest-only
- Total Paid: `Monthly Payment * n_deal`
- Balance at end of deal: `B_k` with `k = n_deal`
  - Interest-only: equals Loan amount, since `B_k` never decreases
- Total Interest: `Total Paid - (Loan amount - Balance at end of deal)`
  - Interest-only: `Total Interest = Total Paid`, same reasoning as the no-deal-period case
- Principal / Interest split: `Principal % = ((Loan amount - Balance at end of deal) / Total Paid) * 100`, `Interest % = (Total Interest / Total Paid) * 100`
  - Interest-only: not calculated — field hidden
- Deal end date: `Mortgage start date + n_deal months`
- Payment Schedule Table: amortisation schedule for months `1..n_deal`, same per-year row structure as the no-deal-period case
  - Interest-only: Principal column = 0, Balance column flat at Loan amount, same reasoning as the no-deal-period case

Card 2 — After Your Deal

`P` = Balance at end of deal (Card 1), `n` = `n_remaining`, `i` = SVR / 12, throughout.

- Monthly Payment: Monthly repayment (repayment type) formula, or interest-only formula if Repayment type = Interest-only
- £ increase: `Card 2 Monthly Payment - Card 1 Monthly Payment`
- % change: `(£ increase / Card 1 Monthly Payment) * 100`
- Total Paid: `Monthly Payment * n_remaining`
- Total Interest: `Total Paid - Balance at end of deal (Card 1)`
  - Interest-only: `Total Interest = Total Paid`, same reasoning as Card 1
- Principal / Interest split: `Principal % = (Balance at end of deal (Card 1) / Total Paid) * 100`, `Interest % = (Total Interest / Total Paid) * 100`
  - Interest-only: not calculated — field hidden
- End date: `Deal end date (Card 1) + n_remaining months`
- Payment Schedule Table: amortisation schedule for months `1..n_remaining` starting from `P` = Balance at end of deal, same per-year row structure as Card 1
  - Interest-only: same flat Principal/Balance behaviour as Card 1

Card 3 — Summary

- House Price / Deposit / Loan Amount: same values as the inputs / Loan amount (shared formula)
- Total Paid: `Card 1 Total Paid + Card 2 Total Paid`
- Total Interest: `Card 1 Total Interest + Card 2 Total Interest`
  - Interest-only: `Total Interest = Total Paid`, following from both cards individually satisfying this
- Principal / Interest split: recomputed from the summed totals — `Principal % = ((Card 1 + Card 2 principal paid) / Total Paid) * 100` — not an average of the two cards' percentages
  - Interest-only: not calculated — field hidden
- Repayment vehicle notice: not a calculation — static text, interest-only only, same as the no-deal-period case

## pSEO Variations

| URL                                     | Preloaded defaults                     |
| --------------------------------------- | -------------------------------------- |
| `/mortgage-calculator`                  | None (blank/default state)             |
| `/mortgage-calculator/first-time-buyer` | £250k price, 10% deposit               |
| `/mortgage-calculator/95-percent-ltv`   | 5% deposit                             |
| `/mortgage-calculator/90-percent-ltv`   | 10% deposit                            |
| `/mortgage-calculator/85-percent-ltv`   | 15% deposit                            |
| `/mortgage-calculator/80-percent-ltv`   | 20% deposit                            |
| `/mortgage-calculator/75-percent-ltv`   | 25% deposit                            |
| `/mortgage-calculator/70-percent-ltv`   | 30% deposit                            |
| `/mortgage-calculator/65-percent-ltv`   | 35% deposit                            |
| `/mortgage-calculator/60-percent-ltv`   | 40% deposit                            |
| `/mortgage-calculator/2-year-fixed`     | 2-year deal term, current avg 2yr rate |
| `/mortgage-calculator/5-year-fixed`     | 5-year deal term, current avg 5yr rate |
| `/mortgage-calculator/300000-house`     | £300,000 purchase price                |
| `/mortgage-calculator/500000-house`     | £500,000 purchase price                |

## Possible v2 enhancements

- Overpayments — optional monthly/lump-sum overpayment input; likely kept as a separate calculator linked from this one (pre-filling its inputs) rather than folded in here, to avoid complicating this calculator.
- Fees — product/arrangement fee input (paid upfront or added to loan); deferred as it's not expected to materially affect the cost breakdown.
- Deal start date — for users entering an existing mortgage rather than shopping for a new one. Would let the calculator show elapsed vs. remaining time on the deal, current balance "today", and time-until-SVR-rollover relative to today rather than purely from day one. Requires switching the deal-term model from "length only" to "start date + length" (or "months elapsed"), and updating the "During/After your deal" outputs and payment schedule to mark a "today" point.