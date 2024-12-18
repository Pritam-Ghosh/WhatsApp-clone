import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthWrapper({ children }) {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    //check if you have login before ---> for single time login
   const unsubscribe =  onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true)
      if (currentUser) {
        const docRef = doc(db, "users", currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const {profilePhoto, name, email } = docSnap.data();
          console.log("myuser",docSnap.data());
          setUserData({
            id: currentUser.uid,
            profilePhoto, // Make sure you are passing the correct data
            name,
            email
          });
        }
   
        
      }
      setLoading(false)
    })
    return ()=>{
      unsubscribe();
    }
  }, [])
  console.log("currentUser", userData);
  return (
    <AuthContext.Provider value={{ userData, setUserData,loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext