import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// utils/api.ts
const BASE_URL = "https://oldest-soraya-fleecier.ngrok-free.dev/api/v1";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  token?: string; // for auth
}

export const CommonApi = async (
  endpoint: string,
  { method = "GET", body, headers = {}, token }: ApiOptions = {}
) => {

  const storageToken = Platform.OS === 'web' ? localStorage.getItem("auth_token") : await AsyncStorage.getItem('auth_token');
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token ?? storageToken}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // include status + server error message
      throw {
        status: response.status,
        message: data?.message || `Error ${response.status}`,
        error: data,
      };
    }

    return data;
  } catch (error: any) {
    // if it's already in our custom shape, pass as-is
    if (error.status) throw error;

    // fallback for network errors
    throw {
      status: 0,
      message: error.message || "Network Error",
      error: {},
    };
  }
};
