import { login, register, forgotPassword } from '../../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../../firebase';

const auth = getAuth(firebaseApp);

function AuthService() {
  return {
    login: async (values) => {
      try {
        const user = await login(values.email, values.password);
        return user;
      } catch (error) {
        throw new Error('Login failed: ' + error.message);
      }
    },

    logout: async () => {
      try {
        await signOut(auth);
      } catch (error) {
        throw new Error('Logout failed: ' + error.message);
      }
    },

    register: async (values) => {
      try {
        const user = await register(values.firstname, values.lastname, values.email, values.password, values.role);
        return user;
      } catch (error) {
        throw new Error('Registration failed: ' + error.message);
      }
    },

    forgetPassword: async (values) => {
      try {
        const message = await forgotPassword(values.email);
        return message;
      } catch (error) {
        throw new Error('Password reset failed: ' + error.message);
      }
    },
  };
}

export default AuthService();