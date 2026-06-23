import { create } from 'zustand';

export const useUserStore = create((set) => ({
  role: null, // 'customer' | 'vendor' | null
  user: null,
  isAuthenticated: false,
  setRole: (role) => set({ role, isAuthenticated: false }),
  logout: () => set({ role: null, user: null, isAuthenticated: false }),
  login: (role, userInfo) => set({ role, user: userInfo, isAuthenticated: true }),
  authenticate: () => set({ isAuthenticated: true }),
}));
export default useUserStore;
