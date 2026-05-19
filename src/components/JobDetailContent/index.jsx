import { FaLocationDot } from 'react-icons/fa6';
import paintingHouseSmIcon from '../../assets/images/painting-house-sm-icon.png';
import { getJobQuestionsAnswers } from '../../utils/jobQuestions';
import { DEFAULT_CURRENCY, formatMoney } from '../../utils/jobStatus';

const JobDetailContent = ({ job }) => {
  if (!job) {
    return (
      <div className='job-details text-center py-5'>
        <p className='text-muted mb-0'>Select a job to view details</p>
      </div>
    );
  }

  const title = job.jobDetail?.detailedTitle || job.title;
  const categoryName = job.jobDetail?.category || job.category?.name || 'General';
  const location = job.jobDetail?.address || job.location || 'Location not specified';
  const categoryIcon = job.icon || job.category?.image || paintingHouseSmIcon;
  const postedDate =
    job.date ||
    (job.created_at ? new Date(job.created_at).toLocaleDateString() : '-');
  const questionsAnswers = getJobQuestionsAnswers(job);
  const responsibilities = job.jobDetail?.responsibilities;
  const outcomes = job.jobDetail?.outcomes;
  const textInfo = job.jobDetail?.textInfo;

  return (
    <div className='job-details'>
      <h2>{title}</h2>

      <div className='job-details-metaContent'>
        <div className='job-details-textWithContent job-details-textWithContent--category'>
          <img src={categoryIcon} alt='' />
          <span>{categoryName}</span>
        </div>
        <div className='job-details-textWithContent job-details-textWithContent--location'>
          <FaLocationDot />
          <span>{location}</span>
        </div>
      </div>

      <div className='job-details-content'>
        <h4>Description:</h4>
        <p>{job.description || 'No description provided.'}</p>
      </div>

      {job.budget && (
        <div className='job-details-content'>
          <h5>Budget:</h5>
          <p className='job-details-budget'>
            {Number.isFinite(Number(job.budget))
              ? formatMoney(job.budget, DEFAULT_CURRENCY)
              : `${DEFAULT_CURRENCY} ${job.budget}`}
          </p>
        </div>
      )}

      {responsibilities?.length > 0 && (
        <div className='job-details-content'>
          <h5>Key Tasks and Responsibilities:</h5>
          <ul>
            {responsibilities.map((task, idx) => (
              <li key={idx}>{task}</li>
            ))}
          </ul>
        </div>
      )}

      {outcomes?.length > 0 && (
        <div className='job-details-content'>
          <h5>Expected Outcomes:</h5>
          <ul>
            {outcomes.map((outcome, idx) => (
              <li key={idx}>{outcome}</li>
            ))}
          </ul>
        </div>
      )}

      {questionsAnswers.length > 0 && (
        <div className='job-details-content'>
          <h5>Questions Related to Job:</h5>
          <div className='job-details-questions'>
            {questionsAnswers.map((qa, idx) => (
              <div className='job-detail-question' key={idx}>
                <h5>
                  <span className='job-detail-question__label'>Q{idx + 1}</span>{' '}
                  {qa.question}
                </h5>
                <p>
                  <span className='job-detail-question__label'>A{idx + 1}</span>{' '}
                  {qa.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {textInfo && <p>{textInfo}</p>}

      <p className='job-details-posted'>Posted Date: {postedDate}</p>
    </div>
  );
};

export default JobDetailContent;


