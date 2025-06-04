import { FaLocationDot } from 'react-icons/fa6';

const JobDetailContent = ({ job }) => {
  return (
    <div className='job-details'>
      {job && (
        <>
          <h2>{job.jobDetail.detailedTitle}</h2>

          <div className='job-details-metaContent'>
            <div className='job-details-textWithContent'>
              <img src={job.icon} alt='' />
              <span>{job.jobDetail.category}</span>
            </div>
            <div className='job-details-textWithContent'>
              <FaLocationDot />
              <span>{job.jobDetail.address}</span>
            </div>
          </div>

          <div className='job-details-content'>
            <h4>Description:</h4>
            <p>{job.description}</p>
          </div>

          {job.jobDetail.responsibilities && (
            <div className='job-details-content'>
              <h5>Key Tasks and Responsibilities:</h5>
              <ul>
                {job.jobDetail.responsibilities.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </div>
          )}

          {job.jobDetail.outcomes && (
            <div className='job-details-content'>
              <h5>Expected Outcomes:</h5>
              <ul>
                {job.jobDetail.outcomes.map((outcome, idx) => (
                  <li key={idx}>{outcome}</li>
                ))}
              </ul>
            </div>
          )}

          {job.jobDetail.textInfo && <p>{job.jobDetail.textInfo}</p>}
          <p className='mt-3' style={{ color: '#1B1B1B' }}>
            Posted Date: {job.date}
          </p>
        </>
      )}
    </div>
  );
};

export default JobDetailContent;
