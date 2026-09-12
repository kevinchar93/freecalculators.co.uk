---
id: doc-0003
title: Privacy Policy Research
type: other
created_date: '2026-08-15 01:18'
updated_date: '2026-08-15 01:20'
tags:
  - business-legal
  - research
---
Research to support TASK-0004 (Write privacy policy page). Feeds into TASK-0008 (Choose analytics tool), TASK-0009 (Choose consent banner service), and blocks TASK-0006 (Apply for Google AdSense account) — AdSense will not approve a site without a privacy policy.

Researched August 2026 against ICO guidance, the Data (Use and Access) Act 2025, and Google's current publisher policies. This is a working brief to help you write the page, not legal advice. The law here moved recently (DUAA in force 5 February 2026; final ICO cookie guidance 29 April 2026), so anything you read online that predates 2026 is likely to be stale on the analytics question specifically.

## The short version

You are a UK sole-trader/Ltd running an ad-funded content site. Your privacy policy has three jobs, and they come from three different places:

1. **UK GDPR Articles 13/14** — a transparency notice. Legally mandatory, prescriptive about what it contains, enforced by the ICO.
2. **PECR (as amended by DUAA 2025)** — cookie rules. Separate law, separate consent regime, now with new exceptions that materially change your analytics decision.
3. **Google's AdSense programme policies** — contractual. Google requires a privacy policy that discloses third-party ad cookies, and (for UK/EEA/Swiss traffic) requires you to run a **Google-certified, IAB TCF-registered CMP**. Failing this is an account-suspension risk, not just a legal one.

The single most important structural point: **the calculators themselves should process nothing server-side.** If mortgage figures are computed in the browser and never sent to your server, you can say so plainly, and the entire "sensitive financial data" problem disappears. That sentence will do more for user trust than the rest of the policy combined. Verify it before you write it — see "What you actually process" below.

---

## 1. What a privacy policy is for

Two purposes, often conflated:

**Legal.** UK GDPR Art. 13 requires you to tell people, *at the point you collect their data*, a defined list of things. It is a transparency obligation, not a consent mechanism and not a contract. The user doesn't agree to it — you inform them. The ICO has enforced on exactly this: a policy that is vague, buried, or full of "we may use your data for various purposes" language fails, because "general statements about keeping personal data for as long as necessary is unlikely to comply."

**Practical.** It is the document AdSense reviewers look for, the document a user emails you about when they want their data deleted, and — for a site whose entire product is people typing their salary and mortgage balance into a box — the document that decides whether they trust you enough to use the tool. Treat it as a product page, not boilerplate.

**What it is not:** it is not your cookie banner, and it is not your terms of service (TASK-0005 territory). Keep them separate and cross-link.

### Mandatory contents under Art. 13

- **Who you are** — controller identity, trading name, company number and registered address once TASK-0001 completes, and a working contact address for privacy queries.
- **Whether you have a DPO** — you almost certainly don't need one; say so or stay silent, but don't imply one exists.
- **What personal data you collect**, by category.
- **Why** — each purpose, spelled out.
- **Lawful basis for each purpose** — this is where most small-site policies fall apart. See §4.
- **Legitimate interests, where relied on** — you must actually name the interest.
- **Recipients** — named third parties, not "our trusted partners." Google, your host, your analytics vendor, your email provider.
- **International transfers** — which countries, and the safeguard relied on (adequacy / UK IDTA / Addendum to SCCs). Name the country; the ICO expects specificity.
- **Retention periods** — actual periods or a real criterion. "As long as necessary" alone is non-compliant.
- **The individual's rights** — the full list, plus how to exercise them and the fact it's free and you have one month.
- **Right to withdraw consent** where consent is the basis, and that withdrawal doesn't affect prior processing.
- **Right to complain to the ICO**, with ico.org.uk/make-a-complaint.
- **Whether provision is statutory/contractual** — for you: nothing is required, everything is optional.
- **Automated decision-making / profiling** — you don't do it, but *ad personalisation is profiling*, so this needs a careful sentence rather than a flat "we don't profile."

