


const API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "/api" : "http://127.0.0.1:8000");

// ===============================
// Send Chat Message
// ===============================
export async function sendMessage(message, provider = "gemini") {
  const response = await fetch(`${API_URL}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      provider,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
      errorData.detail || "Backend request failed"
    );
  }

  return await response.json();
}


// ===============================
// Upload Document
// ===============================
export async function uploadDocument(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
      errorData.detail || "File upload failed"
    );
  }

  return await response.json();
}


// ===============================
// Backend Health Check
// ===============================
export async function checkBackend() {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Backend is not responding");
  }

  return await response.json();
}


// ===============================
// Inventory
// ===============================
export async function getInventory() {
  const response = await fetch(`${API_URL}/inventory/`);

  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }

  return await response.json();
}


// ===============================
// Low Stock
// ===============================
export async function getLowStock() {
  const response = await fetch(
    `${API_URL}/inventory/low-stock`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch low stock medicines");
  }

  return await response.json();
}


// ===============================
// Expired Medicines
// ===============================
export async function getExpiredMedicines() {
  const response = await fetch(
    `${API_URL}/inventory/expired`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch expired medicines");
  }

  return await response.json();
}


// ===============================
// Near Expiry
// ===============================
export async function getNearExpiryMedicines() {
  const response = await fetch(
    `${API_URL}/inventory/near-expiry`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch near-expiry medicines");
  }

  return await response.json();
}