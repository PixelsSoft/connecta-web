import StarRating from '../StarRating';

import proCheckIcon from '../../assets/images/applied-check.png';
import { Link } from 'react-router-dom';

const InterestedProBox = (props) => {
  return (
    <div className='interested-pro-box'>
      <div className='interestedProBox-head'>
        <div className='interestedProBox-head-left'>
          <img src={props.userImg} alt='' />
          <div className='interestedProBox-user'>
            <h4>{props.userName}</h4>
            <div className='interestedProBox-rating'>
              <StarRating value={props.ratingValue} />
              <span>{props.ratingValueText}</span>
            </div>
          </div>
        </div>
        <div className='interestedProBox-head-right'>
          <img src={proCheckIcon} alt='' />
          <h5>{props.topProLabel}</h5>
        </div>
      </div>
      <p className='interestedProBox-body'>{props.description}</p>
      <Link
        to={'/recruiter/chat'}
        className='customBtn btn-bgRed w-100 text-center'
      >
        Start Chat
      </Link>
    </div>
  );
};

export default InterestedProBox;
