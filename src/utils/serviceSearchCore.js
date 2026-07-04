/**
 * Pure search helpers (no axios) — used by serviceSearch.js and tests.
 */

export function normalizeSearchText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

const normalize = normalizeSearchText;

const SEARCH_ALIASES = {
  rein: ['reinigung', 'reinigungsservice', 'fensterreinigung', 'buroreinigung', 'umzugsreinigung', 'endreinigung', 'cleaning', 'cleaner'],
  reinigung: ['reinigungsservice', 'fensterreinigung', 'buroreinigung', 'umzugsreinigung', 'endreinigung'],
  clea: ['cleaning', 'cleaner', 'clean', 'reinigung', 'reinigungsservice', 'putzen', 'sauber'],
  clean: ['cleaning', 'cleaner', 'reinigung', 'reinigungsservice', 'putzen'],
  umzug: ['umzugsunternehmen', 'umzugsreinigung', 'umzugsservice', 'moving', 'mover', 'relocation'],
  ele: ['elektriker', 'elektro', 'elektroinstallation', 'elektrik', 'electrician', 'electrical', 'lampenmontage'],
  elekt: ['elektriker', 'elektro', 'elektroinstallation', 'lampenmontage'],
  glas: ['glasgelande', 'glasgelander', 'glaswand', 'duschglas', 'glaser', 'glass', 'railing', 'balustrade'],
  mal: ['maler', 'malen', 'malerarbeiten', 'painter', 'painting'],
  klemp: ['klempner', 'plumber', 'plumbing', 'sanitar'],
  kuch: ['kuchen', 'kuchenrenovierung', 'kitchen'],
  gart: ['gartner', 'garten', 'gardening', 'gardener'],
  arch: ['architekt', 'architect', 'architecture'],
  pool: ['poolinstallation', 'poolbau', 'schwimmbad', 'swimming pool'],
  solar: ['solarpanel', 'photovoltaik', 'solar panel'],
  fenster: ['fensterreinigung', 'window', 'glaser'],
  buro: ['buroreinigung', 'office cleaning'],
  lamp: ['lampenmontage', 'lighting', 'beleuchtung'],
  dusch: ['duschglas', 'dusche', 'shower'],
  electrician: ['electrical', 'electric', 'elektriker', 'elektro'],
  painter: ['painting', 'paint', 'maler', 'malen'],
  plumber: ['plumbing', 'klempner', 'sanitar'],
  cleaning: ['cleaner', 'reinigung', 'reinigungsservice', 'putzen'],
  moving: ['mover', 'umzug', 'umzugsunternehmen', 'relocation'],
  kitchen: ['kuchen', 'kuchenrenovierung', 'renovation'],
  glass: ['glas', 'glasgelande', 'glaswand', 'railing'],
  gardener: ['garten', 'gartner', 'gardening'],
};

export function expandQueryTerms(query) {
  const q = normalize(query);
  if (!q) return [];

  const terms = new Set([q]);

  Object.entries(SEARCH_ALIASES).forEach(([key, related]) => {
    const keyMatches = q.startsWith(key) || key.startsWith(q);

    if (keyMatches) {
      terms.add(key);
      related.forEach((term) => terms.add(normalize(term)));
      return;
    }

    related.forEach((term) => {
      const termNorm = normalize(term);
      const termMatches =
        q.startsWith(termNorm) ||
        termNorm.startsWith(q) ||
        (q.length >= 4 && (termNorm.includes(q) || q.includes(termNorm)));

      if (termMatches) {
        terms.add(termNorm);
      }
    });
  });

  return Array.from(terms).filter(Boolean);
}

function getSearchableParts(text) {
  const normalized = normalize(text);
  const slugForm = normalized.replace(/-/g, ' ');
  const words = slugForm.split(/[\s\-_/]+/).filter(Boolean);
  return [normalized, slugForm, ...words];
}

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

function scoreItem(item, queryTerms, relaxed = false) {
  const nameParts = getSearchableParts(item.name);
  const slugParts = getSearchableParts(item.slug?.replace(/-/g, ' ') || '');
  const parentParts = getSearchableParts(item.category?.name || '');
  const allParts = [...nameParts, ...slugParts, ...parentParts];

  let score = 0;

  queryTerms.forEach((q) => {
    if (!q) return;

    allParts.forEach((part) => {
      if (part === q) score += 120;
      else if (part.startsWith(q)) score += 95;
      else if (part.includes(q)) score += 75;
    });

    if (relaxed) {
      allParts.forEach((part) => {
        if (q.length >= 2 && part.startsWith(q.slice(0, 2))) score += 12;
        if (q.length >= 3 && part.startsWith(q.slice(0, 3))) score += 18;
      });
    }
  });

  if (item.type === 'subcategory' && score > 0) score += 10;

  return score;
}

export function filterServicesLocally(catalog, query, limit = 10, relaxed = false) {
  const q = normalize(query);
  if (q.length < 2 || !catalog.length) return [];

  const queryTerms = expandQueryTerms(q);

  return catalog
    .map((item) => ({ item, score: scoreItem(item, queryTerms, relaxed) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((row) => row.item);
}

export function getGenericFallbackSuggestions(catalog, limit = 6) {
  if (!catalog.length) return [];

  return catalog
    .filter((item) => item.type === 'category')
    .slice(0, limit)
    .map((item) => ({ ...item, isFallback: true }));
}

export function searchCatalog(catalog, query, limit = 10) {
  const trimmed = String(query || '').trim();
  if (trimmed.length < 2 || !catalog.length) {
    return { results: [], isGenericFallback: false };
  }

  const strict = filterServicesLocally(catalog, trimmed, limit, false);
  if (strict.length > 0) {
    return { results: strict, isGenericFallback: false };
  }

  const relaxed = filterServicesLocally(catalog, trimmed, limit, true);
  if (relaxed.length > 0) {
    return { results: relaxed, isGenericFallback: false };
  }

  return { results: [], isGenericFallback: false };
}

export function mergeSearchResults(primary = [], secondary = [], limit = 10) {
  const seen = new Set();
  const merged = [];

  [...primary, ...secondary].forEach((item) => {
    const key = `${item.type}-${item.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(item);
    }
  });

  return merged.slice(0, limit);
}

export function getPostJobPath(result) {
  if (!result) return '/find-professionals';

  if (result.type === 'subcategory' && result.category?.slug) {
    return `/post-a-job/${result.category.slug}/${result.slug}`;
  }

  return `/post-a-job/${result.slug}`;
}
