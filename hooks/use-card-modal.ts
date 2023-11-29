import { StoreApi, UseBoundStore, create } from "zustand";

export type CardModalStore = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useCardModal: UseBoundStore<StoreApi<CardModalStore>> =
  create<CardModalStore>(
    (set: any): CardModalStore => ({
      id: undefined,
      isOpen: false,
      onOpen: (id: string): void => set({ isOpen: true, id }),
      onClose: (): void => set({ isOpen: false, id: undefined }),
    })
  );
