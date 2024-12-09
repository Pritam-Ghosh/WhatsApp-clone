import React from 'react'
import { Link } from 'react-router-dom'

function UserCard({ userObject }) {
    return (
        <div>
            <Link key={userObject.id} className='flex gap-2 border-2' to={`/${userObject.id}`}>
                <div><img src={userObject.profilePhoto} alt="" className='h-10 w-10 rounded-full' /> </div>
                <p>{userObject.name}</p>
            </Link>
        </div>
    )
}

export default UserCard
