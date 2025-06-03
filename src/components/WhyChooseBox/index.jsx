import React from "react";
import { Link } from "react-router-dom";

import blackarrowicon from "../../assets/images/black-arrow-icon.png";

const WhyChooseBox = (props) => {
  return (
    <div className='whyChooseBox'>
      <div className='whyChooseBox-content'>
        <div className='whyChooseBox__icon'>
          <img src={props?.icon} alt='why choose Icon' />
        </div>
        <h4>{props.name}</h4>
        <p>{props.description}</p>
      </div>
      <Link to={""} className='btn__witchIcon'>
        <span>Learn More</span> <img src={blackarrowicon} alt='' />
      </Link>
    </div>
  );
};

export default WhyChooseBox;
