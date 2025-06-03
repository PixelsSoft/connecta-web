import React from 'react';
import DefaultLayout2 from '../../components/Layouts/DefaultLayout2';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/set-up-profile');
  };
  return (
    <DefaultLayout2>
      <section className='auth-sec'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12'>
              <div className='auth-content'>
                <h2>Login</h2>
                <form>
                  <div className='auth-contentForm'>
                    <div class='inputGroup'>
                      <label for='userName' class='form-label'>
                        Username
                      </label>
                      <input
                        type='email'
                        class='form-control'
                        id='userName'
                        placeholder='info@wrappixel.com'
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
                    <div className='forgotDiv'>
                      <div class='form-check'>
                        <input
                          class='form-check-input'
                          type='checkbox'
                          value=''
                          id='rememberMe'
                        />
                        <label class='form-check-label' for='rememberMe'>
                          Remember me
                        </label>
                      </div>
                      <Link to={''} className='forgotText'>
                        Forgot Password ?
                      </Link>
                    </div>
                    <button
                      className='customBtn btn-bgRed w-100'
                      onClick={handleSubmit}
                    >
                      Sign In
                    </button>
                    <p className='m-0 text-center'>or</p>
                    <div className='authBottom-btns'>
                      <Link to={''} className='customBtn btn-bgBlack'>
                        Post a Job
                      </Link>
                      <Link to={''} className='customBtn btn-bgGreen'>
                        Sign Up as Professional
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
