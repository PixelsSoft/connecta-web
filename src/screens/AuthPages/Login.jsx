import React, { useState, useEffect } from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginAction, clearError } from '../../store/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { loading, error, fieldErrors, isAuthenticated, requiresOtp, otpEmail, user } = useSelector((state) => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (requiresOtp && otpEmail) {
      navigate('/verify-otp', { state: { email: otpEmail } });
    } else if (isAuthenticated && user) {
      // Navigate based on user type
      if (user.user_type === 'professional') {
        navigate('/recruiter/posted-jobs');
      } else {
        navigate('/user/posted-jobs');
      }
    }
  }, [requiresOtp, otpEmail, isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(loginAction({ email, password }));
  };

  return (
    <DefaultLayout2>
      <section className='auth-sec'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12'>
              <div className='auth-content'>
                <h2>{t('buttons.Title_login')}</h2>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error.split('\n').map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className='auth-contentForm'>
                    <div className='inputGroup'>
                      <label htmlFor='userName' className='form-label'>
                        {t('forms.username')}
                      </label>
                      <input
                        type='email'
                        className={`form-control${fieldErrors.email ? ' is-invalid' : ''}`}
                        id='userName'
                        placeholder='info@wrappixel.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                      {fieldErrors.email && (
                        <div className="text-danger small mt-1">{fieldErrors.email}</div>
                      )}
                    </div>
                    <div className='inputGroup'>
                      <label htmlFor='userPassword' className='form-label'>
                        {t('forms.password')}
                      </label>
                      <input
                        type='password'
                        className={`form-control${fieldErrors.password ? ' is-invalid' : ''}`}
                        id='userPassword'
                        placeholder={t('forms.password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                      {fieldErrors.password && (
                        <div className="text-danger small mt-1">{fieldErrors.password}</div>
                      )}
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
                      <Link to={'/forgot-password'} className='forgotText'>
                        {t('forms.forgotPassword')}
                      </Link>
                    </div>
                    <button
                      type='submit'
                      className='customBtn btn-bgRed w-100'
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : t('buttons.signIn')}
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
