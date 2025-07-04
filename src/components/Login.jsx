import Header from './Header';
import '../styles/home.scss';
import { useRef, useState } from 'react';
import { formValidation, randomUserImages } from '../utils/helper';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();

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
        passwordRef.current.value,
        undefined,
        undefined,
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
          updateProfile(user, {
            displayName: nameRef.current.value,
            photoURL:
              randomUserImages[
                Math.floor(Math.random() * randomUserImages.length)
              ],
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid,
                email,
                displayName,
                photoURL,
              })
            );
            navigate('/browse');
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} - ${errorMessage}`);
          navigate('/');
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            navigate('/browse');
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} - ${errorMessage}`);
          navigate('/');
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
