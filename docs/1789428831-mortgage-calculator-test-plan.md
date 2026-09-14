# Mortgage Calculator — Manual Test Plan

Scope: the mortgage calculator form and results panel at
`resources/js/pages/mortgage-calculator-page/`. Covers the input form
(`mortgage-form.tsx` and its `form-fields/*`), the calculation engine
(`calculations.ts`, `view-model.ts`), and the three result states shown to the
user (single result, during-deal / after-deal, summary).

## Approach

Two passes:

1. **Correctness testing** — pick a range of representative input
   combinations, calculate the expected monthly payment / total interest /
   amortisation figures independently in a spreadsheet (or a trusted
   third-party UK mortgage calculator), and compare against what the app
   shows. A test passes when the app's monthly payment, total interest, and
   total repaid are within £1 of the independently calculated value (rounding
   tolerance), and the balance/payoff date lines up.
2. **Sanity & bounds testing** — for each input field, try boundary, empty,
   zero, negative-equivalent, and unusual values and confirm the UI clamps,
   blocks, or degrades sensibly rather than crashing, showing `NaN`/`Infinity`,
   or producing a nonsensical result (e.g. negative payment).

Where a field enforces limits in code, the bounds tests below are written
against those known limits so a regression (e.g. someone loosens a `max` prop)
is caught. Limits found in the current implementation:

| Field                        | Min                       | Max                                          | Enforcement                                                      |
| ---------------------------- | ------------------------- | -------------------------------------------- | ---------------------------------------------------------------- |
| Property Price               | 0 (step-down floors at 0) | none                                         | digits-only input, no upper clamp                                |
| Deposit — £ mode             | 0 (step-down floors at 0) | none typed; step-up clamps to Property Price | digits-only input                                                |
| Deposit — % mode             | 0 (step floors at 0)      | 100                                          | step clamps 0–100; typed input blocked above 100                 |
| Mortgage Term                | 1                         | 45                                           | typed input blocked above max; clamped to [1,45] on blur         |
| Interest Rate                | 0                         | 10                                           | typed input blocked above max; disabled when deal type = Tracker |
| Start Date                   | 1970-01                   | (current year + 5)-12                        | clamped on blur                                                  |
| Deal Term                    | 1                         | 10                                           | typed input blocked above max; clamped to [1,10] on blur         |
| Standard Variable Rate (SVR) | 0                         | 15                                           | typed input blocked above max                                    |
| Base Rate (tracker)          | 0                         | 15                                           | typed input blocked above max                                    |
| Margin (tracker)             | 0                         | 10                                           | typed input blocked above max                                    |

Note: none of the numeric fields enforce a minimum while typing — only on
blur (for Mortgage Term, Deal Term, Start Date). Property Price, Deposit £,
and the percent fields can be left at `0` after blur.

---

## 1. Correctness — repayment mortgage, no deal

Verify against a spreadsheet/online calculator using the standard repayment
formula. For each row: enter the inputs with no deal, read the headline
Monthly Payment, Interest Paid, and Total Repaid, and compare.

| #   | Property Price | Deposit         | Term | Rate  | Pass criteria                                                                     |
| --- | -------------- | --------------- | ---- | ----- | --------------------------------------------------------------------------------- |
| C1  | £275,000       | £50,000         | 25y  | 5.25% | Monthly payment, interest paid, total repaid all match spreadsheet within £1      |
| C2  | £150,000       | £15,000 (10%)   | 30y  | 3.00% | Same as above, also confirms low-rate case                                        |
| C3  | £500,000       | £250,000 (50%)  | 15y  | 6.50% | Same as above, also confirms short-term/high-deposit case                         |
| C4  | £1,000,000     | £100,000 (10%)  | 40y  | 4.10% | Same as above, also confirms large loan/long term                                 |
| C5  | £200,000       | £0 (0%)         | 25y  | 5.00% | Loan = full property price; figures match 100% LTV calculation                    |
| C6  | £220,000       | £220,000 (100%) | 25y  | 5.00% | Loan = £0; Monthly Payment = £0.00; Total Repaid = £0.00; no divide-by-zero error |

## 2. Correctness — interest-only mortgage, no deal

Same as above but with Mortgage Type = Interest Only. Expected: monthly
payment = loan × monthly rate (constant every month), total interest = monthly
payment × term months, and the balance at payoff equals the original loan
amount (never reduces).

