import { create } from 'zustand';
import { depositAmountToPercent, depositPercentToAmount } from './calculations';
import defaults from './defaults.json';
import type { DealType, DepositMode, MortgageType } from './types';

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
  setMortgageType: (v: MortgageType) => void;
  setPropertyPrice: (v: number) => void;
  setDepositMode: (mode: DepositMode) => void;
  setDeposit: (v: number) => void;
  setDepositPercent: (v: number) => void;
  setMortgageTerm: (v: number) => void;
  setInterestRate: (v: number) => void;
  setStartDate: (v: string) => void;
  setHasDeal: (v: boolean) => void;
  setDealType: (v: DealType) => void;
  setDealTerm: (v: number) => void;
  setSvr: (v: number) => void;
  setBaseRate: (v: number) => void;
  setMargin: (v: number) => void;
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

  setMortgageType: (v) => set({ mortgageType: v }),
  setPropertyPrice: (v) => set({ propertyPrice: v }),
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
  setDeposit: (v) => set({ deposit: v }),
  setDepositPercent: (v) => set({ depositPercent: v }),
  setMortgageTerm: (v) => set({ mortgageTerm: v }),
  setInterestRate: (v) => set({ interestRate: v }),
  setStartDate: (v) => set({ startDate: v }),
  setHasDeal: (v) => set({ hasDeal: v }),
  setDealType: (v) => set({ dealType: v }),
  setDealTerm: (v) => set({ dealTerm: v }),
  setSvr: (v) => set({ svr: v }),
  setBaseRate: (v) => set({ baseRate: v }),
  setMargin: (v) => set({ margin: v }),
  reset: () => set(initialState),
}));
