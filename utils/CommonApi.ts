// utils/api.ts
const BASE_URL = "http://localhost:3000/api/v1";

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
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
