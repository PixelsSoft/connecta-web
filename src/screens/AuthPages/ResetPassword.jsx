import React, { useState } from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearError } from '../../store/slices/authSlice';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    otp: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    
    if (formData.password !== formData.password_confirmation) {
      alert('Passwords do not match');
      return;
    }
    
    const result = await dispatch(resetPassword(formData));
    if (!result.error) {
      alert('Password reset successfully! Please login with your new password.');
      navigate('/login');
    }
  };

  return (
    <DefaultLayout2>
      <section className='auth-sec'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12 col-md-8 col-lg-6'>
              <div className='auth-content'>
                <h2>Reset Password</h2>
                <p className="text-muted mb-4">
                  Enter the code we sent to your email and your new password.
                </p>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
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
                        name='email'
                        placeholder='your@email.com'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className='inputGroup'>
                      <label htmlFor='otp' className='form-label'>
                        Reset Code
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='otp'
                        name='otp'
                        placeholder='Enter 6-digit code'
                        value={formData.otp}
                        onChange={handleChange}
                        maxLength={6}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className='inputGroup'>
                      <label htmlFor='password' className='form-label'>
                        New Password
                      </label>
                      <input
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                        placeholder='Enter new password'
                        value={formData.password}
                        onChange={handleChange}
                        minLength={8}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className='inputGroup'>
                      <label htmlFor='password_confirmation' className='form-label'>
                        Confirm New Password
                      </label>
                      <input
                        type='password'
                        className='form-control'
                        id='password_confirmation'
                        name='password_confirmation'
                        placeholder='Confirm new password'
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        minLength={8}
                        required
                        disabled={loading}
                      />
                    </div>

                    <button
                      type='submit'
                      className='customBtn btn-bgRed w-100'
                      disabled={loading}
                    >
                      {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
