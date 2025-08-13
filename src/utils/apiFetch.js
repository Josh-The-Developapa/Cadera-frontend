const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export class APIError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.response = response;
  }
}

export async function apiFetch(path, options = {}) {
  const headers = new Headers({
    "Content-Type": "application/json",
    ...(options.headers || {}),
  });

  const url = `${API_URL}${path}`;
  console.debug("📡 Fetching:", url, {
    method: options.method || "GET",
    headers: Object.fromEntries(headers),
    credentials: "include",
    ...(options.body && { body: options.body }),
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // <--- ensure cookies sent on every request
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      let errorData;
      try {
        errorData = isJson ? await response.json() : await response.text();
      } catch (parseError) {
        errorData = `HTTP ${response.status} ${response.statusText}`;
      }

      console.error("⚠️ API Error:", {
        status: response.status,
        statusText: response.statusText,
        url,
        error: errorData,
      });

      const errorMessage =
        typeof errorData === "object"
          ? errorData.message || errorData.error || `HTTP ${response.status}`
          : errorData;

      throw new APIError(errorMessage, response.status, errorData);
    }

    // Handle empty responses (like 204 No Content)
    if (response.status === 204 || !isJson) {
      console.debug("✅ API Response: (no content)");
      return null;
    }

    const result = await response.json();
    console.debug("✅ API Response:", result);
    return result;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    // Network or other errors
    console.error("⚠️ Network/Parse Error:", error);
    throw new APIError(error.message || "Network request failed", 0, null);
  }
}

export async function fetchSubjectsCatalog() {
  return apiFetch("/subjects/catalog");
}

// Get current user data from the backend (reads from httpOnly cookie)
export async function getCurrentUser() {
  try {
    return await apiFetch("/auth/me");
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

// Utility functions for localStorage management
export const userStorage = {
  // Set user data in localStorage
  setUserData: (userData) => {
    if (userData.name) localStorage.setItem('user_name', userData.name);
    if (userData.email) localStorage.setItem('user_email', userData.email);
    if (userData.role) {
      // Handle role objects or strings
      const roleValue = typeof userData.role === 'object' ? userData.role.name : userData.role;
      localStorage.setItem('user_role', roleValue);
    }
  },

  // Get user data from localStorage
  getUserData: () => {
    return {
      name: localStorage.getItem('user_name'),
      email: localStorage.getItem('user_email'),
      role: localStorage.getItem('user_role')
    };
  },

  // Get individual user properties
  getName: () => localStorage.getItem('user_name'),
  getEmail: () => localStorage.getItem('user_email'),
  getRole: () => localStorage.getItem('user_role'),

  // Clear user data from localStorage
  clearUserData: () => {
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');
  },

  // Check if user data exists in localStorage
  hasUserData: () => {
    return !!(localStorage.getItem('user_name') || 
              localStorage.getItem('user_email') || 
              localStorage.getItem('user_role'));
  },

  // Fetch and store current user data from backend
  refreshUserData: async () => {
    const userData = await getCurrentUser();
    if (userData) {
      userStorage.setUserData(userData);
      return userData;
    }
    return null;
  }
};

// Convenience methods for common HTTP operations
export const api = {
  get: (path, options = {}) => apiFetch(path, { method: "GET", ...options }),

  post: (path, data, options = {}) =>
    apiFetch(path, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    }),

  patch: (path, data, options = {}) =>
    apiFetch(path, {
      method: "PATCH",
      body: JSON.stringify(data),
      ...options,
    }),

  put: (path, data, options = {}) =>
    apiFetch(path, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    }),

  delete: (path, options = {}) =>
    apiFetch(path, { method: "DELETE", ...options }),
};
