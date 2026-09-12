---
id: doc-0001
title: UK Company Formation Service Research
type: other
created_date: '2026-08-14 07:37'
updated_date: '2026-08-14 07:38'
tags:
  - business-legal
  - research
---
Research to support TASK-0001 (Register parent company), acceptance criterion #3 "Formation service to use decided".

Researched August 2026. All prices verified against provider sites at that date, but formation-agent pricing changes often — re-check at checkout.

## Requirements this is judged against

1. Form a **private company limited by shares** (Ltd) in England & Wales.
2. Keep the **home address off the public Companies House register** — this needs *two* separate addresses, not one:
   - **Registered office address** — the company's public address. Must be an "appropriate address" under ECCTA 2023 (mail must be capable of being delivered and acknowledged; PO boxes are not allowed).
   - **Director's service address** (and PSC service address) — the correspondence address for each officer, also public.
3. **Mail handling** — scanned to email, with the option of physical forwarding.
4. Must support the downstream tasks: business bank account (TASK-0002) and Google AdSense (TASK-0006).

## Regulatory context (2026 — this has changed recently)

- **Companies House incorporation fee is now £100** (digital), doubled from £50 on **1 February 2026**. Every "cheap" formation price below is *agent fee + £100*. Any page quoting £50 is stale.
- **Identity verification is mandatory.** Since **18 November 2025**, all directors and PSCs must verify their identity and hold a **Companies House personal code**. Verification is done either free via GOV.UK One Login, or through an **Authorised Corporate Service Provider (ACSP)** — typically £20–£30. The mainstream formation agents are ACSPs and now bundle IDV into their base package.
- Existing directors/PSCs on pre-existing companies have until **autumn 2026** to comply. Not relevant to a new incorporation, which verifies up front.
- **Retrospective address suppression exists but costs money and has gaps.** Form **SR01** removes a residential address from the public register at **£34 per document**. Since January 2025 this extends to a home address previously used as a *registered office* — but you cannot suppress a *current* registered office; you must change it first. Practical consequence: **use a commercial address from day one.** Retrofitting is slower, costs £34 a pop, and the old address may already be in third-party data scrapes.

### The distinction that actually matters for mail

Most "registered office" services only handle **statutory government mail** (Companies House, HMRC, courts, ICO) and scan that free. **General business mail** — bank correspondence, suppliers, AdSense PIN verification postcards — needs a separate, more expensive **business address** / virtual office product. Buying only a registered office and expecting all post to arrive is the most common mistake here.

## Options compared

### 1. Direct with Companies House

| | |
|---|---|
| Cost | **£100** one-off, nothing else |
| Address privacy | None — you supply your own addresses |
| Mail | None |

**Pros:** cheapest possible; no third party in the loop; IDV free via GOV.UK One Login.
**Cons:** you must source a registered office and service address separately, so this is only the cheapest route if paired with a standalone address provider. No company documents pack, no confirmation-statement handling, no support.

**Verdict:** viable *only* as "Companies House direct + Hoxton Mix" (see option 5). Not viable alone given the privacy requirement.

### 2. 1st Formations — Privacy Package

| | |
|---|---|
| Package price | **£117.99 inc. the £100 CH fee** (£17.99 agent fee + VAT + £100) |
| Includes | Incorporation + IDV, **Covent Garden registered office**, **director service address**, **London business address**, first confirmation statement filed, document template library |
| Year-2 renewals | Registered office **£39/yr**, service address **£26/yr**, business address **£96/yr** (all + VAT) |

**Pros:** the only sub-£120 package that covers *all three* address types in year one, including the business address that handles general/commercial post. Same-day incorporation. Central London (Covent Garden) address. Mature, well-reviewed provider; free scan-and-email of government mail.
**Cons:** the year-1 price is a loss-leader — renewing everything is **~£161/yr + VAT** from year two. Business address is the expensive component. Shared prestige-London address used by tens of thousands of companies, which some banks and payment processors treat as a mild risk signal.

### 3. Rapid Formations — Privacy Package

