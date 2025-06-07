import Header from './Header';
import '../styles/home.scss';
import { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <Header />
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/IN-en-20250414-TRIFECTA-perspective_c8273fb1-8860-4ff5-bd1c-c2c4b44d5f2a_large.jpg"
        className="w-full h-full object-cover"
        alt="background"
      />

      <div className="absolute login-form">
        <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        <form className="flex justify-center align-center">
          {isLogin ? (
            <>
              <div>
                <label htmlFor="name">Name</label>
              </div>
              <div>
                <input type="text" id="name" required placeholder="Name" />
              </div>{' '}
            </>
          ) : null}
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
          {isLogin ? (
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
          ) : null}

          <button>{isLogin ? 'Sign in' : 'Sign up'}</button>
        </form>

        {isLogin ? (
          <span>
            New to Netflix? <b onClick={setIsLogin(false)}>Sign up now.</b>
          </span>
        ) : (
          <span>
            Existing User?<b onClick={setIsLogin(true)}>Sign in now.</b>{' '}
          </span>
        )}
      </div>
    </>
  );
};

export default Login;
