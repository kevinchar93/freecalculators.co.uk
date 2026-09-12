---
id: doc-0004
title: Analytics Tool Research
type: other
created_date: '2026-08-15 01:23'
updated_date: '2026-08-15 01:26'
tags:
  - research
  - analytics
  - decisions
---
Research to support TASK-0008 (Choose analytics tool). Related: doc-0003 (Privacy Policy Research), TASK-0006 (AdSense application), TASK-0009 (Consent banner service).

Researched August 2026. Prices are list prices in the vendor's own currency, checked against vendor pricing pages where possible and against secondary sources where the vendor hides tiers behind a slider. Treat every figure as "verify at signup" — analytics pricing moves often, and Fathom in particular has repriced more than once.

## The short version

**Recommended stack, and it costs £0/month to start:**

| Layer | Tool | Cost | Why |
|---|---|---|---|
| Traffic + ad revenue | **Google Analytics 4** | Free | Only tool that joins AdSense earnings to page/traffic data. This is the whole point for an ad-funded site. |
| Behaviour / optimisation | **Microsoft Clarity** | Free, uncapped | Heatmaps + session replay + rage-click detection. This is what actually tells you *why* people bounce off a calculator. |
| Error monitoring | **Sentry** (free Developer tier) | Free to 5k errors/mo | Deferred, but wire it in when you launch. Not covered by either of the above. |

Upgrade path if and when GA4 becomes painful: add **Plausible** (~$14/mo Growth, 3 sites) as a clean, fast, shareable traffic dashboard and keep GA4 running purely for the AdSense join.

**The single most important finding:** the cookie question does not decide this. You are running AdSense, which means you must run a Google-certified IAB TCF CMP for UK/EEA traffic anyway (see doc-0003 §3). The consent banner exists no matter what analytics you pick. So the usual reason to pay for Fathom/Plausible/Simple Analytics — "avoid the cookie banner" — **does not apply to you**. That removes the main commercial argument for the paid privacy tools and materially changes the answer the original task assumed.

The second most important finding: **the tools you actually need for *optimisation* (heatmaps, session replay, funnels) are exactly the ones Fathom and Simple Analytics do not have.** They are traffic counters. Good ones, but counters.

---

## 1. What you actually need this for

Be specific, because it changes the answer. For freecalculators.co.uk the questions worth answering are:

1. **Which calculators get used, and which get abandoned?** Traffic counting answers the first half. Only event tracking answers the second.
2. **Where does traffic come from?** Organic search is presumably the whole growth strategy. Needs referrer + landing-page + (ideally) Search Console integration.
3. **Do people actually complete a calculation?** This is a funnel: land → interact with a field → see a result. Needs custom events at minimum.
4. **Why do people give up?** Confusing field, mobile layout breaking, a control they don't understand. Only session replay and heatmaps answer this. No aggregate-numbers tool ever will.
5. **Which pages earn?** RPM per page, ad viewability vs. layout. Needs the AdSense↔analytics join.
6. **Is the site broken for anyone?** JS errors on a specific browser silently killing the calculator. Needs error monitoring — a separate category, see §6.
7. **Across several sites, which is worth more effort?** Needs multi-site support without multi-site pricing.

Note that (4) and (5) are the two that most directly turn into money, and they are served by two *free* tools (Clarity and GA4) that most "privacy-first analytics" comparisons never mention, because those comparisons are written by the vendors of the paid tools.

---

## 2. The cookie question — resolved, and it's not what the task assumed

TASK-0008 was framed around Fathom / Simple Analytics / PostHog, which is a "privacy-first, cookieless" shortlist. The framing is worth revisiting:

- **You are already serving cookies.** AdSense sets advertising cookies. Google's EU user consent policy requires a Google-certified, IAB TCF v2.2-registered CMP for UK/EEA/Swiss traffic. That banner is mandatory and non-negotiable if you want AdSense. (doc-0003 §3.)
- **So "no cookie banner" is a benefit you cannot collect.** You will have a banner regardless.
- **What cookieless analytics still buys you** is narrower but real: (a) analytics data is collected even from users who reject the analytics purpose in the CMP, *if* the tool qualifies for the DUAA 2025 low-risk-analytics exception; (b) no analytics vendor gets a cookie of their own; (c) a cleaner privacy policy. Under the Data (Use and Access) Act 2025 there is now a statutory exception for low-risk analytics storage/access — this is the change that makes cookieless analytics genuinely exempt in UK law rather than merely "probably fine." Worth confirming with whoever reviews your policy, but it means a cookieless tool can legitimately run pre-consent while GA4 cannot.
- **Practical consequence:** GA4 will under-report by however many users reject consent (typically 10–40% in the UK). Google Consent Mode v2 fills some of that gap with modelled data. A cookieless tool would report closer to 100%. If you care about *accurate* traffic numbers, that is the actual argument for running a second, cookieless tool alongside GA4 — not the banner.

