import React from 'react';
import paintingHouseSmIcon from '../../assets/images/painting-house-sm-icon.png';

import appliedCheck from '../../assets/images/applied-check.png';
import { Link } from 'react-router-dom';

const JobBox = ({
  to = '',
  applied = false,
  icon = paintingHouseSmIcon,
  title = 'Painting House',
  position = 'Opened',
  headerRightLabel = 'Position',
  description = 'Lorem ipsum',
  date = '02/20/2025',
}) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <div className='job__box'>
        <div className='job__box-content'>
          {applied && (
            <div className='job__box-content-applied'>
              <img src={appliedCheck} alt='' />
              <h5>Applied</h5>
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
          <p className='job__box-body'>{description}</p>
        </div>
        <div className='job__box-footer'>
          Posted Date : <span>{date}</span>
        </div>
      </div>
    </Link>
  );
};

export default JobBox;
