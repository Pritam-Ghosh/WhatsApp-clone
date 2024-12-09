import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useAuth } from './AuthContext'

function Profile(props) {
  //getiing data
  const { userData } = useAuth()
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

        </div>
        </div>
  )
}

export default Profile