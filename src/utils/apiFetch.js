const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export class APIError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.response = response;
  }
}

export async function apiFetch(path, options = {}) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  });

  const url = `${API_URL}${path}`;
  console.debug('📡 Fetching:', url, { 
    method: options.method || 'GET',
    headers: Object.fromEntries(headers),
    credentials: 'include',
    ...(options.body && { body: options.body }),
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // <--- ensure cookies sent on every request
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      let errorData;
      try {
        errorData = isJson ? await response.json() : await response.text();
      } catch (parseError) {
        errorData = `HTTP ${response.status} ${response.statusText}`;
      }

      console.error('❌ API Error:', {
        status: response.status,
        statusText: response.statusText,
        url,
        error: errorData
      });

      const errorMessage = typeof errorData === 'object' 
        ? errorData.message || errorData.error || `HTTP ${response.status}`
        : errorData;

      throw new APIError(errorMessage, response.status, errorData);
    }

    // Handle empty responses (like 204 No Content)
    if (response.status === 204 || !isJson) {
      console.debug('✅ API Response: (no content)');
      return null;
    }

    const result = await response.json();
    console.debug('✅ API Response:', result);
    return result;

  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or other errors
    console.error('❌ Network/Parse Error:', error);
    throw new APIError(
      error.message || 'Network request failed',
      0,
      null
    );
  }
}

// Convenience methods for common HTTP operations
export const api = {
  get: (path, options = {}) => apiFetch(path, { method: 'GET', ...options }),
  
  post: (path, data, options = {}) => apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  }),
  
  patch: (path, data, options = {}) => apiFetch(path, {
    method: 'PATCH',
    body: JSON.stringify(data),
    ...options,
  }),
  
  put: (path, data, options = {}) => apiFetch(path, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  }),
  
  delete: (path, options = {}) => apiFetch(path, { method: 'DELETE', ...options }),
};
