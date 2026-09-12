---
id: doc-0005
title: Consent Banner / CMP Research
type: other
created_date: '2026-08-15 01:31'
updated_date: '2026-08-15 01:34'
tags:
  - business-legal
  - research
---
Research to support TASK-0009 (Choose consent banner service). Feeds TASK-0023 (Integrate consent banner) and TASK-0024 (Integrate AdSense ad units); depends on TASK-0006 (AdSense account) and pairs with TASK-0008 (Choose analytics tool). Companion to [doc-0003 Privacy Policy Research](../docs/doc-0003%20-%20Privacy-Policy-Research.md), which covers the legal side; this document covers the tooling.

Researched August 2026 against Google's current publisher documentation and vendor pricing pages read on the day. Prices change; the structural findings will not.

## The short version

**Yes — AdSense includes a consent banner, it is free, and it is the only one you can use without paying.** It is called the *European regulations message*, built with **Google's own CMP**, configured in the **Privacy & messaging** tab of your AdSense account. It is Google-certified and IAB TCF v2.3-registered by definition, it costs nothing at any traffic level, and it needs **zero extra code on the site** — the AdSense tag you are already adding for TASK-0024 delivers it.

**No analytics tool provides one.** Fathom, Plausible and Simple Analytics don't ship a CMP, and more importantly, if you pick one of them (as [doc-0003](../docs/doc-0003%20-%20Privacy-Policy-Research.md) §6 recommends) they don't *need* one. PostHog in its default cookie-based mode would need to sit behind the banner.

**The decisive commercial fact:** IAB TCF support is the paid feature on essentially every third-party CMP. Cookiebot, CookieYes, CookieHub, Usercentrics, Termly and consentmanager all have free tiers, and **none of those free tiers include TCF** — which makes them useless for an AdSense site in the UK. The cheapest third-party route to a *compliant* banner is roughly **£4–£13/month**, rising with pageviews, versus **£0 and no pageview cap** for Google's.

**Recommendation: use Google's own CMP.** Reconsider only if one of the two named triggers in §9 fires. The rest of this document is the evidence, the honest list of what Google's CMP does *not* do, and what the alternatives buy you.

---

## 1. Why you have less choice here than it looks

Start with the constraint, because it removes most of the options before you compare features.

Since **16 January 2024**, any publisher serving ads to users in the EEA, the UK or Switzerland through AdSense, Ad Manager or AdMob must use a consent management platform that is **(a) certified by Google** and **(b) registered with the IAB Transparency & Consent Framework**. This is contractual, not merely legal. Google's stated consequences:

- Traffic behind a **certified CMP** → eligible for personalised, non-personalised and limited ads.
- Traffic behind a **non-certified CMP** → may be limited to non-personalised or limited ads.
- **No CMP at all** → *no ads are served.* Not "fewer ads" — none.

So for UK traffic there is no "skip the banner and take the revenue hit" option. A banner is a precondition of any AdSense revenue at all, which reframes this task: it is not a compliance nicety, it is part of the monetisation stack.

Two further hard requirements:

- **TCF v2.3 is mandatory since 28 February 2026** (enforcement from 1 March 2026). v2.2 strings are no longer valid; non-compliant ad requests get downgraded to limited ads or dropped. Anything you choose must be v2.3, and any blog post or template you read that talks about v2.2 is stale.
- **A homemade banner does not qualify.** You cannot write your own `useConsent()` hook and a nice Tailwind modal. Rolling your own is off the table not because it wouldn't work technically, but because it can't be certified.

One point of nuance in Google's own wording: Google certifies CMPs against *Google's* technical criteria, and says explicitly that it "does not check CMPs for full compliance with the TCF or applicable privacy laws." Certification buys you Google's approval, not the ICO's. Whichever tool you pick, the banner's actual behaviour — nothing firing before consent, reject being as easy as accept — remains your responsibility. That is TASK-0023's job.

---

## 2. What AdSense gives you for free

### What it is

**Privacy & messaging → European regulations message**, built on **Google's CMP** (Google LLC, TCF vendor/CMP ID 300). This is the product formerly known as *Funding Choices*, folded into the AdSense/Ad Manager/AdMob UI. It is the default: if you never configure anything, **Google publishes a default European regulations message on your behalf** rather than letting your ads go dark.

### What it does

