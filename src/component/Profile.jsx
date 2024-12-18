import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useAuth } from './AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

function Profile(props) {
  const navigate = useNavigate();
  //getiing data
  const { userData } = useAuth()

  const handleLogout = () =>{
    signOut(auth)
    navigate("/login")
  }
  return (
<div className='bg-white w-[30vw]' >
      <div className="flex bg-[#04a784] items-center ">
        <button onClick={props.onBack} className="p-2">
          <ArrowLeft className='text-white' />

        </button>
        <div>Profile</div>

      </div>
      <div>
          <div><img src={userData.profilePhoto} alt="" className='h-10 w-10 rounded-full' /> </div>
          <p>{userData.name}</p>
          <p>{userData.email}</p>
          {/* <div>Status: {userData.status}</div> */}
<button onClick={handleLogout} className='bg-primary p-2 rounded-md '>Logout</button>
        </div>
        </div>
  )
}

export default Profile