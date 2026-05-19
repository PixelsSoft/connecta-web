import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import axiosInstance from '../../utils/axios';
import { API_ENDPOINTS } from '../../config/api';
import { formatMoney } from '../../utils/jobStatus';
import '../../components/JobWorkflow/JobWorkflow.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const jobId = searchParams.get('job_id');
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const verify = async () => {
      if (!sessionId || !jobId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.PAYMENTS.VERIFY, {
          params: { session_id: sessionId, job_id: jobId },
        });
        if (response.data.success) {
          setPaid(response.data.data.paid);
          setJob(response.data.data.job);
        }
      } catch {
        setPaid(false);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [sessionId, jobId]);

  return (
    <DefaultLayout2>
      <section className="payment-result-sec">
        <div className="container">
          <div className="payment-result-card mx-auto">
            {loading ? (
              <>
                <div className="spinner-border text-danger mb-3" role="status" />
                <p>Confirming your payment...</p>
              </>
            ) : paid ? (
              <>
                <i className="bi bi-check-circle-fill icon-success mb-3 d-block" />
                <h2>Payment Successful</h2>
                <p className="text-muted">
                  {job?.title ? `"${job.title}" is now in progress.` : 'Your job is now in progress.'}
                </p>
                {job?.final_amount && (
                  <p className="fw-bold">{formatMoney(job.final_amount)}</p>
                )}
                <Link to={`/user/posted-jobs/${jobId}`} className="customBtn btn-bgRed mt-3 d-inline-block">
                  View Job
                </Link>
              </>
            ) : (
              <>
                <i className="bi bi-exclamation-circle icon-cancel mb-3 d-block" />
                <h2>Payment Pending</h2>
                <p className="text-muted">
                  We could not confirm payment yet. If you were charged, check again in a moment.
                </p>
                <button
                  type="button"
                  className="customBtn btn-bgRed mt-3"
                  onClick={() => navigate(`/user/posted-jobs/${jobId}`)}
                >
                  Back to Job
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default PaymentSuccess;


