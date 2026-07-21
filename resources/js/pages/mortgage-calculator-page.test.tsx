import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import MortgageCalculatorPage from './mortgage-calculator-page';

describe('MortgageCalculatorPage', () => {
  it('renders the page heading', () => {
    render(<MortgageCalculatorPage />);

    expect(
      screen.getByRole('heading', { name: 'Mortgage Payment Calculator' }),
    ).toBeInTheDocument();
  });

  it('calculates the loan to value from property price and deposit', () => {
    render(<MortgageCalculatorPage />);

    // Default: £250,000 price, £50,000 deposit -> 80% LTV.
    expect(screen.getByText('80.0%')).toBeInTheDocument();
  });

  it('recalculates the loan to value when the deposit changes', async () => {
    const user = userEvent.setup();
    render(<MortgageCalculatorPage />);

    const depositInput = screen.getByLabelText('Deposit Amount');
    await user.clear(depositInput);
    await user.type(depositInput, '100000');

    // £250,000 price, £100,000 deposit -> 60% LTV.
    expect(screen.getByText('60.0%')).toBeInTheDocument();
  });

  it('switches between repayment and interest-only mortgage types', async () => {
    const user = userEvent.setup();
    render(<MortgageCalculatorPage />);

    const interestOnly = screen.getByRole('radio', { name: 'Interest Only' });
    expect(interestOnly).toHaveAttribute('aria-checked', 'false');

    await user.click(interestOnly);

    expect(interestOnly).toHaveAttribute('aria-checked', 'true');
  });
});
