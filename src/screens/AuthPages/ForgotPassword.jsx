import React, { useState, useEffect } from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearError } from '../../store/slices/authSlice';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { loading, error, requiresOtp, otpEmail } = useSelector((state) => state.auth);
  
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (requiresOtp && otpEmail) {
      navigate('/reset-password', { state: { email: otpEmail } });
    }
  }, [requiresOtp, otpEmail, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    setSuccess(false);
    
    const result = await dispatch(forgotPassword(email));
    if (!result.error) {
      setSuccess(true);
    }
  };

  return (
    <DefaultLayout2>
      <section className='auth-sec'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12 col-md-8 col-lg-6'>
              <div className='auth-content'>
                <h2>Forgot Password</h2>
                <p className="text-muted mb-4">
                  Enter your email address and we'll send you a code to reset your password.
                </p>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="alert alert-success" role="alert">
                    Reset code sent! Check your email and enter the code on the next page.
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className='auth-contentForm'>
                    <div className='inputGroup'>
                      <label htmlFor='email' className='form-label'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        placeholder='your@email.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>

                    <button
                      type='submit'
                      className='customBtn btn-bgRed w-100'
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Reset Code'}
                    </button>

                    <div className="text-center mt-3">
                      <Link to='/login' className='text-decoration-none'>
                        Back to Login
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

export default ForgotPassword;
