import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { firebaseApp } from '@/api/firebase'; // Ensure this path is correct

const auth = getAuth(firebaseApp);

function AuthService() {
  return {
    login: async (values) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        return userCredential.user;
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
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        return userCredential.user;
      } catch (error) {
        throw new Error('Registration failed: ' + error.message);
      }
    },

    forgetPassword: async (values) => {
      try {
        await sendPasswordResetEmail(auth, values.email);
        return "Password reset email sent successfully";
      } catch (error) {
        throw new Error('Password reset failed: ' + error.message);
      }
    },
  };
}

export default AuthService();