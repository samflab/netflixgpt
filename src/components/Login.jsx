import Header from './Header';
import '../styles/home.scss';
import { useRef, useState } from 'react';
import { formValidation } from '../utils/helper';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../utils/firebase';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const submitHandler = () => {
    let message = null;
    if (!isLogin) {
      message = formValidation(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        confirmPasswordRef.current.value,
        isLogin
      );
    } else {
      message = formValidation(
        emailRef.current.value,
        passwordRef.current.value, undefined, undefined,
        isLogin
      );
    }

    setErrorMessage(message);

    if (message) {
      return;
    }

    if (!isLogin) {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // ...

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setErrorMessage(`${errorCode} - ${errorMessage}`);
        });
    } else {
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          // ...
          console.log("user", user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} - ${errorMessage}`);
        });
    }
  };
  return (
    <div className="login-bg">
      <Header />
      <div className="login-form flex flex-col">
        <h2 className="form-heading">{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-center align-center"
        >
          {isLogin ? null : (
            <>
              <div>
                <label htmlFor="name">Name</label>
              </div>
              <div>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Name"
                  ref={nameRef}
                />
              </div>{' '}
            </>
          )}
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              type="email"
              id="email"
              required
              placeholder="Email"
              ref={emailRef}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                type="password"
                id="password"
                ref={passwordRef}
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
                  ref={confirmPasswordRef}
                  placeholder="Confirm Password"
                />
              </div>
            </>
          )}
          <div className="form-error">{errorMessage}</div>
          <button className="login-btn" onClick={submitHandler}>
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        {isLogin ? (
          <span className="signup-redirect">
            New to Netflix?{' '}
            <b onClick={() => setIsLogin(false)}>Sign up now.</b>
          </span>
        ) : (
          <span className="signup-redirect">
            Existing User?{' '}
            <b onClick={() => setIsLogin(true)}>Sign in now.</b>{' '}
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