**Verdict:** treat cookies as a non-factor in tool selection, and treat "consent-rejection under-reporting" as a data-quality factor that may later justify a cheap second tool.

---

## 3. Category map

Do not compare these tools as though they are one market. There are four:

| Category | What it answers | Tools |
|---|---|---|
| **Traffic analytics** | How many, from where, to which page | GA4, Plausible, Fathom, Simple Analytics, Umami, Cloudflare, Matomo |
| **Product analytics** | What did users *do*, in what order, and did they finish | PostHog, Matomo (with plugins), GA4 (clumsily), Mixpanel/Amplitude (overkill) |
| **Behavioural / UX** | *Why* did they fail | Microsoft Clarity, Hotjar, PostHog replay, Matomo heatmap plugin |
| **Error monitoring** | Is it broken | Sentry, PostHog error tracking, Laravel Pail/logs (not a substitute) |

A calculator site needs at least one from **traffic**, one from **behavioural**, and eventually one from **error**. Product analytics is a nice-to-have that PostHog gives you for free anyway.

---

## 4. The tools, in detail

### Google Analytics 4 — free
**What it is:** the default. Event-based, hugely capable, unpleasant to use.

- **Cost:** free up to 10M events/month per property. Effectively free forever at your scale. GA360 (paid) is ~$50k/yr and irrelevant.
- **Multi-site:** unlimited properties under one account, free. Best-in-class for a portfolio of sites — no marginal cost per site, ever. This is a genuinely strong argument if you launch several calculator sites.
- **Unique advantage — the AdSense link:** link AdSense → GA4 (AdSense → Account → Access and authorization → Google Analytics integration) and earnings appear in **Monetization → Publisher ads**, joined to traffic source and page. You can see RPM by landing page, by device, by channel. **No other tool on this list can do this.** For a site whose entire revenue model is AdSense, this is close to decisive.
- **Also free and joinable:** Search Console integration (query → landing page → behaviour), and BigQuery export (free tier, raw event-level data, no sampling — a real escape hatch).
- **Downsides, honestly:**
  - Interface is genuinely bad. Reports take clicks to build, and "Explorations" is a small BI tool you have to learn.
  - **Data thresholding**: at low traffic, GA4 hides rows to prevent re-identification (roughly when a segment falls under ~30–50 users). A brand-new site will see "(not set)" and blanked demographic rows a lot. Annoying precisely when you're smallest.
  - **Cardinality**: dimensions with >500 unique daily values collapse into "(other)". Not a near-term problem for you; would be if you ever put calculator inputs into event parameters (**don't** — see doc-0003 on query strings).
  - Standard reports are unsampled; ad-hoc explorations can sample at high volume. Not your problem yet.
  - Requires consent, so under-reports post-banner.
  - Data is Google's. If your privacy positioning is "we don't spy on you," running GA4 is in tension with that — though you're running AdSense, so that ship has largely sailed.

### Microsoft Clarity — free, uncapped
**What it is:** heatmaps, session recordings, and friction detection. Free, with no traffic cap, no recording cap, no paid tier.

- **Cost:** £0. Genuinely, with no volume ceiling and no upsell. Microsoft's motive is aggregate web behaviour data for its own models/ads business — that is the trade, and it should be stated in your privacy policy.
- **What you get:** session replay, click/scroll/area heatmaps, **rage clicks**, **dead clicks**, **excessive scrolling**, JS-error-tagged sessions, funnels, segments, and a GA4 integration that lets you jump from a GA4 segment to the matching recordings.
- **Why it matters for you specifically:** a mortgage calculator is a form. Forms fail in ways aggregate numbers cannot show — a user tapping a slider that doesn't respond on mobile, mis-reading which field is "term" vs "rate," rage-clicking a disabled button. Watching ten sessions on your mortgage page will teach you more in an hour than a month of pageview charts. This is the highest-value-per-pound item on the entire list.
- **Downsides:** ~30-day rolling retention on recordings (some sources say 90 for aggregate data) — it's for investigation, not longitudinal reporting. It sets cookies and needs consent. Session replay is the most privacy-sensitive thing you will run, so **you must mask the calculator input fields** (Clarity masks by default, but verify — `data-clarity-mask` on the form). Recording someone's salary and mortgage balance would be a serious problem; see doc-0003.
- **Multi-site:** unlimited projects, free.

### Plausible — from $9/mo
**What it is:** the best-liked of the paid, privacy-first traffic tools. Open-source, EU-hosted (Germany), cookieless.

- **Cost (per month, at the 10k-pageview tier; annual billing gives ~2 months free):**
  - Starter $9 — **1 site**, 3-year retention
  - Growth $14 — **3 sites**, up to 3 team members
  - Business $19 — **10 sites**, 5-year retention, + funnels, custom properties, Stats API, Looker Studio, ecommerce revenue, consolidated cross-site view
  - Price scales with pageviews on top of tier: roughly Growth ~$19/mo at 100k pv, Business ~$29/mo at 200k pv. Enterprise above 10M.
- **Overage policy is the friendliest on this list:** one month over your limit costs nothing. Two consecutive months over → they ask you to upgrade; after a week's grace the dashboard locks but **collection continues**, and it unlocks automatically if usage drops back. No surprise bills.
- **Strengths:** one-page dashboard that is actually pleasant, sub-1KB script, no cookies (DUAA-exempt, so it collects from consent-rejectors), goals and custom events on every tier, public shareable dashboards, GA import, EU data residency, and a **consolidated view** across sites on Business — the right feature if you run a portfolio.
- **Weaknesses:** funnels are Business-tier only. No session replay, no heatmaps. Cannot see AdSense revenue.
- **Multi-site economics:** 3 sites for $14, 10 for $19. Good. Self-hosting is possible (AGPL) but the self-hosted edition lags the cloud one and you'd be running ClickHouse — not worth it for the money saved.

### Fathom Analytics — from $15/mo
**What it is:** Plausible's closest competitor. Canadian company, EU isolation available, cookieless, deliberately minimal.

- **Cost:** entry $15/mo for 100k pageviews; $45/mo at 500k; then 2M / 10M / 25M+ tiers. Annual billing ≈ 2 months free ($12.50/mo effective at entry). Extra site packs of 50 for $10/mo.
- **Killer feature for your use case: at least 50 sites are included on every plan** (75 on the 1M tier, hundreds above). **Every feature is on every tier** — you pay only for volume, never for capability. If "I plan to launch multiple websites" is a firm plan rather than a maybe, Fathom is the cheapest sane way to run 10–50 sites under one bill and one dashboard.
- **Strengths:** unlimited retention while you're a customer, EU-isolated option, bot filtering, UTM tracking, custom events at no extra cost, API access, shared dashboards, very fast script, strong privacy stance (their marketing is aggressive about it; the underlying product is solid).
- **Weaknesses:** more expensive than Plausible at low traffic ($15 vs $9). Same categorical limitation — traffic counter only, no replay, no heatmaps, no AdSense join. Fewer analytical features than Plausible Business (no funnels of note).
- **Verdict vs Plausible:** Plausible wins on price and depth at 1–10 sites; Fathom wins decisively at 10+ sites.

### Simple Analytics — from ~£20/mo
**What it is:** the most minimal of the three. Dutch, EU-hosted, cookieless, one-page dashboard.

- **Cost:** self-serve from ~£20/mo (100k–2.5M pageviews via slider), 2 months free annually. **5 websites per user**; each additional user £20/mo. Free forever tier exists with 30-day history under fair use. Enterprise is quote-only and adds raw data access, SSO, Looker Studio, data proxy, and "traffic recovery" (their term for recovering data lost to consent banners).
- **Strengths:** genuinely the simplest thing here — no configuration, one page, done. Strong EU privacy positioning. Unlimited team members claim on some tiers. AI-assisted querying of your data.
- **Weaknesses:** most expensive entry point of the three for the least capability. Per-user pricing is a trap if you ever add a collaborator. Deliberately shallow — no funnels, no replay, no segmentation depth. **Hardest of the three to justify for your use case**; it competes on taste rather than features, and you're not paying for taste at this stage.

### PostHog — free tier is very generous
**What it is:** the "everything" platform — product analytics, web analytics, session replay, feature flags, surveys, A/B tests, **and error tracking**. Open-source, EU cloud in Frankfurt available.

- **Cost (usage-based, no platform fee, no card until you exceed free):**
  - Product analytics: **1M events/mo free**, then from $0.00005/event
  - Session replay: **5,000 web recordings/mo free**, then from $0.005/recording
  - Feature flags: 1M requests/mo free
  - **Error tracking: 100k exceptions/mo free**, then from $0.00037/exception
  - Surveys: 1,500 responses/mo free
- **This is the only tool on the list that covers three of the four categories at once**, which is exactly what TASK-0008's acceptance criterion #2 is asking about. Error monitoring **is** covered by PostHog, at a free allowance you would struggle to exhaust.
- **Strengths:** funnels and user-journey analysis out of the box (the "did they finish the calculation" question), session replay bundled, EU data residency, self-hostable, and you can set billing caps per product so a traffic spike can't produce a shock invoice.
- **Weaknesses:**
  - **Script weight.** The full posthog-js bundle with replay + flags is heavy — on the order of 100–200KB+ vs Plausible's <1KB. For an SEO-driven site where Core Web Vitals are a ranking input and your competitors are also thin calculator pages, this is a real cost. Mitigable: load only the modules you need, defer, or use their lighter builds — but it needs deliberate configuration, not copy-paste.
  - Complexity. It is a product-analytics platform aimed at SaaS teams. Most of the surface area is irrelevant to a content site, and it takes real effort to get value out of it.
  - Uses cookies by default (configurable to memory-only / cookieless), so it sits behind consent unless configured otherwise.
  - Free tier is generous but the *pricing model* is per-event; a high-traffic content site with autocapture on can burn 1M events faster than you'd think. Turn autocapture off and instrument deliberately.
- **Verdict:** the strongest single-tool answer, and free at your scale — but it is a heavier commitment than the site currently warrants, and Clarity does the replay half better and lighter for the same £0.

### Umami — free self-hosted, $9–20/mo cloud
Open-source (MIT), very light. Cloud has a permanent free Hobby tier (100k events/mo, 3 sites), Pro around $20/mo. Self-hosting is a single Node + Postgres container on a £4/mo VPS — genuinely cheap and genuinely yours. **Consider this only if you enjoy running infrastructure**; you'd be spending evenings on a database to save ~$14/mo, and the failure mode is silently losing data. Worth knowing about; not worth choosing now.

### Cloudflare Web Analytics — free
Free, cookieless, no banner, and includes Core Web Vitals — which is the one thing it's genuinely best at. But it is pageviews, top pages, top referrers, and little else: no UTM handling, no custom events, no real-time. **A fine free supplement if you're already on Cloudflare** (worth it for the Web Vitals alone), never a primary tool.

### Matomo — free self-hosted, from ~€23–29/mo cloud
The GA replacement for people who want everything GA does but self-hosted and owned. Cloud from ~€23/mo (annual) or €29 (monthly) at 50k hits, scaling steeply: ~$49 at 100k, $99 at 250k, $189 at 500k, $389 at 1M. Self-hosted core is free, **but the features you'd actually want are paid plugins at ~$229/yr each** — Heatmaps, Session Recording, Funnels, Form Analytics, A/B Testing. A loaded install is $1,500+/yr plus hosting. **Not recommended:** you'd pay heavily for heatmaps and replay that Clarity gives you free, and the cloud pricing ladder is the steepest on this list.

### Hotjar / Mixpanel / Amplitude — skip
Hotjar is Clarity with a bill attached (free tier is heavily capped; paid starts ~$32/mo). Mixpanel and Amplitude are product analytics for SaaS funnels with logged-in users — wrong shape for an anonymous content site, and both get expensive fast.

---

## 5. Cost comparison at a glance

Assuming a single site at ~50k pageviews/month, and then a portfolio of 5 sites at ~50k each:

| Tool | 1 site @ 50k pv | 5 sites @ 50k pv each | Replay/heatmaps | Funnels | AdSense join | Error monitoring |
|---|---|---|---|---|---|---|
| **GA4** | £0 | £0 | ✗ | ✓ (clumsy) | **✓ unique** | ✗ |
| **Clarity** | £0 | £0 | **✓ best** | ✓ | ✗ | partial (error-tagged sessions) |
| **Cloudflare** | £0 | £0 | ✗ | ✗ | ✗ | ✗ |
| **PostHog** | £0 (free tier) | £0–low | ✓ | ✓ | ✗ | **✓ 100k/mo free** |
| **Umami cloud** | £0 (Hobby, 3 sites) | ~$20 | ✗ | ✗ | ✗ | ✗ |
| **Plausible** | ~$14 (Growth, 3 sites) | ~$19 (Business, 10 sites) | ✗ | Business only | ✗ | ✗ |
| **Fathom** | $15 | $15 (50 sites incl.) | ✗ | ✗ | ✗ | ✗ |
| **Simple Analytics** | ~£20 | ~£20 (5 sites) | ✗ | ✗ | ✗ | ✗ |
| **Matomo cloud** | ~€29 | ~€100+ | paid plugin | paid plugin | ✗ | ✗ |

The table makes the multi-site answer obvious: **among paid tools, Fathom's 50-included-sites is the standout for a portfolio**, and Plausible Business at $19 for 10 sites is the runner-up. Among free tools, GA4 and Clarity both have unlimited properties, so a portfolio costs nothing.

---

## 6. Error monitoring — AC #2

**Not covered** by GA4, Clarity (only tags sessions where errors occurred — useful, not sufficient), Plausible, Fathom, Simple Analytics, Umami, Cloudflare, or Matomo.

**Covered** by PostHog (100k exceptions/mo free) — the only tool on the analytics shortlist that does.

If you don't pick PostHog, error monitoring is a **separate, deferred decision**, and the default answer is **Sentry**:
- Free Developer tier: 5,000 errors/mo, 1 user, 30-day retention. More than enough for a new site.
- Team plan $26–29/mo (50k errors) if you outgrow it.
- First-class support for both halves of this stack: **Laravel** (server-side exceptions) and **React** (client-side, with source maps through your Vite build).
- Overage ~$0.00025/error.

For a calculator site, client-side error monitoring matters more than usual: if a JS exception breaks the mortgage calculation on some Safari version, the page still renders, analytics still records a pageview, and you have **no signal at all** that your product is broken for a slice of users. Clarity's error-tagged recordings would eventually surface it; Sentry would tell you within minutes. Recommend wiring Sentry in at launch rather than deferring far — it's free and it's an hour's work.

---

## 7. Implementation notes for this codebase

These will bite whichever tool you pick, so record them now:

- **Inertia is an SPA.** Navigating between calculator pages does *not* trigger a full page load. Most analytics scripts hook `history.pushState` and cope, but you should verify rather than assume — Plausible and Fathom both auto-track SPA navigations; GA4 needs either enhanced measurement's "page changes based on browser history events" enabled, or a manual `page_view` on Inertia's `router.on('navigate')`. Getting this wrong produces a dashboard where every session looks like a one-page bounce.
- **Never put calculator values in the URL.** doc-0003 already flags this. It's worth repeating here because analytics is where it would leak: query-string params become page paths in every analytics tool, so `?balance=250000&income=48000` would put a stranger's finances permanently into your analytics vendor's database. Use fragments or opaque encoding for shareable results.
- **Mask inputs in session replay.** If you adopt Clarity or PostHog replay, explicitly mask the calculator form fields and verify by watching your own session. Default masking usually covers `input` elements, but sliders, computed result panels, and any custom control may not be covered. Recording salary and mortgage balances would be the single worst privacy failure available to this project.
- **Load analytics after consent** for anything cookie-based (GA4, Clarity, PostHog-with-cookies). This is the CMP's job (TASK-0009) — Google Consent Mode v2 for GA4 specifically, so you keep modelled conversions. Cookieless tools can load pre-consent.
- **Script weight is an SEO cost.** GA4's gtag is ~50–100KB, Clarity ~40KB, PostHog with replay 100KB+, Plausible/Fathom <2KB. Combined with AdSense's own considerable payload, this is worth measuring against Core Web Vitals rather than eyeballing. Cloudflare Web Analytics or the browser's own Web Vitals reporting will tell you if you've overloaded the page.
- **AdSense + GA4 must both be on the same property** for the Publisher ads reports to populate, and the link is made from the AdSense side.

---

## 8. Recommendation and rationale

**Start with GA4 + Clarity + Sentry. Total: £0/month.**

The rationale, stated plainly:

1. **The AdSense join is worth more than a nice dashboard.** You are building an ad-funded site. Knowing revenue-per-page by traffic source is the single most actionable thing analytics can give you, and exactly one tool provides it. Paying $15/mo for a prettier chart that *cannot answer your main commercial question* is the wrong trade at this stage.
2. **The consent banner is mandatory regardless**, so the flagship benefit of the paid privacy tools is unavailable to you. That was the premise of the original shortlist, and it doesn't hold.
3. **Optimisation means watching people fail**, and Clarity does that better than anything you could buy at this price point — for nothing.
4. **Multi-site is free** in this stack. GA4 and Clarity both give unlimited properties at no cost, so launching site two, three and four adds £0 to the analytics bill. The paid tools all start metering somewhere.
5. **Spending £0 now preserves the decision.** You have no traffic yet. Every paid tool here can import from GA4 later; the reverse is harder. Buy a tool when you have a problem it solves, and right now the problem is "no visitors," which no analytics tool fixes.

**When to revisit — concrete triggers, not vibes:**
- You find yourself avoiding GA4 because it's unpleasant, and therefore not looking at data at all → add **Plausible** ($14/mo Growth, 3 sites; or Business at $19 for 10 sites + funnels + consolidated view). Keep GA4 running headless purely for the AdSense join.
- You launch **more than ~10 sites** → **Fathom** at $15/mo with 50 sites included becomes the cheapest paid option by a wide margin.
- You want funnels, feature flags and A/B tests on the calculators themselves → **PostHog**, and it absorbs error monitoring too. Budget an afternoon on script-weight configuration.
- Consent rejection is visibly gutting your numbers (compare GA4 sessions against server-side request logs) → any cookieless tool as a second source of truth.

**Runner-up if you overrule the above and want one paid tool now:** Plausible Growth at $14/mo. Cheapest credible paid option, EU-hosted, 3 sites, pleasant enough that you'll actually open it, and the friendliest overage policy on the market. It does not replace Clarity or the AdSense join — you'd still want both alongside it.

**Explicitly not recommended:** Simple Analytics (most expensive entry, least capability, per-user pricing) and Matomo (steep cloud ladder, or $229/yr-per-plugin self-hosted for features Clarity gives away).

---

## 9. What to record in the decision

For AC #1 and AC #2 on TASK-0008:
- Tool selected, with the AdSense-join and mandatory-CMP reasoning noted, since those two facts are what make this different from a generic "best privacy analytics" answer.
- Error monitoring: **covered** if PostHog is chosen; **deferred to Sentry free tier** otherwise — and worth raising its own task rather than leaving it implicit.
- The revisit triggers from §8, so the decision has an expiry condition rather than becoming permanent by inertia.

## Sources

- [Fathom Analytics pricing](https://usefathom.com/pricing)
- [Plausible pricing](https://plausible.io/#pricing) · [subscription plan docs](https://plausible.io/docs/subscription-plans)
- [Simple Analytics pricing](https://www.simpleanalytics.com/pricing)
- [PostHog pricing](https://posthog.com/pricing)
- [Microsoft Clarity](https://clarity.microsoft.com/) · [Clarity FAQ](https://learn.microsoft.com/en-us/clarity/faq)
- [Connect Google AdSense to Google Analytics](https://support.google.com/analytics/answer/13610380?hl=en)
- [GA4 sampling, cardinality and thresholding](https://infotrust.com/articles/google-analytics-4-reports-sampling-cardinality-thresholding/)
- [Cloudflare Web Analytics vs Plausible](https://plausible.io/vs-cloudflare-web-analytics)
- [Matomo pricing overview](https://openmost.io/faq/how-much-does-matomo-cost/)
- [Umami Cloud pricing](https://canivibecodeit.com/umami-cloud)
- [Sentry pricing](https://sentrypricing.com/)
- [PostHog: best GDPR-compliant analytics tools](https://posthog.com/blog/best-gdpr-compliant-analytics-tools)
