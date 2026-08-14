import type { Dispatch, SetStateAction } from 'react';
import { create } from 'zustand';
import { depositAmountToPercent, depositPercentToAmount } from './calculations';
import defaults from './defaults.json';
import type { DealType, DepositMode, MortgageType } from './types';

function resolve<T>(value: SetStateAction<T>, prev: T): T {
  return typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
}

interface MortgageInputs {
  mortgageType: MortgageType;
  propertyPrice: number;
  depositMode: DepositMode;
  deposit: number;
  depositPercent: number;
  mortgageTerm: number;
  interestRate: number;
  startDate: string;
  hasDeal: boolean;
  dealType: DealType;
  dealTerm: number;
  svr: number;
  baseRate: number;
  margin: number;
}

interface MortgageActions {
  setMortgageType: Dispatch<SetStateAction<MortgageType>>;
  setPropertyPrice: Dispatch<SetStateAction<number>>;
  setDepositMode: (mode: DepositMode) => void;
  setDeposit: Dispatch<SetStateAction<number>>;
  setDepositPercent: Dispatch<SetStateAction<number>>;
  setMortgageTerm: Dispatch<SetStateAction<number>>;
  setInterestRate: Dispatch<SetStateAction<number>>;
  setStartDate: Dispatch<SetStateAction<string>>;
  setHasDeal: Dispatch<SetStateAction<boolean>>;
  setDealType: Dispatch<SetStateAction<DealType>>;
  setDealTerm: Dispatch<SetStateAction<number>>;
  setSvr: Dispatch<SetStateAction<number>>;
  setBaseRate: Dispatch<SetStateAction<number>>;
  setMargin: Dispatch<SetStateAction<number>>;
  reset: () => void;
}

export type MortgageStore = MortgageInputs & MortgageActions;

const initialState: MortgageInputs = {
  mortgageType: defaults.mortgageType as MortgageType,
  propertyPrice: defaults.propertyPrice,
  depositMode: defaults.depositMode as DepositMode,
  deposit: defaults.deposit,
  depositPercent: defaults.depositPercent,
  mortgageTerm: defaults.mortgageTerm,
  interestRate: defaults.interestRate,
  startDate: defaults.startDate,
  hasDeal: defaults.hasDeal,
  dealType: defaults.dealType as DealType,
  dealTerm: defaults.dealTerm,
  svr: defaults.svr,
  baseRate: defaults.baseRate,
  margin: defaults.margin,
};

export const useMortgageStore = create<MortgageStore>((set, get) => ({
  ...initialState,

  setMortgageType: (v) => set((s) => ({ mortgageType: resolve(v, s.mortgageType) })),
  setPropertyPrice: (v) => set((s) => ({ propertyPrice: resolve(v, s.propertyPrice) })),
  setDepositMode: (newMode) => {
    const { depositMode, propertyPrice, deposit, depositPercent } = get();
    if (newMode === depositMode) {
      return;
    }

    if (newMode === 'percent') {
      set({
        depositMode: newMode,
        depositPercent: depositAmountToPercent(propertyPrice, deposit),
      });
      return;
    }

    set({
      depositMode: newMode,
      deposit: depositPercentToAmount(propertyPrice, depositPercent),
    });
    return;
  },
  setDeposit: (v) => set((s) => ({ deposit: resolve(v, s.deposit) })),
  setDepositPercent: (v) => set((s) => ({ depositPercent: resolve(v, s.depositPercent) })),
  setMortgageTerm: (v) => set((s) => ({ mortgageTerm: resolve(v, s.mortgageTerm) })),
  setInterestRate: (v) => set((s) => ({ interestRate: resolve(v, s.interestRate) })),
  setStartDate: (v) => set((s) => ({ startDate: resolve(v, s.startDate) })),
  setHasDeal: (v) => set((s) => ({ hasDeal: resolve(v, s.hasDeal) })),
  setDealType: (v) => set((s) => ({ dealType: resolve(v, s.dealType) })),
  setDealTerm: (v) => set((s) => ({ dealTerm: resolve(v, s.dealTerm) })),
  setSvr: (v) => set((s) => ({ svr: resolve(v, s.svr) })),
  setBaseRate: (v) => set((s) => ({ baseRate: resolve(v, s.baseRate) })),
  setMargin: (v) => set((s) => ({ margin: resolve(v, s.margin) })),
  reset: () => set(initialState),
}));
