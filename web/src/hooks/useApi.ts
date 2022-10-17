import { api } from "../services/api";

export const useApi = () => ({
  validateToken: async (token: string) => {
    const res = await api.post("/api/tokens", { token });
    return res.data;
  },

  signin: async (email: string, password: string) => {
    const res = await api.post("/api/tokens", {
      email,
      password,
    });
    return res.data;
  },

  logout: async () => {
    const res = await api.post("/api");
    return res.data;
  }
});