- Shows a TCF v2.3 consent dialog to users in the **EEA, UK and Switzerland**, geo-targeted automatically, with per-country control over which buttons appear.
- Collects consent for the **IAB Global Vendor List** plus Google's **Additional Consent** vendors, and manages your **GDPR ad partners** list for you — this is the part that is genuinely painful to maintain by hand.
- Publishes the TCF consent string, so Google's ad stack respects it without you wiring anything.
- Drives **Google Consent Mode** signals, so other Google tags (GA4, if you ever use it) inherit the decision.
- Supports **two- or three-button** layouts. You can show *Consent* / *Do not consent* / *Manage options* — a single-click reject on the first layer, which is what the ICO expects. You can restrict where the "Do not consent" button appears; **for the UK, leave it on.**
- Customisation: your logo, message text, and font/background colours by hex or RGB, per element.
- Reporting on message performance (impressions, consent rate).

### What it costs

£0. No pageview cap, no per-domain fee, no session metering. For a site whose whole plan (TASK-0014/0016) is programmatic SEO at volume, this matters more than it looks — see §6.

### What it does *not* do

Being straight about the gaps, because they're the real decision:

- **It only governs the ad stack.** It does not scan your site for cookies, does not maintain a cookie inventory, and does not block your own or third-party scripts. If you add anything cookie-setting that isn't a Google ad tag, *you* gate it in code by reading the consent state (§7). It is a consent *signal* provider, not a tag manager.
- **No cookie policy generation.** Cookiebot, CookieYes, iubenda and Termly all auto-generate and auto-update a cookie table from a site scan. Google gives you nothing for TASK-0004's cookie section — you write and maintain that table by hand. (In practice this is a handful of rows and largely static for a site like this.)
- **No exportable per-user consent log.** You get aggregate message reporting. Third-party CMPs sell "proof of consent" records as an audit artefact. *Verify this before relying on the claim* — but assume Google gives you no downloadable consent ledger. The realistic risk for a one-person UK site is low: the TCF string is stored client-side and Google retains the ad-serving side, but if an ICO query ever arrived you'd have less to hand over than a Cookiebot customer would.
- **No A/B testing or consent-rate optimisation.** Publisher-focused CMPs sell this hard — banner design measurably moves consent rates, and consent rate directly drives personalised-ad revenue. You get one design and no experiment framework. (Consider the source: most of that argument is written by CMP vendors selling the feature.)
- **It lives inside AdSense.** No AdSense account (TASK-0006 still open) means no access to it. See §8 on sequencing.
- **Styling is constrained.** Colours, logo and text — not your design system. It will look like a Google consent dialog, because it is one.

---

## 3. Does any analytics tool provide one?

No, and the better question is whether you need consent for analytics at all.

| Tool | Ships a CMP? | Needs to sit behind one? |
|---|---|---|
| **Fathom** | No | No — cookieless; fits the DUAA statistical exception |
| **Plausible** | No | No — cookieless, EU-hosted |
| **Simple Analytics** | No | No — cookieless, EU-hosted |
| **PostHog** | No | **Yes, as shipped** — first-party cookies by default; only escapes the banner if configured to cookieless mode, which costs you most of what PostHog is for |
| **Google Analytics 4** | Not a CMP, but consumes Consent Mode from Google's CMP | Yes |
| **Matomo (self-hosted)** | Has a basic built-in consent tool | Depends on configuration; its tool is not TCF-certified, so it cannot serve as your AdSense CMP |

The practical consequence: **if TASK-0008 lands on a cookieless tool, the consent banner has exactly one job — ads.** That is precisely the job Google's free CMP is built for, and it means the "one tool for everything" argument for a paid CMP mostly evaporates. You would be paying a third party to manage a category (analytics cookies) you no longer have.

If TASK-0008 lands on PostHog in default mode, the calculus changes: you then have non-Google cookies to gate, you need a cookie table that changes over time, and a scanning CMP starts earning its fee. That is the single strongest argument for *not* choosing PostHog — the analytics decision quietly drags the consent decision along behind it.

There is also a third-place option worth knowing about: **Cloudflare Zaraz** includes a consent-management tool, and if TASK-0007 lands on Cloudflare it's available cheaply. It is not TCF-certified, so it cannot be your AdSense CMP. Ignore it for this task.

---

## 4. What a CMP actually has to do for you

The checklist to judge candidates against, in priority order for *this* site:

