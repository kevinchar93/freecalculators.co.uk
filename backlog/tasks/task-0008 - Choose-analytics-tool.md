---
id: TASK-0008
title: Choose analytics tool
status: To Do
assignee: []
created_date: '2026-08-12 23:37'
updated_date: '2026-08-15 01:26'
labels:
  - decisions
dependencies: []
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Evaluate Fathom, Simple Analytics, and PostHog and pick one. Note whether it covers error monitoring (PostHog does) or whether a separate tool is needed later.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Analytics tool selected with rationale recorded
- [ ] #2 Decision notes whether error monitoring is covered or deferred
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Research completed and written up in doc-0004 (Analytics Tool Research). Key findings that change the task's original framing: (1) AdSense mandates a Google-certified IAB TCF CMP for UK/EEA traffic regardless of analytics choice, so 'avoids the cookie banner' — the main commercial argument for Fathom/Simple Analytics — is a benefit this site cannot collect; (2) only GA4 can join AdSense earnings to page/traffic data, which is the site's primary commercial question; (3) Fathom and Simple Analytics are traffic counters with no session replay, heatmaps or funnels, so they do not answer 'why do users abandon a calculator'. Recommended stack: GA4 (AdSense join) + Microsoft Clarity (replay/heatmaps, free and uncapped) + Sentry free tier (error monitoring), total GBP 0/month, with documented triggers for later moving to Plausible (1-10 sites), Fathom (10+ sites) or PostHog (funnels + bundled error tracking). AC #2: error monitoring is NOT covered by GA4/Clarity/Fathom/Plausible/Simple Analytics; it IS covered by PostHog (100k exceptions/mo free). If PostHog is not chosen, error monitoring should be a separate task defaulting to Sentry. Decision itself still pending user selection.
<!-- SECTION:NOTES:END -->
