import axiosInstance from './axios';
import { API_ENDPOINTS } from '../config/api';

const normalize = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');

export function flattenServiceCatalog(categoriesWithSubcategories = []) {
  const rows = [];

  categoriesWithSubcategories.forEach((category) => {
    (category.subcategories || []).forEach((sub) => {
      rows.push({
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
        type: 'subcategory',
        label: sub.name,
        icon: category.icon,
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          icon: category.icon,
        },
      });
    });

    rows.push({
      id: category.id,
      name: category.name,
      slug: category.slug,
      type: 'category',
      label: category.name,
      icon: category.icon,
      category: null,
    });
  });

  return rows;
}

function scoreItem(item, q, relaxed = false) {
  const name = normalize(item.name);
  const slug = normalize(item.slug?.replace(/-/g, ' '));
  const parent = normalize(item.category?.name);
  let score = 0;

  if (name === q || slug === q) score += 120;
  else if (name.startsWith(q) || slug.startsWith(q)) score += 90;
  else if (name.includes(q) || slug.includes(q)) score += 70;
  else if (parent.includes(q)) score += 35;

  if (relaxed) {
    const tokens = q.split(' ').filter(Boolean);
    tokens.forEach((token) => {
      if (token.length < 2) return;
      if (name.includes(token) || slug.includes(token)) score += 25;
      else if (parent.includes(token)) score += 12;
      else if (name.startsWith(token.slice(0, 2)) || slug.startsWith(token.slice(0, 2))) score += 8;
    });
    if (q.length >= 2 && (name.startsWith(q.slice(0, 2)) || slug.startsWith(q.slice(0, 2)))) {
      score += 15;
    }
  }

  if (item.type === 'subcategory') score += 8;

  return score;
}

export function filterServicesLocally(catalog, query, limit = 10) {
  const q = normalize(query);
  if (q.length < 2) return [];

  return catalog
    .map((item) => ({ item, score: scoreItem(item, q) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((row) => row.item);
}

export function getFallbackSuggestions(catalog, query, limit = 6) {
  const q = normalize(query);
  if (q.length < 2 || !catalog.length) return [];

  const scored = catalog
    .map((item) => ({ item, score: scoreItem(item, q, true) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length > 0) {
    return scored.slice(0, limit).map((row) => ({ ...row.item, isFallback: true }));
  }

  const parents = catalog.filter((item) => item.type === 'category');
  return parents.slice(0, limit).map((item) => ({ ...item, isFallback: true }));
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

export function getPostJobPath(result) {
  if (!result) return '/find-professionals';

  if (result.type === 'subcategory' && result.category?.slug) {
    return `/post-a-job/${result.category.slug}/${result.slug}`;
  }

  return `/post-a-job/${result.slug}`;
}
