import axiosInstance from './axios';
import { API_ENDPOINTS } from '../config/api';
import {
  flattenServiceCatalog,
  filterServicesLocally,
  getGenericFallbackSuggestions,
  mergeSearchResults,
  normalizeSearchText,
  searchCatalog,
  getPostJobPath,
  expandQueryTerms,
} from './serviceSearchCore';

export {
  normalizeSearchText,
  flattenServiceCatalog,
  filterServicesLocally,
  mergeSearchResults,
  getPostJobPath,
  expandQueryTerms,
  searchCatalog,
  getGenericFallbackSuggestions,
};

/** @deprecated Use searchCatalog instead */
export function getFallbackSuggestions(catalog, query, limit = 6) {
  const { results, isGenericFallback } = searchCatalog(catalog, query, limit);
  if (isGenericFallback) return results;
  return results.map((item) => ({ ...item, isFallback: true }));
}

export async function searchServices(query, limit = 10) {
  const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.SEARCH, {
    params: { q: query, limit },
    skipGlobalLoading: true,
  });
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Search failed');
  }
  return response.data.data || [];
}
