import { Head } from '@inertiajs/react';

export default function MortgageCalculatorAssumptionsPage() {
    return (
        <>
            <Head title="Mortgage Calculator Assumptions" />
            <div className="px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold">
                    Mortgage Calculator Assumptions
                </h1>
                <ul className="mt-6 list-disc space-y-3 pl-5">
                    <li>
                        Interest rates are treated as fixed for each period —
                        the deal rate during your deal, and the SVR
                        afterwards. The calculator doesn't model rate changes
                        happening mid-period.
                    </li>
                    <li>
                        Monthly payments are calculated using standard
                        amortisation, assuming equal monthly payments with
                        interest compounded monthly.
                    </li>
                    <li>
                        Product or arrangement fees aren't included — figures
                        reflect the loan amount and interest only.
                    </li>
                    <li>
                        Overpayments and lump-sum payments aren't factored
                        in; the schedule assumes only the standard monthly
                        payment is made.
                    </li>
                    <li>
                        For interest-only mortgages, the balance is assumed
                        to stay the same throughout the term — you'll need a
                        separate repayment vehicle to clear it.
                    </li>
                    <li>
                        Deal and mortgage periods are assumed to start from
                        the "Start date" you enter, not part-way through an
                        existing deal.
                    </li>
                    <li>
                        Where you don't enter your own rate, we use
                        indicative average market rates, which may not match
                        the rate a lender actually offers you.
                    </li>
                </ul>
            </div>
        </>
    );
}
