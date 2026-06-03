import React from 'react';
import paintingHouseSmIcon from '../../assets/images/painting-house-sm-icon.png';
import appliedCheck from '../../assets/images/applied-check.png';
import { Link } from 'react-router-dom';
import { JOB_STATUS_LABELS, JOB_STATUS_BADGE } from '../../utils/jobStatus';
import '../JobWorkflow/JobWorkflow.css';

const JobBox = ({
  to = '',
  onClick,
  isActive,
  applied = false,
  icon = paintingHouseSmIcon,
  title = 'Painting House',
  position = 'Opened',
  headerRightLabel = 'Position',
  description = 'Lorem ipsum',
  date = '02/20/2025',
  status,
  extraBadges = [],
  onDelete,
}) => {
  const statusLabel = status ? JOB_STATUS_LABELS[status] || status : null;
  const statusBadgeClass = status ? JOB_STATUS_BADGE[status] || 'bg-secondary' : '';
  const shortDescription =
    description && description.length > 120
      ? `${description.slice(0, 120)}...`
      : description;

  const box = (
    <div className={`job__box ${isActive ? 'job__box-active' : ''}`}>
      <div className='job__box-content'>
        {applied && (
          <div className='job__box-content-applied'>
            <img src={appliedCheck} alt='' />
            <h5>Unlocked</h5>
          </div>
        )}
        {(statusLabel || extraBadges.length > 0) && (
          <div className='job__box-status mb-2 d-flex flex-wrap gap-1'>
            {statusLabel && (
              <span className={`badge ${statusBadgeClass}`}>{statusLabel}</span>
            )}
            {extraBadges.map((badge) => (
              <span key={badge} className='badge bg-secondary'>
                {badge}
              </span>
            ))}
          </div>
        )}
        <div className='job__box-header'>
          <div className='job__box-header-textWithIcon'>
            <img src={icon} alt='' />
            <h4>{title}</h4>
          </div>
          <p>
            {headerRightLabel} {position}
          </p>
        </div>
        <p className='job__box-body'>{shortDescription}</p>
      </div>
      <div className='job__box-footer d-flex justify-content-between align-items-center flex-wrap gap-2'>
        <span>
          Posted Date : <span>{date}</span>
        </span>
        {onDelete && (
          <button
            type='button'
            className='btn btn-sm btn-outline-danger'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }} onClick={onClick}>
        {box}
      </Link>
    );
  }

  return (
    <div
      role='button'
      tabIndex={0}
      style={{ textDecoration: 'none', cursor: 'pointer' }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e);
        }
      }}
    >
      {box}
    </div>
  );
};

export default JobBox;

