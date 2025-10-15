import React from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = (e) => {
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
                <h2>{t('buttons.Title_login')}</h2>
                <form onSubmit={handleSubmit}>
                  <div className='auth-contentForm'>
                    <div className='inputGroup'>
                      <label htmlFor='userName' className='form-label'>
                        {t('forms.username')}
                      </label>
                      <input
                        type='email'
                        className='form-control'
                        id='userName'
                        placeholder='info@wrappixel.com'
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
                        placeholder={t('forms.password')}
                      />
                    </div>
                    <div className='forgotDiv'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='rememberMe'
                        />
                        <label className='form-check-label' htmlFor='rememberMe'>
                          {t('forms.rememberMe')}
                        </label>
                      </div>
                      <Link to={''} className='forgotText'>
                        {t('forms.forgotPassword')}
                      </Link>
                    </div>
                    <button
                      type='submit'
                      className='customBtn btn-bgRed w-100'
                    >
                      {t('buttons.signIn')}
                    </button>
                    <p className='m-0 text-center'>{t('home.or')}</p>
                    <div className='authBottom-btns'>
                      <Link
                        to={'/find-professionals'}
                        className='customBtn btn-bgBlack'
                      >
                        {t('buttons.postJob')}
                      </Link>
                      <Link to={'/sign-up'} className='customBtn btn-bgGreen'>
                        {t('buttons.signUpProfessional')}
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

export default Login;
