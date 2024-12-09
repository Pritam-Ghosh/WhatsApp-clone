import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthWrapper({ children }) {

    const [userData,setUserData] = useState(null);


    useEffect(()=>{
//check if you have login before ---> for single time login
onAuthStateChanged(auth,async (currentUser)=>{
  if (currentUser) {
    const  docRef = doc(db,"users",currentUser?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const {uid,photoURL, displayName ,email} = docSnap.data();
  setUserData({
    id: uid,
    profilePhoto: photoURL, // Make sure you are passing the correct data
    name: displayName,
    email: email
  });
    }

    
  }
})
    },[])
    console.log("currentUser",userData);
  return (
<AuthContext.Provider value={{userData,setUserData}}>
{children}
</AuthContext.Provider>
  )
}

export default  AuthContext