import { api } from "../services/api";

export const useApi = () => ({
  validateToken: async (token: string) => {
    const res = await api.post("/tokens", { token });
    return res.data;
  },

  signin: async (email: string, password: string) => {
    const res = await api.post("/tokens", {
      email,
      password,
    });
    return res.data;
  },

  logout: async () => {
    const res = await api.post("/tokens");
    return res.data;
  }
});
