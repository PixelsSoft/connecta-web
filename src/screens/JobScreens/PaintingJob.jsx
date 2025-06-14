import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import JobPostingSec from '../../components/JobPostingSec';

import RoomIcon1 from '../../assets/images/1-room-icon.png';
import RoomIcon2 from '../../assets/images/2-room-icon.png';
import RoomIcon3 from '../../assets/images/3-room-icon.png';
import RoomIcon4 from '../../assets/images/4-room-icon.png';

import paintingbannerimg from '../../assets/images/painting-banner-img.png';
import jobPostingbannerimg from '../../assets/images/jobPosting-banner-img.png';
import bathroomfittingbanner3 from '../../assets/images/bathroom-fitting-banner-3.png';

const PaintingJob = () => {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    navigate('/recruiter/posted-jobs');
  };

  return (
    <DefaultLayout2>
      {step === 1 && (
        <JobPostingSec
          secTitle='Post a Painting job'
          secDescription='Get responses from Connecta24 screened and reviewed Professional People near you'
          rightImg={paintingbannerimg}
        >
          <div className='paintingJobContent'>
            <div className='input-group'>
              <label className='form-label fw-600'>
                How many room do you want to cover in this services?
              </label>
              <div className='paintingBoxRadioButtons'>
                {[
                  { labelId: 'for1Room', title: '1 Room', icon: RoomIcon1 },
                  { labelId: 'for2Room', title: '2 Room', icon: RoomIcon2 },
                  { labelId: 'for3Room', title: '3 Room', icon: RoomIcon3 },
                  { labelId: 'for4Room', title: '4 Room', icon: RoomIcon4 },
                ].map((item, index) => (
                  <div className='form-check paintJobRadio' key={index}>
                    <label className='form-check-label' htmlFor={item.labelId}>
                      <div className='form-check-labelContent'>
                        <img src={item.icon} alt='' />
                        <span>{item.title}</span>
                      </div>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='AditionalVendors'
                        id={item.labelId}
                      />
                    </label>
                  </div>
                ))}

                <div className='form-check paintJobRadio'>
                  <label className='form-check-label' htmlFor='paintingOther'>
                    <div className='form-check-labelContent'>
                      <span>Other</span>
                      <input
                        type='text'
                        className='forn-control'
                        placeholder='No of rooms'
                      />
                    </div>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='AditionalVendors'
                      id='paintingOther'
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className='paintingJobContent-btns mt-3'>
              <button onClick={nextStep} className='customBtn btn-bgRed'>
                Next
              </button>
            </div>
          </div>
        </JobPostingSec>
      )}

      {step === 2 && (
        <JobPostingSec
          secTitle='Post a Painting job'
          secDescription='Get responses from Connecta24 screened and reviewed Professional People near you'
          rightImg={paintingbannerimg}
        >
          <div className='paintingJobContent'>
            <div className='input-group'>
              <label className='form-label fw-600'>
                What type of painting do you need?
              </label>
              <div className='paintingBoxRadioList'>
                {[
                  {
                    labelId: 'for1Room',
                    title: 'In house decoration',
                    description: 'Completely change a home color',
                  },
                  {
                    labelId: 'for2Room',
                    title: 'Wallpaper work',
                    description:
                      'E.g. replace wall color with different wallpapers',
                  },
                  {
                    labelId: 'for3Room',
                    title: 'Touching',
                    description: 'Need some touching for fresh look',
                  },
                  {
                    labelId: 'for4Room',
                    title: 'Tiling',
                    description: 'E.g. Color with tiles',
                  },
                ].map((item, index) => (
                  <div className='form-check paintRadioListItem' key={index}>
                    <label className='form-check-label' htmlFor={item.labelId}>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='AditionalVendors'
                        id={item.labelId}
                      />
                      <div className='form-check-labelListContent'>
                        <span className='darkGrayColor'>{item.title}</span>
                        <span className='grayColor50'>{item.description}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className='paintingJobContent-btns mt-3'>
              <button onClick={prevStep} className='customBtn btn-blackBorder'>
                Back
              </button>
              <button onClick={nextStep} className='customBtn btn-bgRed'>
                Next
              </button>
            </div>
          </div>
        </JobPostingSec>
      )}

      {step === 3 && (
        <JobPostingSec
          secTitle='Post a Bathroom Fitting job'
          secDescription='Enter Some Description about your job or upload some images to support your description!'
          rightImg={paintingbannerimg}
        >
          <div className='bathroomFittinJob'>
            <div className='input-group mb-4'>
              <label htmlFor='userName' className='form-label fw-600'>
                Description
              </label>
              <textarea
                className='form-control'
                placeholder='Add Description'
                rows={3}
                style={{ resize: 'none' }}
              ></textarea>
            </div>

            <div className='input-group'>
              <label htmlFor='userName' className='form-label fw-600 mb-0'>
                Upload Images
              </label>
              <div className='form-text mt-0 mb-2'>
                you can upload up to 20 pictures not more than 100 mbs
              </div>
              <input type='file' className='form-control' id='userName' />
            </div>

            <div className='paintingJobContent-btns mt-5'>
              <button onClick={prevStep} className='customBtn btn-blackBorder'>
                Back
              </button>
              <button onClick={nextStep} className='customBtn btn-bgRed'>
                Next
              </button>
            </div>
          </div>
        </JobPostingSec>
      )}

      {step === 4 && (
        <JobPostingSec
          secTitle='Post a Bathroom Fitting job'
          secDescription='Enter your contact Information'
          rightImg={jobPostingbannerimg}
        >
          <div className='bathroomFittinJob'>
            <div className='input-group mb-4'>
              <label htmlFor='userEmail' className='form-label fw-600'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='userEmail'
                placeholder='info@modernize.com'
              />
            </div>

            <div className='input-group'>
              <label htmlFor='userPhone' className='form-label fw-600 mb-0'>
                Phone
              </label>
              <input
                type='text'
                className='form-control'
                id='userPhone'
                placeholder='+91 12345 65478'
              />
            </div>

            <div className='paintingJobContent-btns mt-5'>
              <button onClick={prevStep} className='customBtn btn-blackBorder'>
                Back
              </button>
              <button onClick={nextStep} className='customBtn btn-bgRed'>
                Next
              </button>
            </div>
          </div>
        </JobPostingSec>
      )}

      {step === 5 && (
        <JobPostingSec
          secTitle='Post a Bathroom Fitting job'
          secDescription='Verifiy your email address and Phone number'
          rightImg={bathroomfittingbanner3}
        >
          <div className='bathroomFittinJob'>
            <div className='input-group mb-4'>
              <label htmlFor='userOTP' className='form-label fw-600'>
                OTP Code
              </label>
              <input
                type='text'
                className='form-control'
                id='userOTP'
                placeholder='******'
              />
              <p className='darkGrayColor mb-0 mt-2'>
                code will be able to resent after{' '}
                <span style={{ color: '#056517' }}>00:59</span>
              </p>
            </div>

            <div className='paintingJobContent-btns mt-5'>
              <button onClick={prevStep} className='customBtn btn-blackBorder'>
                Back
              </button>
              <button className='customBtn btn-bgRed' onClick={handleSubmit}>
                Next
              </button>
            </div>
          </div>
        </JobPostingSec>
      )}
    </DefaultLayout2>
  );
};

export default PaintingJob;
