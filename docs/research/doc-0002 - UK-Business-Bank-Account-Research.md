---
id: doc-0002
title: UK Business Bank Account Research
type: other
created_date: '2026-08-15 01:14'
updated_date: '2026-08-15 01:24'
tags:
  - business-legal
  - research
---
Research to support TASK-0002 (Open business bank account). Depends on TASK-0001 (Register parent company) — you cannot apply until the company number exists.

Researched August 2026. Prices and eligibility rules were checked against provider sites at that date. Banking terms change often and eligibility is ultimately decided case-by-case at onboarding — re-check before applying. This is a feature comparison, not regulated financial advice.

## Requirements this is judged against

Taken from your brief:

1. **Free** — no monthly account fee, and no fees that bite at our transaction volume.
2. **Good mobile app, but real web login too** — not app-only.
3. **Good integration with digital bookkeeping/accounting software**, ideally with the software included free.
4. **Decent data export** — CSV/statements out, for records and for the accountant.
5. **No problem with a company formed via a formation service** (and, per doc-0001, one using a commercial registered office / director service address).
6. Otherwise: whatever a small Ltd actually needs.

Two more that fall out of the rest of the backlog and matter more than they look:

7. **Must be able to receive Google AdSense payouts** (TASK-0006) — a GBP account in the company name with a sort code and account number.
8. **Must suit a single Ltd operating a portfolio of ad-funded websites.** Confirmed intent for TASK-0001: one trading limited company, sole director and shareholder, under whose banner multiple websites are built and monetised — *not* a holding company owning subsidiaries. If an individual site later gets big enough to justify its own company, that's a separate decision at that time. This resolves what was otherwise the biggest eligibility risk in this research; see below.

## The three things that actually decide this

### 1. FSCS protection vs e-money safeguarding

Not all "business accounts" are bank accounts.

- **Banks** (Starling, Monzo, Mettle/NatWest, Zempler, Revolut Bank UK) hold deposits covered by the **Financial Services Compensation Scheme**, now **£120,000** per eligible depositor (raised from £85,000 on 1 December 2025).
- **E-money institutions** (Tide's e-money accounts via PrePay Technologies, ANNA) instead *safeguard* funds in a segregated account. If the provider fails, your money should be returned from the safeguarded pool, but there is no compensation scheme, and the process can be slow.

Tide is a hybrid: some Tide accounts are issued through **ClearBank** and are FSCS-protected to £120,000; others are e-money. You don't fully control which you get. For a company whose float is a few thousand pounds of AdSense income this is a low-stakes difference, but it costs nothing to prefer the FSCS side.

### 2. Eligibility — resolved, but with a future trap

The intended structure is **one trading Ltd, you as sole director and sole shareholder, operating many websites**. On that basis every free option below accepts you, and the rest of this section is about what would break it later.

The relevant limits:

- **Starling** does not open accounts for **holding companies**, and requires all Persons of Significant Control to be **UK-resident natural persons — no corporate shareholders**.
- **Mettle** is tighter: limited companies only (no LLPs, PLCs, charities, CLGs), **maximum two PSCs, both individuals**, only one owner can access the account, UK resident, UK tax resident only, not a US Person for tax, balance up to £1m.
- **Monzo** requires all directors and PSCs to be UK-resident; a single overseas shareholder, however small, ends the application.
- **Tide and Revolut** are the accommodating ones for group structures and unusual ownership.

Your structure clears all of these comfortably. Two things would change that:

1. **Taking on a second or third shareholder.** Two is Mettle's ceiling, and only one of them can operate the account. Starling and Monzo have no such cap.
2. **Spinning a successful site into its own company.** This is in your stated plan, so it's worth being precise about it. If the new company is owned **by you personally**, it's just another plain Ltd and can open its own Mettle or Starling account with no difficulty. If the new company is owned **by this company** — the natural instinct, and what makes the original one a true parent — then it has a corporate PSC, and **Starling, Mettle and Monzo will all refuse it**, and Starling would additionally refuse the parent once it becomes a holding company.

The practical consequence: **nothing to do now**, but when the day comes to spin a site out, the ownership choice (personally-held sibling company vs subsidiary) has banking consequences, and there are tax and admin trade-offs on the other side that an accountant should price. Don't let the banking tail wag that dog — just don't make the decision unaware of it.

One general caution: a cluster of declined applications is itself a risk signal to the next bank, so apply where you're eligible rather than trying your luck.

### 3. Formation service and registered office

No obstacle. The mainstream position is that virtual/registered-office addresses are accepted for business account applications by all the major providers, including Starling, Monzo, Tide and Revolut — Tide itself sells a virtual office address product and markets it for exactly this.

Two caveats worth knowing:

- Banks look at **registered office, trading address, correspondence address and tax residency separately**. Expect to be asked where the business actually operates; answer with your home address as the trading address if that is the truth. That address is not published on the Companies House register, so this does not undo the doc-0001 privacy work.
- A shared prestige-London formation-agent address used by tens of thousands of companies is a mild risk signal to some onboarding systems. It rarely blocks anything; it occasionally means extra manual review.

The bank-bundled formation offers (Tide, ANNA) were already ruled out in doc-0001 because they don't include an address service. That reasoning stands. Note this rules out the *formation* bundle, not the *bank* — you can still open a Tide account for a company formed elsewhere.

## What the multi-site plan changes

Building a portfolio of ad-funded sites under one company, to see what sticks, changes the shape of the banking requirement in a few specific ways.

**One bank account covers all the sites.** The sites are not legal entities; they're products of one company. There is no need for an account per site, and no bank here charges for extra "sub-accounts" anyway — Starling has Spaces, Monzo and Mettle have Pots. Use those for setting aside Corporation Tax and VAT rather than for splitting sites.

**One AdSense account covers all the sites too.** Google's rule is **one AdSense account per publisher**, but that single account may serve **any number of websites — there is no limit**. Because you're operating as an organisation, the account should be an **organisation** account with tax and payee details matching the registered company. That is consistent with everything above: one company, one AdSense account, one bank account.

⚠️ **The flip side is concentration risk, and it matters a lot for a spray-and-see strategy.** With every site under one AdSense account, a policy violation on any one of them puts the whole account — and therefore *all* the sites' revenue — at risk. This is the standard, widely-reported drawback of running many sites on one account. It doesn't change the banking decision, but it's the biggest structural risk in the overall plan, and it argues for holding each new site to the same content and policy standards as the ones already earning. Worth carrying into TASK-0006.

**The expense pattern is many small recurring card payments, not many bank transfers.** A portfolio of sites means domains, hosting, an analytics tool, a consent service, APIs — a long tail of £5–£30/month card subscriptions across the backlog (TASK-0007, 0008, 0009). Implications:

- Tide's headline weakness, **5 free bank transfers per month**, is less damaging than it first appears, because card subscriptions aren't bank transfers. It's still a real constraint if you pay contractors or a bookkeeper.
- What actually matters is **card usage with no per-transaction fee, good auto-categorisation, and virtual cards** to keep subscriptions separable. Mettle, Starling and Monzo all do the first two free; virtual cards are a Monzo Pro feature.
- Receipt capture matters more with many small subscriptions than with a few big invoices. Free on Mettle via FreeAgent; £7/mo on Starling via Toolkit.

**Per-site profitability tracking is a bookkeeping job, not a banking one.** To know which sites are worth keeping you need revenue and costs attributed per site. AdSense reports per-site revenue on its side; the cost side needs tagging in the accounting tool. FreeAgent (free with Mettle) supports **projects/categories** that can carry this. This is another point in Mettle's favour: the tracking you need for "see what sticks" is a bookkeeping feature, and Mettle is the option that gives you the bookkeeping software free.

**Trading names — worth knowing, feeds TASK-0004/0005.** A UK Ltd may trade under **any number of business/trading names without registering them**, which is exactly the "one limited banner, many site brands" model. But under the Companies Act 2006 and the Names and Trading Disclosures Regulations 2015, **each website must disclose the company's registered name, company number, place of registration and registered office address**. So every site in the portfolio needs that in its footer or legal pages, not just the flagship. Trading names also mustn't be misleading or use restricted/sensitive words. Flagging here because it's cheap to build into the shared layout once and expensive to retrofit across twenty sites.

## Options compared

| | Monthly fee | Web app | Accounting software | Integrations | Protection | Ltd/PSC limits |
|---|---|---|---|---|---|---|
| **Mettle** (NatWest) | £0 | Yes | **FreeAgent free** (~£33/mo value) | FreeAgent (native), Xero, QuickBooks | FSCS £120k | Max 2 PSCs, individuals only |
| **Starling** | £0 | Yes | Toolkit £7/mo (optional) | Xero, QuickBooks, FreeAgent | FSCS £120k | No holdcos, no corporate PSCs |
| **Monzo Business Lite** | £0 | Yes (lighter than app) | — (Pro only) | **Pro £9/mo only** | FSCS £120k | UK-resident directors/PSCs |
| **Tide Free** | £0 | Yes | Tide Accounting on Pro/Max | Xero, QuickBooks, FreeAgent, Sage (free plan) | Mixed: ClearBank FSCS £120k *or* e-money | Most flexible on structure |
| **Zempler Business Go** | £0 | Yes | — | Xero, FreeAgent, QuickBooks | FSCS | Broad acceptance, no credit check |
| **ANNA PAYG** | £0 | Yes | Invoicing built in | Xero, QuickBooks | E-money safeguarded | Broad |
| **Revolut Business Basic** | **£10** | Yes (web-first) | — | Xero, QuickBooks (all plans) | FSCS £120k (since Mar 2026) | Best for overseas/corporate owners |

### 1. Mettle (NatWest) — best fit on your stated criteria

| | |
|---|---|
| Cost | **£0/month**, no minimum balance |
| Accounting | **FreeAgent included free**, for as long as you hold the account and make **at least one transaction a month** |
| Access | App (iOS 16+/Android 10+) **and web** — Mettle on the web launched July 2022, covers pots, invoicing, payment creation and categorisation |
| Protection | FSCS £120,000 (NatWest Group bank) |

**Why it wins on your list:** the free-accounting-software requirement is the one that's hard to satisfy honestly. FreeAgent for a limited company lists at **£33/month + VAT**; Mettle gives it to you free indefinitely. FreeAgent handles VAT, MTD, Self Assessment **and Corporation Tax (CT600) filing** for a single-director limited company, which is exactly this business. That single benefit is worth roughly **£400/year** and removes the need to choose an accounting tool at all.

**Cons:** hard eligibility ceiling — two PSCs maximum, both individuals, no LLP/PLC/CLG, one operator only. No cash/cheque handling to speak of. Web app is genuinely thinner than the mobile app. The FreeAgent perk is conditional on monthly activity — trivially satisfied by any real trading, but if the company goes dormant for a few months the software starts charging. Support is app-based chat; no branch, no relationship manager.

### 2. Starling — best all-round bank if the structure suits

| | |
|---|---|
| Cost | **£0/month**, no per-transaction charge on UK payments |
| Accounting | Integrates with **Xero, QuickBooks, FreeAgent** on the free account. **Business Toolkit £7/month** (first month free) adds invoicing, receipt capture, VAT/MTD submission, auto-categorisation, accountant access |
| Access | Full mobile app **and** proper web banking |
| Protection | FSCS £120,000 |
| Other fees | Post Office cash deposits 0.7% (min £3); cheques free; no fee on sending to 34 countries; 6 free ATM withdrawals/day |

**Pros:** the strongest *bank* here — mature, well-reviewed, best-in-class web experience, real customer support, FSCS, overdraft availability, spaces/pots for setting aside Corporation Tax. Free forever, not an intro period.

**Cons:** **no free accounting software** — you'd still be buying FreeAgent/Xero/QuickBooks separately, or paying £7/month for Toolkit which is bookkeeping-lite, not full accounts. And the holding-company / corporate-PSC exclusion above.

### 3. Monzo Business Lite — good bank, wrong tier

Lite is free and includes free UK transfers, web access, MTD software, digital receipts and 24/7 support, with FSCS to £120,000. But **accounting integrations (Xero, FreeAgent, QuickBooks, Sage), invoicing and auto-exports are Pro-only at £9/month**. Since integration is one of your explicit requirements, Monzo effectively costs £108/year here, and still doesn't include the accounting software itself. CSV export is available from the app on any tier.

### 4. Tide Free — most flexible, weakest on protection

| | |
|---|---|
| Cost | £0/month plan fee |
| Transfers | **Only 5 free transfers per month**, charged after that |
| Cash | Post Office £2.50 (0.5% over £500); PayPoint 3% |
| Accounting | **Xero, QuickBooks, FreeAgent and Sage connect on the free plan** via Open Banking; Tide's own accounting product is Pro/Max only |
| Protection | ClearBank accounts FSCS £120k; e-money accounts safeguarded only |

**Pros:** by far the most accommodating on company structure, so it's the fallback if a group structure or an unusual PSC ends up in play. Integrations on the free tier. Sells its own virtual office address, so no address friction at all.

**Cons:** the 5-free-transfers cap is the sting — fine for a business that pays a handful of suppliers a month, annoying otherwise. Open Banking feeds must be **re-authorised every 90 days** by regulation (this applies to any Open-Banking-based feed, not just Tide). Mixed protection model. Paid tiers are expensive (£12.49–£69.99/month).

### 5. Zempler Bank (formerly Cashplus) — the fallback if you get declined

Free "Business Go" tier, FSCS-protected, online and mobile banking, and notably **no credit check / very broad acceptance**, including businesses other digital banks turn away. But only **3 free outgoing payments/month** (35p after), £2 ATM withdrawals, 0.55% cash deposits (min £4). Worth knowing about purely as a Plan C.

### 6. ANNA Money — good invoicing, e-money only

Free PAYG plan with **20 free outgoing transfers/month** (20p after) — more generous than Tide or Zempler — and strong built-in invoicing and chasing. But funds are **e-money safeguarded, not FSCS-insured**, which is a poor trade when FSCS-protected free accounts exist.

### 7. Revolut Business — not free

**There is no free Revolut Business plan in the UK**; Basic is **£10/month**, Grow £35, Scale £125. It gained full FSCS protection in March 2026 when the PRA lifted the restrictions on its UK banking licence, and it integrates with Xero and QuickBooks on all plans. Only relevant here if the company structure or ownership rules out the free options.

### 8. High-street banks (Barclays, HSBC, Lloyds, NatWest, TSB)

Typically 12–24 months free banking for new businesses, then **£5–£25/month**. You get branches, cash handling and a relationship manager — none of which a website that receives an AdSense transfer once a month needs. Ruled out on the "free" requirement, since "free for now" isn't free.

## AdSense payout considerations (feeds TASK-0006)

- AdSense pays UK publishers by **bank transfer**; you supply account holder name, bank name, **SWIFT/BIC and IBAN**, entered **exactly as they appear on file with your bank**. All the accounts above issue an IBAN and BIC.
- For a company, the AdSense payee is the **organisation name** — so the bank account must be **in the company's name**, not yours. This is why the account can't be a personal one, and it is also acceptance criterion #1 on this task.
- **Address (PIN) verification:** once earnings hit the verification threshold, Google posts a six-digit PIN to your payments address by international standard post. It takes around **three weeks**, you have **four months** to enter it, and **ads stop showing if you don't**. This is ordinary business post, not government post — which is exactly the distinction doc-0001 flagged. Make sure the address you give AdSense is one where general commercial mail is actually received and scanned (the 1st Formations *business address*, not the registered office alone), or use your home address in AdSense settings since that one isn't published.
- Avoid using **Wise** as the AdSense payout destination — there's a long history of publishers reporting it doesn't work, and Wise is an e-money institution rather than a bank. Not a factor if you use one of the bank options above.

## Data export

All the shortlisted providers support **CSV export of transactions** plus PDF statements from app and web; Monzo's is Account → Export → CSV. In practice, once a bank feed is connected to accounting software, export becomes a backup path rather than the main one — the feed is what your accountant will use. If export genuinely matters to you, the meaningful difference is **date-range flexibility and whether categories/notes come across**, which is best checked hands-on in the first month rather than from marketing pages.

## Recommendation

**Open Mettle.** With the structure confirmed as one trading Ltd with you as sole director and shareholder, it is eligible and it is the only option that satisfies every stated requirement at zero cost: free account, FSCS-protected to £120k, mobile *and* web, and — the deciding factor — **FreeAgent included free**, a full limited-company accounting package covering VAT, MTD and Corporation Tax filing, worth ~£400/year. For a portfolio strategy it also happens to supply the per-site cost tracking you'll need to judge which sites are working, which is otherwise a separate purchase.

**Second choice: Starling**, if you want the better bank rather than the better bundle — stronger web app, stronger support, no two-PSC ceiling — and are content to pay for accounting software separately.

**Fallback: Tide**, if a future structure (holdco, corporate shareholder, more than two PSCs) puts Mettle and Starling out of reach. Its 5-free-transfers cap is less painful than it looks for a business whose costs are mostly card subscriptions.

**A reasonable hedge**, since both are free: open **Mettle** for the FreeAgent bundle and everyday running, and add **Starling** later if Mettle's app-first support or thin web app grates. Two free accounts cost nothing but a second onboarding.

**Revisit this decision** only if you take on a second shareholder, or when you spin a site out into its own company — at which point the sibling-vs-subsidiary choice determines whether Mettle and Starling remain available to the new entity.

### Before applying, have ready

- Company number and incorporation date (from TASK-0001)
- Registered office and director service address (per doc-0001)
- Your ID (passport/driving licence) and a selfie/liveness check
- The company's SIC code and a plain description of what it does — "advertising-funded online calculator and information websites" is fine and honest, and describing it as a portfolio of sites up front avoids questions later
- Expected turnover and where money comes from (Google Ireland Ltd, AdSense advertising revenue)

### Open questions for you

1. ~~Holding company or one trading Ltd?~~ **Resolved:** one trading Ltd operating multiple websites. Mettle and Starling are both available.
2. Will there be a **second shareholder**? Mettle caps at two PSCs and only one can operate the account. Sole ownership keeps every option open.
3. Do you want to **run bookkeeping yourself** (FreeAgent free with Mettle is then decisive) or **hand it to an accountant** (who may have a strong preference for Xero, which no one bundles free)?

## Sources

Provider sites (primary):

- [Mettle — FreeAgent included](https://www.mettle.co.uk/features/freeagent/)
- [Mettle — eligibility criteria](https://www.mettle.co.uk/eligibility/)
- [Mettle — on the web launch](https://www.mettle.co.uk/blog/mettle-on-the-web-is-here/)
- [FreeAgent — free with Mettle](https://www.freeagent.com/mettle/)
- [Starling — business account](https://www.starlingbank.com/business-account/)
- [Starling — business account eligibility](https://www.starlingbank.com/business-account/eligibility/)
- [Monzo — business plans and pricing](https://monzo.com/business-banking/plans-pricing)
- [Monzo — integrated accounting](https://monzo.com/business-banking/features/integrated-accounting)
- [Tide — pricing](https://www.tide.co/pricing/)
- [Tide — compare business bank accounts](https://www.tide.co/business-current-account/compare-business-bank-accounts/)
- [Tide — accounting software integrations](https://www.tide.co/support/features/tide-accounting/accounting-software-integrations/)
- [Tide — virtual office address](https://www.tide.co/support/features/virtual-office-address/)
- [Revolut — Business plans and features](https://www.revolut.com/business/blog/post/everything-you-need-to-know-about-revolut-business-banking/)
- [Zempler — best business accounts for small business](https://www.zemplerbank.com/resources/business-banking/best-business-accounts-small-business/)

Google (primary, for AdSense):

- [AdSense — receive payments by bank transfer](https://support.google.com/adsense/answer/3372975?hl=en-GB)
- [AdSense — enter your payments information](https://support.google.com/adsense/answer/47333?hl=en)
- [AdSense — address (PIN) verification overview](https://support.google.com/adsense/answer/157667?hl=en-GB)
- [AdSense — payment thresholds](https://support.google.com/adsense/answer/1709871?hl=en)
- [AdSense — if you want more than one AdSense account (one-account rule, organisation exception)](https://support.google.com/adsense/answer/9729?hl=en)

Legislation and legal guidance (for trading names / website disclosures):

- [Companies Act 2006, Part 5, Chapter 6 — Trading disclosures](https://www.legislation.gov.uk/ukpga/2006/46/part/5/chapter/6)
- [The Company, Limited Liability Partnership and Business (Names and Trading Disclosures) Regulations 2015](https://www.legislation.gov.uk/uksi/2015/17/contents/made)
- [LexisNexis — UK company name and trading disclosure obligations (as amended by ECCTA 2023)](https://www.lexisnexis.com/en-gb/legal/guidance/trading-disclosures)
- [Sprintlaw UK — Limited company trading as: UK rules for trading names](https://sprintlaw.co.uk/articles/limited-company-trading-as-using-a-trading-name-in-the-uk/)

Secondary comparison sources (used for cross-checking fees, tier limits and pricing; treat as indicative and verify against the provider before applying):

- [AccountingStack — Best Business Bank Accounts UK 2026](https://accountingstack.co.uk/sme-directors/best-business-bank-accounts-uk-2026/)
- [Business Expert — Best free business bank accounts UK 2026](https://www.businessexpert.co.uk/business-banking/best-free-business-bank-accounts/)
- [Business Expert — Mettle review 2026](https://www.businessexpert.co.uk/business-banking/mettle-review/)
- [Business Expert — Starling business review 2026](https://www.businessexpert.co.uk/business-banking/starling-bank-account-review/)
- [Business Expert — Revolut Business review 2026 (fees, plans, FSCS status)](https://www.businessexpert.co.uk/business-banking/revolut-business-account-review/)
- [Business Expert — ANNA business account review 2026](https://www.businessexpert.co.uk/business-banking/anna-business-account-review/)
- [Business Expert — Zempler Bank review 2026](https://www.businessexpert.co.uk/business-banking/zempler-bank-review/)
- [AccountingStack — Starling Business Toolkit review](https://accountingstack.co.uk/accounting-software/reviews/starling-business/)
- [AccountingStack — FreeAgent review UK 2026 (pricing)](https://accountingstack.co.uk/accounting-software/reviews/freeagent/)
- [MTD.digital — FreeAgent free with NatWest & Mettle](https://mtd.digital/mtd-income-tax/freeagent-free-natwest-mettle/)
- [ByteStart — How Tide and Zempler connect to Xero, FreeAgent and QuickBooks](https://www.bytestart.co.uk/self-employed-bank-accounts/tide-zempler-intergrate-xero-freeagent-quickbooks/)
- [ByteStart — Zempler Business Go fees and review 2026](https://www.bytestart.co.uk/self-employed-bank-accounts/zempler-business-go/)
- [Money to the Masses — Best business bank accounts, August 2026](https://moneytothemasses.com/business/bank-accounts/what-is-the-best-business-bank-account-in-the-uk)
- [Forbes Advisor UK — Best business bank accounts 2026](https://www.forbes.com/advisor/uk/banking/best-business-bank-accounts/)
- [Statrys — Monzo Business account review 2026](https://statrys.com/reviews/monzo-business-account)
- [goForma — FreeAgent vs Xero 2026 pricing](https://www.goforma.com/freeagent/freeagent-vs-xero)
- [Niche Site Project — Using AdSense on multiple websites](https://nichesiteproject.com/adsense-multiple-sites/)
- [Monetize Helper — Multiple AdSense accounts: rules and risks](https://monetizehelper.com/blog/multiple-adsense-accounts-rules)
