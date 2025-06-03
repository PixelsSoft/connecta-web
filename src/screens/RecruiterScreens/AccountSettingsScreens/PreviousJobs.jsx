import { useState } from 'react';
import RecruiterAccountSettingLayout from '../../../components/Layouts/RecruiterLayout/RecruiterAccountSettingLayout';

import paintingHouseSmIcon from '../../../assets/images/painting-house-sm-icon.png';
import gardeningSmIcon from '../../../assets/images/gardening-sm-icon.png';
import plumbingSmIcon from '../../../assets/images/plumbing-sm-icon.png';

import JobBox from '../../../components/JobBox';

const previousJobsData = [
  {
    id: 1,
    icon: paintingHouseSmIcon,
    title: 'Painting House',
    possition: 'Open',
    description: `Reliable bathroom fitting services – from leaks to complete installs, we’ve got you covered. Contact us for quality work at affordable rates!`,
    date: '02/20/2025',
  },
  {
    id: 2,
    icon: gardeningSmIcon,
    title: 'Gardening',
    possition: 'Closed',
    description: `Reliable bathroom fitting services – from leaks to complete installs, we’ve got you covered. Contact us for quality work at affordable rates!`,
    date: '02/20/2025',
  },
  {
    id: 3,
    icon: plumbingSmIcon,
    title: 'Plumbing',
    possition: 'Closed',
    description: `Reliable bathroom fitting services – from leaks to complete installs, we’ve got you covered. Contact us for quality work at affordable rates!`,
    date: '02/20/2025',
  },
  {
    id: 4,
    icon: plumbingSmIcon,
    title: 'Plumbing',
    possition: 'Closed',
    description: `Reliable bathroom fitting services – from leaks to complete installs, we’ve got you covered. Contact us for quality work at affordable rates!`,
    date: '02/20/2025',
  },
];

const PreviousJobs = () => {
  const [formData, setFormData] = useState({});

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can now send `formData` to an API or handle validation
  };
  return (
    <RecruiterAccountSettingLayout>
      <div className='row'>
        {previousJobsData.map((item, index) => (
          <div className='col-lg-6 mb-3' key={index}>
            <JobBox
              icon={item.icon}
              title={item.title}
              position={item.possition}
              description={item.description}
              date={item.date}
            />
          </div>
        ))}
      </div>
    </RecruiterAccountSettingLayout>
  );
};

export default PreviousJobs;
