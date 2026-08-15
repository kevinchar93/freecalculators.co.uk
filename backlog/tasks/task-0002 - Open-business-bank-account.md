---
id: TASK-0002
title: Open business bank account
status: To Do
assignee: []
created_date: '2026-08-12 23:37'
updated_date: '2026-08-15 01:14'
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

Recommendation: Mettle (NatWest) - free, FSCS-protected to GBP 120k, mobile and web, and includes FreeAgent free (list price GBP 33/mo + VAT for a limited company, covers VAT, MTD and Corporation Tax filing) provided at least one transaction is made per month. Second choice Starling (better bank, better web app, no free accounting software, GBP 7/mo optional Business Toolkit). Fallback Tide if company structure rules the others out.

Blocking dependency on TASK-0001: Starling refuses holding companies and any company with corporate PSCs; Mettle caps at two PSCs, both individuals. If 'parent company' means a genuine holdco with subsidiaries, both are unavailable and Tide or Revolut (GBP 10/mo) become the realistic options. Confirm the intended structure before applying - clustered declined applications are themselves a risk signal.

Formation service and commercial registered office are not an obstacle; virtual/registered office addresses are accepted by all shortlisted providers. Expect to be asked separately for a trading address.

AdSense link (TASK-0006): payout account must be in the company name; AdSense posts a six-digit PIN by ordinary international post at the verification threshold, ~3 weeks to arrive, 4 months to enter, ads stop if unverified - so the AdSense payments address must be one that receives general commercial mail, not a government-mail-only registered office.
<!-- SECTION:NOTES:END -->