| #   | Property Price | Deposit | Term | Rate  | Pass criteria                                                                                |
| --- | -------------- | ------- | ---- | ----- | -------------------------------------------------------------------------------------------- |
| C7  | £275,000       | £50,000 | 25y  | 5.25% | Monthly payment matches `loan × (rate/12)` within £1; total interest = monthly payment × 300 |
| C8  | £300,000       | £60,000 | 20y  | 4.75% | Same check; also confirms "still owe full loan" notice/vehicle wording appears               |

## 3. Correctness — fixed deal + reversion (SVR)

Enable "I have a fixed or tracker deal", Deal Type = Fixed (uses the Interest
Rate field as the deal rate), and check all three cards: During Your Deal,
After Your Deal, Summary.

| #   | Inputs                                                                        | Pass criteria                                                                                                                                                                                                                                                                                                                                     |
| --- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C9  | Price £275,000, Deposit £50,000, Term 25y, Rate 5.25%, Deal Term 5y, SVR 7.5% | During-deal monthly payment/interest/balance-at-end match a 25-year amortisation at 5.25% evaluated over the first 60 months. After-deal monthly payment matches a re-amortisation of the remaining balance over the remaining 240 months at 7.5%. Summary totals = during totals + after totals, and Total Interest = Total Repaid − Loan Amount |
| C10 | Deal Term = Mortgage Term (e.g. both 10y)                                     | "After Your Deal" card shows zeroed/empty state (£0 payment, no dates) instead of an error, since there's no post-deal period                                                                                                                                                                                                                     |
| C11 | Deal Term = 1y (minimum), Term = 45y (maximum)                                | Confirms the payoff/reversion math still works at the extremes of the allowed ranges                                                                                                                                                                                                                                                              |

## 4. Correctness — tracker deal

