import RecruiterLayout from '../../../components/Layouts/RecruiterLayout';

import recruiterjobdetailbanner from '../../../assets/images/recruiter-job-detail-banner.png';
import editIcon from '../../../assets/images/edit-icon.png';

import paintingHouseSmIcon from '../../../assets/images/painting-house-sm-icon.png';
import gardeningSmIcon from '../../../assets/images/gardening-sm-icon.png';
import plumbingSmIcon from '../../../assets/images/plumbing-sm-icon.png';

import interestedProImg from '../../../assets/images/interested-pro-img.png';
import interestedProImg2 from '../../../assets/images/interested-pro-img2.png';

import JobBox from '../../../components/JobBox';
import InterestedProBox from '../../../components/InterestedProBox';
import DashboardFooter from '../../../components/Layouts/DashboardFooter';

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

const interestedPros = [
  {
    userImg: interestedProImg,
    userName: 'Mark Anderson',
    ratingValue: 4.5,
    ratingValueText: '4/5',
    topProLabel: 'Top Professional',
    description:
      'This professional shows some interest in your job. Start a chat to know more and find a good fit for the job.',
  },
  {
    userImg: interestedProImg,
    userName: 'Sonia Pate',
    ratingValue: 4.5,
    ratingValueText: '4/5',
    topProLabel: 'Top Professional',
    description:
      'This professional shows some interest in your job. Start a chat to know more and find a good fit for the job.',
  },
  {
    userImg: interestedProImg2,
    userName: 'Robin Anderson',
    ratingValue: 4.5,
    ratingValueText: '4/5',
    topProLabel: 'Top Professional',
    description:
      'This professional shows some interest in your job. Start a chat to know more and find a good fit for the job.',
  },
];

const JobDetail = () => {
  return (
    <RecruiterLayout>
      <section className='recruiter__job-detail'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-8 mb-xl-0 mb-5'>
              <div className='recruiter__job-detail-content'>
                <div className='recruiter__job-detail-content-banner mb-3'>
                  <img
                    src={recruiterjobdetailbanner}
                    className='img-fluid'
                    alt=''
                  />
                </div>
                <div className='recruiter__job-detail-content-header mb-lg-4 mb-3'>
                  <div className='jobDetail-headLeft'>
                    <h2 className='mb-2'>Bathroom Fitting job</h2>
                    <p>Posted Date : 02/20/2025</p>
                  </div>
                  <div className='jobDetail-headRight'>
                    <button className='customBtn btn__witchIcon'>
                      <img src={editIcon} alt='' />
                      <span>Edit Job</span>
                    </button>
                    <button className='customBtn btn-bgRed'>
                      Close This Position
                    </button>
                  </div>
                </div>
                <div className='recruiter__job-detail-content-overview'>
                  <div className='mb-lg-4 mb-3'>
                    <h4 className='mb-2'>Overview</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore
                    </p>
                  </div>
                  <div className='mb-lg-4 mb-3'>
                    <h4>Question Related Job</h4>
                  </div>
                  <div className='recruiter__job-detail-content-overviewQuestion'>
                    <div className='job-detail-question'>
                      <h5>
                        <span>Q1</span> How many bathrooms need refurbishing /
                        installing?
                      </h5>
                      <p>
                        <span>A2</span>
                        Bathroom refurbishment / installation Completely change
                        a bathroom, or replace a whole suite and redecorate
                      </p>
                    </div>
                    <div className='job-detail-question'>
                      <h5>
                        <span>Q2</span>
                        What work are you looking to undertake?
                      </h5>
                      <p>
                        <span>A2</span>
                        Bathroom refurbishment / installation Completely change
                        a bathroom, or replace a whole suite and redecorate
                      </p>
                    </div>
                    <div className='job-detail-question'>
                      <h5>
                        <span>Q2</span>
                        What work are you looking to undertake?
                      </h5>
                      <p>
                        <span>A2</span>
                        Bathroom refurbishment / installation Completely change
                        a bathroom, or replace a whole suite and redecorate
                      </p>
                    </div>
                    <div className='job-detail-question'>
                      <h5>
                        <span>Q2</span>
                        What work are you looking to undertake?
                      </h5>
                      <p>
                        <span>A2</span>
                        Bathroom refurbishment / installation Completely change
                        a bathroom, or replace a whole suite and redecorate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-xl-4'>
              <div className='interested-pro'>
                <div className='interested-pro-head'>
                  <h3>Intrested Professionals</h3>
                  <p>Total Interest 3 out of 6</p>
                </div>

                {/* <div className='interested-pro-boxes'> */}
                <div className='row'>
                  {interestedPros.map((pro, index) => (
                    <div className='col-xl-12 col-md-6 mb-3' key={index}>
                      <InterestedProBox
                        key={index}
                        userImg={pro.userImg}
                        userName={pro.userName}
                        ratingValue={pro.ratingValue}
                        ratingValueText={pro.ratingValueText}
                        topProLabel={pro.topProLabel}
                        description={pro.description}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='job-detail-prevJob'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='sec-head'>
                <h3>Previous Jobs</h3>
              </div>
            </div>
            {postedJobsData.map((item) => (
              <div className='col-xl-4  col-md-6 mb-3' key={item.id}>
                <JobBox
                  icon={item.icon}
                  title={item.title}
                  headerRightLabel='Interested'
                  position={item.possition}
                  description={item.description}
                  date={item.date}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <DashboardFooter />
    </RecruiterLayout>
  );
};

export default JobDetail;
