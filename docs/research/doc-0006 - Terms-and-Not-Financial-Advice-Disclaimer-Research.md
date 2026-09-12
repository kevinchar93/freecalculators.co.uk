---
id: doc-0006
title: Terms and Not-Financial-Advice Disclaimer Research
type: other
created_date: '2026-08-15 01:32'
updated_date: '2026-08-15 01:32'
tags:
  - business-legal
  - research
---
Research to support TASK-0005 (Write terms and not-financial-advice disclaimer). Related: TASK-0004 (privacy policy), TASK-0006 (AdSense), TASK-0009 (consent banner), TASK-0011 (mortgage calculator), TASK-0015 (editable content layer).

Researched August 2026 against the FCA Handbook (PERG), primary legislation on legislation.gov.uk, and live competitor pages. **This is research, not legal advice.** Nothing here is a substitute for a solicitor signing off the final wording — but it should mean you brief one for an hour rather than paying them to work it out from scratch, and it tells you what you can safely write yourself.

---

## 0. The short version

| Your question | Short answer |
|---|---|
| What must you disclaim, legally? | Legally *mandatory* disclosures are narrower than you'd think: company identity details (Companies Act + e-commerce regs), and nothing being misleading (DMCCA 2024). There is no statute that says "put a not-financial-advice notice on your site". The disclaimer is **defensive**, not mandated — but that makes it more important, not less. |
| Does "we only do arithmetic" change it? | It changes the *regulatory* analysis enormously (it's what keeps you outside the FCA perimeter) and the *civil liability* analysis hardly at all. Arithmetic can still be wrong, and people still rely on it. |
| Should you still go wide? | Yes. Three independent reasons — the perimeter position needs corroborating in writing, negligent misstatement risk is unaffected by "it's just maths", and Google/AdSense treat finance as YMYL. |
| Competitor references | MSE, MoneyHelper, The Calculator Site, income-tax.co.uk, HSBC, Barclays — verbatim text in §7. |
| Where does it go? | Five layers (§9). The critical one is a short line **inside the results panel, next to the number**, not just in the footer. |
| Tick box? | **No.** Don't. Reasons in §12. |
| Assumptions, MSE-style? | Yes — and go further than MSE. This is the single highest-value item in the whole task, for legal *and* SEO reasons. §11 has a drafted register for the mortgage calculator. |

---

## 1. What this site is, legally

Three facts drive everything below:

1. **You are not, and will not be, FCA authorised.** So the question is never "are we complying with FCA rules" — it's "are we staying outside the perimeter entirely".
2. **You are an ad-funded publisher of computational tools.** Per the spec, revenue is Google Ads, not product sales, not commission. That is a much safer position than a comparison site, and you should protect it deliberately.
3. **A free, ad-funded website is still a business-to-consumer relationship in law.** Free does not mean unregulated. Consumer protection law and the tort of negligent misstatement both apply without a penny changing hands.

There are then **two entirely separate risk tracks**, which people routinely conflate into one "disclaimer":

- **Track A — regulatory perimeter.** Are you carrying on a regulated activity (advising on / arranging regulated mortgage contracts) or communicating a financial promotion without authorisation? Both are **criminal offences**. Low probability, catastrophic consequence.
- **Track B — civil liability to users.** A user relies on your number, it's wrong, they lose money and sue. Or the CMA/Trading Standards say your site is misleading. Higher probability, survivable consequence.

**These need different wording and different placement.** Track A is addressed by what you *do* (and secondarily by a clear "we don't recommend anything" statement). Track B is addressed by *transparency about method and limits* and a fair, prominent liability position. A single blob of legalese in a footer serves neither well.

---

## 2. Track A(i) — the FCA perimeter: does a calculator need authorisation?

### 2.1 The two activities that could catch you

- **Article 53A RAO** — *advising on regulated mortgage contracts*. Advice given to someone in their capacity as borrower/potential borrower, on the merits of entering into or varying a **particular** regulated mortgage contract.
- **Article 25A RAO** — *arranging, and making arrangements with a view to, regulated mortgage contracts*. This one explicitly reaches website operators. It is the affiliate-link trap (§3.3).

### 2.2 PERG 4.6 — the FCA's own guidance, and it is unusually helpful

The FCA has thought about exactly this scenario. Quoting the Handbook:

**Generic advice is outside the perimeter (PERG 4.6.5):**

> "Advice will come within the regulated activity in article 53A … only if it relates to a particular regulated mortgage contract (or several different regulated mortgage contracts). Generic or general advice is not covered."

**The examples table (PERG 4.6.7)** is worth reading in full. Selected rows:

| Statement | Regulated? |
|---|---|
| "I recommend you take out the ABC Building Society 2 year fixed rate mortgage at 5%." | **Yes** |
| "I suggest you change (or do not change) your current mortgage from a variable rate to a fixed rate." | **Yes** — advice on varying a particular existing contract |
| "I suggest you take out (or do not take out) a variable rate mortgage." | No — generic |
| "I recommend you do not borrow more than you can comfortably afford." | No — generic |
| "If you are looking for flexibility … explore the possibilities of either a flexible mortgage or an off-set mortgage." | No — generic |

Note the second row carefully. **"Should I fix for 2 or 5 years?" content aimed at an existing borrower is uncomfortably close to the regulated side of that line** if it becomes a recommendation rather than an explanation. Your blog plan in `docs/spec.md` includes exactly that title ("Should I fix my mortgage for 2 or 5 years in 2026?"). It's fine as an explainer of trade-offs; it is not fine as "you should fix for 5".

**Advice vs information (PERG 4.6.13–4.6.14):**

> "advice requires an element of opinion on the part of the adviser. In effect, it is a recommendation as to a course of action. Information on the other hand, involves objective statements of facts and figures."

> "(2) The provision of purely factual information does not become regulated advice merely because it feeds into the customer's own decision-making process and is taken into account by them.
> (3) Regulated advice includes any communication with the customer which, in the particular context in which it is given, goes beyond the mere provision of information and is objectively likely to influence the customer's decision …
> (4) A key to the giving of advice is that the information: (a) is either accompanied by comment or value judgement on the relevance of that information to the customer's decision; or (b) is itself the product of a process of selection involving a value judgement so that the information will tend to influence the decision."

PERG 4.6.14(2) is the sentence that protects a calculator. PERG 4.6.14(4)(b) is the sentence that should make you careful about **selection** — which defaults you preload, which scenarios you choose to surface.

**The test (PERG 4.6.16A / 4.6.16B):**

> "whether an impartial observer … would conclude that what the adviser says could reasonably have been understood by the customer as being advice."

> "Any significant element of evaluation, value judgement or persuasion is likely to mean that advice is being given."

**Software and decision trees (PERG 4.6.27–4.6.28A).** This is the passage that matters most to you:

> "Advice can be provided in many ways including … (5) in a publication, broadcast or website; and (6) through the provision of an interactive software system." (4.6.27)

> "the use of electronic decision trees does not present any novel problems. The firm will be giving advice … only if the service goes beyond the mere provision of information and is objectively likely to influence the customer's decision …" (4.6.28)

> **"Some software services involve the generation of specific prompts promoting remortgaging. These prompts are liable, as a general rule, to be advice for the purposes of article 53A (as well as financial promotions) given by the person responsible for the provision of the software. The exception to this is where the user of the software is required to use enough control over the setting of parameters and inputting of information for the prompts to be regarded as having been generated by the customer rather than by the software itself."** (4.6.28A)

Read that last one twice. It is almost a design brief:

- A calculator where **the user sets the parameters** and the software just does arithmetic → the output is regarded as the *customer's*, not yours.
- A tool that **generates prompts promoting remortgaging** → liable to be advice *and* a financial promotion.

Your remortgage calculator and your "payment shock" framing on the mortgage calculator sit near that line. Not over it — showing someone what their payment becomes on SVR is factual — but the framing must stay descriptive ("your payment changes from £X to £Y") and never prescriptive ("you should remortgage before this happens").

**Website filtering (PERG 4.6.25B)** — relevant if you ever add product tables: simple objective ranking on one stated criterion is likely not advice; multi-factor balancing that produces a "best for you" is likely advice.

**The media exclusion (Article 54 RAO / PERG 4.6.30, PERG 7).** There is an exclusion for advice in periodical publications, regularly updated news services and **websites**, where the principal purpose of the service is not to give that advice or lead people into transactions. This is what protects MSE and the newspapers. It's a genuine safety net, but:
- It is a *fallback*, not a plan. It requires the principal-purpose test to be satisfied, and the FCA can be asked to certify (PERG 7) — most publishers never do.
- A site called "freecalculators.co.uk" whose principal purpose is calculators is *probably* fine on principal purpose, but you shouldn't build a strategy that needs it.

### 2.3 Verdict for freecalculators.co.uk

**Green — clearly outside the perimeter:**
- Arithmetic on figures the user enters.
- Amortisation schedules, totals, LTV, payment-shock comparisons, presented neutrally.
- Generic explanatory content ("how does an SVR work", "what is an ERC").
- Preloaded pSEO defaults, *provided* they're presented as "we've filled in an example for this page — change them" and not as "the rate you'll get".

**Amber — manage deliberately:**
- `market-rates.json`. Publishing an indicative market rate is information. Publishing "today's best rate" starts to look like selection with a value judgement (PERG 4.6.14(4)(b)) and, if it induces action, a financial promotion. Label it as an **average/indicative** rate with an "as at" date, and never as an offer or a rate you can get.
- The "payment shock" narrative. Factual framing only.
- "Should I fix for 2 or 5 years" blog content. Explain the trade-off; never resolve it for the reader.
- Any "you could save £X by…" copy. That's persuasion.

**Red — do not do without authorisation or an authorised partner:**
- Naming lenders and their specific products, or ranking them.
- "Best mortgage for you" / eligibility matching / any output that narrows to specific products.
- Passing user details to a broker or lender (see §3.3).
- Anything that reads as "you should".

### 2.4 What this means for your wording

The perimeter position is created by **what the site does**, not by the disclaimer. A disclaimer cannot legalise regulated activity. But a clear, consistent "we do not recommend any product, lender or course of action; we perform calculations on figures you enter" statement does real work in the PERG 4.6.16A "impartial observer" test — it's evidence about how a reasonable user would understand the service. So it's worth saying, plainly, in the same words, everywhere.

**Also worth knowing (context, not obligation):** the FCA's Mortgage Rule Review (PS25/11, rules effective 22 July 2025) removed the MCOB "interaction trigger", making it easier for *authorised* firms to talk to customers without tipping into advice. That relaxation applies to regulated firms' conduct rules — it does not move the statutory perimeter in Article 53A, so it changes nothing for you directly. It does mean the general direction of travel is towards more tolerance of informational tools, not less.

---

## 3. Track A(ii) — financial promotions: the sleeper issue

### 3.1 The rule

Section 21 FSMA 2000: a person must not, **in the course of business**, communicate an invitation or inducement to engage in investment activity, unless authorised or the content is approved by an authorised firm. Breach is a **criminal offence**. The definition is deliberately broad, and the FCA's guidance is explicit that **links on a website can be an inducement**.

Under the Financial Promotion Order 2005, Schedule 1, the controlled activities include **paragraph 10 (providing qualifying credit — i.e. mortgage lending), 10A (arranging qualifying credit) and 10B (advising on qualifying credit)**. So mortgages are squarely within the regime.

Crucially, s21 needs an **invitation or inducement**. Neutral information is not an inducement. This is your protection — and it's the same protection as the perimeter analysis, which is convenient: *stay descriptive and you clear both bars at once.*

### 3.2 Google AdSense ads on your pages

If a lender's ad appears on your mortgage calculator page, is *your company* communicating a financial promotion?

In practice, no — and this is the settled position across the ad-funded web. The advertiser is the communicator; the FPO has exemptions covering mere conduits and the person who simply provides the means of communication, and the advertiser (if UK-regulated) is responsible for its own promotion's compliance. Google's own ad policies also gate UK financial services advertisers behind FCA-authorisation verification.

**But two practical points:**
- Keep ads visually and structurally separated from your calculator output. If an ad is styled to look like a result, you own a much worse argument — and you'd also breach AdSense's own policies on ad placement and on content that could be confused with site content.
- Say so in the Terms: that third-party ads are not selected, endorsed or checked by you, and are not recommendations. This is standard and costs nothing.

### 3.3 Affiliate links — this is the real risk, and it isn't in scope today

If you ever monetise by sending users to a broker or lender, **Article 25A(2) RAO ("making arrangements with a view to")** explicitly reaches introducers, publishers and website operators where the borrower goes on to use those arrangements to enter into a mortgage. There are exclusions (notably Article 29A RAO for introductions to authorised persons, and the Article 15 FPO introducer exemption), but they are conditional and need to be got right.

**Recommendation:** your Terms should be written so that adding affiliate links later is a *deliberate decision with legal review*, not something a content edit can do by accident. Concretely — draft the Terms now to state that the site does not introduce users to, or arrange transactions with, any lender or broker. If that ever stops being true, the Terms have to change, which forces the conversation.

---

## 4. Track B — civil liability to users: what a disclaimer actually does

### 4.1 The mechanism

The relevant tort is **negligent misstatement** (*Hedley Byrne v Heller*). Liability requires an assumption of responsibility by you plus reasonable reliance by the user. In *Hedley Byrne* itself the bank escaped precisely because it had said its reply was given "without responsibility" — **the disclaimer prevented the duty from arising at all**.

That's the job your disclaimer is doing. It is not primarily a shield you raise after the fact; it is a statement that shapes what a reasonable user is entitled to rely on.

This is why "we only do arithmetic" doesn't help as much as you'd hope. Arithmetic can be wrong (a bad rounding rule, a bug in the SVR re-amortisation, a stale figure in `market-rates.json`), and a user who budgeted around your number and got it wrong has a straightforward reliance story. The mitigation is telling them, clearly and near the number, that it's an estimate and that the lender's figure governs.

### 4.2 The constraint: your disclaimer is a "consumer notice"

Consumer Rights Act 2015, Part 2 applies not only to contract terms but to a **"consumer notice"** — which expressly covers notices that are not contractual and that purport to exclude or restrict a trader's liability. A disclaimer on a free website is a consumer notice. Consequences:

- **s.62 — it must be fair.** Unfair if, contrary to good faith, it causes a significant imbalance to the consumer's detriment. An unfair notice is **not binding**.
- **s.65 — you cannot exclude liability for death or personal injury from negligence, at all.** (Irrelevant to a mortgage calculator in practice, but its presence is a marker of competent drafting, and you'd need it anyway.) You also can't exclude liability for fraud.
- **s.68 — transparency.** Plain, intelligible language; legible. A notice buried in a wall of capitals is weaker, not stronger.
- Prominence matters. A term the average consumer wouldn't be aware of is treated less favourably.

**The practical drafting lesson.** A sweeping "we accept no liability whatsoever for anything ever" is *worse* than a narrow, honest one — because a court can strike the whole thing as unfair and you're left with nothing. What survives is:

1. A **basis clause** describing what the service is — an estimate produced by a general model from figures you entered, not a quotation, not personalised. This defines the duty rather than excluding it, and is far more robust.
2. A **narrow, fair** liability limitation for the residual.
3. The **mandatory carve-outs** (death/personal injury from negligence; fraud/fraudulent misrepresentation; anything else that can't lawfully be excluded).

The Calculator Site's disclaimer (§7) is the best example of this shape I found in the UK calculator space and is worth using as a structural model.

### 4.3 Do not forget the misleading-practices angle

The **Digital Markets, Competition and Consumers Act 2024**, in force from **6 April 2025**, replaced the CPUT Regulations 2008. It prohibits misleading actions, **misleading omissions**, and failure to exercise professional diligence, where likely to cause a different transactional decision. Enforcement now includes direct CMA fines of up to 10% of global turnover.

Two things follow for you:

- **Omitting material information counts.** If your calculator ignores fees and you don't say so, that's arguably a misleading omission.
- The Act treats information as omitted if it is **"unclear or untimely or displayed in a manner where consumers are unlikely to see it."** So **placement is a legal question, not just a UX one.** A footer link is, on this test, weak. This is the strongest single argument for putting a line in the results panel.

---

## 5. Advertising and platform rules

- **CAP Code (non-broadcast).** The ASA is not the lead regulator for FCA-regulated financial promotions — technical aspects of those sit with the FCA — but the CAP Code *does* cover financial marketing communications not regulated by the FCA, and it covers **your own claims about your own site in non-paid-for space you control**. So "the UK's most accurate mortgage calculator" or "free forever" are CAP-relevant claims you'd need to be able to substantiate. Rule 3.1 (misleading) is the live one.
- **Google Publisher Policies / AdSense.** Not law, but commercially binding, and TASK-0006 depends on it. Finance is **YMYL**; approval and continued serving lean on E-E-A-T signals. Practically this means the legal pages pull double duty: a clear About/editorial-standards page, named accountable publisher, transparent methodology, visible "last updated" dates, and a privacy policy are simultaneously your compliance posture *and* your AdSense case. Treat TASK-0005 and TASK-0006 as one piece of work.

---

## 6. Disclosures that genuinely *are* mandatory

These have nothing to do with financial advice, and they're the only items in this document that are strictly compulsory. They're also the ones most often missed.

**Companies Act 2006 + The Company, Limited Liability Partnership and Business (Names and Trading Disclosures) Regulations 2015, reg. 25** — a company's **website** must state:
- registered name
- registered number
- place of registration (e.g. "Registered in England and Wales")
- registered office address

**Electronic Commerce (EC Directive) Regulations 2002, reg. 6** — an "information society service" must make the following easily, directly and permanently accessible:
- name of the service provider
- geographic address (not a PO box)
- contact details including an email address
- company registration number
- VAT number, if registered

Note: **an ad-funded free website is an information society service.** "Normally provided for remuneration" is satisfied by the advertising revenue, even though users pay nothing. So reg. 6 applies to you.

**Where to put it:** footer (short form) plus a Contact page and a block in the Terms. This should land in the same sprint as TASK-0001 (register parent company), because you can't write it until the company number exists — flag it as a dependency.

---

## 7. Competitor benchmarks (verbatim, checked August 2026)

### 7.1 MoneySavingExpert — mortgage calculator page

Directly beneath the calculator's CALCULATE button, under a heading **"IMPORTANT! Please read..."**:

> "This information is computer generated. The results are rounded and rely on certain assumptions. This calculator is a ready reckoner that's been designed to give a useful general indication of costs.
>
> It's important you always get a specific quote from the lender and double-check the price yourself before acting on the information. We cannot accept responsibility for any errors."

Only 57 words, plain English, no capitals, immediately adjacent to the tool. **This is the single best model for your results-panel layer.** Note the structure: *how it was produced → what it is → what to do instead → liability*.

### 7.2 MoneySavingExpert — site-wide and Terms

Site-wide standing line:

> "This info does not constitute financial advice, always do your own research on top to ensure it's right for your specific circumstances and remember we focus on rates not service."

From the Terms & Conditions:

> "The information on our Site shouldn't be taken as any advice, representation, or arrangement by us – you're responsible for making (or refraining from making) any specific investment or other decisions."

> "we can't promise that you'll always have access to our Site, or its content will be delivered uninterrupted and without mistakes… We're not liable for anything that happens following your use of our Site."

Acceptance mechanism: **"By continuing to use our Site, you'll be considered to have accepted these Terms."** Browsewrap. No tick box. This is a site with tens of millions of users and a large legal budget — take the signal.

Note the phrase **"or arrangement by us"** — MSE is expressly disclaiming the Article 25A "arranging" activity, not just advice. Worth copying that idea.

### 7.3 MoneyHelper (Money and Pensions Service — statutory body, the gold standard for tone)

On the mortgage repayment calculator page, as ordinary body copy under a **"How much will my mortgage repayments be?"** heading:

> "The figures shown in our tool are computer-generated estimates and should be used as a guide only. Your lender will confirm your exact monthly repayment amount and payment date when you take out a mortgage."

And, explaining method under **"How do you calculate mortgage repayments?"**:

> "We've set the interest rate to the current Bank of England base rate. For a more accurate result, update this to the rate you're paying now, or what a lender has offered you."

Two lessons. First, MoneyHelper does not use a legal-looking box at all — the caveats are *content*, in the reading flow, under question-shaped headings. That is better for users **and** it earns SEO real estate (these read as featured-snippet bait). Second, it explicitly discloses the provenance of its default rate. You should do the same for `market-rates.json`.

Separately, MoneyHelper's whole positioning is "guidance, not advice" — the statutory distinction it operates under. That vocabulary ("guidance") is a useful, non-defensive way to describe what you offer.

### 7.4 The Calculator Site — closest structural model for your Terms

> "The material and tools displayed on this website are provided without any guarantees, conditions, or warranties as to their accuracy."

> "The information presented on this site is not intended to provide specific financial, investment, or legal advice." — users needing guidance on personal finances should "consult a licensed professional in the relevant field."

Liability: disclaims "any direct, indirect or consequential loss or damage incurred by any user in connection with our site", including losses of income, business, profits, data or management time, "however arising and whether caused by tort (including negligence), breach of contract or otherwise" —

> "…nor our liability for death or personal injury arising from our negligence, nor our liability for fraudulent misrepresentation."

**That final carve-out is the mark of properly drafted UK terms** (it's what CRA 2015 s.65 requires) and it's missing from most small calculator sites. Copy the structure.

### 7.5 income-tax.co.uk — an ad-funded pSEO calculator site, i.e. your direct analogue

> "Please use Income-tax.co.uk for information purposes only, and don't take any of the results generated by our tool for granted."

Plus: no association with any government entity; the tool "might not be 100% perfect"; check with HMRC directly; not responsible for "any mistakes or decisions you might make due to using our service"; "by using this website you agree with that."

Informal, but it does three smart things you should copy: **disavows official/government status**, **names the authoritative source the user should check against** (HMRC — for you, the lender), and **states the acceptance mechanism**.

### 7.6 Lenders — for assumptions disclosure specifically

**HSBC:** the calculator assumes the interest rate remains the same throughout the mortgage term, and that interest is charged to the loan account at the same frequency as repayments are made. "The figures in this tool are for illustrative purposes only."

**Barclays:** the calculations assume any product fees are paid upfront; the "Total of monthly payments" figure includes the amount borrowed plus interest, "but there are other costs to consider."

Lenders disclose assumptions in far more detail than aggregators do, because they're MCOB-bound. You're not MCOB-bound — but their lists are the best free source of *which* assumptions matter.

### 7.7 The pattern across all of them

Everyone credible uses **three layers**, not one:

1. A **short, plain caveat adjacent to the output** (MSE's "IMPORTANT!", MoneyHelper's "guide only").
2. **Assumptions/method disclosed in the page content**, as readable prose (MoneyHelper, HSBC, Barclays).
3. **A full Terms/Disclaimer page** in the footer, with the liability architecture (MSE, The Calculator Site).

Nobody uses a tick box. Nobody uses a modal. Nobody uses capital letters.

---

## 8. Direct answers to your seven questions

### Q1. Given what this site is, what do you have to disclaim?

Split into *must* and *should*.

**Must (legal obligations, independent of disclaimers):**
- Company identity: registered name, number, place of registration, registered office (Companies Act / 2015 Regs), plus geographic address, email and VAT number if registered (E-Commerce Regs reg. 6).
- Nothing misleading, and no material omissions (DMCCA 2024).
- Privacy/cookies disclosures — TASK-0004 / TASK-0009, out of scope here.

**Should (defensive, and this is the substance of TASK-0005):**
1. Results are **estimates**, computer-generated from the figures the user entered.
2. The site gives **no advice, no recommendation, and makes no arrangements** — including no advice on any particular mortgage, product or lender.
3. You are **not FCA authorised** and this is not a regulated service.
4. Results are **not a quotation, offer, agreement in principle or decision in principle**; the lender's figures govern.
5. **The assumptions and exclusions** behind each calculation (§11).
6. **Rate provenance**: any prefilled rate is an indicative market figure as at a stated date, not a rate available to the user.
7. **Accuracy**: you take care but don't warrant it, and models/rates/tax rules change.
8. **Liability**: fair, narrow, with the mandatory carve-outs.
9. **Third-party advertising** is not selected or endorsed by you, and third-party links are outside your control.
10. **Jurisdiction**: UK-focused; where relevant, England & NI vs Scotland vs Wales (critical for the SDLT/LBTT/LTT calculators in your spec — this is a genuine trap, since SDLT doesn't apply in Scotland or Wales).
11. A pointer to where to get **actual regulated advice** — a broker/adviser on the FCA Register, or free guidance from MoneyHelper. (Cheap goodwill, strong E-E-A-T signal, and it reinforces that you aren't the adviser.)
12. **IP/ownership**, acceptable use (no scraping/automated querying), availability, and governing law — ordinary Terms hygiene.

### Q2. You only give calculations, not advice — how does that change the disclaimer?

It changes what you're defending against, and the change is asymmetric:

- **Track A (regulatory) gets much easier.** PERG 4.6.14(2) and 4.6.28A are close to written for you. Your disclaimer's job here is small and specific: state plainly that you don't recommend anything, that the results are generated from the user's own inputs, and that you aren't authorised. Two or three sentences. It corroborates a position you're already in by design.
- **Track B (civil) barely changes.** Reliance on a wrong number is reliance on a wrong number. If anything, *pure* calculation carries a subtly higher accuracy expectation than opinion — nobody sues over an opinion being unhelpful, but "your amortisation was wrong" is a concrete, provable claim.

**So the shape of your disclaimer should be the opposite of what "we don't give advice" instinctively suggests.** The "not advice" part can be short. The **accuracy, assumptions and limits** part should be the long, careful, well-placed part. That's the inverse of how most small sites write it — they write three paragraphs of "not advice" and nothing about method.

One more consequence: because you're relying on being outside the perimeter, your **copy discipline matters more than your legal page**. A single "we recommend fixing for 5 years" in a pSEO template does more damage than a missing Terms page. Worth a lint rule or an editorial checklist in TASK-0015 (editable content layer) — see §14.

### Q3. Should you still give a wider disclaimer even though you're not advising?

**Yes.** Four reasons:

1. **The perimeter position needs corroborating.** PERG 4.6.16A asks what an impartial observer would think a reasonable user understood. Consistent written framing is evidence.
2. **Negligent misstatement is unaffected by "it's only maths"** (§4.1). This is where the actual money risk is, and it's only addressed by breadth — assumptions, exclusions, accuracy, liability.
3. **AdSense / YMYL.** Google's quality standards for money content are elevated. Thin legal pages are a documented cause of "low value content" rejections. Your revenue model depends on approval (TASK-0006).
4. **You're going to scale to hundreds of pSEO pages across seven calculators.** A wide, well-structured base layer written once is far cheaper than retrofitting caveats per-variant later. Build it into the template now.

The one thing to avoid is **breadth as noise**. A 4,000-word wall nobody reads is legally weaker (CRA s.68 transparency, DMCCA "unlikely to see it"). Breadth belongs in the linked pages; the calculator surfaces get short, specific, visible lines.

### Q4. Competitor references

§7 above, verbatim. If you want a ranked shortlist of what to actually imitate:

1. **MSE's calculator-adjacent box** — for the results-panel micro-disclaimer. Best in class.
2. **MoneyHelper's in-content Q&A caveats** — for the per-calculator assumptions layer, and free SEO on top.
3. **The Calculator Site's liability structure** — for the Terms page, especially the CRA-compliant carve-outs.
4. **income-tax.co.uk** — proof that a plain, non-lawyered tone is normal in this niche; also the "check with the authoritative source" move.
5. **HSBC / Barclays** — for the specific list of assumptions worth disclosing.

### Q5. Where does it go, and do you need a tick box?

**Placement — five layers** (full spec in §9):

| Layer | Where | Length |
|---|---|---|
| 0 | Footer, every page: one line + link to /disclaimer and /terms | 1 line |
| 1 | **Inside the results panel, adjacent to the headline number** | 1–2 sentences |
| 2 | Below the calculator: "How we work this out / What we assume" — expandable, always in the DOM | 150–400 words |
| 3 | `/disclaimer` — the full not-advice + accuracy + liability statement | ~600–900 words |
| 4 | `/terms` — Terms of Use, incorporating the disclaimer by reference | ~1,200–2,000 words |

**Layer 1 is the one that matters and the one people skip.** Both the DMCCA "unlikely to see it" test and CRA s.62/s.68 prominence turn on whether an average consumer would actually encounter it. A footer link, on a page where the user's attention is on a big £ figure, is weak. Two sentences next to the number is strong. It also happens to be what MSE does.

Note your acceptance criterion #2 already says "**Prominent** 'not financial advice' disclaimer shown on calculator pages" — Layer 1 is how you satisfy that word, and Layer 0 alone would not.

**Tick box: no.** See §12.

### Q6. Do you need to explain the baked-in assumptions, MSE-style?

**Yes — and this is the highest-value item in the task.** Go beyond MSE, whose calculator page only says results "rely on certain assumptions" without listing them. Follow MoneyHelper/HSBC/Barclays instead and actually enumerate them.

Four reasons:

1. **DMCCA misleading-omission risk.** Not disclosing that your figure excludes product fees, ERCs, insurance and stamp duty — when a user is trying to work out affordability — is exactly the kind of omission of material information the Act targets.
2. **It's the strongest form of the liability defence.** "This is an estimate" is generic. "This assumes your rate never changes, interest is charged monthly, and it excludes fees X, Y, Z" is specific, and specificity is what makes reliance unreasonable. It converts a vague exclusion into a *basis clause* (§4.2).
3. **SEO.** "How is this calculated", "what does this include", "why is my lender's figure different" are real long-tail queries. MoneyHelper's caveats are structured as H2 questions precisely because they earn snippets. Your assumptions block is content, not overhead — it directly serves the pSEO strategy in `docs/spec.md`, and it's genuine differentiated text on otherwise near-duplicate variant pages. **That last point is worth flagging to TASK-0016**: a real per-calculator methodology section is a defence against thin/duplicate-content penalties across programmatic variants.
4. **Trust / E-EAT / AdSense.** Showing your working is exactly the signal Google's YMYL rating looks for.

§11 has a drafted register for the mortgage calculator, derived from your spec.

### Q7. Other things worth considering

- **"Last updated" / "rates as at" stamps.** Legal (accuracy), commercial (AdSense freshness), and user trust. `market-rates.json` needs a date field surfaced in the UI. Add to TASK-0011.07 or TASK-0015 if not already there.
- **Named accountable publisher + editorial/methodology statement.** YMYL expects it. Ties into `about-us-page.tsx`, already scaffolded.
- **Complaints / contact route.** You have no ombudsman obligations (not authorised — say so, and note explicitly that **the FOS and FSCS do not apply**; users may otherwise assume they do). But a working contact address is required by reg. 6 anyway.
- **Accessibility.** Not part of TASK-0005, but a caveat rendered as a low-contrast 10px grey line arguably fails both WCAG and the CRA "legible/prominent" test at the same time. Style Layer 1 as real content.
- **Interest-only warning.** Your spec already has a "repayment vehicle notice" for interest-only. Keep it — it's a genuine consumer-protection feature and evidence of professional diligence under DMCCA.
- **SDLT jurisdiction trap.** SDLT is England & NI only; Scotland has LBTT and Wales LTT. A UK-wide "stamp duty" calculator that silently applies English rates to a Scottish buyer is a misleading-omission problem waiting to happen. Needs an explicit jurisdiction statement on those pages.
- **Rate/tax changes.** Budget changes SDLT thresholds; base rate moves. Terms should reserve the right to change content and disclaim continuing accuracy of historical results.
- **No account, no saved data (currently).** Keeps this simple — no contract is formed with users, which supports the browsewrap position. If TASK-0015 ever adds saved calculations or email capture, revisit §12.
- **Governing law and jurisdiction clause** — England & Wales, non-exclusive as against consumers (you can't strip a consumer of their home-forum rights).
- **Reserve the affiliate question in writing** (§3.3).

---

## 9. Recommended disclosure architecture

### Layer 0 — Footer, sitewide

One line plus links. Satisfies AC #1 ("Terms page live and linked in the footer") and carries the reg. 6 / Companies Act identity block.

Suggested:

> freecalculators.co.uk provides calculation tools for information only. It is not financial advice and we are not authorised or regulated by the Financial Conduct Authority.
> [Terms of Use] · [Disclaimer] · [Privacy] · [Cookies]
> [Company name] Ltd, registered in England and Wales, company number [xxxxxxxx]. Registered office: [address]. Contact: [email].

### Layer 1 — Results panel, adjacent to the headline figure

Always visible. Not collapsed. Real body-text contrast. This is the AC #2 "prominent" requirement.

> **Estimate only.** These figures are computer-generated from the details you entered and rely on the assumptions below. They are not a quote, and not financial advice. Your lender's figures will differ — always check with them before deciding anything.

~45 words. Sits under the monthly-payment figure in `results-panel.tsx` / `summary-card.tsx`, and should appear in the single-result card and both deal cards.

### Layer 2 — Below the calculator: "How we work this out"

Two H2 sections, real content, expanded by default on desktop or via an accordion that keeps the text in the DOM (important — collapsed-but-present text is fine for SEO; text injected on click is not, and text a user must click to see is weaker for the DMCCA prominence test, so prefer a visible summary line with detail expandable).

- "How we calculate your mortgage repayments" — the method in one paragraph.
- "What this calculator assumes, and what it leaves out" — the register from §11.

Make this driven by the content layer (TASK-0015) so each calculator has its own, and so the mortgage template's version is not silently reused for stamp duty.

### Layer 3 — `/disclaimer`

The full statement: not advice, not regulated, no arrangements, accuracy, assumptions-in-general, rate provenance, third-party ads and links, jurisdiction, where to get real advice, liability position with carve-outs.

Separate from Terms deliberately: it's the page you link from every calculator, and users are more likely to open "Disclaimer" than "Terms of Use". You already have `terms-of-service-page.tsx` — add a sibling.

### Layer 4 — `/terms`

Terms of Use. Clause list:

1. Who we are (identity block, reg. 6 / Companies Act compliant)
2. Acceptance — by using the site you accept these terms; if you don't agree, don't use it
3. What the service is (basis clause — the important one)
4. What the service is **not** — no advice, no recommendation, no arrangement, not FCA authorised, no FOS/FSCS
5. Your responsibility for the inputs you provide and the decisions you take
6. Accuracy, assumptions, and changes to rates/rules
7. Availability, changes and withdrawal of the service
8. Acceptable use — no scraping, automated querying, reverse engineering, or reproduction of the calculators
9. Intellectual property
10. Third-party advertising and links
11. Liability — narrow, fair, with mandatory carve-outs
12. Privacy and cookies (cross-reference)
13. Changes to these terms
14. Governing law and jurisdiction
15. Contact and complaints

### Layer 5 — out of scope here

`/privacy` (TASK-0004), cookie banner (TASK-0009). Cross-link them from Terms.

---

## 10. Starter wording

Drafts to react to, not final copy. Get them reviewed before publishing.

**Not-advice core statement** (reusable across Layers 3 and 4):

> freecalculators.co.uk publishes calculation tools and general information about UK mortgages, loans and property taxes. We are not authorised or regulated by the Financial Conduct Authority, and nothing on this site is financial, tax or legal advice.
>
> We do not recommend any mortgage, loan, lender, broker or course of action. We do not assess whether a product is suitable or affordable for you, we do not take your personal circumstances into account, and we do not introduce you to, or make arrangements with, any lender or broker. Our calculators apply published formulas to the figures you enter and return the result; the result is generated by your inputs, not by a judgement of ours about what you should do.
>
> Because the Financial Ombudsman Service and the Financial Services Compensation Scheme cover regulated firms, they do not apply to this site.
>
> If you want advice on a specific mortgage or product, speak to a mortgage broker or adviser authorised by the FCA — you can check any firm on the FCA Register at register.fca.org.uk. For free, impartial guidance, MoneyHelper (moneyhelper.org.uk) is a government-backed service.

**Accuracy and estimates:**

> Our results are estimates. They are produced by a general model from the figures you enter, using the assumptions set out on each calculator page. They are not a quotation, offer, agreement in principle or decision in principle, and they do not mean any lender will lend to you or lend on these terms.
>
> Lenders calculate differently — they may charge interest daily rather than monthly, round differently, add fees to the loan, or apply their own affordability rules. Your lender's figures, not ours, are the ones that count.
>
> Where we prefill an interest rate, that figure is an indicative market rate as at the date shown. It is not a rate offered to you and not a rate you are likely to be quoted.
>
> We take care to keep our calculations and rates correct, but we do not guarantee that they are accurate, complete or current. Interest rates, tax rates and thresholds change, sometimes at short notice.

**Liability** (structure per §4.2 — get a solicitor to finalise):

> We provide this site free of charge and on an "as is" basis. To the extent the law allows, we exclude the warranties and conditions that would otherwise be implied.
>
> We are not liable for any loss you suffer because you relied on a result from this site, including lost income, lost profit, wasted expenditure or a financial decision that turned out badly, whether that claim is made in contract, in tort (including negligence), or otherwise.
>
> Nothing in these terms limits or excludes our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot lawfully be limited or excluded. Nothing here affects your statutory rights as a consumer.

**Third parties:**

> This site carries advertising served by third parties, including Google. We do not choose, check or endorse those advertisements, and they are not recommendations by us. We are not responsible for the content of any site we link to.

---

## 11. Drafted assumptions register — mortgage calculator

Derived from `docs/calculators-specs/mortgage-calculator.md`. Written as user-facing prose, since it's Layer 2 content, not a legal annex.

**What this calculator assumes**

- Payments are made **monthly, in arrears**, with interest charged monthly at one twelfth of the annual rate. Many lenders calculate interest **daily**, which will make their figure slightly different from ours.
- The interest rate you enter stays **the same for the whole of the period it applies to**. In reality tracker and variable rates move with the Bank of England base rate, and lenders can change their SVR whenever they choose.
- Where you enter a deal period, we assume you move onto the SVR you entered **on the day the deal ends**, and that the SVR then stays fixed for the rest of the term. In practice you would normally remortgage, and SVRs change.
- At the end of the deal period we **re-spread the remaining balance over the remaining years** at the SVR. That's how most lenders work, but check yours.
- Payments are assumed to start in the month shown, and every payment is assumed to be made **on time and in full**.
- **Interest-only:** the balance never reduces. The full amount borrowed is still owed at the end of the term, and you need a separate plan to repay it.
- Calculations are performed at full precision and **rounded only for display**, so a column of figures may not add exactly to the total shown.
- LTV is calculated as loan ÷ property price. We cap the calculator at **95% LTV**; that doesn't mean a lender will lend at that level.

**What this calculator does not include**

- Product, arrangement, booking, valuation or telegraphic-transfer fees
- Broker, solicitor and conveyancing fees, and searches
- Stamp Duty / LBTT / LTT (use our stamp duty calculator)
- Early repayment charges and exit fees
- Buildings insurance, life or income protection cover
- Ground rent, service charges, and any leasehold costs
- Overpayments, underpayments, payment holidays or term changes
- Any change to your circumstances, income or the property's value

**What this calculator does not do**

- It does not check whether a lender would actually lend to you, or how much. Lenders apply their own affordability, credit and criteria assessments.
- It does not compare products, and it does not tell you which mortgage or lender to choose.
- It does not take your personal circumstances, goals or tax position into account.

**Where our default figures come from**

> Interest rates shown by default are indicative UK market averages as at [DATE FROM market-rates.json]. They are not rates offered to you and not a rate any lender has quoted. Enter your own rate — or a rate a lender has offered — for a result that means something.

*(This last block should read from the `market-rates.json` date field, not be hard-coded. If that field doesn't exist yet, it needs adding — flag to TASK-0011.07 / TASK-0015.)*

**Cross-calculator notes for the other six calculators:**

- **Stamp duty:** state the jurisdiction (England & NI only), the effective date of the rate table, and the FTB relief and additional-property surcharge assumptions.
- **Buy-to-let:** flag explicitly that **no tax treatment is modelled** — Section 24 finance-cost restriction, income tax, CGT, and company vs personal ownership all change the real answer materially. This is the calculator most likely to mislead, and it needs the heaviest caveat.
- **ERC:** ERCs are contract-specific; the result is only as good as the percentage the user entered from their own offer document.
- **Overpayment:** assumes the lender recalculates as modelled and applies overpayments immediately, and ignores annual overpayment allowances (typically 10%) and any ERC triggered by exceeding them.

---

## 12. The tick-box question, answered properly

**Recommendation: do not use a tick box, and do not use a blocking modal.**

**The law.** UK courts are sceptical of *browsewrap* (terms binding by mere use) and readier to enforce *clickwrap* (affirmative act tied to the terms). So on the face of it a tick box looks stronger. But that reasoning applies to **forming a contract** — enforcing obligations *against* the user. You aren't forming a contract. You're not charging, not collecting personal data through the calculator, not delivering a product. You have almost nothing you need to enforce against a user beyond acceptable-use provisions.

What you actually need is for your **disclaimer** to be effective. And a disclaimer's effectiveness under CRA 2015 ss.62/68 turns on **fairness, transparency and prominence** — not on whether a box was ticked. A tick box does not cure an unfair notice, and a fair, prominent, adjacent notice doesn't need one. Under *Hedley Byrne*, what defeats an assumption of responsibility is that a reasonable user was told the information came without responsibility — again, prominence, not ceremony.

**The evidence.** MSE, MoneyHelper, The Calculator Site, income-tax.co.uk, every bank calculator checked — none of them gate a calculator behind an acceptance tick. Departing from universal practice in your sector would need a reason, and there isn't one.

**The costs of doing it anyway.**
- Bounce rate and Core Web Vitals damage on pages whose entire purpose is a frictionless calculation. Your spec's stated aim is "frictionless, fast".
- It stacks with the cookie consent banner (TASK-0009) into two interruptions before a user sees anything.
- Arguably counter-productive: a wall of text that users are trained to dismiss is *less* likely to be found transparent than one short readable line next to the answer.
- It doesn't help AdSense; it hurts the engagement metrics that do.

**When you would need to revisit this:** if you add accounts, save calculations, capture email addresses, offer downloadable reports, or add affiliate links — anything that forms a real relationship or a real contract. At that point clickwrap acceptance at the point of signup (an unticked box, separate from marketing consent) becomes the right pattern. Note it as a trigger, don't build it now.

**Do instead:** make Layer 1 genuinely visible, keep Layer 2 in the page, and ensure the footer link is present on every page including the pSEO variants.

---

## 13. Copy discipline — the actual day-to-day risk

Your perimeter position is created by copy, not by the legal page. Across seven calculators and hundreds of pSEO variants (TASK-0016), one careless template string does more damage than a missing clause.

**Avoid:**
- "We recommend…", "you should…", "the best option is…", "your best deal"
- "Save £X by switching / remortgaging now" — persuasion, and inducement
- "Cheapest", "best rate", "top mortgage" applied to a named product or lender
- Any prompt that fires unbidden and tells the user to act ("Your deal ends soon — remortgage now") — this is precisely PERG 4.6.28A
- Ranked tables of named products
- "Guaranteed", "accurate", "exact"
- Anything implying government or regulator affiliation

**Prefer:**
- "Based on the figures you entered…"
- "Here's what changes when your deal ends" (descriptive) over "here's why you should act"
- "Some borrowers choose to…, others…" — balanced, generic, PERG 4.6.7-safe
- "Check with your lender" / "speak to an FCA-authorised broker"

Worth encoding as a short editorial checklist in the content layer (TASK-0015), and possibly a build-time grep for banned phrases in the Markdown content files.

---

## 14. Suggested follow-on tasks

These are consequences of the research, not part of TASK-0005 itself:

1. **Add a rates "as at" date to `market-rates.json`** and surface it in the calculator UI (touches TASK-0011.07 / TASK-0015).
2. **Per-calculator assumptions content in the content layer** so each of the seven calculators has its own Layer 2 block (TASK-0015).
3. **Editorial copy checklist + banned-phrase check** for pSEO templates (TASK-0015 / TASK-0016).
4. **About/editorial-standards page with a named publisher** — YMYL/E-EAT, supports TASK-0006.
5. **Jurisdiction handling for the SDLT calculator** (England & NI vs LBTT vs LTT).
6. **Company identity block** — blocked on TASK-0001; add as an explicit dependency of TASK-0005's AC #1.

---

## 15. Open decisions for you

1. **Separate `/disclaimer` page, or one combined `/terms`?** Recommendation: separate. Better link target from calculators, higher chance of being read, and keeps the calculator-facing document short. `terms-of-service-page.tsx` already exists; add a sibling.
2. **Solicitor review — yes or no?** Recommendation: yes, but scoped. Draft everything yourself from this document, then pay for a review of the liability clause and the not-advice/perimeter statement only. A fixed-fee website-terms review is common; a full drafting instruction is not worth it at this stage.
3. **Do you ever want affiliate revenue?** Decide now, because it changes the Terms (§3.3) and the perimeter analysis. If the answer is "maybe later", draft as "no" today.
4. **Layer 2 — expanded by default, or accordion?** Recommendation: a visible one-line summary with the detail in an accordion that keeps text in the DOM. Balances prominence against page length.
5. **Do you want a "Methodology" page per calculator** (stronger SEO, more maintenance) or an on-page section only? Recommendation: on-page section for now; revisit if variant pages start looking thin.

---

## Sources

FCA Handbook and regulatory material:
- [PERG 4.6 — Advising on regulated mortgage contracts](https://www.handbook.fca.org.uk/handbook/PERG/4/6.html)
- [PERG 4 — Guidance on regulated activities connected with mortgages](https://www.handbook.fca.org.uk/handbook/PERG/4/?view=chapter)
- [PERG 8.28 — Advice vs information](https://www.handbook.fca.org.uk/handbook/PERG/8/28.html)
- [PERG 8.12 — Exemptions applying to all controlled activities](https://handbook.fca.org.uk/handbook/PERG/8/12.html)
- [PERG 2.8 — Exclusions applicable to particular regulated activities](https://handbook.fca.org.uk/handbook/perg2/perg2s8)
- [PS25/11 — Mortgage Rule Review: first steps to simplify our rules](https://www.fca.org.uk/publications/policy-statements/ps25-11-mortgage-rule-review-first-steps-simplify-rules-increase-flexibility)
- [FCA/ASA Memorandum of Understanding](https://www.fca.org.uk/publication/mou/mou-fca-asa-2019.pdf)

Legislation:
- [FSMA 2000 (Financial Promotion) Order 2005, Schedule 1 — controlled activities](https://www.legislation.gov.uk/uksi/2005/1529/schedule/1)
- [Consumer Rights Act 2015, Part 2 — unfair terms and notices](https://www.legislation.gov.uk/ukpga/2015/15/part/2)
- [CRA 2015 s.61 — contracts and notices covered](https://www.legislation.gov.uk/ukpga/2015/15/section/61)
- [CRA 2015 s.65 — bar on excluding negligence liability](https://www.legislation.gov.uk/ukpga/2015/15/section/65)
- [Electronic Commerce (EC Directive) Regulations 2002, reg. 6](https://www.legislation.gov.uk/uksi/2002/2013/regulation/6)
- [Company, LLP and Business (Names and Trading Disclosures) Regulations 2015](https://www.legislation.gov.uk/uksi/2015/17)
- [Digital Markets, Competition and Consumers Act 2024, Part 4](https://www.legislation.gov.uk/ukpga/2024/13/part/4)

Commentary:
- [Pinsent Masons — The UK's E-Commerce Regulations](https://www.pinsentmasons.com/out-law/guides/the-uks-e-commerce-regulations)
- [Brodies — Online trading disclosures: does your company comply?](https://brodies.com/insights/corporate/online-trading-disclosures-does-your-company-comply/)
- [Reed Smith — DMCCA 2024 consumer protection regime in force](https://www.reedsmith.com/en/perspectives/2025/01/digital-markets-competition-and-consumers-act-2024-in-force-3)
- [Gordons — DMCCA 2024: unfair commercial practices](https://www.gordonsllp.com/the-digital-markets-competition-and-consumers-act-2024-article-2-the-unfair-commercial-practices/)
- [LexisNexis — Negligent misstatement: disclaimers, UCTA reasonableness](https://www.lexisnexis.com/en-gb/legal/guidance/negligent-misstatement-defences-remedies)
- [Linklaters — FCA implements first phase of Mortgage Rule Review](https://financialregulation.linklaters.com/post/102kzg3/fca-implements-first-phase-of-mortgage-rule-review)
- [ASA/CAP — Financial products and services: general](https://www.asa.org.uk/advice-online/financial-products-and-services-general.html)
- [CAP Code section 14 — financial products](https://www.asa.org.uk/type/non_broadcast/code_section/14.html)
- [Google Publisher Policies](https://support.google.com/adsense/answer/10502938?hl=en)
- [AdSense Program policies](https://support.google.com/adsense/answer/48182?hl=en)

Competitor pages checked:
- [MoneySavingExpert — mortgage calculator](https://www.moneysavingexpert.com/mortgages/mortgage-rate-calculator/)
- [MoneySavingExpert — Terms & Conditions](https://www.moneysavingexpert.com/site/terms-conditions/)
- [MoneyHelper — mortgage repayment calculator](https://www.moneyhelper.org.uk/en/homes/buying-a-home/mortgage-repayment-calculator)
- [MoneyHelper — mortgage calculators hub](https://www.moneyhelper.org.uk/en/homes/buying-a-home/mortgage-calculator)
- [The Calculator Site — disclaimer](https://www.thecalculatorsite.com/disclaimer.php)
- [income-tax.co.uk — disclaimer](https://www.income-tax.co.uk/disclaimer/)
- [HSBC — mortgage repayment calculator](https://www.hsbc.co.uk/mortgages/repayment-calculator/)
- [Barclays — mortgage calculator](https://www.barclays.co.uk/mortgages/mortgage-calculator/)