Style requirements are also legal requirements: clear plain language, accessible, and layered if long (summary at the top, detail below).

---

## 2. What you actually process — the freecalculators.co.uk-specific picture

Before writing anything, pin down the truth of the following. The policy is only as good as this inventory.

**Calculator inputs (the important one).** The mortgage calculator is a React page under an Inertia route. If the arithmetic happens client-side and nothing is POSTed, then salary, deposit, property value and mortgage balance never reach you. Say exactly that:

> The figures you enter into our calculators are processed entirely in your browser. They are never sent to us, never stored on our servers, and we never see them.

If any calculator ever does send figures to the server (saved results, PDF export, "email me this"), that sentence must be qualified and the data treated as high-sensitivity — financial circumstances are not special-category data under Art. 9, but they are exactly the kind of data the ICO expects heightened care over, and a breach involving them is high-risk for individuals.

Also watch **URL query strings**. If you ever add shareable/deep-linked results (`?balance=250000&income=48000`), those values land in server access logs, in the Referer header sent to Google's ad servers, and in your analytics tool's page paths. That silently converts "nothing leaves the browser" into a false statement. If you want shareable links, encode state opaquely or use a fragment (`#`), which is not sent to servers.

**Server logs.** Laravel behind whatever host you pick will log IP addresses, user agents, timestamps and requested URLs. IP addresses are personal data. This is real processing and needs disclosing, with a retention period (30–90 days is normal and defensible).

**Session/CSRF cookies.** `SESSION_DRIVER=database` means Laravel sets a session cookie and an XSRF token cookie. These are strictly-necessary and consent-exempt under PECR, but they still get listed in your cookie table.

**Accounts.** The repo carries the Laravel starter kit's auth scaffolding — `User` model, `/settings/profile`, `/settings/security`, `dashboard`. There is no public registration route in `routes/web.php` today. **Decide which it is**: if there are no public accounts, strip the scaffolding before launch and say nothing about accounts. If accounts stay, the policy needs a whole section (name, email, password hash, retention, deletion) and the deletion route becomes a live Art. 17 obligation. Do not ship a policy that denies collecting names while a registration form exists.

**Contact route.** `MAIL_MAILER=log` today. Whatever you land on (a form, or a plain `mailto:` — a `mailto:` is simplest and means the data lives only in your inbox), disclose it: what you collect, why, retention, and the fact that email is handled by whichever provider.

**Ads.** Google AdSense — see §3.

**Analytics.** Undecided (TASK-0008) — see §6.

**Error monitoring.** If you add Sentry or use PostHog's error tracking, that captures IPs, URLs and potentially form state in breadcrumbs. Disclose it, and configure scrubbing so calculator inputs never end up in an error payload. This is the most likely accidental leak of exactly the data you promised stays in the browser.

**Hosting/CDN.** Cloudflare or similar is a recipient and sets its own cookies (`__cf_bm`, `cf_clearance`). Name it and note the transfer position.

---

## 3. How AdSense changes everything

AdSense is the reason this task is not a fifteen-minute copy-paste.

### Google's contractual requirements

