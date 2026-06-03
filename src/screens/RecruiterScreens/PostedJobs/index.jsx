import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../../store/slices/authSlice';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';
import RecruiterLayout from '../../../components/Layouts/RecruiterLayout';
import JobBox from '../../../components/JobBox';
import JobDetailContent from '../../../components/JobDetailContent';
import ContactDetails from '../../../components/ContactDetails';
import LeadUnlockModal from '../../../components/JobWorkflow/LeadUnlockModal';
import JobsPagination from '../../../components/JobsPagination';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api';
import { formatLeadUnlockPrice } from '../../../utils/jobStatus';
import { requestCurrentPosition } from '../../../utils/geolocation';
import '../../../components/JobWorkflow/JobWorkflow.css';
import './SavedLeads.css';

import nojobicon from '../../../assets/images/no-job-icon.png';
import paintingHouseSmIcon from '../../../assets/images/painting-house-sm-icon.png';

const PER_PAGE = 10;

const PostedJobs = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [jobs, setJobs] = useState([]);
  const [marketplace, setMarketplace] = useState({});
  const [pagination, setPagination] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [listTab, setListTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchDebounced, setSearchDebounced] = useState('');
  const [filters, setFilters] = useState({
    category_id: '',
    sort: 'newest',
    status: '',
    max_distance_km: '',
  });
  const [page, setPage] = useState(1);
  const [savingLocation, setSavingLocation] = useState(false);
  const sortInitialized = useRef(false);

  const buildListParams = useCallback(
    (pageNum) => {
      const params = {
        for_professional: 1,
        per_page: PER_PAGE,
        page: pageNum,
      };
      if (filters.category_id) params.category_id = filters.category_id;
      if (filters.sort) params.sort = filters.sort;
      if (filters.status) params.status = filters.status;
      if (filters.max_distance_km) params.max_distance_km = filters.max_distance_km;
      if (searchDebounced.trim()) params.search = searchDebounced.trim();
      if (listTab === 'leads') params.open_leads_only = 1;
      if (listTab === 'mine') params.unlocked_only = 1;
      return params;
    },
    [filters, listTab, searchDebounced]
  );

  useEffect(() => {
    const timer = setTimeout(() => setSearchDebounced(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (!sortInitialized.current && user?.latitude != null && user?.longitude != null) {
      setFilters((prev) => ({ ...prev, sort: 'nearest' }));
      sortInitialized.current = true;
    }
    if (user?.search_radius_km) {
      setFilters((prev) => ({
        ...prev,
        max_distance_km: prev.max_distance_km || String(user.search_radius_km),
      }));
    }
  }, [user?.latitude, user?.longitude, user?.search_radius_km]);

  const fetchAvailableJobs = useCallback(
    async (pageNum = 1, preserveSelection = false) => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_ENDPOINTS.JOBS.LIST, {
          params: buildListParams(pageNum),
        });

        if (response.data.success) {
          const list = response.data.data.jobs || [];
          setJobs(list);
          setPagination(response.data.data.pagination || null);
          if (response.data.data.marketplace) {
            setMarketplace(response.data.data.marketplace);
          }

          if (list.length === 0) {
            setSelectedJobId(null);
            setSelectedJob(null);
          } else if (!preserveSelection || !selectedJobId) {
            const firstId = list[0].id;
            setSelectedJobId(firstId);
            try {
              await fetchJobDetail(firstId, false);
            } catch (detailErr) {
              console.error('Error loading job detail:', detailErr);
            }
          }
        } else {
          toast.error(response.data?.message || 'Failed to load available jobs');
        }
      } catch (error) {
        console.error('Error fetching available jobs:', error);
        const msg =
          error.response?.data?.message ||
          (error.code === 'ERR_NETWORK'
            ? 'Cannot reach the API. Start the backend (php artisan serve) and check VITE_API_BASE_URL.'
            : null) ||
          error.message ||
          'Failed to load available jobs';
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    },
    [buildListParams, selectedJobId]
  );

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.LIST);
        if (res.data.success) {
          const data = res.data.data;
          setCategories(Array.isArray(data) ? data : data?.categories || []);
        }
      } catch {
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    fetchAvailableJobs(page, true);
  }, [page, filters, listTab, searchDebounced]);

  const fetchJobDetail = async (jobId, showLoader = true) => {
    try {
      if (showLoader) setDetailLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.SHOW(jobId));
      if (response.data.success) {
        setSelectedJob(response.data.data.job);
        setSelectedJobId(jobId);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load job details');
    } finally {
      if (showLoader) setDetailLoading(false);
    }
  };

  const handleSelectJob = (jobId) => {
    if (jobId === selectedJobId) return;
    fetchJobDetail(jobId);
  };

  const handleUnlockSuccess = async (job) => {
    if (job) setSelectedJob(job);
    await fetchAvailableJobs(page, true);
    if (selectedJobId) await fetchJobDetail(selectedJobId, false);
  };

  const handleSaveMyLocation = async () => {
    setSavingLocation(true);
    try {
      const coords = await requestCurrentPosition();
      const res = await axiosInstance.put(API_ENDPOINTS.USERS.UPDATE_PROFILE, {
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      if (res.data.success) {
        const updated = res.data.data;
        if (updated && token) {
          dispatch(setCredentials({ user: { ...user, ...updated }, token }));
        }
        toast.success('Your location is saved. Nearby jobs will be matched.');
        setPage(1);
        fetchAvailableJobs(1, false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Could not save location');
    } finally {
      setSavingLocation(false);
    }
  };

  const handleTabChange = (tab) => {
    setListTab(tab);
    setPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const unlockPriceLabel = formatLeadUnlockPrice(selectedJob, marketplace);
  const isUnlocked = !!selectedJob?.user_has_unlocked;
  const canUnlock = !!selectedJob?.can_unlock;
  const needsLocation = user && (user.latitude == null || user.longitude == null);
  const totalJobs = pagination?.total ?? jobs.length;

  if (loading && jobs.length === 0) {
    return (
      <RecruiterLayout>
        <section className='seved__lead-sec'>
          <div className='container text-center py-5'>
            <div className='spinner-border text-primary' role='status' />
            <p className='mt-3'>Loading available jobs...</p>
          </div>
        </section>
      </RecruiterLayout>
    );
  }

  if (!loading && totalJobs === 0 && !searchDebounced) {
    return (
      <RecruiterLayout>
        <section className='no__job-posted-yet'>
          <div className='container'>
            <div className='no__job-posted-content text-center py-5'>
              <img src={nojobicon} alt='' />
              <h4>{t('recruiter.noJobAvailable') || 'No Jobs Available Yet'}</h4>
              <p className='text-muted mt-2'>
                Jobs matching your skills and location will appear here.
              </p>
              {needsLocation && (
                <button
                  type='button'
                  className='customBtn mt-3'
                  onClick={handleSaveMyLocation}
                  disabled={savingLocation}
                >
                  {savingLocation ? 'Saving...' : 'Enable location for nearby jobs'}
                </button>
              )}
              <button type='button' className='customBtn mt-3 ms-2' onClick={() => fetchAvailableJobs(1)}>
                Refresh
              </button>
            </div>
          </div>
        </section>
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      <LeadUnlockModal
        show={showUnlockModal}
        onHide={() => setShowUnlockModal(false)}
        jobId={selectedJobId}
        onSuccess={handleUnlockSuccess}
      />
      <section className='seved__lead-sec'>
        <div className='container'>
          {needsLocation && (
            <div className='alert alert-warning d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3'>
              <span>Set your location to see nearby jobs within {marketplace.search_radius_km ?? 50} km.</span>
              <button
                type='button'
                className='btn btn-sm btn-dark'
                onClick={handleSaveMyLocation}
                disabled={savingLocation}
              >
                {savingLocation ? 'Saving...' : 'Use my location'}
              </button>
            </div>
          )}
          <div className='row'>
            <div className='col-xl-4 col-md-5 mb-md-0 mb-4 seved__lead-leftCol'>
              <div className='seved__lead-left'>
                <div className='seved__lead-content-head'>
                  <h4>{t('recruiter.savedLeads') || 'Available Leads'}</h4>
                  <p className='greenColor'>{totalJobs} jobs match your profile</p>
                  <p className='small text-muted mb-0'>
                    Radius: {marketplace.search_radius_km ?? 50} km · Unlock {unlockPriceLabel}
                  </p>
                </div>
                <div className='saved-lead-tabs mb-3'>
                  {['all', 'leads', 'mine'].map((tab) => (
                    <button
                      key={tab}
                      type='button'
                      className={`saved-lead-tabs__btn ${listTab === tab ? 'active' : ''}`}
                      onClick={() => handleTabChange(tab)}
                    >
                      {tab === 'all' ? 'All' : tab === 'leads' ? 'New Leads' : 'Unlocked'}
                    </button>
                  ))}
                </div>
                <div className='seved__lead-search'>
                  <div className='travelForWork-search-box'>
                    <div className='input-group'>
                      <button className='btn' type='button'>
                        <BiSearch />
                      </button>
                      <input
                        type='text'
                        className='form-control'
                        placeholder={t('marketplace.searchJobs') || 'Search jobs'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button
                      type='button'
                      className={`btn filterBtn ${showFilters ? 'active' : ''}`}
                      aria-label='Filter'
                      onClick={() => setShowFilters((v) => !v)}
                    >
                      <FaFilter />
                    </button>
                  </div>
                </div>
                {showFilters && (
                  <div className='saved-lead-filters mb-3 p-3 border rounded'>
                    <div className='mb-2'>
                      <label className='form-label small mb-1'>Category</label>
                      <select
                        className='form-select form-select-sm'
                        value={filters.category_id}
                        onChange={(e) => handleFilterChange('category_id', e.target.value)}
                      >
                        <option value=''>All categories</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='mb-2'>
                      <label className='form-label small mb-1'>Sort</label>
                      <select
                        className='form-select form-select-sm'
                        value={filters.sort}
                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                      >
                        <option value='newest'>Newest first</option>
                        <option value='nearest'>Nearest first</option>
                      </select>
                    </div>
                    <div className='mb-2'>
                      <label className='form-label small mb-1'>
                        {t('marketplace.maxDistance') || 'Max distance (km)'}
                      </label>
                      <select
                        className='form-select form-select-sm'
                        value={filters.max_distance_km}
                        onChange={(e) => handleFilterChange('max_distance_km', e.target.value)}
                      >
                        <option value=''>
                          {t('marketplace.useMyRadius') || 'My travel radius'}
                        </option>
                        <option value='10'>10 km</option>
                        <option value='25'>25 km</option>
                        <option value='50'>50 km</option>
                        <option value='75'>75 km</option>
                        <option value='100'>100 km</option>
                      </select>
                    </div>
                    <div className='mb-0'>
                      <label className='form-label small mb-1'>Status</label>
                      <select
                        className='form-select form-select-sm'
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                      >
                        <option value=''>Any</option>
                        <option value='open'>Open</option>
                        <option value='closed'>Closed</option>
                      </select>
                    </div>
                  </div>
                )}
                <div className='seved__lead-boxes d-flex flex-column gap-2'>
                  {jobs.length === 0 ? (
                    <p className='text-muted mb-0'>{t('marketplace.noJobsMatch')}</p>
                  ) : (
                    jobs.map((job) => (
                      <JobBox
                        key={job.id}
                        icon={job.category?.image || paintingHouseSmIcon}
                        title={job.title}
                        headerRightLabel={
                          job.distance_km != null ? `${job.distance_km} km` : 'Unlocks'
                        }
                        position={String(job.unlock_count ?? 0).padStart(2, '0')}
                        description={job.description}
                        date={new Date(job.created_at).toLocaleDateString()}
                        onClick={() => handleSelectJob(job.id)}
                        isActive={selectedJobId === job.id}
                        applied={job.user_has_unlocked}
                        status={job.status !== 'open' ? job.status : undefined}
                        extraBadges={
                          job.has_location === false ? [t('marketplace.noGps')] : []
                        }
                      />
                    ))
                  )}
                </div>
                <JobsPagination
                  pagination={pagination}
                  loading={loading}
                  onPageChange={(p) => setPage(p)}
                />
              </div>
            </div>

            <div className='col-xl-5 col-md-7'>
              {detailLoading ? (
                <div className='job-details text-center py-5'>
                  <div className='spinner-border text-primary' role='status' />
                </div>
              ) : (
                <JobDetailContent job={selectedJob} />
              )}
            </div>

            <div className='col-xl-3 mt-xl-0 mt-4'>
              <div className='savedLeadContact-content'>
                <ContactDetails
                  phone={selectedJob?.user?.phone}
                  email={selectedJob?.user?.email}
                  address={selectedJob?.user?.address}
                  isUnlocked={isUnlocked}
                  canUnlock={canUnlock}
                  slotsRemaining={selectedJob?.slots_remaining ?? 0}
                  unlockPriceLabel={unlockPriceLabel}
                  onUnlockClick={() => setShowUnlockModal(true)}
                  chatJobId={selectedJobId}
                  customerName={selectedJob?.user?.name}
                  customerUserId={isUnlocked ? selectedJob?.user?.id : null}
                />
                <div className='shortFeeBox'>
                  <h5>Unlock fee</h5>
                  <h4 className='redColor'>{unlockPriceLabel}</h4>
                  <p>One-time fee to view contact details and chat</p>
                </div>
                <div className='shortFeeBox'>
                  <h5>
                    {selectedJob?.unlock_count ?? 0} / {selectedJob?.max_unlocks ?? 5} Unlocked
                  </h5>
                  <p>{selectedJob?.slots_remaining ?? 0} slots remaining</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RecruiterLayout>
  );
};

export default PostedJobs;
