import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://10.0.0.21:3001";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = async (email: string, password: string) => {
  const balance = 100;
  const response = await api.post("/users", { email, password, balance });
  await SecureStore.setItemAsync("token", response.data.token);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/users/login", { email, password });
  await SecureStore.setItemAsync("token", response.data.token);
  return response.data;
};

export const logout = async () => {
  await SecureStore.deleteItemAsync("token");
};

export const getUserProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const getUserBalance = async () => {
  const response = await api.get("/users/balance");
  return response.data.balance;
};

export const getVouchers = async () => {
  const response = await api.get("/vouchers");
  return response.data;
};

export const purchaseVoucher = async (voucherId: string) => {
  const response = await api.put("/purchase/", {
    voucherId,
    userId: "66b3950b25c15c7e0313a9fb",
  });
  return response.data;
};

export const getUserPurchasedVouchers = async () => {
  const response = await api.get("/users/vouchers");
  return response.data;
};