Deal Type = Tracker. Interest Rate field should become disabled/greyed with
the explanatory notice, and the deal rate used is Base Rate + Margin (not the
Interest Rate field's value).

| #   | Inputs                                                                                          | Pass criteria                                                                                                                                                           |
| --- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C12 | Price £275,000, Deposit £50,000, Term 25y, Base Rate 4.75%, Margin 0.5%, Deal Term 5y, SVR 7.5% | During-deal figures match amortisation at 4.75%+0.5%=5.25% (not whatever is left in the disabled Interest Rate field). Interest Rate input shows disabled + notice text |
| C13 | Base Rate 0%, Margin 0%                                                                         | Deal rate = 0%; monthly payment = loan / months during the deal period (straight-line, no interest)                                                                     |

## 5. Correctness — deposit mode equivalence

| #   | Steps                                                                | Pass criteria                                                                                                        |
| --- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| C14 | Set Property Price £275,000, Deposit £ = £55,000, switch toggle to % | Percent field shows 20.00%, LTV recalculates to 80.0%, no rounding drift beyond 0.01%                                |
| C15 | Set Deposit % = 33%, switch toggle to £                              | £ field shows £90,750 (33% of £275,000), and loan amount reflects the new deposit                                    |
| C16 | With Deposit % mode, change Property Price after setting %           | Deposit £ equivalent (shown via LTV/loan) updates proportionally; percent value itself stays fixed at what was typed |

## 6. Field-level sanity & bounds testing

For each row: perform the input action described, then check the pass
criteria (no crash, no `NaN`/`£NaN`/`Invalid Date` anywhere on the page,
values behave as described).

| #   | Field             | Action                                                                          | Pass criteria                                                                                                               |
| --- | ----------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| B1  | Property Price    | Type non-numeric characters (letters, symbols, emoji)                           | Characters are silently rejected; field only ever shows digits                                                              |
| B2  | Property Price    | Clear field to empty and blur                                                   | Field resolves to `0`; results show £0 property price, £0 loan (if deposit also 0), no crash                                |
| B3  | Property Price    | Enter a very large number (e.g. 999999999)                                      | No upper bound enforced — value accepted; results panel still renders formatted currency without overflow/wrapping issues   |
| B4  | Property Price    | Click "−10k" repeatedly from a low value (e.g. £5,000)                          | Value floors at £0, does not go negative                                                                                    |
| B5  | Deposit (£ mode)  | Set deposit greater than property price (e.g. price £100,000, deposit £150,000) | Loan Amount clamps to £0 (not negative); LTV shows 0%; monthly payment £0; no crash                                         |
| B6  | Deposit (£ mode)  | Click "+10k" repeatedly                                                         | Value clamps at Property Price value, does not exceed it                                                                    |
| B7  | Deposit (% mode)  | Try typing a value above 100 (e.g. "150")                                       | Input blocked at the point the value would exceed 100; cannot exceed 100%                                                   |
| B8  | Deposit (% mode)  | Type "0", "0.5", "99.99"                                                        | All accepted; 2 decimal places max enforced (typing a 3rd decimal digit is blocked)                                         |
| B9  | Mortgage Term     | Type "0" and blur                                                               | Clamped up to minimum of 1 year on blur                                                                                     |
| B10 | Mortgage Term     | Try typing "46" or higher                                                       | Blocked while typing — value cannot exceed 45                                                                               |
| B11 | Mortgage Term     | Clear field and blur                                                            | Resolves to minimum (1), not 0 or NaN                                                                                       |
| B12 | Mortgage Term     | Use the 15y/20y/25y/30y quick-select buttons                                    | Each updates both the numeric field and the toggle group highlight consistently                                             |
| B13 | Interest Rate     | Try typing above 10 (e.g. "15")                                                 | Blocked while typing — cannot exceed 10%                                                                                    |
| B14 | Interest Rate     | Set to 0                                                                        | Accepted; correctness case confirms straight-line (no-interest) amortisation, no divide-by-zero                             |
| B15 | Interest Rate     | Switch deal type to Tracker with "has deal" checked                             | Field becomes disabled and shows the disabled notice; its stale value is not used in calculations (cross-check against C12) |
| B16 | Start Date        | Try a date before 1970-01 (where the picker allows manual entry)                | Clamped to 1970-01 on blur                                                                                                  |
| B17 | Start Date        | Try a date more than 5 years in the future                                      | Clamped to December of (current year + 5) on blur                                                                           |
| B18 | Start Date        | Leave empty and blur                                                            | No crash; verify what the results panel shows (should not show "Invalid Date")                                              |
| B19 | Has Deal checkbox | Uncheck after filling in deal fields, then re-check                             | Deal fields group hides/reappears; previously entered Deal Term/SVR/rates are retained (not reset)                          |
| B20 | Deal Term         | Try typing above 10                                                             | Blocked while typing — cannot exceed 10 years                                                                               |
| B21 | Deal Term         | Set Deal Term > Mortgage Term (e.g. Deal Term 10y, Mortgage Term 5y)            | No crash; "After Your Deal" section is hidden/zeroed since there's no remaining term (mirrors C10)                          |
| B22 | SVR / Base Rate   | Try typing above 15                                                             | Blocked while typing — cannot exceed 15%                                                                                    |
| B23 | Margin            | Try typing above 10                                                             | Blocked while typing — cannot exceed 10%                                                                                    |
| B24 | Any numeric field | Paste a value with commas/spaces (e.g. "275,000") into Property Price           | Non-digit characters stripped; only digits retained                                                                         |
| B25 | Any percent field | Type a leading decimal point (".5")                                             | Accepted, treated as 0.5                                                                                                    |

## 7. Output / UI consistency checks

| #   | Check                                                       | Pass criteria                                                                                                                                        |
| --- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| U1  | Loan to Value badge                                         | Updates live as Property Price or Deposit changes, matches `loan / price × 100` rounded to 1 decimal                                                 |
| U2  | Payment Schedule accordion (Single / During / After cards)  | Expands to show monthly + annual amortisation rows; last row's balance is £0 for repayment mortgages (or equals the original loan for interest-only) |
| U3  | Mortgage payoff / deal end dates                            | Match Start Date + term/deal-term months exactly (e.g. Sep 2026 start + 25y term = Sep 2051)                                                         |
| U4  | "During Your Deal" vs "After Your Deal" payment change text | Correctly labelled "increase" vs "decrease" and the £ delta matches (after payment − during payment)                                                 |
| U5  | Switching Mortgage Type between Repayment and Interest Only | Results panel updates all cards immediately; interest-only shows the "still owe the full loan" notice, repayment does not                            |
| U6  | Submitting the form (See Results button)                    | Page scrolls to the correct results card (`single-result-card` when no deal, `during-deal-card` when a deal is set)                                  |
| U7  | Currency/percent formatting                                 | All £ values show thousands separators and 2dp where applicable (e.g. £1,348, not £1348.xx or £1,348.00 inconsistently)                              |

---

## Out of scope for this plan

- Automated unit tests for `calculations.ts` (already covered by
  `index.test.tsx` / any Jest specs — should be reviewed separately).
- Cross-browser/responsive layout testing.
- Accessibility (labels/ARIA) — flagged only incidentally where relevant to a
  test above.
