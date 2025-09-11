import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, []);

  const signoutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div
      className={`logo-container flex flex-row justify-between overflow-hidden 
              ${user ? '' : 'absolute inset-0 bg-black/40 h-full w-full'}`}
    >
      <div>
        <img
          src={LOGO}
          alt="logo"
          className={`h-12 w-auto m-4 ${user ? '' : 'absolute'}`}
        />
      </div>

      {user ? (
        <div className="flex items-center gap-4 pr-4">
          <img
            src={user.photoURL}
            className="h-12 w-12 object-cover rounded-full"
          />
          <button
            onClick={signoutHandler}
            className="border-none bg-transparent underline text-base cursor-pointer"
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
