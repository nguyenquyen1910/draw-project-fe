import { create } from "zustand";
import { AxiosInstance } from "../lib/axios";

export const useAuthStore = create((get, set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  restoreSession: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ loading: false });
      return false;
    }

    set({ token, loading: true });

    const result = await get().fetchUserInfo();

    set({ loading: false });
    return result.success;
  },

  fetchUserInfo: async () => {
    try {
      const response = await AxiosInstance.get("/users/me");

      if (response.code === 1000 && response.result) {
        const userData = {
          id: response.result.id,
          username: response.result.username,
          email: response.result.email,
          fullName: response.result.fullName,
          avatar: response.result.avatar,
        };

        set({ user: userData });
        return { success: true, data: userData };
      }
    } catch (error) {
      set({ error: error.response.data.message });
      return { success: false, error: error.response.data.message };
    }
  },

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const response = await AxiosInstance.post("/auth/login", {
        username,
        password,
      });
      if (response.code === 1000 && response.result) {
        const { token } = response.result;

        set({ token: token, loading: false, error: null });

        localStorage.setItem("token", token);

        await get().fetchUserInfo();

        return { success: true, data: response.result };
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  signup: async (username, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await AxiosInstance.post("/auth/signup", {
        username,
        email,
        password,
      });

      if (response.code === 1000 && response.result?.token) {
        const { token } = response.result;

        localStorage.setItem("token", token);
        set({ token, loading: false, error: null });

        const userResult = await get().fetchUserInfo();

        if (userResult.success) {
          return { success: true, data: userResult.data };
        } else {
          return { success: false, error: userResult.error };
        }
      } else {
        throw new Error(response.message || "Signup failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Signup failed";
      set({ error: errorMessage, loading: false, user: null, token: null });
      return { success: false, error: errorMessage };
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, error: null });
  },

  clearError: () => set({ error: null }),
}));
