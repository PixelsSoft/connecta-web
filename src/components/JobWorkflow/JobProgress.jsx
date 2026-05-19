import React from 'react';
import { getJobSteps } from '../../utils/jobStatus';
import './JobWorkflow.css';

const JobProgress = ({ status, paymentStatus = 'unpaid' }) => {
  const steps = getJobSteps(status, paymentStatus);

  return (
    <div className="job-progress mb-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.key}>
          <div className={`job-progress__step ${step.done ? 'done' : ''} ${step.active ? 'active' : ''}`}>
            <span className="job-progress__dot">{step.done ? '\u2713' : index + 1}</span>
            <span className="job-progress__label">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`job-progress__line ${step.done ? 'done' : ''}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default JobProgress;


