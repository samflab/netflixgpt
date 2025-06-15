import { Provider, useDispatch } from 'react-redux';
import Body from './components/Body';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Browse from './components/Browse';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import { addUser, removeUser } from './utils/userSlice';

export default function App() {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/browse',
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter}>
        <Provider store={appStore}>
          <Body />
        </Provider>
      </RouterProvider>
    </div>
  );
}
