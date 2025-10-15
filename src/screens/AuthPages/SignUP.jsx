import React from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignUP = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
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
                <h2>{t('buttons.Title_SignUp')}</h2>
                <form onSubmit={handleSubmit}>
                  <div className='auth-contentForm'>
                    <div className='inputGroup'>
                      <label htmlFor='fullName' className='form-label'>
                        {t('forms.fullName')}
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='fullName'
                        placeholder='Jon Doe'
                      />
                    </div>
                    <div className='inputGroup'>
                      <label htmlFor='userEmail' className='form-label'>
                        {t('forms.email')}
                      </label>
                      <input
                        type='email'
                        className='form-control'
                        id='userEmail'
                        placeholder='jon.doe@mail.com'
                      />
                    </div>
                    <div className='inputGroup'>
                      <label htmlFor='userPassword' className='form-label'>
                        {t('forms.password')}
                      </label>
                      <input
                        type='password'
                        className='form-control'
                        id='userPassword'
                        placeholder='••••••••'
                      />
                    </div>
                    <div className='inputGroup'>
                      <label htmlFor='userPasswordConfirm' className='form-label'>
                        {t('forms.confirmPassword')}
                      </label>
                      <input
                        type='password'
                        className='form-control'
                        id='userPasswordConfirm'
                        placeholder='••••••••'
                      />
                    </div>

                    <button
                      type='submit'
                      className='customBtn btn-bgRed w-100'
                    >
                      {t('buttons.signUp')}
                    </button>
                    <div className='authForm-checkBoxes'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='useEmailCheck'
                        />
                        <label className='form-check-label' htmlFor='useEmailCheck'>
                          {t('forms.useEmailAlerts')}
                        </label>
                      </div>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='agreeTermCondition'
                        />
                        <label
                          className='form-check-label'
                          htmlFor='agreeTermCondition'
                        >
                          {t('forms.agreeTerms')}
                        </label>
                      </div>
                    </div>
                    <p className='m-0 text-center'>{t('home.or')}</p>
                    <div className='authBottom-btns'>
                      <Link
                        to={'/find-professionals'}
                        className='customBtn btn-bgBlack'
                      >
                        {t('buttons.postJob')}
                      </Link>
                      <Link to={'/login'} className='customBtn btn-bgGreen'>
                        {t('buttons.login')}
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
