// src/zustand/store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  visa: true,
  setVisaTrue: () => set({ visa: true }),
  setVisaFalse: () => set({ visa: false }),
  toggleVisa: () => set((state) => ({ visa: !state.visa })),
}));

export default useStore;