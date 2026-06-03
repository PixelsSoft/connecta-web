import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import { verifyOtp, resendOtp, clearError } from '../../store/slices/authSlice';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }

    if (isAuthenticated && user) {
      if (user.user_type === 'professional') {
        navigate('/recruiter/posted-jobs');
      } else {
        navigate('/user/posted-jobs');
      }
    }
  }, [isAuthenticated, user, email, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      await dispatch(verifyOtp({ email, otp })).unwrap();
      toast.success('Email verified successfully!');
    } catch (err) {
      // Error handled by Redux
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      await dispatch(resendOtp(email)).unwrap();
      toast.success('OTP resent successfully!');
      setTimer(59);
      setCanResend(false);
    } catch (err) {
      // Error handled by Redux
    }
  };

  return (
    <DefaultLayout2>
      <section className='auth-sec'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12'>
              <div className='auth-content'>
                <h2>Verify OTP</h2>
                <p className='text-center mb-4' style={{ color: '#666' }}>
                  We've sent a verification code to<br />
                  <strong>{email}</strong>
                </p>
                <form onSubmit={handleSubmit}>
                  <div className='auth-contentForm'>
                    <div className='inputGroup'>
                      <label htmlFor='otpCode' className='form-label'>
                        OTP Code
                      </label>
                      <input
                        type='text'
                        className='form-control text-center'
                        id='otpCode'
                        name='otp'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder='******'
                        maxLength={6}
                        disabled={loading}
                        required
                        style={{ fontSize: '24px', letterSpacing: '8px' }}
                      />
                      <p className='darkGrayColor mb-0 mt-2 text-center'>
                        {canResend ? (
                          <button
                            type='button'
                            onClick={handleResendOtp}
                            className='forgotText'
                            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                            disabled={loading}
                          >
                            Resend OTP
                          </button>
                        ) : (
                          <>
                            Code will be able to resent after{' '}
                            <span style={{ color: '#056517' }}>
                              00:{timer.toString().padStart(2, '0')}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                    
                    <button
                      type='submit'
                      className='customBtn btn-bgRed w-100'
                      disabled={loading}
                    >
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    
                    <p className='m-0 text-center mt-3'>
                      <Link to={'/login'} className='forgotText'>
                        Back to Login
                      </Link>
                    </p>
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

export default VerifyOtp;
