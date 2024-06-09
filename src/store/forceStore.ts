import { create } from 'zustand';

export interface IForceStore {
  force: number;
  setForce: (force: number) => void;
}

export const useForce = create<IForceStore>((set) => ({
  force: 10000,
  setForce: (force: number) => set({ force: force }),
}));
