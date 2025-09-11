import Header from './Header';
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
    <div
      className="h-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/IN-en-20250414-TRIFECTA-perspective_c8273fb1-8860-4ff5-bd1c-c2c4b44d5f2a_large.jpg')] bg-cover bg-center
   lg:bg-[length:100%_100%]
    "
    >
      <Header />
      <div className="flex flex-col w-[25rem] max-md:w-[15rem] absolute justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-md:-translate-x-[60%] bg-black/80 px-8 py-12 max-md:px-4 max-md:py-6 max-md:overflow-hidden">
        <h2 className="text-[2rem] max-md:text-[1.5rem] text-white font-semibold tracking-[1px]">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>

        <form onSubmit={(e) => e.preventDefault()}>
          {isLogin ? null : (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="text-[0px] bg-transparent m-0 p-0"
                >
                  Name
                </label>
              </div>
              <div>
                <input
                  className="px-[0.5rem] py-[1rem] border-none outline-none text-[1rem] rounded-md h-[2rem] w-full bg-gray-800 text-white"
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
            <label
              htmlFor="email"
              className="text-[0px] bg-transparent m-0 p-0"
            >
              Email
            </label>
          </div>
          <div>
            <input
              className="px-[0.5rem] py-[1rem] border-none outline-none text-[1rem] rounded-md h-[2rem] w-full bg-gray-800 text-white"
              type="email"
              id="email"
              required
              placeholder="Email"
              ref={emailRef}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-[0px] bg-transparent m-0 p-0"
            >
              Password
            </label>
            <div>
              <input
                type="password"
                id="password"
                className="px-[0.5rem] py-[1rem] border-none outline-none text-[1rem] rounded-md h-[2rem] w-full bg-gray-800 text-white"
                ref={passwordRef}
                required
                placeholder="Password"
              />
            </div>
          </div>
          {isLogin ? null : (
            <>
              <div>
                <label
                  className="text-[0px] bg-transparent m-0 p-0"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
              </div>
              <div>
                <input
                  type="password"
                  id="confirm-password"
                  className="px-[0.5rem] py-[1rem] border-none outline-none text-[1rem] rounded-md h-[2rem] w-full bg-gray-800 text-white"
                  required
                  ref={confirmPasswordRef}
                  placeholder="Confirm Password"
                />
              </div>
            </>
          )}
          <div className="text-red-600 text-base font-semibold mt-[0.5rem]">
            {errorMessage}
          </div>
          <button
            className="h-10 w-full text-white bg-red-500 rounded-[5px] my-[1.2rem] border-none"
            onClick={submitHandler}
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        {isLogin ? (
          <span className="text-white cursor-pointer">
            New to Netflix?{' '}
            <b onClick={() => setIsLogin(false)}>Sign up now.</b>
          </span>
        ) : (
          <span className="text-white cursor-pointer">
            Existing User?{' '}
            <b onClick={() => setIsLogin(true)}>Sign in now.</b>{' '}
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
