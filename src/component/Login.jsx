import { Fingerprint, LogIn as LoginIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
//auth--->
import {auth,googleProvider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'
import { db } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useAuth } from './AuthContext'

//getting data
const createUser = async (userData) => {
 
  const userObject =userData.user
     //also correct---> 
  // const id = userObject.uid
  // const uName = userObject.displayName;
  // const email = userObject.email;
  // const profilePhoto = userObject.photoURL
  // console.log(id,uName,email,profilePhoto);

//shorter version-->
  const {uid,photoURL, displayName ,email} = userObject;
  const date = new Date();
  const timeStamp = date.toLocaleString("en-US",{
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  //create user
  await setDoc(doc(db,"users", uid), {
    email,
    profilePhoto:photoURL,
    name:displayName,
    lastSeen: timeStamp,
  })
  console.log("User Added");
  
}

// function Login({ setLoggedIn }) {
  function Login(){

  const navigate = useNavigate();
  // //use
  // const {setUserData,userData} = useAuth();

  // if(userData != null){
  //   navigate("/")
  //   return<> </>
    
  // }
  const handleLogin = async() => {
    const userData = await signInWithPopup(auth, googleProvider);
    console.log('User Info:', userData.user); // User information
    await createUser(userData); //getting data

    //saving data
     
  // const userObject =userData.user
  // const {uid,photoURL, displayName ,email} = userObject;
  // setUserData({
  //   id: uid,
  //   profilePhoto: photoURL, // Make sure you are passing the correct data
  //   name: displayName,
  //   email: email
  // });
    // setLoggedIn(true)
    navigate('/');
  }

  return (
    <>
      <div className='bg-[#04a784] h-[200px] '>

        <div className='flex ml-[200px] pt-6 items-center gap-4 font-medium'>
          <img src="https://whatsapp-clone-826a9.web.app/whatsapp.svg" alt="" className='h-8' />
          <div className=' text-white '>WHATSAPP</div>
        </div>
      </div>


      <div className='bg-[#eff2f5] h-[calc(100vh-200px)] flex items-center justify-center relative'>
        <div className='bg-white shadow-2xl h-[500px] w-[75%] absolute top-[-30%] flex flex-col gap-4 items-center justify-center rounded-[2px]'>
          <div className='text-[20px] font-medium'>Sign in</div>
          <div> <Fingerprint className='h-20 w-20 text-[#04a784]' strokeWidth={1.5} /></div>
          <div className='text-gray-500 font-thin'>Sign in with your google account to get started.</div>
          <button
            className='bg-[#04a784] p-3 text-white font-medium rounded-[6px] flex items-center gap-2'
            onClick={handleLogin}>
            Sign in with Google
            <span><LoginIcon /></span>
          </button>

        </div>
      </div>

    </>
  )
}

export default Login