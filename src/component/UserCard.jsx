import React from 'react'
import { Link, useParams } from 'react-router-dom'

function UserCard(props) {
    const {userObject} = props;
    const params = useParams();
    const isActive = params?.chatid ===userObject.id;
    return (
        <div>
            <Link key={userObject.id} className={`flex gap-4 items-center  p-2 rounded cursor-pointer ${isActive && "bg-background"}`} to={`/${userObject.id}`}>
                <div><img src={userObject.profilePhoto} alt="" className='h-12 w-12 object-cover rounded-full' /> </div>
                <p>{userObject.name}</p>
            </Link>
        </div>
    )
}

export default UserCard
