// Modules
import { useNotify } from "@/composables/useNotify";

// Methods
async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, config);
  const response = await fetch(request);

  if (!response.ok) {
    const error = { name: response.status, message: response.statusText };
    let message = `Got Fetch Error: ${error.name}`;
    if (error.message) {
      message += `: ${error.message}`;
    }
    useNotify(message, "error");
    throw error;
  }

  return response.json().catch(() => ({}));
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: "get", headers: { "Content-Type": "application/json" }, ...config };
  return await http<T>(path, init);
}

export async function post<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
  const init = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...config,
  };
  return await http<U>(path, init);
}

export async function put<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
  const init = {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...config,
  };
  return await http<U>(path, init);
}

export async function remove<T>(path: string, config?: RequestInit): Promise<T> {
  const init = {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    ...config,
  };
  return await http<T>(path, init);
}
