import React from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';

import { Link, useNavigate } from 'react-router-dom';

const SignUP = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/set-up-profile');
  };
  return (
    <DefaultLayout2>
      <section className='auth-sec'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12'>
              <div className='auth-content'>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                  <div className='auth-contentForm'>
                    <div class='inputGroup'>
                      <label for='fullName' class='form-label'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        class='form-control'
                        id='fullName'
                        placeholder='Jon Doe'
                      />
                    </div>
                    <div class='inputGroup'>
                      <label for='userEmail' class='form-label'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        class='form-control'
                        id='userEmail'
                        placeholder='jon.doe@mail.com'
                      />
                    </div>
                    <div class='inputGroup'>
                      <label for='userPassword' class='form-label'>
                        Password
                      </label>
                      <input
                        type='password'
                        class='form-control'
                        id='userPassword'
                        placeholder='••••••••'
                      />
                    </div>
                    <div class='inputGroup'>
                      <label for='userPasswordConfirm' class='form-label'>
                        Confirm Password
                      </label>
                      <input
                        type='password'
                        class='form-control'
                        id='userPasswordConfirm'
                        placeholder='••••••••'
                      />
                    </div>

                    <button
                      type='submit'
                      className='customBtn btn-bgRed w-100'
                      // onClick={handleSubmit}
                    >
                      Sign Up
                    </button>
                    <div className='authForm-checkBoxes'>
                      <div class='form-check'>
                        <input
                          class='form-check-input'
                          type='checkbox'
                          value=''
                          id='useEmailCheck'
                        />
                        <label class='form-check-label' for='useEmailCheck'>
                          use email for receiving alerts further information
                        </label>
                      </div>
                      <div class='form-check'>
                        <input
                          class='form-check-input'
                          type='checkbox'
                          value=''
                          id='agreeTermCondition'
                        />
                        <label
                          class='form-check-label'
                          for='agreeTermCondition'
                        >
                          i agree with all{' '}
                          <span className='fw-bold'>terms & condition</span> and{' '}
                          <span className='fw-500'>Privacy policy</span>
                        </label>
                      </div>
                    </div>
                    <p className='m-0 text-center'>or</p>
                    <div className='authBottom-btns'>
                      <Link
                        to={'/find-professionals'}
                        className='customBtn btn-bgBlack'
                      >
                        Post a Job
                      </Link>
                      <Link to={'/login'} className='customBtn btn-bgGreen'>
                        Login
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout2>
  );
};

export default SignUP;
