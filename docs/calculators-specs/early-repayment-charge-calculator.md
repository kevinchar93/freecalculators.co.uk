# Early Repayment Charge (ERC) Calculator

## Description

Estimates the financial penalty ("Early Repayment Charge") for breaking a fixed-rate (or other tied-in) mortgage deal before the end of its term, and helps users weigh this against potential savings from remortgaging or porting.

## Inputs

| Input | Type | Notes |
|---|---|---|
| Outstanding mortgage balance | Currency (£) | Balance the ERC is calculated against |
| ERC rate | % | Default 1–5% depending on page; often tiered by year remaining |
| Tiered ERC schedule | Optional table | e.g. Year 1: 5%, Year 2: 4%, Year 3: 3% — toggle for tiered vs flat rate |
| Years remaining on deal | Number | Used to select the applicable tier if tiered schedule is used |
| Reason for exit | Enum | Remortgaging / Moving house (porting) / Other |

## Outputs

- Early Repayment Charge amount (£)
- ERC as % of outstanding balance
- If "moving house": comparison of porting the existing deal (no ERC) vs. paying the ERC and taking a new deal elsewhere
- Net cost/benefit if paired with the Remortgage Calculator (potential savings minus ERC), where applicable

## Calculations

- Flat rate ERC: `ERC = Outstanding balance * ERC rate`
- Tiered ERC: look up the rate for the current year remaining from the tiered schedule, then apply flat-rate formula using that year's rate
- Porting vs. paying ERC comparison: `Cost of paying ERC and switching = ERC + new deal fees - savings from new deal over remaining term`, compared against `£0` (cost of porting, assuming same rate carries over)

## pSEO Variations

| URL | Preloaded defaults |
|---|---|
| `/early-repayment-charge-calculator` | None (blank/default state) |
| `/early-repayment-charge-calculator/1-percent-fee` | 1% fee rate |
| `/early-repayment-charge-calculator/2-percent-fee` | 2% fee rate |
| `/early-repayment-charge-calculator/5-percent-fee` | 5% fee rate |
| `/early-repayment-charge-calculator/moving-house` | Copy focused on porting vs. paying ERC |
