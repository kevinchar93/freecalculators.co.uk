---
id: TASK-0001
title: Register parent company
status: To Do
assignee: []
created_date: '2026-08-12 23:36'
updated_date: '2026-08-15 01:25'
labels:
  - business-legal
dependencies: []
documentation:
  - doc-0001 - UK-Company-Formation-Service-Research.md
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Register the parent company through a company formation service so we have a legal entity to operate the site, open a bank account, and sign up for AdSense. Prerequisite for banking and monetisation.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Company is registered and incorporation confirmation/number received
- [ ] #2 Registered office and director details recorded
- [ ] #3 Formation service to use decided
- [ ] #4 Company name decided
- [ ] #5 All details for creation noted
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Researched UK company formation options for AC #3. Findings, cost comparison and recommendation are in doc-0001 (UK Company Formation Service Research).

Recommendation: 1st Formations Privacy Package, GBP 117.99 all-in (includes the GBP 100 Companies House fee, Covent Garden registered office, director service address, London business address and first confirmation statement). Alternative if heavier general business post is expected: Companies House direct (GBP 100) plus Hoxton Mix virtual office (~GBP 250/yr), which scans all mail rather than government mail only.

Ruled out Tide/ANNA bank-bundled formation: no address service, so the home address would go on the public register.

Key 2026 constraints captured: Companies House digital incorporation fee rose to GBP 100 on 1 Feb 2026; director/PSC identity verification mandatory since 18 Nov 2025 (get the personal code free via GOV.UK One Login); use a commercial registered office from incorporation, since suppressing a home address afterwards needs form SR01 at GBP 34 per document and cannot be done for a current registered office.

AC #3 still needs your decision between the two shortlisted options; AC #4 (company name) is untouched.

Structure clarified (Aug 2026): 'parent company' here means one trading Ltd operating multiple ad-funded websites under a single banner, sole director and shareholder - not a holding company owning subsidiaries. doc-0001's recommendation is unaffected. Practical consequences captured in doc-0002: banks reject holding companies and corporate PSCs, so if a successful site is later spun into its own company, holding it personally rather than under this company keeps the free bank accounts available. Company name should therefore be a portfolio-neutral banner, not tied to freecalculators.co.uk, since individual sites can trade under their own unregistered trading names.
<!-- SECTION:NOTES:END -->