- **A privacy policy is mandatory.** Google's own guidance: "All publishers must clearly display a privacy policy notifying visitors about the site's use of cookies." No policy, no approval.
- **You must disclose third-party ad cookies.** The classic required-substance disclosure, in your own words, is that third-party vendors including Google use cookies to serve ads based on a user's prior visits to your site or other sites, and that users can opt out of personalised advertising via Google's Ads Settings. The old requirement to name the "DoubleClick cookie" specifically has been dropped — don't copy templates that still insist on it.
- **You must identify the ad technology providers.** Google's EU user consent policy requires you to "clearly identify the providers you select to your users, and obtain users' consent," linking to each provider's own disclosures. In practice: pick Google's commonly-used provider set, and let the CMP surface the vendor list rather than trying to maintain hundreds of names in the policy yourself. Your policy links to the CMP's vendor list and to Google's own pages.
- **A Google-certified CMP is mandatory for UK/EEA/Swiss traffic.** Since 16 January 2024, publishers serving ads to the EEA, UK and Switzerland must use a CMP certified by Google *and* registered with the IAB Transparency and Consent Framework. This is not optional and not satisfied by a homemade banner. TCF **v2.3 became mandatory in early 2026** — v2.2 strings are no longer valid, and non-compliant requests get downgraded. Whatever TASK-0009 picks must be certified for v2.3.
- **Penalty for getting it wrong is commercial**: Google issues a non-compliance notice and can suspend the account. That's the revenue, gone.

### Who is the controller?

Important and frequently botched. For AdSense, **Google and the publisher are independent controllers** — not processor/controller. Google's own position, stated across its publisher suite (Ad Manager, AdX, AdMob, AdSense), is that it acts as a controller in its own right because it makes its own decisions about ad serving, fraud detection, forecasting and product improvement.

Practical consequences for your wording:

- You are not "using Google to process data on your behalf." You **enable Google to collect data directly from the user's browser**, for Google's own purposes, in reliance on the consent you collect via the CMP.
- Say this explicitly and link out to Google's privacy policy and its "How Google uses information from sites or apps that use our services" page. Users exercising rights against *Google's* processing must go to Google — you cannot delete what you never held, and it's better to say so than to imply you can.
- Don't claim you have a DPA with Google covering ads. The applicable instrument is Google's controller-controller data protection terms, not a processor DPA.

### Transfers

AdSense means personal data (at minimum IP address) goes to Google in the US and elsewhere. Cover it: name the US, and note that Google relies on the UK Extension to the EU–US Data Privacy Framework and/or standard contractual clauses. Keep it short; don't reproduce Google's own transfer documentation.

---

## 4. Lawful bases — the bit that decides the shape of the policy

Map each purpose separately. This is what a good policy looks like and what a template usually gets wrong:

