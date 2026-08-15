---
id: TASK-0002
title: Open business bank account
status: To Do
assignee: []
created_date: '2026-08-12 23:37'
updated_date: '2026-08-15 01:25'
labels:
  - business-legal
dependencies:
  - TASK-0001
documentation:
  - doc-0002
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Open a business bank account for the registered company to handle AdSense payouts and operating costs.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Business current account opened in the company name
- [ ] #2 Account details available for AdSense payout setup
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Researched free UK business bank accounts for the new Ltd. Findings, option comparison and recommendation are in doc-0002 (UK Business Bank Account Research).

Structure confirmed: one trading Ltd, sole director and shareholder, operating multiple ad-funded websites under one banner - not a holding company with subsidiaries. All shortlisted providers accept this.

Recommendation: Mettle (NatWest) - free, FSCS-protected to GBP 120k, mobile and web, and includes FreeAgent free (list price GBP 33/mo + VAT for a limited company; covers VAT, MTD and Corporation Tax filing) provided at least one transaction is made per month. FreeAgent also gives the per-site cost tracking needed to judge which sites are worth keeping. Second choice Starling (better bank and web app, no free accounting software, GBP 7/mo optional Business Toolkit). Fallback Tide if the structure ever changes.

Revisit trigger: Mettle caps at two PSCs (individuals only) and Starling refuses holding companies and corporate PSCs. If a successful site is later spun into its own company, owning it personally keeps both banks available; owning it via this company does not.

Formation service and commercial registered office are not an obstacle; virtual/registered office addresses are accepted by all shortlisted providers. Expect to be asked separately for a trading address.

AdSense link (TASK-0006): payout account must be in the company name; one organisation AdSense account can serve unlimited sites, but a policy breach on any one site risks the whole account and therefore all revenue. AdSense posts a six-digit PIN by ordinary international post at the verification threshold - ~3 weeks to arrive, 4 months to enter, ads stop if unverified - so the AdSense payments address must receive general commercial mail, not a government-mail-only registered office.

Legal note for TASK-0004/0005: a Ltd may use unlimited trading names without registering them, but under CA 2006 and the Names and Trading Disclosures Regulations 2015 every site must display the registered company name, number, place of registration and registered office address. Build this into the shared layout once.
<!-- SECTION:NOTES:END -->
