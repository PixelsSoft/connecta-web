import apiConfig from './apiConfig';

const defaultHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

async function request(path, options = {}) {
  const url = `${apiConfig.baseURL}${path}`;
  const mergedOptions = {
    method: 'GET',
    headers: { ...defaultHeaders(), ...(options.headers || {}) },
    ...options,
  };
  const res = await fetch(url, mergedOptions);
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message = (isJson && data && (data.message || data.error)) || res.statusText;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const apiClient = {
  get: (path, params) => {
    const qs = params ? `?${new URLSearchParams(params).toString()}` : '';
    return request(`${path}${qs}`);
  },
  post: (path, body) =>
    request(path, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  put: (path, body) =>
    request(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  patch: (path, body) =>
    request(path, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  delete: (path) =>
    request(path, {
      method: 'DELETE',
    }),
  upload: async (path, fileOrFormData) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const body = fileOrFormData instanceof FormData ? fileOrFormData : (() => {
      const fd = new FormData();
      fd.append('file', fileOrFormData);
      return fd;
    })();

    const res = await fetch(`${apiConfig.baseURL}${path}`, {
      method: 'POST',
      headers,
      body,
    });
    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : await res.text();
    if (!res.ok) {
      const message = (isJson && data && (data.message || data.error)) || res.statusText;
      const error = new Error(message);
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  },
};

export default apiClient;



