import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '@/api/firebase'; // Ensure this path is correct

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

function ProfileService() {
  return {
    profile: async () => {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error('No profile found for this user');
      }
    },
  };
}

export default ProfileService();