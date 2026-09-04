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
  rein: ['reinigung', 'reinigungsservice', 'fensterreinigung', 'buroreinigung', 'umzugsreinigung', 'endreinigung', 'cleaning', 'cleaner', 'nettoyage', 'pulizia'],
  reinigung: ['reinigungsservice', 'fensterreinigung', 'buroreinigung', 'umzugsreinigung', 'endreinigung', 'nettoyage', 'pulizia'],
  clea: ['cleaning', 'cleaner', 'clean', 'reinigung', 'reinigungsservice', 'putzen', 'sauber', 'nettoyage', 'pulizia'],
  clean: ['cleaning', 'cleaner', 'reinigung', 'reinigungsservice', 'putzen', 'nettoyage', 'pulizia'],
  umzug: ['umzugsunternehmen', 'umzugsreinigung', 'umzugsservice', 'moving', 'mover', 'relocation', 'demenagement', 'trasloco'],
  ele: ['elektriker', 'elektro', 'elektroinstallation', 'elektrik', 'electrician', 'electrical', 'lampenmontage', 'electricien', 'elettricista'],
  elekt: ['elektriker', 'elektro', 'elektroinstallation', 'lampenmontage', 'electricien', 'elettricista'],
  glas: ['glasgelande', 'glasgelander', 'glaswand', 'duschglas', 'glaser', 'glass', 'railing', 'balustrade', 'garde-corps', 'ringhiera'],
  mal: ['maler', 'malen', 'malerarbeiten', 'painter', 'painting', 'peintre', 'pittore'],
  klemp: ['klempner', 'plumber', 'plumbing', 'sanitar', 'plombier', 'idraulico'],
  kuch: ['kuchen', 'kuchenrenovierung', 'kitchen', 'cuisine', 'cucina'],
  gart: ['gartner', 'garten', 'gardening', 'gardener', 'jardinier', 'giardiniere'],
  arch: ['architekt', 'architect', 'architecture', 'architecte', 'architetto'],
  pool: ['poolinstallation', 'poolbau', 'schwimmbad', 'swimming pool', 'piscine', 'piscina'],
  solar: ['solarpanel', 'photovoltaik', 'solar panel', 'panneau solaire', 'pannello solare'],
  fenster: ['fensterreinigung', 'window', 'glaser'],
  buro: ['buroreinigung', 'office cleaning'],
  lamp: ['lampenmontage', 'lighting', 'beleuchtung'],
  dusch: ['duschglas', 'dusche', 'shower'],
  electrician: ['electrical', 'electric', 'elektriker', 'elektro', 'electricien', 'elettricista'],
  painter: ['painting', 'paint', 'maler', 'malen', 'peintre', 'pittore'],
  plumber: ['plumbing', 'klempner', 'sanitar', 'plombier', 'idraulico'],
  cleaning: ['cleaner', 'reinigung', 'reinigungsservice', 'putzen', 'nettoyage', 'pulizia'],
  moving: ['mover', 'umzug', 'umzugsunternehmen', 'relocation', 'demenagement', 'trasloco'],
  kitchen: ['kuchen', 'kuchenrenovierung', 'renovation', 'cuisine', 'cucina'],
  glass: ['glas', 'glasgelande', 'glaswand', 'railing'],
  gardener: ['garten', 'gartner', 'gardening', 'jardinier', 'giardiniere'],

  // French
  nett: ['nettoyage', 'nettoyer', 'cleaning', 'cleaner', 'reinigung', 'pulizia'],
  nettoy: ['nettoyage', 'nettoyer', 'cleaning', 'cleaner', 'reinigung', 'pulizia'],
  nettoyage: ['nettoyer', 'cleaning', 'cleaner', 'reinigung', 'reinigungsservice', 'pulizia'],
  plomb: ['plombier', 'plomberie', 'plumber', 'plumbing', 'klempner', 'idraulico'],
  plombier: ['plomberie', 'plumber', 'plumbing', 'klempner', 'idraulico'],
  electricien: ['electricite', 'electrician', 'electrical', 'elektriker', 'elettricista'],
  peintre: ['peinture', 'painter', 'painting', 'maler', 'pittore'],
  demenag: ['demenagement', 'demenageur', 'moving', 'mover', 'umzug', 'trasloco'],
  demenagement: ['demenageur', 'moving', 'mover', 'umzug', 'trasloco'],
  jardinier: ['jardinage', 'gardener', 'gardening', 'gartner', 'giardiniere'],
  architecte: ['architecture', 'architect', 'architekt', 'architetto'],
  cuisine: ['renovation cuisine', 'kitchen', 'kuchen', 'cucina'],
  piscine: ['pool', 'swimming pool', 'poolinstallation', 'piscina'],

  // Italian
  puli: ['pulizia', 'pulire', 'cleaning', 'cleaner', 'reinigung', 'nettoyage'],
  puliz: ['pulizia', 'pulire', 'cleaning', 'cleaner', 'reinigung', 'nettoyage'],
  pulizia: ['pulire', 'cleaning', 'cleaner', 'reinigung', 'reinigungsservice', 'nettoyage'],
  idraul: ['idraulico', 'idraulica', 'plumber', 'plumbing', 'klempner', 'plombier'],
  idraulico: ['idraulica', 'plumber', 'plumbing', 'klempner', 'plombier'],
  elettricista: ['elettricita', 'electrician', 'electrical', 'elektriker', 'electricien'],
  pittore: ['pittura', 'painter', 'painting', 'maler', 'peintre'],
  trasloc: ['trasloco', 'traslochi', 'moving', 'mover', 'umzug', 'demenagement'],
  trasloco: ['traslochi', 'moving', 'mover', 'umzug', 'demenagement'],
  giardiniere: ['giardinaggio', 'gardener', 'gardening', 'gartner', 'jardinier'],
  architetto: ['architettura', 'architect', 'architekt', 'architecte'],
  cucina: ['ristrutturazione cucina', 'kitchen', 'kuchen', 'cuisine'],
  piscina: ['pool', 'swimming pool', 'poolinstallation', 'piscine'],
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
