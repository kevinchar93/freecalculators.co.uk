import type { Dispatch, SetStateAction } from 'react';
import { create } from 'zustand';
import { depositAmountToPercent, depositPercentToAmount } from './calculations';
import defaults from './defaults.json';
import type { DealType, DepositMode, MortgageType } from './types';

function resolve<T>(value: SetStateAction<T>, prev: T): T {
  return typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
}

export interface MortgageInputs {
  mortgageType: MortgageType;
  propertyPriceGbp: number;
  depositMode: DepositMode;
  depositGbp: number;
  depositPercent: number;
  mortgageTermYears: number;
  interestRatePercent: number;
  startDate: string;
  hasDeal: boolean;
  dealType: DealType;
  dealTermYears: number;
  standardVariableRatePercent: number;
  baseRatePercent: number;
  marginPercent: number;
}

interface MortgageActions {
  setMortgageType: Dispatch<SetStateAction<MortgageType>>;
  setPropertyPriceGbp: Dispatch<SetStateAction<number>>;
  setDepositMode: (mode: DepositMode) => void;
  setDepositGbp: Dispatch<SetStateAction<number>>;
  setDepositPercent: Dispatch<SetStateAction<number>>;
  setMortgageTermYears: Dispatch<SetStateAction<number>>;
  setInterestRatePercent: Dispatch<SetStateAction<number>>;
  setStartDate: Dispatch<SetStateAction<string>>;
  setHasDeal: Dispatch<SetStateAction<boolean>>;
  setDealType: Dispatch<SetStateAction<DealType>>;
  setDealTermYears: Dispatch<SetStateAction<number>>;
  setStandardVariableRatePercent: Dispatch<SetStateAction<number>>;
  setBaseRatePercent: Dispatch<SetStateAction<number>>;
  setMarginPercent: Dispatch<SetStateAction<number>>;
  reset: () => void;
}

export type MortgageStore = MortgageInputs & MortgageActions;

const initialState: MortgageInputs = {
  mortgageType: defaults.mortgageType as MortgageType,
  propertyPriceGbp: defaults.propertyPriceGbp,
  depositMode: defaults.depositMode as DepositMode,
  depositGbp: defaults.depositGbp,
  depositPercent: defaults.depositPercent,
  mortgageTermYears: defaults.mortgageTermYears,
  interestRatePercent: defaults.interestRatePercent,
  startDate: defaults.startDate,
  hasDeal: defaults.hasDeal,
  dealType: defaults.dealType as DealType,
  dealTermYears: defaults.dealTermYears,
  standardVariableRatePercent: defaults.standardVariableRatePercent,
  baseRatePercent: defaults.baseRatePercent,
  marginPercent: defaults.marginPercent,
};

export const useMortgageStore = create<MortgageStore>((set, get) => ({
  ...initialState,

  setMortgageType: (v) => set((s) => ({ mortgageType: resolve(v, s.mortgageType) })),
  setPropertyPriceGbp: (v) => set((s) => ({ propertyPriceGbp: resolve(v, s.propertyPriceGbp) })),
  setDepositMode: (newMode) => {
    const { depositMode, propertyPriceGbp, depositGbp, depositPercent } = get();
    if (newMode === depositMode) {
      return;
    }

    if (newMode === 'percent') {
      set({
        depositMode: newMode,
        depositPercent: depositAmountToPercent(propertyPriceGbp, depositGbp),
      });
      return;
    }

    set({
      depositMode: newMode,
      depositGbp: depositPercentToAmount(propertyPriceGbp, depositPercent),
    });
    return;
  },
  setDepositGbp: (v) => set((s) => ({ depositGbp: resolve(v, s.depositGbp) })),
  setDepositPercent: (v) => set((s) => ({ depositPercent: resolve(v, s.depositPercent) })),
  setMortgageTermYears: (v) => set((s) => ({ mortgageTermYears: resolve(v, s.mortgageTermYears) })),
  setInterestRatePercent: (v) => set((s) => ({ interestRatePercent: resolve(v, s.interestRatePercent) })),
  setStartDate: (v) => set((s) => ({ startDate: resolve(v, s.startDate) })),
  setHasDeal: (v) => set((s) => ({ hasDeal: resolve(v, s.hasDeal) })),
  setDealType: (v) => set((s) => ({ dealType: resolve(v, s.dealType) })),
  setDealTermYears: (v) => set((s) => ({ dealTermYears: resolve(v, s.dealTermYears) })),
  setStandardVariableRatePercent: (v) => set((s) => ({ standardVariableRatePercent: resolve(v, s.standardVariableRatePercent) })),
  setBaseRatePercent: (v) => set((s) => ({ baseRatePercent: resolve(v, s.baseRatePercent) })),
  setMarginPercent: (v) => set((s) => ({ marginPercent: resolve(v, s.marginPercent) })),
  reset: () => set(initialState),
}));
