import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import '../../components/JobWorkflow/JobWorkflow.css';

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('job_id');

  return (
    <DefaultLayout2>
      <section className="payment-result-sec">
        <div className="container">
          <div className="payment-result-card mx-auto">
            <i className="bi bi-x-circle icon-cancel mb-3 d-block" />
            <h2>Payment Cancelled</h2>
            <p className="text-muted">
              No charge was made. You can return to the job and try again when ready.
            </p>
            {jobId ? (
              <Link to={`/user/posted-jobs/${jobId}`} className="customBtn btn-bgRed mt-3 d-inline-block">
                Back to Job
              </Link>
            ) : (
              <Link to="/user/posted-jobs" className="customBtn btn-bgRed mt-3 d-inline-block">
                My Jobs
              </Link>
            )}
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default PaymentCancel;


