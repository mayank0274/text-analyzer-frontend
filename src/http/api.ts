import axios from "axios";

const api = axios.create({
  // todo: move this value to env variable.
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (data: {
  email: string;
  password: string;
  name: string;
}) => api.post("/auth/register", data);

export const login = async (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const getUserDetails = async (headers: any) =>
  api.get("/auth/me", { headers: { ...headers } });

export const analyzeText = async (headers: any, data: { userPrompt: string }) =>
  api.post("/analyze", data, { headers: { ...headers } });

export const uploadFile = async (headers: any, data: FormData) =>
  api.post("/upload", data, { headers: { ...headers } });

export const logout = async (headers: any) =>
  api.get("/auth/logout", { headers: { ...headers } });

export const getHistory = async (headers: any) =>
  api.get("/history", { headers: { ...headers } });
