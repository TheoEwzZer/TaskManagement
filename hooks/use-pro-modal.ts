import { StoreApi, UseBoundStore, create } from "zustand";

export type ProModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useProModal: UseBoundStore<StoreApi<ProModalStore>> = create<ProModalStore>(
  (set: any): ProModalStore => ({
    isOpen: false,
    onOpen: (): void => set({ isOpen: true }),
    onClose: (): void => set({ isOpen: false }),
  })
);