| Purpose | Lawful basis (UK GDPR) | PECR consent needed? |
|---|---|---|
| Serving the site; session/CSRF cookies | Legitimate interests | No — strictly necessary exemption |
| Security, abuse prevention, server logs | Legitimate interests | No — no storage/access on device |
| Aggregate first-party analytics to improve the site | Legitimate interests | **Depends** — new DUAA exception, see §6 |
| Personalised advertising via AdSense | **Consent** | **Yes** |
| Non-personalised ads (still cookie-based: frequency capping, reporting, fraud) | **Consent** | **Yes** |
| Limited ads (no identifiers/local storage beyond fraud detection) | Legitimate interests (Google's position) | Google does not require consent for the IVT-detection storage |
| Replying to an email you sent us | Legitimate interests | n/a |

Two traps:

- **Consent for ads must be real consent**: unbundled, granular, opt-in, as easy to withdraw as to give, no pre-ticked boxes, no cookie walls, and *nothing fires before the user acts*. The CMP has to actually block the AdSense tag until consent, not just cosmetically cover the page. That's TASK-0023's acceptance criterion and it's the one most sites fail.
- **Your policy needs a persistent way to change consent** — a "Cookie settings" link in the footer that reopens the CMP. Withdrawal must be as easy as giving.

### Penalties now match GDPR

Worth knowing: DUAA removed the old £500,000 PECR cap. Cookie breaches can now attract fines up to £17.5m or 4% of worldwide turnover. For a one-person site the realistic risk is an ICO reprimand rather than a fine, but the ICO has been running active cookie-compliance sweeps of high-traffic UK sites, and ad-funded sites are exactly the target profile.

---

## 5. If someone refuses cookies — what actually changes

This deserves its own short, plainly-worded section in the policy, because it's the question users care about and almost no site answers it.

**What still happens on refusal:**

- Strictly-necessary cookies (session, CSRF, the consent record itself) are still set — they're exempt and you can't opt out of them.
- Server logs still record IP, user agent, timestamp, URL. That's legitimate interests, not consent, and refusing cookies doesn't stop it. (They can object under Art. 21; you'd have to weigh it.)
- The calculators still work in full. **Say this explicitly** — no cookie wall, no degraded functionality, nothing withheld.
- **Ads still appear.** This surprises people. With consent refused, Google falls back to *limited ads*: served using contextual signals (page content, coarse location from IP, device type) with no identifiers and no local storage other than invalid-traffic detection. Google does not treat that IVT storage as requiring consent. IP address is still processed to serve the ad at all.
- Note the distinction the templates get wrong: **non-personalised ads are not the same as limited ads.** NPAs are contextually targeted but *still* use cookies for frequency capping, aggregated reporting and fraud — so they *do* require consent in the UK. Limited ads are the genuine no-consent fallback. AdSense's limited-ads mode is a setting in your account (Brand safety → Blocking controls → Ad serving), on by default. Confirm it is on before launch, otherwise refusal may mean no ads and no revenue from that visitor at all.

**What stops:**

- No advertising cookies, no ad personalisation, no cross-site profiling, no contribution to a Google ad profile from your site.
- Analytics: depends on the tool. If it's consent-based, you lose that visitor entirely. If it's a cookieless tool relying on the DUAA statistical exception, it keeps counting — but then you must offer a separate, simple opt-out (see §6).
- Revenue per refusing visitor drops substantially. That's the cost of doing this properly; don't design around it with dark patterns.

**How the policy changes for them.** Rather than writing a second policy, add a short "If you decline cookies" section stating: what still runs and why, that the site is fully functional, that ads become non-personalised/limited, and how to change their mind. Also mention Google's own controls (Ads Settings / My Ad Center) and, if you like, youronlinechoices.eu — these operate at Google-account and browser level and work independently of your banner.

---

## 6. Analytics — how the choice changes the policy

This is the decision with the biggest downstream effect on the page, so TASK-0008 should be settled before you write the final draft.

**The new legal position (DUAA 2025 + final ICO guidance, 29 April 2026).** There is now a PECR exception for storage/access whose *sole* purpose is collecting statistical information about how the service or website is used, with a view to improving it. Conditions:

- The focus must be **"how" not "who"** — aggregate statistics, not tracking or monitoring individuals.
- **It does not extend to advertising** in any form. If the same data feeds ad targeting, the exception is gone.
- You may use a third-party analytics provider, but **the provider must not use the data for its own purposes** — only to help you improve your site.
- You must still **give clear information** about it, and a **simple, free and effective way to object (opt out)**.

So "no consent needed" still means "disclosed in the policy, with a working opt-out."

**How each candidate lands:**

| Tool | Cookies | Consent position | Extra policy burden |
|---|---|---|---|
| **Fathom** | None | Strong fit for the statistical exception; EU-isolation option available; vendor doesn't reuse your data | Low — disclose, name as processor, give an opt-out |
| **Simple Analytics** | None; EU-hosted | Same as Fathom; the cleanest transfer story (EU/NL hosting, no US transfer to disclose) | Lowest |
| **Plausible** | None; EU-hosted | Same | Lowest |
| **PostHog** | **First-party cookies by default**; identifies users; session replay and error tracking available | Cookie use pushes you towards consent unless you configure it down to aggregate-only (`persistence: memory`, replay off, autocapture off). Session replay is emphatically **not** covered by the exception and needs consent plus careful masking | High — replay + error capture means a real risk of hoovering up calculator inputs; needs input masking and its own policy section |
| **Google Analytics 4** | Yes | Consent required; Google is a processor here but with a poor regulatory history in the EU; US transfers to disclose; adds another Google-shaped disclosure | Highest, and it undermines the "we don't track you" positioning of a privacy-light calculator site |

**Recommendation for the policy's sake:** a cookieless, EU-hosted tool (Simple Analytics or Plausible; Fathom if you prefer the product) lets you write a genuinely short, honest analytics section with no consent dependency, no US transfer paragraph, and no banner friction on the one metric — pageviews — you actually need for an ad business. Note that PostHog was the candidate that also covers error monitoring; if you want that, consider splitting it: cookieless analytics for traffic, plus a separately-disclosed error monitor (Sentry with scrubbing) rather than one tool doing both. That keeps the analytics section inside the DUAA exception.

Caveat worth stating in the doc for honesty: even cookieless tools process IP addresses momentarily to derive a country or a daily hash, so UK GDPR still applies even where PECR consent doesn't. The correct claim is "no cookies and no consent required," not "no personal data."

---

## 7. Rights the user has, and what AdSense does to them

Standard UK GDPR rights, all of which you list:

access · rectification · erasure · restriction · portability · **object** · rights around automated decision-making · withdraw consent · complain to the ICO

Where AdSense makes this non-generic:

- **Withdrawal of consent** is the headline right for an ad-funded site, and it needs a real mechanism — the footer "Cookie settings" link. State that withdrawal doesn't undo processing already done.
- **Right to object to direct marketing (Art. 21(2)) is absolute** where it applies. Ad personalisation via AdSense is behavioural advertising and sits close enough to this that you should treat an objection as decisive, not something to weigh.
- **Profiling.** Ad personalisation *is* profiling. You are not doing automated decision-making with legal or similarly significant effects (Art. 22), so the right answer in the policy is: "We do not make automated decisions that have legal or similarly significant effects about you. Advertising shown to you may be personalised by Google based on a profile it holds — see below for how to switch that off." Never write a bare "we do not profile users."
- **Access and erasure against Google.** Be honest: for data Google collects as an independent controller, you cannot fulfil the request, and you must point the user to Google. Give the routes — Google's My Ad Center / Ads Settings, Google's own privacy policy and its help pages. Google also runs a data-deletion API for publisher first-party cookie data aligned with the IAB Data Deletion Request Framework; you don't need to build against it, but knowing it exists means you can answer a determined user properly.
- **Response times.** One month, extendable by two for complex requests, free unless manifestly unfounded or excessive. Give a real contact address that you monitor.
- Add the ICO complaint line with the link. It's mandatory and it's the one people check.

---

## 8. Templates, generators and what I'd actually use

**Start here — free and authoritative:**

- **ICO's own privacy notice generator** — ico.org.uk/create-your-own-privacy-notice. Free, UK-specific, downloads to Word, and it was updated on 7 July 2026 for DUAA changes. It will not know anything about AdSense or TCF, so it gives you a compliant *skeleton* that you then extend. This is the best starting point precisely because it's the regulator's own view of the required contents.
- **ICO SME hub** — the "privacy notices and cookies" advice section, plus the final storage-and-access-technologies guidance (29 April 2026) for the cookie half.

**Commercial generators, if you want something closer to finished:**

- **Termly** — free tier genuinely usable, has explicit AdSense-aware clauses, also does a cookie banner. Most commonly recommended for exactly this use case. US-leaning, so check the UK wording.
- **iubenda** — the most thorough for ad-tech; large clause library, integrates cookie policy + CMP + policy, and its per-vendor disclosures are built for publishers. Paid, cheap-ish, and the strongest fit if you want vendor lists auto-maintained.
- **GetTerms** — simplest and cheapest; free tier covers the basics, small one-off for more. Good if you want a clean base to hand-edit.
- **Docular / SEQ Legal** — UK solicitor-drafted templates, free tier with attribution. Better native UK-law drafting than the US SaaS options; less ad-tech-aware.
- **WebsitePolicies / TermsFeed / Enzuzo** — all fine, all similar, all US-first.

**A note on generators:** none of them will get the DUAA analytics exception right yet, and several still tell you to name the DoubleClick cookie. Treat generator output as a first draft, then hand-fix: the calculator-data-stays-in-your-browser paragraph, the DUAA analytics position, the independent-controller framing for Google, and the "if you refuse cookies" section are all things you'll write yourself. Those four are also the parts a reader will actually value.

**Read for reference** (don't copy — copying a policy is both copyright infringement and a good way to describe processing you don't do): the policies of Fathom, Plausible, and any well-run UK ad-funded calculator/comparison site. MoneySavingExpert's is a good example of a UK ad-funded site being specific about ad partners.

**Cookie banner shortlist (TASK-0009 input):** must be Google-certified *and* IAB TCF v2.3 registered. Google's own CMP (Privacy & messaging, ex-Funding Choices) is free, certified by definition, and integrates with AdSense with essentially no work — the obvious default for a site this size. Paid alternatives with free tiers: consentmanager (genuine free tier, v2.2 and v2.3 certified), Quantcast Choice (free TCF CMP), Cookiebot, CookieYes, Usercentrics. Whichever you pick, the cookie *policy* content should be driven by its scan output so the table stays accurate.

---

## 9. Outline for the page

Layered: a short summary anyone will read, then detail. Suggested structure:

1. **In short** — five bullets. Calculators run in your browser and we never see your figures. We show Google ads. We count visits anonymously. We don't sell data. Here's how to change your cookie choices.
2. **Who we are** — controller identity, company number and registered address (after TASK-0001), privacy contact address.
3. **What this policy covers** — this site; not sites we link to.
4. **Your calculator inputs** — the promise, stated flatly and early. Include the "not sent in URLs" point if you ever add share links.
5. **What we collect and why** — table: data category → purpose → lawful basis → retention. Rows for server logs, cookies/consent record, contact email, accounts (if any), analytics, advertising.
6. **Cookies and similar technologies** — table of cookie name → set by → purpose → duration → category. Split into strictly necessary / analytics / advertising. Link to the CMP settings.
7. **Advertising and Google AdSense** — how ads are served, that Google is an independent controller, third-party vendors use cookies to serve ads based on prior visits, personalised vs non-personalised vs limited ads, links to Google's ads privacy pages and My Ad Center, link to the CMP vendor list.
8. **Analytics** — tool named, what it does and doesn't collect, why no cookies (if applicable), lawful basis, and the opt-out.
9. **If you decline cookies** — the §5 content. This is your differentiator; don't bury it.
10. **Who we share data with** — named recipients: Google, host, analytics vendor, email provider, error monitor. Explicit "we do not sell your personal data."
11. **International transfers** — countries and safeguards.
12. **Retention** — real numbers per category.
13. **Security** — brief and non-boastful: HTTPS, no calculator data stored, access controls.
14. **Your rights** — the full list, how to exercise, timescales, free, ICO complaint link.
15. **Children** — not directed at children; no knowing collection from under-13s. AdSense reviewers like seeing this, and it interacts with Google's child-directed-content flag in your account settings.
16. **Changes to this policy** — how you'll notify, plus a "last updated" date.
17. **Contact** — a monitored address.

### Practical build notes

- Route already exists: `Route::inertia('/privacy-policy', 'privacy-policy-page')` in [routes/web.php](routes/web.php:14), with a stub at [privacy-policy-page.tsx](resources/js/pages/privacy-policy-page.tsx). Footer link is acceptance criterion #1.
- Include a **"Last updated"** date and keep an internal changelog of versions — the ICO expects you to be able to show what you told people and when.
- Add the footer **"Cookie settings"** link at the same time; it's part of the consent story, not a separate task.
- Write the cookie table *after* TASK-0023 is wired, then verify with the CMP's scanner and with DevTools that nothing beyond the strictly-necessary set fires before consent.
- **ICO data protection fee**: as a UK business processing personal data for your own commercial purposes, you likely need to register and pay (currently a tier-1 fee for micro organisations, ~£40–£60/yr). There are exemptions and the ICO has a self-assessment tool. Worth ten minutes now; the policy conventionally states your ICO registration number, and having one signals seriousness. Consider spinning this out as its own small task under the business-legal label.

---

## Open decisions this research surfaces

1. **Analytics tool** (TASK-0008) — recommendation above: cookieless + EU-hosted; split error monitoring out rather than taking PostHog's cookies.
2. **Keep or strip the starter-kit auth scaffolding** — decide before writing §5 of the page.
3. **Contact mechanism** — `mailto:` (least data) vs a form (needs its own disclosure and spam protection, and reCAPTCHA would add *another* Google disclosure).
4. **ICO registration** — check the self-assessment and pay if required; needs its own task.
5. **Confirm limited ads is enabled** in AdSense once TASK-0006 completes, so cookie-refusers still monetise.

## Sources

- [Create your own privacy notice — ICO](https://ico.org.uk/for-organisations/advice-for-small-organisations/privacy-notices-and-cookies/create-your-own-privacy-notice/)
- [Guidance on the use of storage and access technologies — ICO](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/)
- [Final storage and access technologies guidance published (29 April 2026) — ICO](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/04/final-storage-and-access-technologies-guidance-published/)
- [Data protection fee exemptions — ICO](https://ico.org.uk/for-organisations/data-protection-fee/data-protection-fee/exemptions/)
- [Transparency — ICO accountability framework](https://ico.org.uk/for-organisations/advice-and-services/audits/data-protection-audit-framework/toolkits/accountability/transparency/)
- [Comply with the EU user consent policy — Google AdSense Help](https://support.google.com/adsense/answer/7670013?hl=en)
- [How AdSense uses cookies — Google AdSense Help](https://support.google.com/adsense/answer/7549925?hl=en)
- [Personalised and non-personalised ads — Google AdSense Help](https://support.google.com/adsense/answer/9007336?hl=en-GB)
- [Limited ads — Google AdSense Help](https://support.google.com/adsense/answer/14210870?hl=en)
- [Required content — Google AdSense Help](https://support.google.com/adsense/answer/1348695?hl=en)
- [Tools to help publishers comply with the GDPR — Google](https://support.google.com/adsense/answer/7666366?hl=en)
- [Google Ads Controller-Controller Data Protection Terms](https://business.safety.google/static/assets/pdf/adscontrollerterms-20210927.pdf)
- [Advertising — Google Privacy & Terms](https://policies.google.com/technologies/ads?hl=en-US)
- [Changes to UK cookie rules: Data (Use and Access) Act 2025 — Practical Law](https://uk.practicallaw.thomsonreuters.com/w-049-0580)
- [UK ICO Publishes Guidance on Storage and Access Technologies — Hunton](https://www.hunton.com/privacy-and-cybersecurity-law-blog/uk-ico-publishes-guidance-on-storage-and-access-technologies)
- [New exceptions explained in ICO final guidance — Osborne Clarke marketinglaw](https://marketinglaw.osborneclarke.com/advertising-regulation/new-exceptions-explained-in-ico-final-guidance-on-storage-and-access-technologies-could-online-advertising-be-next/)
- [Google CMP Partners: certified tools by tier — Enzuzo](https://www.enzuzo.com/blog/google-cmp-partners)
- [Do Plausible & Fathom need cookie consent? — Cookiebeam](https://cookiebeam.com/guides/plausible-fathom-cookieless-analytics-consent-2026)
- [Privacy Policy for Google AdSense — Termly](https://termly.io/resources/articles/privacy-policy-for-google-adsense/)
- [What does a UK GDPR-compliant privacy notice look like? — Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2023/06/what-does-a-uk-gdpr-compliant-privacy-notice-look-like-lessons-learned-from-a-recent-ico-enforcement-decision)
