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

> **Precision & rounding:** All calculations are performed in full floating-point precision. Rounding to whole pounds (or pennies) happens **only at display time** — never feed a rounded value back into another formula. Because the amortisation schedule is kept in full precision, the balance lands on exactly £0.00 at the final payment, and headline totals (e.g. `wholeLoanTotalInterest`) are taken from their closed-form expressions rather than by summing rounded table rows.

### Rates

Every formula below takes a monthly rate `r = annual rate / 12`. Which **annual rate** to use depends on the period being calculated. These are the named annual rates the cards reference:

- symbol: `dealRate`
  - the annual rate that applies **during** the deal period (Card 1)
  - `dealRate = dealType == "tracker" ? (baseRate + margin) : interestRate`
  - For a tracker the `Interest rate` field is disabled (see Inputs), so the deal rate is the effective `baseRate + margin` — **not** the `Interest rate` field.
- symbol: `postDealRate`
  - the annual rate that applies **after** the deal period, once the borrower rolls onto the lender's Standard Variable Rate (Card 2)
  - `postDealRate = svr`
- symbol: `wholeTermRate`
  - the annual rate used when there is **no** deal period — the single rate that applies for the entire mortgage term (single-card "Your Results")
  - `wholeTermRate = interestRate`

Whenever a card's calculation invokes `monthlyRepayment`, `remainingBalanceKPayments`, or the amortisation schedule, feed it `r = (the card's applicable rate) / 12`.

### Loan amount

- what it is:
  - The actual amount of money lent for the mortgage, this becomes the "Principal" of the loan
- symbol: `loanAmount`
- calculation
  - `propertyPrice - deposit`

### Loan to value percentage

- what is:
  - The percentage of a property's value that is being borrowed as a mortgage.
- symbol: `loanToValuePercentage`
- calculation
  - `(loanAmount / propertyPrice) * 100`

### Monthly repayment

- what is:
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
  - `monthPrincipalFirstExceedsInterest = CLAMP(CEILING(n + 1 - (ln(2) / ln(1 + r))), 1, n)`
    - The `CLAMP(..., 1, n)` is **required, not cosmetic**. The inner expression is the exact real-valued crossover point, but it can fall outside `[1, n]`. When the rate is low and/or the term is short, principal already exceeds interest in month 1, so the raw value goes ≤ 0 (e.g. at 4.5% over 15 years it evaluates to `-4`); at very high rates it can exceed `n`. In those cases the true answer is the nearest real month — month 1 or month `n` respectively. Do not "simplify" the clamp away.

Depends only on rate and term — the loan size doesn't matter.

## Outputs

The output will be placed onto "cards" depending on the user's selection. 

### When user has NOT checked "I have a fixed/tracker deal"

The user will see a single cards of output "Your Results"

# Single Card - "Your Results"

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
    - `= monthlyRepayment`, using `r = wholeTermRate / 12` and `mortgageTermInMonths` (see Rates)
    - *interest-only* `= monthlyRepaymentInterestOnly` (also uses `r = wholeTermRate / 12`)

  - Loan Amount
    - `= loanAmount`

  - Total Paid
    - `totalPaid = monthlyRepayment * mortgageTermInMonths`
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

  - Remaining balance
    - `= loanAmount`
    - Repayment vehicle notice
    - shown only for *interest-only*. Not present for standard repayment mortgages, since those amortize to zero and need no such warning. Warns the user that they are just paying interest and will need a method to repay the balance in full at the end.
  
### When user HAS checked "I have a fixed/tracker deal"

The user will see 3 cards of output
- During Your Deal
- After Your Deal
- Summary

#### Card 1 - "During Your Deal"

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
    - use `r = dealRate / 12` for the rate (see Rates)
    - use `mortgageTermInMonths` for amortization input, payment will only be for `dealTermInMonths` months
  - *interest-only* `= monthlyRepaymentInterestOnly` (also uses `r = dealRate / 12`)

- Total Paid
  - `totalPaidDealPeriod = dealTermInMonths * monthlyRepayment`
  - *interest-only* `= dealTermInMonths * monthlyRepaymentInterestOnly`

- Balance at end of deal:
  - `balanceAtEndOfDealPeriod = remainingBalanceKPayments`
    - where `K` is `dealTermInMonths`
    - use `mortgageTermInMonths` for amortization input, payment will only be for `dealTermInMonths` months
  - *interest-only* `= loanAmount` because the balance will never reduce

- Total Interest
  - `totalInterest = totalPaidDealPeriod - (loanAmount - balanceAtEndOfDealPeriod)`
  - *interest-only* `= totalPaid` because only interest is being paid

- Principal / Interest split:
  - `totalPrincipal = totalPaidDealPeriod - totalInterest`
  - `principal = (totalPrincipal / totalPaidDealPeriod) * 100`
  - `interest = (totalInterest / totalPaidDealPeriod) * 100`
  - *interest-only* hidden. Always 0% principal / 100% interest under interest-only, so it's not informative.

- Deal end date
    - `addMonths(startDate, dealTermInMonths)`
    - *interest-only* same calculation but relabelled to "Deal period ends". Balance never reaches zero under interest-only, so "payoff" is misleading.

- Payment Schedule Table
    - `= amortisationSchedule`
    - *interest-only* kept as-is. Principal column will always read 0 and Balance will stay flat at the loan amount, but showing that flatness is itself useful to the user.

#### Card 2 - "After Your Deal"

> **Visibility rule:** This card is only shown when `dealTermInMonths < mortgageTermInMonths`. When `dealTermInMonths >= mortgageTermInMonths` the deal covers the entire loan — there is no post-deal (SVR) period, so `postDealTermInMonths` would be `0` (a division by zero in the amortisation formula) or negative. In that case **hide Card 2 entirely** and drop the "After Your Deal" reference from the Summary; the borrower is on the deal rate for the whole term, so "During Your Deal" already tells the full story. Input validation should also cap `dealTerm <= mortgageTerm`.

- subtitle: on Y% SVR
- Monthly Payment: £Y
  - sub text: £Y increase, Y% change
- Total Paid (Y Monthly payments): £Y
- Total Interest: £Y
- Principal / Interest split: Y% principle / Y% interest
- End date: Month Year
- Payment Schedule Table

**Calculations**

Card 2 re-amortises the balance at the end of the deal period over the **remaining** term.

- `postDealStartDate = addMonths(startDate, dealTermInMonths)`
- `postDealBalance = balanceAtEndOfDealPeriod`
- `postDealTermInMonths = mortgageTermInMonths - dealTermInMonths` 

- Monthly Payment
  - `postDealMonthlyPayment = monthlyRepayment`
    - `P` (loan amount) = `postDealBalance`
    - `r` = `postDealRate / 12`
    - `n` = `postDealTermInMonths`
  - *interest-only* `= monthlyRepaymentInterestOnly`
    - `P` = `postDealBalance` (= `loanAmount`, since an interest-only balance never reduces)
    - `r` = `postDealRate / 12`
  - sub text (the "payment shock", measured against the during-deal payment from Card 1)
    - `paymentIncrease = postDealMonthlyPayment - dealMonthlyPayment`
    - `paymentPercentChange = (postDealMonthlyPayment / dealMonthlyPayment - 1) * 100`
    - where `dealMonthlyPayment` is Card 1's Monthly Payment (`monthlyRepayment`, or `monthlyRepaymentInterestOnly` under interest-only)
    - if `paymentIncrease` is negative (e.g. a tracker whose SVR is below the deal rate) it is a payment *decrease*; label the sub text accordingly rather than as an "increase"

- Total Paid
  - `postDealTotalPaid = postDealTermInMonths * postDealMonthlyPayment`
  - *interest-only* `= postDealTermInMonths * monthlyRepaymentInterestOnly` (using the post-deal inputs above)

- Total Interest
  - `postDealTotalInterest = postDealTotalPaid - postDealBalance`
  - *interest-only* `= postDealTotalPaid` because only interest is being paid

- Principal / Interest split
  - `principal = (postDealBalance / postDealTotalPaid) * 100`
  - `interest = (postDealTotalInterest / postDealTotalPaid) * 100`
  - *interest-only* hidden. Always 0% principal / 100% interest under interest-only, so it's not informative.

- End date: Month Year
  - `= addMonths(postDealStartDate, postDealTermInMonths)`
    - *interest-only* same calculation but relabelled to "Full balance due on". Balance never reaches zero under interest-only, so "payoff" is misleading.

- Payment Schedule Table
    - `= amortisationSchedule`
    - `P` (loan amount) = `postDealBalance`
    - `r` = `postDealRate / 12`
    - `n` = `postDealTermInMonths`
    - *interest-only* kept as-is. Principal column will always read 0 and Balance will stay flat at the loan amount, but showing that flatness is itself useful to the user.

#### Card 3 - "Summary"

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

- Repayment vehicle notice
  - shown only for *interest-only*. Not present for standard repayment mortgages, since those amortize to zero and need no such warning. Warns the user that they are just paying interest and will need a method to repay the balance in full at the end.
  

**Interest-only adjustments (Card 3)**
- Total Interest — will equal Total Paid, same reasoning as Cards 1 & 2.
- Principal / Interest split — hidden, same reasoning as Cards 1 & 2.
- Repayment vehicle notice — shown only for interest-only, same reasoning as the single-card case. Not present for standard repayment mortgages.

- each payment schedule table is an amortization table with these columns
    - Year
    - Interest
    - Principal
    - Balance

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