| | |
|---|---|
| Package price | **£114.99 inc. the £100 CH fee** (£14.99 agent fee + £100) |
| Includes | Incorporation + IDV & personal code, London registered office, London service address, London business address, first confirmation statement, free business bank account referral |
| Year-2 renewals | Registered office **£39/yr**; other address services priced similarly to 1st Formations |

**Pros:** essentially identical offer to 1st Formations, a few pounds cheaper.
**Cons:** **Rapid Formations and 1st Formations are sister brands operating from the same Covent Garden address** — treat them as one option with two price points, not as independent alternatives or as a diversification of risk. Slightly thinner post-incorporation tooling than 1st Formations.

### 4. Companies MadeSimple — Comprehensive / Ultimate

| | |
|---|---|
| Package price | from **£104.99 inc. the £100 CH fee**; privacy-bearing tiers (Comprehensive / Ultimate) cost more |
| Includes | Comprehensive: registered office + service address + confirmation statement. Ultimate adds mail forwarding, PSC register maintenance, 20 days co-working |
| Year-2 renewals | Optional annual renewal; **prices only visible behind a login** |

**Pros:** long-established (MadeSimple Group), good Trustpilot record, Ultimate bundles physical mail forwarding rather than scan-only.
**Cons:** **renewal pricing is not published publicly**, which is a genuine mark against it when the whole cost story is in years 2+. Some of their own marketing pages still quote the old £50 CH fee, so entry pricing needs verifying at checkout.

### 5. Companies House direct + Hoxton Mix virtual office (unbundled)

| | |
|---|---|
| Cost | **£100** one-off + **~£249.99/yr** (£20.83/mo billed annually) or £24.99/mo monthly |
| Includes | 66 Paul Street, Shoreditch EC2A 4NA. Registered office + service address + business address in one product. Free mail scanning with same-day notification, 30-day storage, in-person collection. Physical forwarding at cost (1st class stamp + 50p) |

**Pros:** **the best mail product of anything here** — scanning covers *all* mail, not just government mail, so AdSense verification post and bank correspondence are handled. One transparent, published price with no year-1/year-2 cliff. Address-specialist rather than a formation agent using the address as a loss-leader.
**Cons:** roughly **£250/yr vs ~£65/yr** for a registered-office-plus-service-address-only setup, so it is the most expensive option if you never receive general business post. You do the incorporation and first confirmation statement yourself. Two suppliers to manage rather than one.

### 6. Bank-bundled: Tide (£14.99) / ANNA (£19)

| | |
|---|---|
| Cost | **£114.99** (Tide) or **£119** (ANNA) inc. the £100 CH fee |
| Includes | Incorporation + a business current account |

**Pros:** cheapest route that also solves TASK-0002 (business bank account) in the same flow. Tide issues the certificate within one business day. ANNA supports up to 4 directors/shareholders at setup (Tide is more restrictive).
**Cons:** **no registered office or service address included** — the default is that you use your home address, which fails the core requirement of this task. Adding an address service separately erases the price advantage. Also couples the legal entity to one bank at the moment of formation, which is a bad time to be locked in; account opening can still be declined *after* incorporation.

## Cost summary

| Option | Year 1 (inc. £100 CH fee) | Year 2+ recurring | Home address hidden? | General business mail handled? |
|---|---|---|---|---|
| Companies House direct | £100 | £0 | ✗ | ✗ |
| Tide / ANNA | £115 / £119 | £0 | ✗ | ✗ |
| Companies MadeSimple | from £105 | not published | ✓ | Ultimate tier only |
| Rapid Formations Privacy | £115 | ~£39 (RO) to ~£161 (all three) + VAT | ✓ | Year 1 only, unless renewed |
| 1st Formations Privacy | £118 | £39 / £26 / £96 + VAT = ~£161 all three | ✓ | Year 1 only, unless renewed |
| CH direct + Hoxton Mix | £350 | £250 | ✓ | ✓ |

Realistic ongoing cost if you drop the business address after year one and keep only registered office + service address: **~£78/yr inc. VAT** with 1st Formations or Rapid Formations.

## Recommendation

**1st Formations Privacy Package (£117.99 all-in), then decide at renewal whether to keep the business address.**

Reasoning:

