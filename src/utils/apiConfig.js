const apiConfig = {
  // Built from VITE_API_BASE_URL in .env (e.g. https://backendconnecta.pixelssoft.com/api)
  baseURL: `${(import.meta.env.VITE_API_BASE_URL || 'https://backendconnecta.pixelssoft.com/api').replace(/\/$/, '')}/v1`,
  cdnURL: `${(import.meta.env.VITE_API_BASE_URL || 'https://backendconnecta.pixelssoft.com/api').replace(/\/api\/?$/, '')}/storage`,
};

export default apiConfig;





