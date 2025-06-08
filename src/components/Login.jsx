import Header from './Header';
import '../styles/home.scss';
import { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="login-bg">
      <Header />
      <div className="login-form flex flex-col">
        <h2 className="form-heading">{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        <form className="flex justify-center align-center">
          {isLogin ? null : (
            <>
              <div>
                <label htmlFor="name">Name</label>
              </div>
              <div>
                <input type="text" id="name" required placeholder="Name" />
              </div>{' '}
            </>
          )}
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input type="email" id="email" required placeholder="Email" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                type="password"
                id="password"
                required
                placeholder="Password"
              />
            </div>
          </div>
          {isLogin ? null : (
            <>
              <div>
                <label htmlFor="confirm-password">Confirm Password</label>
              </div>
              <div>
                <input
                  type="password"
                  id="confirm-password"
                  required
                  placeholder="Confirm Password"
                />
              </div>
            </>
          )}

          <button className='login-btn'>{isLogin ? 'Sign in' : 'Sign up'}</button>
        </form>

        {isLogin ? (
          <span className='signup-redirect'>
            New to Netflix?{' '}
            <b onClick={() => setIsLogin(false)}>Sign up now.</b>
          </span>
        ) : (
          <span className='signup-redirect'>
            Existing User? {' '}
            <b onClick={() => setIsLogin(true)}>Sign in now.</b>{' '}
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
