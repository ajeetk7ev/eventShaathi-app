import { create } from 'zustand';

export const useUserStore = create((set) => ({
  role: null, // 'customer' | 'vendor' | null
  user: null,
  isAuthenticated: false,
  bookings: [], // list of user bookings
  setRole: (role) => set({ role, isAuthenticated: false }),
  logout: () => set({ role: null, user: null, isAuthenticated: false, bookings: [] }),
  login: (role, userInfo) => set({ role, user: userInfo, isAuthenticated: true }),
  authenticate: () => set({ isAuthenticated: true }),
  addBooking: (newBooking) => set((state) => ({ bookings: [newBooking, ...state.bookings] })),
  updateBookingStatus: (bookingId, status) => set((state) => ({
    bookings: state.bookings.map((b) => b.id === bookingId ? { ...b, status } : b)
  })),
}));
export default useUserStore;
