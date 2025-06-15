export const formValidation = (
  email,
  password,
  name = '',
  confirmPassword = '',
  isLogin
) => {
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );

  if (!isEmailValid) {
    return 'Not a valid email';
  }
  if (!isPasswordValid) {
    return 'Not a valid password';
  }

  if (!isLogin && !name) {
    return 'Name cannot be blank';
  }

  if (!isLogin && confirmPassword !== password) {
    return 'Passwords are not same';
  }

  return null;
};
