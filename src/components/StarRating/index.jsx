import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ totalStars = 5, value = 0 }) => {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        if (value >= starValue) {
          return <FaStar key={index} size={16} color='#ffc107' />;
        } else if (value >= starValue - 0.5) {
          return <FaStarHalfAlt key={index} size={16} color='#ffc107' />;
        } else {
          return <FaRegStar key={index} size={16} color='#e4e5e9' />;
        }
      })}
    </div>
  );
};

export default StarRating;
