import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';
import RecruiterLayout from '../../../components/Layouts/RecruiterLayout';
import JobBox from '../../../components/JobBox';
import JobDetailContent from '../../../components/JobDetailContent';
import ContactDetails from '../../../components/ContactDetails';
import ProfessionalJobWorkflow from '../../../components/JobWorkflow/ProfessionalJobWorkflow';
import SendQuoteModal from '../../../components/JobWorkflow/SendQuoteModal';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api';
import { SHORTLIST_FEE_LABEL } from '../../../utils/jobStatus';
import '../../../components/JobWorkflow/JobWorkflow.css';
import './SavedLeads.css';

import nojobicon from '../../../assets/images/no-job-icon.png';
import paintingHouseSmIcon from '../../../assets/images/painting-house-sm-icon.png';

const formatInterestCount = (count) => String(count ?? 0).padStart(2, '0');

const PostedJobs = () => {
  const { t } = useTranslation('common');
  const { user } = useSelector((state) => state.auth);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [interestLoading, setInterestLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [listTab, setListTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAvailableJobs();
  }, []);

  const fetchAvailableJobs = async (preserveSelection = false) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.LIST, {
        params: { for_professional: 1, per_page: 50 },
      });

      if (response.data.success) {
        const list = response.data.data.jobs || [];
        setJobs(list);

        if (list.length === 0) {
          setSelectedJobId(null);
          setSelectedJob(null);
        } else if (!preserveSelection || !selectedJobId) {
          const firstId = list[0].id;
          setSelectedJobId(firstId);
          await fetchJobDetail(firstId, false);
        }
      }
    } catch (error) {
      console.error('Error fetching available jobs:', error);
      toast.error('Failed to load available jobs');
    } finally {
      setLoading(false);
    }
  };

  const refreshJobsList = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.LIST, {
        params: { for_professional: 1, per_page: 50 },
      });
      if (response.data.success) {
        setJobs(response.data.data.jobs || []);
      }
    } catch (error) {
      console.error('Error refreshing jobs list:', error);
    }
  };

  const fetchJobDetail = async (jobId, showLoader = true) => {
    try {
      if (showLoader) setDetailLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.SHOW(jobId));
      if (response.data.success) {
        setSelectedJob(response.data.data.job);
        setSelectedJobId(jobId);
      }
    } catch (error) {
      console.error('Error fetching job detail:', error);
      toast.error('Failed to load job details');
    } finally {
      if (showLoader) setDetailLoading(false);
    }
  };

  const handleSelectJob = (jobId) => {
    if (jobId === selectedJobId) return;
    fetchJobDetail(jobId);
  };

  const handleShowInterest = async () => {
    if (!selectedJobId) return;
    setInterestLoading(true);
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.JOBS.INTERESTED(selectedJobId)
      );
      if (response.data.success) {
        toast.success('Interest shown successfully!');
        setSelectedJob((prev) =>
          prev ? { ...prev, user_interested: true, user_interest_status: 'interested' } : prev
        );
        await fetchJobDetail(selectedJobId, false);
        await refreshJobsList();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to show interest');
    } finally {
      setInterestLoading(false);
    }
  };

  const handleRemoveInterest = async () => {
    if (!selectedJobId) return;
    setInterestLoading(true);
    try {
      const response = await axiosInstance.delete(
        API_ENDPOINTS.JOBS.INTERESTED(selectedJobId)
      );
      if (response.data.success) {
        toast.success('Interest removed');
        setSelectedJob((prev) =>
          prev
            ? { ...prev, user_interested: false, user_interest_status: null }
            : prev
        );
        await fetchJobDetail(selectedJobId, false);
        await refreshJobsList();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove interest');
    } finally {
      setInterestLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    if (!selectedJobId) return;
    if (!window.confirm('Mark this job as complete? The customer will need to confirm.')) return;
    setActionLoading(true);
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.JOBS.MARK_COMPLETE(selectedJobId)
      );
      if (response.data.success) {
        toast.success('Marked as complete. Waiting for customer approval.');
        await fetchJobDetail(selectedJobId, false);
        await refreshJobsList();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to mark complete');
    } finally {
      setActionLoading(false);
    }
  };

  const tabbedJobs = useMemo(() => {
    if (listTab === 'leads') {
      return jobs.filter((job) => job.status === 'open');
    }
    if (listTab === 'mine') {
      return jobs.filter(
        (job) =>
          job.user_interested || job.assigned_professional_id === user?.id
      );
    }
    return jobs;
  }, [jobs, listTab, user?.id]);

  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const base = q
      ? tabbedJobs.filter((job) => {
          const haystack = [
            job.title,
            job.description,
            job.location,
            job.category?.name,
            job.subcategory?.name,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
          return haystack.includes(q);
        })
      : tabbedJobs;
    return base;
  }, [tabbedJobs, searchQuery]);

  const isShortlisted = selectedJob?.user_interest_status === 'shortlisted';

  if (loading) {
    return (
      <RecruiterLayout>
        <section className='seved__lead-sec'>
          <div className='container'>
            <div className='text-center py-5'>
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
              <p className='mt-3'>Loading available jobs...</p>
            </div>
          </div>
        </section>
      </RecruiterLayout>
    );
  }

  if (jobs.length === 0) {
    return (
      <RecruiterLayout>
        <section className='no__job-posted-yet'>
          <div className='container'>
            <div className='no__job-posted-content text-center py-5'>
              <img src={nojobicon} alt='' />
              <h4>{t('recruiter.noJobAvailable') || 'No Jobs Available Yet'}</h4>
              <p className='text-muted mt-2'>
                Check back later for new job opportunities from customers.
              </p>
              <button type='button' className='customBtn' onClick={fetchAvailableJobs}>
                {t('recruiter.refresh') || 'Refresh'}
              </button>
            </div>
          </div>
        </section>
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      <SendQuoteModal
        show={showQuoteModal}
        onHide={() => setShowQuoteModal(false)}
        jobId={selectedJobId}
        onSuccess={() => {
          fetchJobDetail(selectedJobId, false);
          refreshJobsList();
        }}
      />
      <section className='seved__lead-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-4 col-md-5 mb-md-0 mb-4 seved__lead-leftCol'>
              <div className='seved__lead-left'>
                <div className='seved__lead-content-head'>
                  <h4>{t('recruiter.savedLeads') || 'Saved Leads'}</h4>
                  <p className='greenColor'>
                    {jobs.length} new leads available for you!
                  </p>
                  <p>
                    Browse jobs posted by customers. Select a job to view details
                    and show your interest.
                  </p>
                </div>
                <div className='saved-lead-tabs mb-3'>
                  <button
                    type='button'
                    className={`saved-lead-tabs__btn ${listTab === 'all' ? 'active' : ''}`}
                    onClick={() => setListTab('all')}
                  >
                    All
                  </button>
                  <button
                    type='button'
                    className={`saved-lead-tabs__btn ${listTab === 'leads' ? 'active' : ''}`}
                    onClick={() => setListTab('leads')}
                  >
                    New Leads
                  </button>
                  <button
                    type='button'
                    className={`saved-lead-tabs__btn ${listTab === 'mine' ? 'active' : ''}`}
                    onClick={() => setListTab('mine')}
                  >
                    My Jobs
                  </button>
                </div>
                <div className='seved__lead-search'>
                  <div className='travelForWork-search-box'>
                    <div className='input-group'>
                      <button className='btn' type='button' id='button-addon2'>
                        <BiSearch />
                      </button>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Search Jobs'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button type='button' className='btn filterBtn' aria-label='Filter'>
                      <FaFilter />
                    </button>
                  </div>
                </div>
                <div className='seved__lead-boxes d-flex flex-column gap-2'>
                  {filteredJobs.length === 0 ? (
                    <p className='text-muted mb-0'>No jobs match your search.</p>
                  ) : (
                    filteredJobs.map((job) => (
                      <JobBox
                        key={job.id}
                        icon={job.category?.image || paintingHouseSmIcon}
                        title={job.title}
                        headerRightLabel='Interested:'
                        position={formatInterestCount(job.interested_count)}
                        description={job.description}
                        date={new Date(job.created_at).toLocaleDateString()}
                        onClick={() => handleSelectJob(job.id)}
                        isActive={selectedJobId === job.id}
                        applied={job.user_interested}
                        status={job.status !== 'open' ? job.status : undefined}
                        paymentStatus={job.payment_status}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className='col-xl-5 col-md-7'>
              {detailLoading ? (
                <div className='job-details text-center py-5'>
                  <div className='spinner-border text-primary' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
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
                  isInterested={!!selectedJob?.user_interested}
                  isShortlisted={isShortlisted}
                  interestLoading={interestLoading}
                  onInterestedClick={handleShowInterest}
                  onRemoveInterest={handleRemoveInterest}
                />

                {selectedJob && (
                  <ProfessionalJobWorkflow
                    job={selectedJob}
                    onSendQuote={() => setShowQuoteModal(true)}
                    onMarkComplete={handleMarkComplete}
                    actionLoading={actionLoading}
                  />
                )}

                <div className='shortFeeBox'>
                  <h5>Short listed Fee</h5>
                  <h4 className='redColor'>{SHORTLIST_FEE_LABEL}</h4>
                  <p>fee charged only when you get shortlisted by person</p>
                </div>
                <div className='shortFeeBox'>
                  <h5>
                    {selectedJob?.interested_count ?? 0} Interested
                  </h5>
                  <p>These people show interest in this job</p>
                </div>
                <div className='shortFeeBox shortFeeBox--last'>
                  <h5>{selectedJob?.shortlisted_count ?? 0} Shortlisted</h5>
                  <p>Those people received contact details</p>
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

