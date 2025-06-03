import RecruiterLayout from '../../../components/Layouts/RecruiterLayout';

import paintingHouseSmIcon from '../../../assets/images/painting-house-sm-icon.png';
import gardeningSmIcon from '../../../assets/images/gardening-sm-icon.png';
import plumbingSmIcon from '../../../assets/images/plumbing-sm-icon.png';

import nojobicon from '../../../assets/images/no-job-icon.png';

import JobBox from '../../../components/JobBox';
import { useEffect, useState } from 'react';

const postedJobsData = [
  {
    id: 1,
    icon: paintingHouseSmIcon,
    title: 'Painting House',
    possition: '02',
    description: `Reliable bathroom fitting services – from leaks to complete installs, we’ve got you covered. Contact us for quality work at affordable rates!`,
    date: '02/20/2025',
  },
  {
    id: 2,
    icon: gardeningSmIcon,
    title: 'Gardening',
    possition: '02',
    description: `Reliable bathroom fitting services – from leaks to complete installs, we’ve got you covered. Contact us for quality work at affordable rates!`,
    date: '02/20/2025',
  },
  {
    id: 3,
    icon: plumbingSmIcon,
    title: 'Plumbing',
    possition: '02',
    description: `Reliable bathroom fitting services – from leaks to complete installs, we’ve got you covered. Contact us for quality work at affordable rates!`,
    date: '02/20/2025',
  },
];

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);

  const handleClick = () => {
    setJobs(postedJobsData);
  };

  return (
    <RecruiterLayout>
      {jobs.length === 0 ? (
        <section className='no__job-posted-yet'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='no__job-posted-content'>
                  <img src={nojobicon} alt='' />
                  <h4>No Job Posted Yet!</h4>
                  <button className='customBtn' onClick={() => handleClick()}>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className='posted__job-sec'>
          <div className='container'>
            <div className='row'>
              {jobs.map((item) => (
                <div className='col-xl-4  col-md-6 mb-3' key={item.id}>
                  <JobBox
                    icon={item.icon}
                    title={item.title}
                    headerRightLabel='Interested'
                    position={item.possition}
                    description={item.description}
                    date={item.date}
                    to='/recruiter/posted-jobs/detail'
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </RecruiterLayout>
  );
};

export default PostedJobs;
