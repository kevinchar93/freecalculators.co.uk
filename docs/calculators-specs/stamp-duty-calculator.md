# Stamp Duty (SDLT) Calculator

## Description

Calculates UK Stamp Duty Land Tax (England & Northern Ireland) owed on a residential property purchase, accurate to the current 2026 post-April threshold rules. Accounts for first-time buyer relief, additional-property surcharge, and non-UK resident surcharge.

## Inputs

| Input | Type | Notes |
|---|---|---|
| Property price | Currency (£) | Default £250,000 |
| Buyer status | Enum | First-time buyer / Moving home (replacing main residence) / Additional property (second home / BTL) |
| Non-UK resident | Boolean | Adds 2% surcharge on top of applicable rate |
| Country | Enum (fixed) | England / Northern Ireland only (Scotland/Wales use separate LBTT/LTT, out of scope — show notice) |

## Outputs

- Total SDLT payable (£)
- Effective tax rate (%)
- Breakdown by band (£ tax per threshold band, showing marginal rate applied)
- Surcharge amount applied, shown separately (additional-property 5% and/or non-resident 2%)
- Comparison: tax payable if buyer were in a different status (e.g. FTB vs standard), where relevant to the page

## Calculations

- SDLT is banded/marginal: tax is calculated by applying each band's rate only to the portion of the price within that band, then summing.
- First-time buyer relief: 0% up to relief threshold, then standard bands apply above it (with relief withdrawn entirely above the upper price cap, per HMRC rules — full price taxed at standard bands with no relief).
- Additional property surcharge: flat +5 percentage points applied to every band (including bands that would otherwise be 0%), on the entire consideration.
- Non-UK resident surcharge: flat +2 percentage points applied on top of whichever rate schedule (standard/FTB/additional) otherwise applies.
- Band thresholds and rates are stored in `market_rates.json` (or equivalent config) so they can be updated without a code deploy when HMRC thresholds change.
- Total tax = Σ (portion of price in band × band rate), across all applicable bands, plus any flat surcharge percentage applied per band.

## pSEO Variations

| URL | Preloaded defaults |
|---|---|
| `/stamp-duty-calculator` | None (blank/default state) |
| `/stamp-duty-calculator/first-time-buyer` | FTB status active |
| `/stamp-duty-calculator/moving-home` | Standard single property status |
| `/stamp-duty-calculator/second-home-surcharge` | Additional property, 5% surcharge active |
| `/stamp-duty-calculator/buy-to-let` | Additional property surcharge active, tailored copy for landlords |
| `/stamp-duty-calculator/non-uk-resident` | 2% non-resident surcharge applied |
