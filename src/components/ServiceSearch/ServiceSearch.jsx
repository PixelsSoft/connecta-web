import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchCategoriesWithSubcategories } from '../../store/slices/categorySlice';
import {
  filterServicesLocally,
  flattenServiceCatalog,
  getFallbackSuggestions,
  getPostJobPath,
  searchServices,
} from '../../utils/serviceSearch';
import { getCategoryIcon, POPULAR_SERVICE_QUERIES } from '../../utils/categoryIcons';
import './ServiceSearch.css';

const DEBOUNCE_MS = 400;

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
  const [fallbackResults, setFallbackResults] = useState([]);
  const [showFallback, setShowFallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef(null);
  const debounceRef = useRef(null);
  const searchSeqRef = useRef(0);

  const catalog = useMemo(
    () => flattenServiceCatalog(categoriesWithSubcategories),
    [categoriesWithSubcategories]
  );

  const displayResults = showFallback ? fallbackResults : results;

  useEffect(() => {
    if (categoriesWithSubcategories.length === 0) {
      dispatch(fetchCategoriesWithSubcategories());
    }
  }, [categoriesWithSubcategories.length, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const runSearch = useCallback(
    async (value) => {
      const trimmed = value.trim();
      const seq = ++searchSeqRef.current;

      if (trimmed.length < 2) {
        setResults([]);
        setFallbackResults([]);
        setShowFallback(false);
        setLoading(false);
        setOpen(false);
        return;
      }

      const local = filterServicesLocally(catalog, trimmed, 10);
      if (seq === searchSeqRef.current) {
        if (local.length > 0) {
          setResults(local);
          setFallbackResults([]);
          setShowFallback(false);
          setOpen(true);
        }
      }

      setLoading(true);
      try {
        const remote = await searchServices(trimmed, 10);
        if (seq !== searchSeqRef.current) return;

        if (remote.length > 0) {
          if (remote.some((item) => item.isFallback)) {
            setResults([]);
            setFallbackResults(remote);
            setShowFallback(true);
          } else {
            setResults(remote);
            setFallbackResults([]);
            setShowFallback(false);
          }
        } else if (local.length > 0) {
          setResults(local);
          setFallbackResults([]);
          setShowFallback(false);
        } else {
          const fallback = getFallbackSuggestions(catalog, trimmed, 6);
          setResults([]);
          setFallbackResults(fallback);
          setShowFallback(true);
        }
        setOpen(true);
      } catch {
        if (seq !== searchSeqRef.current) return;

        if (local.length > 0) {
          setResults(local);
          setFallbackResults([]);
          setShowFallback(false);
        } else {
          const fallback = getFallbackSuggestions(catalog, trimmed, 6);
          setResults([]);
          setFallbackResults(fallback);
          setShowFallback(true);
        }
        setOpen(true);
      } finally {
        if (seq === searchSeqRef.current) {
          setLoading(false);
        }
      }
    },
    [catalog]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);
    clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      searchSeqRef.current += 1;
      setResults([]);
      setFallbackResults([]);
      setShowFallback(false);
      setLoading(false);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => runSearch(value), DEBOUNCE_MS);
  };

  const handleSelect = (item) => {
    if (!item) return;
    setOpen(false);
    setQuery(item.type === 'subcategory' ? item.name : item.name);
    if (onSelect) {
      onSelect(item);
    } else {
      navigate(getPostJobPath(item));
    }
  };

  const handleKeyDown = (e) => {
    if (!open || displayResults.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, displayResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(displayResults[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handlePopularClick = (label) => {
    setQuery(label);
    runSearch(label);
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
            onFocus={() => query.trim().length >= 2 && setOpen(true)}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={open}
          />
        </div>

        {open && (
          <ul className="service-search__results" role="listbox">
            {showFallback && displayResults.length > 0 && (
              <li className="service-search__hint">
                {t('jobPosting.searchNoExactMatch')}{' '}
                {t('jobPosting.searchTrySuggested')}
              </li>
            )}
            {displayResults.length === 0 && !loading && query.trim().length >= 2 && (
              <li className="service-search__empty">
                {t('jobPosting.searchTryAnother')}
              </li>
            )}
            {displayResults.map((item, index) => {
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
