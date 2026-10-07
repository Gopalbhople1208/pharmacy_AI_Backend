const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "/api" : "http://127.0.0.1:8000");

const request = async (path, options) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      message = body.detail || message;
    } catch {
      // Keep the HTTP status message when the response is not JSON.
    }
    throw new Error(message);
  }

  return response.json();
};

export const getHealth = async () => {
  return request("/health");
};

export const getInventory = async () => {
  return request("/inventory/");
};

export const getLowStock = async () => {
  return request("/inventory/low-stock");
};

export const getExpired = async () => {
  return request("/inventory/expired");
};

export const getNearExpiry = async () => {
  return request("/inventory/near-expiry");
};

export const sendChatMessage = async (message, provider = "gemini") => {
  return request("/chat/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, provider }),
  });
};

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return request("/upload/", {
    method: "POST",
    body: formData,
  });
};