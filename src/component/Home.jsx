import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable } from 'firebase/storage';
import ChatPanel from './ChatPanel';

function Home({ setLoggedIn }) {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth)
    setLoggedIn(false)
    navigate('/login');
  }

  const handleProfile = (e) => {
    const img = e.target.files[0];
    // address
    const storageRef = ref(storage, `/profile/${img.name}_${Date.now()}`);
    //storage task
    const uploadTask = uploadBytesResumable(storageRef, img);
  // upload
  const progressCB = (data) => {
    console.log('data: ', data);
  };
  
  const errorCB = (err) => {
    console.log('err: ', err);
  };
  
  const finishedCB = () => {
    console.log("upload successful");
  };
  
  uploadTask.on('state_changed', progressCB, errorCB, finishedCB);
  

  }
  return (
    <>
      {/* <div>Home</div>
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleProfile}
      />
      <button onClick={handleLogout}>Logout</button> */}


      {/* home left side */}
   <ChatPanel></ChatPanel>
      {/* <div>Profile</div> */}

      {/* home right side  */}
      {/* <div>emtey chat</div>
      <div>indivisual chat</div> */}
    </>

  )
}

export default Home