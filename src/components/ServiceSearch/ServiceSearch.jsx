import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchCategoriesWithSubcategories } from '../../store/slices/categorySlice';
import {
  flattenServiceCatalog,
  getPostJobPath,
  mergeSearchResults,
  searchCatalog,
  searchServices,
} from '../../utils/serviceSearch';
import { getCategoryIcon, POPULAR_SERVICE_QUERIES } from '../../utils/categoryIcons';
import './ServiceSearch.css';

const REMOTE_DEBOUNCE_MS = 250;
const MIN_QUERY_LENGTH = 2;

const ServiceSearch = ({
  placeholder,
  popularQueries = POPULAR_SERVICE_QUERIES,
  onSelect,
  autoFocus = false,
  variant = 'default',
  showPopular = true,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const { categoriesWithSubcategories } = useSelector((state) => state.category);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showFallback, setShowFallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef(null);
  const remoteDebounceRef = useRef(null);
  const searchSeqRef = useRef(0);

  const catalog = useMemo(
    () => flattenServiceCatalog(categoriesWithSubcategories),
    [categoriesWithSubcategories]
  );

  useEffect(() => {
    dispatch(fetchCategoriesWithSubcategories());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyLocalResults = useCallback(
    (value) => {
      const trimmed = value.trim();
      if (trimmed.length < MIN_QUERY_LENGTH) {
        setResults([]);
        setShowFallback(false);
        setOpen(false);
        return { results: [], isGenericFallback: false };
      }

      const local = searchCatalog(catalog, trimmed, 10);
      setResults(local.results);
      setShowFallback(local.isGenericFallback);
      setOpen(true);
      return local;
    },
    [catalog]
  );

  useEffect(() => {
    if (query.trim().length >= MIN_QUERY_LENGTH && catalog.length > 0) {
      applyLocalResults(query);
    }
  }, [catalog, query, applyLocalResults]);

  const runRemoteSearch = useCallback(
    async (value, localSnapshot) => {
      const trimmed = value.trim();
      const seq = ++searchSeqRef.current;
      const { results: localResults, isGenericFallback } = localSnapshot;

      if (trimmed.length < MIN_QUERY_LENGTH) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const remote = await searchServices(trimmed, 10);
        if (seq !== searchSeqRef.current) return;

        const exactRemote = remote.filter((item) => !item.isFallback);
        const fallbackRemote = remote.filter((item) => item.isFallback);

        if (exactRemote.length > 0) {
          setResults(mergeSearchResults(localResults, exactRemote, 10));
          setShowFallback(false);
        } else if (localResults.length > 0 && !isGenericFallback) {
          setResults(localResults);
          setShowFallback(false);
        } else if (fallbackRemote.length > 0) {
          setResults(fallbackRemote);
          setShowFallback(true);
        } else if (localResults.length > 0) {
          setResults(localResults);
          setShowFallback(isGenericFallback);
        }

        setOpen(true);
      } catch {
        if (seq !== searchSeqRef.current) return;
        if (localResults.length > 0) {
          setResults(localResults);
          setShowFallback(isGenericFallback);
          setOpen(true);
        }
      } finally {
        if (seq === searchSeqRef.current) {
          setLoading(false);
        }
      }
    },
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);
    clearTimeout(remoteDebounceRef.current);

    if (value.trim().length < MIN_QUERY_LENGTH) {
      searchSeqRef.current += 1;
      setResults([]);
      setShowFallback(false);
      setLoading(false);
      setOpen(false);
      return;
    }

    const localSnapshot = applyLocalResults(value);

    remoteDebounceRef.current = setTimeout(
      () => runRemoteSearch(value, localSnapshot),
      REMOTE_DEBOUNCE_MS
    );
  };

  const handleSelect = (item) => {
    if (!item) return;
    setOpen(false);
    setQuery(item.name);
    if (onSelect) {
      onSelect(item);
    } else {
      navigate(getPostJobPath(item));
    }
  };

  const handleKeyDown = (e) => {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handlePopularClick = (label) => {
    setQuery(label);
    setActiveIndex(-1);
    const localSnapshot = applyLocalResults(label);
    clearTimeout(remoteDebounceRef.current);
    remoteDebounceRef.current = setTimeout(
      () => runRemoteSearch(label, localSnapshot),
      0
    );
  };

  const resolvedPlaceholder =
    placeholder || t('jobPosting.searchPlaceholder');

  return (
    <div
      className={`service-search service-search--${variant} ${open ? 'is-dropdown-open' : ''}`}
      ref={wrapRef}
    >
      <div className="service-search__combobox">
        <div className={`service-search__input-wrap ${open ? 'is-open' : ''}`}>
          <BiSearch className="service-search__icon" aria-hidden />
          <input
            type="search"
            className="service-search__input"
            placeholder={resolvedPlaceholder}
            value={query}
            onChange={handleChange}
            onFocus={() => query.trim().length >= MIN_QUERY_LENGTH && setOpen(true)}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={open}
          />
        </div>

        {open && (
          <ul className="service-search__results" role="listbox">
            {showFallback && results.length > 0 && (
              <li className="service-search__hint">
                {t('jobPosting.searchNoExactMatch')}{' '}
                {t('jobPosting.searchTrySuggested')}
              </li>
            )}
            {results.length === 0 && !loading && query.trim().length >= MIN_QUERY_LENGTH && (
              <li className="service-search__empty">
                {t('jobPosting.searchTryAnother')}
              </li>
            )}
            {results.map((item, index) => {
              const parentName = item.category?.name;
              const icon = getCategoryIcon(parentName || item.name);
              return (
                <li key={`${item.type}-${item.id}`}>
                  <button
                    type="button"
                    className={`service-search__result ${index === activeIndex ? 'is-active' : ''}`}
                    onClick={() => handleSelect(item)}
                    role="option"
                    aria-selected={index === activeIndex}
                  >
                    <span className="service-search__result-icon">
                      <img src={icon} alt="" />
                    </span>
                    <span className="service-search__result-text">
                      <strong>{item.name}</strong>
                      {parentName && <small>{parentName}</small>}
                      {!parentName && item.type === 'category' && (
                        <small>{t('jobPosting.searchCategoryHint')}</small>
                      )}
                      {item.isFallback && (
                        <small className="service-search__fallback-tag">
                          {t('jobPosting.searchSuggested')}
                        </small>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {showPopular && popularQueries.length > 0 && (
        <div className="service-search__popular">
          <span className="service-search__popular-label">
            {t('jobPosting.searchPopular')}
          </span>
          <div className="service-search__chips">
            {popularQueries.map((label) => (
              <button
                key={label}
                type="button"
                className="service-search__chip"
                onClick={() => handlePopularClick(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <p className="service-search__status" role="status" aria-live="polite">
          <span className="service-search__status-dot" aria-hidden />
          {t('jobPosting.searchLoading')}
        </p>
      )}
    </div>
  );
};

export default ServiceSearch;
