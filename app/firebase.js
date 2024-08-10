import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  // Add your Firebase configuration here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error('Email or Password is incorrect');
  }
}

export async function register(firstname, lastname, email, password, role) {
  try {

    // Validate role
    if (role !=='Homeowner' && role !== 'Attorney') {
      throw new Error('Invalid role. Must be either "homeowner" or "attorney".');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName: firstname,
      lastName: lastname,
      email: email,
      role: role,
      createdAt: new Date().toISOString()
    });
    
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Registration failed' + error.message);
  }
}

export async function forgotPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return "We've sent you a link to reset password to your registered email.";
  } catch (error) {
    throw new Error('Sorry, we could not find any registered user with entered email');
  }
}