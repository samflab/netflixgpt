import '../styles/home.scss';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/home.scss';
import { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
    <div className={`logo-container ${user ? '' : 'bg-overlay'}`}>
      {user ? (
        <div>
          {' '}
          <img
            src="https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460"
            alt="logo"
            className="h-10 w-10 logo-image"
          />
        </div>
      ) : (
        <img
          src="https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460"
          alt="logo"
          className="h-10 w-10 logo-image"
        />
      )}

      {user ? (
        <div className="user-photo">
          <img src={user.photoURL} />
          <button onClick={signoutHandler}>Sign out</button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
