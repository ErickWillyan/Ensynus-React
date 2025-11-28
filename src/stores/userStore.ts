import { create } from "zustand";

type userStoreType = {
  userId: string;
  insertUserId: (id: string) => void;
  isAuthenticated: boolean;
  setAuth: (status: boolean) => void;
};
export const userStore = create<userStoreType>((set) => ({
  userId: "",
  insertUserId: (id: string) => set({ userId: id }),
  isAuthenticated: false,
  setAuth: (status) => set({ isAuthenticated: status }),
}));
