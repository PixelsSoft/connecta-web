import React, { useState } from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

const Login = (e) => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Test credentials for local development
  const testUsers = {
    // User (Service Booker) credentials
    'user@connecta24.com': {
      password: 'user123',
      role: 'user',
      userData: {
        email: 'user@connecta24.com',
        name: 'John User',
        fullName: 'John User',
      },
    },
    // Professional (Service Provider) credentials
    'professional@connecta24.com': {
      password: 'pro123',
      role: 'professional',
      userData: {
        email: 'professional@connecta24.com',
        name: 'Jane Professional',
        fullName: 'Jane Professional',
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if credentials match test users
    const testUser = testUsers[email.toLowerCase()];
    
    if (testUser && testUser.password === password) {
      // Valid test credentials
      const mockToken = 'mock_token_' + Date.now();
      login(mockToken, testUser.userData, testUser.role);
      
      // Navigate based on role
      if (testUser.role === 'professional') {
        navigate('/recruiter/posted-jobs');
      } else {
        navigate('/user/saved-leads');
      }
    } else {
      // Invalid credentials - show error
      alert('Invalid email or password. Please use test credentials:\n\nUser: user@connecta24.com / user123\nProfessional: professional@connecta24.com / pro123');
    }
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
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
