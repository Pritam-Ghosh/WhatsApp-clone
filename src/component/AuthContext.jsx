import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth, db, storage } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthWrapper({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const { profilePhoto, name, email, lastSeen, status } = docSnap.data();
          await setLastSeen(currentUser);
          setUserData({
            id: currentUser.uid,
            profilePhoto,
            name,
            email,
            lastSeen,
            status: status || "",
          });
        }
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const setLastSeen = async (user) => {
    const date = new Date();
    const timeStamp = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      day: '2-digit',
      month: 'short'
    });
    await updateDoc(doc(db, 'users', user.uid), {
      lastSeen: timeStamp,
    });
  };

  const handleUpdateName = async (newName) => {
    await updateDoc(doc(db, 'users', userData.id), {
      name: newName,
    });
  };

  const handleUpdateStatus = async (newStatus) => {
    await updateDoc(doc(db, 'users', userData.id), {
      status: newStatus,
    });
  };

  const updatePhoto = async (img) => {
    const storageRef = ref(storage, `profile/${userData.id}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      () => {
        setIsUploading(true);
        setError(null);
      },
      () => {
        setError("Unable to upload!");
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "users", userData.id), {
            profilePhoto: downloadURL,
          });
          setUserData({
            ...userData,
            profilePhoto: downloadURL,
          });
          setIsUploading(false);
          setError(null);
        });
      }
    );
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        loading,
        handleUpdateName,
        handleUpdateStatus,
        updatePhoto,
        isUploading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
