const API_URL = import.meta.env.VITE_API_URL ?? 'https://localhost:3000';

export async function apiFetch(path, options = {}) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  });

  const url = `${API_URL}${path}`;
  console.debug('📡 Fetching:', url, { headers, credentials: 'include', ...options });

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // always needed for cookies
  });

  const clone = response.clone(); // so we can inspect twice

  if (!response.ok) {
    const contentType = clone.headers.get('content-type');
    const error = contentType?.includes('application/json')
      ? await clone.json()
      : await clone.text();
    console.error('❌ API Error:', error);
    throw new Error(typeof error === 'string' ? error : error.message ?? 'API request failed');
  }

  const result = await clone.json();
  console.debug('✅ API Response:', result);
  return result;
}

