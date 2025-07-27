const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function apiFetch(path, options = {}) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  });

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include', // crucial for sending cookies
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    const error = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();
    throw new Error(
      typeof error === 'string' ? error : error.message ?? 'API request failed'
    );
  }

  return response.json();
}

