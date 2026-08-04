# freecalculators.co.uk -- site spec

# 1. Core Purpose and Target Audience

**Core Purpose:**
To build a high-traffic, programmatic SEO (pSEO) driven portfolio of UK financial calculators. The objective is to achieve 400,000–500,000 monthly pageviews to generate approximately £5,000/month via Google Ads (target RPM: £10-£15). The platform will provide frictionless, fast, and highly specific financial arithmetic without offering regulated financial advice.

**Target Audience:**
UK homebuyers, existing homeowners, landlords, and personal borrowers who are actively researching their financial options. These users have high commercial intent and are searching for long-tail, highly specific queries (e.g., "how much is a 90% LTV mortgage on a 300k house").

**Technical Architecture:**

Backend: Laravel (PHP)

Frontend: React.js (via Inertia.js), styled with Tailwind CSS. Mobile-first layout.

Content Engine: Lean, database-free architecture. Uses a JSON manifest for programmatic routing/defaults, a market_rates.json file for global rate updates, and Markdown (.md) files for SEO-optimized, below-the-fold content.

# 2. Core Calculators & pSEO Variations

Each core calculator will act as a master template. There will be nested variations with specific URLs (pSEO pages) that preload the calculator with targeted defaults and display unique Markdown content below the fold. Full specs for each calculator, including inputs, outputs, calculations, and pSEO variations, are linked below.

- [Mortgage Repayment Calculator](calculators-specs/mortgage-calculator.md)
- [Stamp Duty (SDLT) Calculator](calculators-specs/stamp-duty-calculator.md)
- [Remortgage Calculator](calculators-specs/remortgage-calculator.md)
- [Overpayment Calculator](calculators-specs/overpayment-calculator.md)
- [Early Repayment Charge (ERC) Calculator](calculators-specs/early-repayment-charge-calculator.md)
- [Buy-to-Let Mortgage Calculator](calculators-specs/buy-to-let-mortgage-calculator.md)
- [Loan Repayment Calculator](calculators-specs/loan-calculator.md)

# Supporting Blog Content (The "Hub and Spoke" Model)

These informational articles will target broader queries. Their primary job is to generate traffic and pass link equity directly to the calculator pages using contextual calls-to-action.

**Mortgage & Remortgage Hub:**

Should I fix my mortgage for 2 or 5 years in 2026? (Links to: 2-yr and 5-yr pSEO mortgage calculators)
What happens when my fixed-rate mortgage ends? (Links to: Remortgage calculator)
How does the Standard Variable Rate (SVR) actually work? (Links to: Mortgage repayment calculator)
Can I remortgage to pay off debt? (Links to: Remortgage calculator & Loan calculator)

**Tax & Fees Hub:**
Stamp Duty rates 2026: What do first-time buyers actually pay? (Links to: SDLT FTB calculator)
Is it ever worth paying an Early Repayment Charge to get a lower rate? (Links to: ERC calculator & Remortgage calculator)
How the 5% Stamp Duty surcharge affects second homes and BTLs. (Links to: SDLT additional property calculator)

**Strategy Hub:**
Does overpaying my mortgage reduce my monthly payments or my term? (Links to: Overpayment calculator)
What is a good rental yield for a Buy-to-Let in 2026? (Links to: BTL calculator)
Interest-only vs. Repayment mortgages: Which is better for landlords? (Links to: BTL calculator)