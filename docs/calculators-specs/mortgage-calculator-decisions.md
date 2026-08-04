# Mortgage Calculator — Decision Record

A running log of notable design/spec decisions for the mortgage calculator. 

Each entry: what was decided, why, and the date it was decided. Newest at the top.

## Zero interest rate (`r = 0`) is rejected at input validation

2026-08-02

A 0% rate is not a real commercial mortgage, so we reject it at input validation rather than computing a result and warning the user.

Reasoning:
- Showing a monthly payment for a 0% loan legitimises a number that can't occur; users anchor on the figure and skim the caveat, which works against the payment-shock framing the whole calculator is built around.
- Rejecting at the input means every downstream formula can assume `r > 0`, so the `r = 0` branches are defensive guards only, not a supported path.
- For trackers, the rule applies to the effective `base rate + margin`.

The zero-interest limit formulas (`P / n`, `P * (1 - k/n)`, etc.) are kept in the spec as documented defensive guards — cheap insurance against a bad default from `market-rates.json` — but are expected to be unreachable in normal use.
