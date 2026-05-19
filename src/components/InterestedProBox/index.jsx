import StarRating from '../StarRating';
import { useNavigate } from 'react-router-dom';

import proCheckIcon from '../../assets/images/applied-check.png';

const InterestedProBox = (props) => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    if (!props.professionalId) return;

    navigate('/chat', {
      state: {
        userId: props.professionalId,
        userName: props.userName,
        userEmail: props.userEmail || '',
        userAvatar: props.userAvatar || null,
        userType: 'professional',
        jobDetails: props.jobDetails || null,
      },
    });
  };

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
      <button
        type='button'
        onClick={handleStartChat}
        className='customBtn btn-bgRed w-100 text-center'
      >
        Start Chat
      </button>
    </div>
  );
};

export default InterestedProBox;
