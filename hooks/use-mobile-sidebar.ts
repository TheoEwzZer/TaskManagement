import { StoreApi, UseBoundStore, create } from "zustand";

export type MobileSidebarStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useMobileSidebar: UseBoundStore<StoreApi<MobileSidebarStore>> =
  create<MobileSidebarStore>(
    (set: any): MobileSidebarStore => ({
      isOpen: false,
      onOpen: (): void => set({ isOpen: true }),
      onClose: (): void => set({ isOpen: false }),
    })
  );