- It meets every stated requirement — Ltd, registered office, service address, business address, scanned mail — for £18 above the bare Companies House fee. At that margin the unbundled route is not worth the extra admin in year one.
- The confirmation statement is filed for you in year one, which removes the single most commonly missed compliance deadline for a first-time company.
- The year-2 decision is a real one and should be made deliberately, not by default: if AdSense and the bank both end up sending physical post that matters, **£96/yr for the business address is worth it**; if everything is digital, drop to registered office + service address at ~£78/yr inc. VAT.
- Rapid Formations is £3 cheaper and functionally the same — if you prefer it, take it, but understand it is the same company, so choosing it is not a hedge.

**Choose Hoxton Mix + Companies House direct instead if** you expect meaningful volume of ordinary business post, or you want one flat published price with no renewal-cliff games. It is about £250/yr against roughly £78–£161/yr, and the mail handling is materially better.

**Do not** form through Tide or ANNA. The £115 headline looks competitive but it does not include any address service, so the home address goes on the public register — which is the specific thing this task is trying to avoid. Open the bank account separately under TASK-0002.

### Practical notes for execution

- Verify identity via **GOV.UK One Login before starting** — it is free, and going through an ACSP for IDV costs £20–£30 for the same personal code.
- Use the commercial address for the registered office **from incorporation**. Do not incorporate at home intending to change it later; that path costs £34 per SR01 and cannot suppress a *current* registered office.
- Under ECCTA the company also needs a **registered email address** at incorporation. It is not published on the public register, but use a company address (e.g. one on the freecalculators.co.uk domain), not a personal one.
- Check the chosen company name against the Companies House index **and** for trade-mark conflict before paying — this feeds acceptance criterion #4, which is still open.

## Open items for TASK-0001

- AC #3 — decision needed from you between **1st Formations Privacy** (recommended) and **CH direct + Hoxton Mix**.
- AC #4 — company name is not yet decided; nothing in this research resolves it.
- AC #1, #2, #5 — follow once #3 and #4 are settled.

## Sources

- [Companies House fees from 1 February 2026 — Inform Direct](https://www.informdirect.co.uk/opinion/companies-house-fees-from-1-february-2026/)
- [Companies House fees are increasing from 1 February 2026 — 1st Formations](https://www.1stformations.co.uk/blog/companies-house-filing-fees-increase/)
- [1st Formations price list](https://www.1stformations.co.uk/pricing/)
- [1st Formations Privacy Package](https://www.1stformations.co.uk/package/privacy/)
- [1st Formations registered office service](https://www.1stformations.co.uk/registered-office-service/)
- [Rapid Formations](https://www.rapidformations.co.uk/)
- [Rapid Formations London registered office](https://www.rapidformations.co.uk/additional-services/london-registered-office/)
- [Rapid Formations — remove home address from the Companies House register](https://www.rapidformations.co.uk/blog/remove-home-address-from-companies-house-register/)
- [Companies MadeSimple](https://www.companiesmadesimple.com/)
- [Companies MadeSimple — Comprehensive package features](https://support.companiesmadesimple.com/hc/en-us/articles/4408611339409-Comprehensive-Package-Features)
- [Companies MadeSimple — Ultimate package features](https://support.companiesmadesimple.com/hc/en-us/articles/4408616391185-Ultimate-Package-Features)
- [Hoxton Mix registered office service](https://www.hoxtonmix.com/)
- [Hoxton Mix virtual office cost](https://help.hoxtonmix.com/en/article/how-much-does-a-virtual-office-cost-6zf5ws/)
- [Tide company registration](https://www.tide.co/company-registration/)
- [ANNA — Tide company formation review](https://anna.money/blog/guides/tide-company-formation-review/)
- [Authorised corporate service providers — GOV.UK](https://changestoukcompanylaw.campaign.gov.uk/authorised-corporate-service-providers)
- [ACSPs and ID verification — ICAEW](https://www.icaew.com/regulation/aml-supervision/aml-resources/acsp-and-id-verification)
- [Form SR01 (v8.0) — Companies House](https://assets.publishing.service.gov.uk/media/687a24059b1337e9a7726b6f/SR01_v8.0-final.pdf)