1. **Google-certified + IAB TCF v2.3 registered** — pass/fail. Everything else is irrelevant without it.
2. **Blocks Google ad cookies until consent** — TASK-0023's acceptance criterion #2.
3. **Single-click reject on the first layer** — ICO expectation; also a TCF policy requirement.
4. **Re-open mechanism for the footer "Cookie settings" link** — withdrawal must be as easy as consent ([doc-0003](../docs/doc-0003%20-%20Privacy-Policy-Research.md) §4).
5. **Geo-targeting** — so non-UK/EEA visitors aren't shown a banner they don't need. (Debatable: you may want it everywhere for consistency. Google's targets EEA/UK/CH only.)
6. **Vendor list maintenance** — hundreds of ad-tech vendors, changing constantly. You do not want to own this.
7. **Consent Mode integration** — matters if you ever use GA4; irrelevant with cookieless analytics.
8. **Cookie scanning + auto-generated cookie policy** — nice-to-have; only valuable if you have non-ad cookies (see §3).
9. **Consent logs / proof of consent** — audit artefact; low practical value at this scale.
10. **A/B testing** — revenue optimisation; only meaningful once you have traffic worth optimising.
11. **Cost that doesn't scale with the traffic you're trying to grow** — see §6.

Items 1–6 are the job. Items 7–11 are what you'd pay for.

---

## 5. Feature comparison

Shortlisted to what's realistic for a solo UK publisher. Enterprise tools (OneTrust from $10,000/yr, Didomi ~$200/mo, Sourcepoint $500–1,250/mo) are excluded — they exist, they're irrelevant, and OneTrust in particular has a documented history of aggressive renewal repricing.

| | **Google CMP** | **InMobi CMP** (ex-Quantcast Choice) | **Clickio Consent** | **iubenda** | **CookieYes** | **Cookiebot** | **Termly** | **consentmanager** |
|---|---|---|---|---|---|---|---|---|
| Google cert. tier | n/a (is Google) | certified | **Gold** | **Gold** | **Gold** | **Gold** | **Gold** | **Gold** |
| TCF v2.3 | ✅ | ✅ | ✅ (free tier too) | ✅ all paid plans | ❌ free/Basic; ✅ Pro+ | ❌ free/Lite; ✅ Premium Small+ | ❌ free/Starter; ✅ Pro+ | ❌ Starter; ✅ Essential+ |
| Entry cost for TCF | **£0** | £0 | ~£5/site/mo | ~€5/site/mo | $25/mo | €15/mo/domain | $15/mo | €59/mo |
| Pageview/session cap on that tier | **none** | none stated | 25k pv | 25k pv | 300k pv | 350 subpages | unlimited | 1M pv |
| Extra site code needed | **none** | script tag | script tag | script tag | script tag | script tag | script tag | script tag |
| Cookie scanning | ❌ | ❌ | ❌ | ✅ monthly | ✅ | ✅ (13k+ cookie DB) | ✅ quarterly→weekly | ✅ 3–10 crawls/day |
| Auto cookie policy | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Blocks non-Google scripts | ❌ (signal only) | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ auto-blocking |
| Consent log / proof | aggregate only | limited | ❌ on free | ✅ | ✅ | ✅ 12mo | ✅ | ✅ |
| Privacy policy generator | ❌ | ❌ | ❌ | ✅ (its main product) | ❌ | ❌ | ✅ | ✅ |
| A/B testing | ❌ | ❌ | Enterprise only | ❌ | ❌ | ❌ | ❌ | ✅ Essential+ |
| Full visual control | ❌ logo+colours | limited | ✅ | ✅ | ✅ | ✅ paid | ✅ Pro+ | ✅ |
| Publisher/ad focus | ✅✅ | ✅✅ | ✅✅ | general | general | general | general | ✅ |
| Notable weakness | ads-only scope | thin reviews, reliability complaints | free tier is a demo (500 pv) | pageview-metered | TCF gated high | per-domain, per-subpage limits | TCF gated to top tier | expensive for TCF |

Reading the table: the middle columns (iubenda → consentmanager) are all buying you the same three things Google doesn't give — **scanning, a generated cookie policy, and script blocking for non-Google tags**. All three are worth most when you have lots of third-party cookies. You are planning to have almost none.

---

## 6. Pricing, with the trap spelled out

All figures read from vendor pricing pages in August 2026, per site, excluding VAT. Where a vendor gates TCF, the "TCF price" is the one that matters — the cheaper tiers are decoys for an AdSense publisher.

| Vendor | Free tier | Free tier includes TCF? | Cheapest TCF plan | What that plan caps |
|---|---|---|---|---|
| **Google CMP** | Free, full stop | **✅** | — | **Nothing** |
| **InMobi CMP** | Free | ✅ | — | — |
| **Clickio** | 500 pv/mo (a demo) | ✅ | £5/site/mo | 25k pv → £10 for 250k, £30 for 750k |
| **iubenda** Essentials | trial only | — | €4.99/mo (annual) | 25k pv, +€0.05/1k over |
| **iubenda** Advanced | — | — | €19.99/mo (annual) | 50k pv |
| **CookieYes** Pro | 5k pv | ❌ | $25/mo | 300k pv, +$0.30/1k over |
| **Cookiebot** Premium Small | 50 subpages | ❌ | €15/mo/domain | 350 subpages |
| **CookieHub** Business | 1k sessions | ❌ | €30/mo | 120k sessions |
| **Termly** Pro+ | 10k banner views | ❌ | $15/mo (annual) | unlimited views |
| **Usercentrics** Pro | 1k sessions | ❌ | €30/mo | 15k sessions |
| **consentmanager** Essential | — | ❌ (Starter €23 has none) | €59/mo | 1M pv |
| **UniConsent** Basic | 30-day trial | — | £20/mo | 300k users |
| **Axeptio** | 200 visitors/mo | ✅ | $29/mo | — |

**The trap:** almost every "free CMP" listicle you'll find counts Cookiebot, CookieYes, CookieHub, Usercentrics and Termly as free options. For an AdSense publisher in the UK **they are not**, because the free tier omits the one feature that makes the tool legal for you. Budget from the TCF row, never the free column.

**The second trap — metering.** TASK-0014/0016 exist to generate a lot of pages and a lot of traffic. Per-pageview pricing scales with exactly the thing that earns you money:

| Monthly pageviews | Google CMP | Clickio | iubenda | CookieYes |
|---|---|---|---|---|
| 10k | £0 | £5 | €5 | $25 |
| 100k | £0 | £10 | €9 (€5 + overage) | $25 |
| 500k | £0 | £30 | €28 | $25 (then $0.30/1k) |
| 2M | £0 | Enterprise | €102 | $80 |

Cookiebot's model is worse for you than any of these: it meters **subpages**, and a pSEO site is by construction thousands of subpages. €15/mo covers 350; you'd be into €30–90/mo tiers purely because of your URL count, regardless of traffic. Rule it out on model, not on price.

---

## 7. Integration into this codebase

The site is Laravel + Inertia + React. Three integration shapes, in order of effort:

### Google's CMP — effectively zero code

The message is delivered by the AdSense tag itself. TASK-0024 puts that tag in the app shell; the banner then appears with no further work. Nothing to install, no vendor SDK, no bundle-size cost, no CSP headache beyond what AdSense already requires.

Two small pieces of code you *do* write:

**Footer "Cookie settings" link** (required — withdrawal must be as easy as consent). Google exposes `googlefc.showRevocationMessage()`. In React, use a handler rather than the `javascript:` href from Google's docs:

```tsx
function CookieSettingsLink() {
    const reopen = () => {
        window.googlefc = window.googlefc || {};
        window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
        window.googlefc.callbackQueue.push(window.googlefc.showRevocationMessage);
    };
    return <button type="button" onClick={reopen}>Cookie settings</button>;
}
```

**Reading consent state**, if you ever need to gate something of your own:

```ts
window.googlefc.callbackQueue.push({
    CONSENT_DATA_READY: () => {
        const v = window.googlefc.getGoogleConsentModeValues();
        // v.ad_storage / v.analytics_storage: GRANTED | DENIED | NOT_APPLICABLE | NOT_CONFIGURED
    },
});
```

The standard `__tcfapi('addEventListener', 2, cb)` also works and is vendor-neutral — prefer it if you want the option of swapping CMP later without rewriting the call sites.

Both need small `declare global` additions to the TS types. That's the entire integration.

### Third-party CMP — one script, plus care with Inertia

A blocking `<script>` in the Blade root template (`resources/views/app.blade.php`), before the AdSense tag, so the CMP initialises first. Two Inertia-specific things to watch:

- The CMP must not re-run its banner logic on client-side page transitions. Most handle this; verify by navigating between calculator pages and confirming the banner doesn't reappear.
- Auto-blocking CMPs work by rewriting `<script>` tags in the initial HTML. That works fine for the AdSense tag in the Blade shell; it does *not* reliably catch scripts injected later by React. If you ever load a tag from inside a component, gate it manually regardless of what the CMP promises.

### Rolling your own — not available

Covered in §1: cannot be certified, therefore cannot serve ads in the UK. Off the table.

---

## 8. Sequencing — this task has a dependency you may not have noticed

Google's CMP is configured **inside the AdSense account**, so it is unavailable until TASK-0006 is approved. And AdSense approval requires a live privacy policy (TASK-0004). The chain is:

**TASK-0004 (privacy policy live) → TASK-0006 (AdSense approved) → TASK-0009 decision confirmable → TASK-0023 (integrate) → TASK-0024 (ad units).**

This is fine, and it does not block launch, because of a useful consequence of the analytics decision: **with cookieless analytics and no ads yet, you need no banner at all.** You can launch, gather traffic, and add the banner at the same moment you add ad units. Do not add a consent banner before there is anything to consent to — a banner that appears when the only cookies are your own session and CSRF cookies is worse than no banner, since those are consent-exempt.

The one thing this ordering implies: **decide now, integrate later.** You can record the decision on TASK-0009 today on the strength of §1 and §6 without touching the AdSense UI, since the argument doesn't depend on anything you'd learn in there.

If you *do* want a banner before AdSense approval (for example if TASK-0008 lands on PostHog with cookies), you need a third-party CMP from day one, and iubenda Essentials at ~€5/mo is the cheapest compliant option. Another reason the analytics choice drives this one.

---

## 9. Recommendation

**Use Google's own CMP (Privacy & messaging → European regulations message), with a cookieless analytics tool.**

The reasoning, in order of weight:

1. **It is the only free option that is certain to stay certified.** Certification is Google's to grant and revoke; Google's own CMP cannot fail Google's certification. Every third party carries a small ongoing risk that a certification or TCF-version transition breaks your ad serving — which is exactly what happened industry-wide at the v2.2→v2.3 cutover in February 2026.
2. **Zero integration.** The AdSense tag delivers it. No extra vendor, no extra script, no extra failure mode, no extra bill. This is the "simplest to integrate" criterion answered outright.
3. **No metering.** Every alternative charges by pageview, session or subpage — all three of which your pSEO strategy is designed to increase.
4. **The features you'd pay for are features you don't need.** Scanning, cookie-policy generation and script auto-blocking all serve a cookie inventory you're deliberately not going to have. If your only non-exempt cookies are Google's ad cookies, a Google-managed consent layer covers 100% of the surface.
5. **Vendor-list maintenance is the genuinely hard part**, and Google does it for you as a matter of course.

**Accept these costs consciously:** a Google-branded dialog you can only lightly style; no per-user consent ledger; no A/B testing; and a cookie table for the privacy policy that you maintain by hand.

**Switch to a paid CMP if either trigger fires:**

- **TASK-0008 lands on PostHog (or anything cookie-setting).** Then you have a real cookie inventory, a real script-blocking requirement, and a cookie table that drifts. Take **iubenda Essentials (~€5/mo)** — cheapest TCF-on-every-plan vendor, includes scanning and generates both the cookie policy and privacy policy, which also cuts TASK-0004's ongoing maintenance. Watch the 25k pageview cap.
- **Ad revenue becomes material and you want to optimise consent rate.** Then A/B testing pays for itself and **consentmanager (€59/mo, built-in A/B + EU-only data storage)** or **Clickio (publisher-focused, £10/mo at 250k pv)** are the ones to look at. Not before there's revenue to optimise — this is a post-launch decision, not a launch one.

**Do not** choose on the strength of a free tier without checking the TCF column, and **do not** choose Cookiebot given its subpage metering.

---

## 10. What to verify at TASK-0023

The acceptance criteria are "banner shown to new visitors" and "AdSense cookies gated until consent." With Google's CMP you are not writing the gating code — Google's tag is. That makes verification *more* important, not less, because you're trusting a black box. Check with DevTools in a fresh incognito profile, ideally through a UK IP:

- On first load, before interacting: **no Google advertising cookies**, no `IDE`/`test_cookie`/DoubleClick calls. Only your session cookie, CSRF token, and the CMP's own storage.
- The consent record itself: expect the TCF `euconsent-v2` string plus Google's Funding Choices local storage. **Note the actual names and durations you observe** — that's the source of truth for the privacy policy's cookie table, not any blog post.
- Click "Do not consent": confirm ads still render (limited ads) and no advertising cookies are set. Confirm calculators work fully. This is the [doc-0003](../docs/doc-0003%20-%20Privacy-Policy-Research.md) §5 promise, and the one most sites get wrong.
- Click "Consent": ad cookies appear, TC string updates.
- Footer "Cookie settings" reopens the dialog and a changed decision takes effect.
- Navigate between calculator pages via Inertia: the banner does **not** reappear, and consent persists across client-side transitions.
- Confirm **limited ads is enabled** in AdSense (Brand safety → Blocking controls → Ad serving) so refusers still monetise.
- Confirm the UK is in scope of the message and the "Do not consent" button is shown for UK visitors.

Record the observed cookie names, durations and issuers straight into the TASK-0004 cookie table while you have DevTools open.

---

## Open questions this research surfaces

1. **TASK-0008 first.** The analytics choice determines whether this task's answer is "free Google CMP" or "~€5/mo iubenda." Settle it before recording the TASK-0009 decision.
2. **Consent-log gap** — confirm whether Google's Privacy & messaging offers any exportable consent record. Assume not; decide whether you care. (Suggest: no, at this scale.)
3. **Banner on non-UK/EEA traffic** — Google shows nothing outside EEA/UK/CH. If a meaningful share of traffic ends up US-based, there's a separate US states message to configure, also free, also in Privacy & messaging.
4. **Cookie table ownership** — with Google's CMP, this is a manual artefact in the privacy policy. Add a note to TASK-0004 that it must be written from observed DevTools output at TASK-0023, not before.
5. **CSP** — if TASK-0007's hosting adds a Content-Security-Policy, Google's CMP needs `fundingchoicesmessages.google.com` allowed. Cheaper to discover now than at launch.

## Sources

- [Google consent management requirements for serving ads in the EEA, the UK, and Switzerland — AdSense Help](https://support.google.com/adsense/answer/13554116?hl=en)
- [How the Google Consent Management Platform (CMP) works — AdSense Help](https://support.google.com/adsense/answer/16918505?hl=en)
- [About European regulations messages — AdSense Help](https://support.google.com/adsense/answer/10961068?hl=en)
- [Create a European regulations message — AdSense Help](https://support.google.com/adsense/answer/10960768?hl=en)
- [Publish my European regulations message for me using Google's CMP — AdSense Help](https://support.google.com/adsense/answer/13790256?hl=en)
- [Edit and format messages — AdSense Help](https://support.google.com/adsense/answer/10958856?hl=en-GB)
- [Transition to IAB TCF v2.3 — AdSense Help](https://support.google.com/adsense/answer/16703994?hl=en)
- [Manage GDPR ad partners — AdSense Help](https://support.google.com/adsense/answer/10960670?hl=en)
- [Comply with the EU user consent policy — AdSense Help](https://support.google.com/adsense/answer/7670013?hl=en)
- [Privacy & Messaging JavaScript API — Google for Developers](https://developers.google.com/funding-choices/fc-api-docs)
- [Add a consent revocation link to your app or site — Ad Manager Help](https://support.google.com/admanager/answer/10114217?hl=en)
- [Google CMP Partners — certified partner directory](https://cmppartnerprogram.withgoogle.com/)
- [Google CMP Partners: All 47 Certified Tools by Tier (2026) — Enzuzo](https://www.enzuzo.com/blog/google-cmp-partners)
- [The Best Google-Certified CMPs in 2026 — Enzuzo](https://www.enzuzo.com/blog/choose-google-certified-cmp)
- [Best CMP for Publishers in 2026 — Consently](https://consently.net/blog/best-cmp-for-publishers)
- [Best Consent Management Platforms for Publishers — Clickio](https://blog.clickio.com/best-consent-management-platforms-for-publishers/)
- [IAB TCF v2.3: What Publishers Must Do by February 2026 — CookieYes](https://www.cookieyes.com/blog/iab-tcf-v2-3-explained/)
- [Clickio Consent pricing](https://clickio.com/consent_compare_plans)
- [CookieYes pricing](https://www.cookieyes.com/pricing/)
- [Cookiebot pricing](https://www.cookiebot.com/en/pricing/)
- [CookieHub pricing](https://www.cookiehub.com/pricing)
- [consentmanager pricing](https://www.consentmanager.net/pricing/)
- [iubenda pricing](https://www.iubenda.com/en/pricing)
- [Termly pricing](https://termly.io/pricing/)
- [Usercentrics pricing](https://usercentrics.com/pricing/)
- [UniConsent pricing](https://www.uniconsent.com/pricing)
- [What is InMobi CMP (formerly Quantcast Choice)](https://support.inmobi.com/choice/choice-overview/what-is-inmobi-cmp)
- [Do Plausible & Fathom need cookie consent? — Cookiebeam](https://cookiebeam.com/guides/plausible-fathom-cookieless-analytics-consent-2026)
