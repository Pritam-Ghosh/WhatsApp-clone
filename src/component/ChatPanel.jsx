import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { CircleFadingPlus, CircleUserRound, MessageSquare, Moon, } from 'lucide-react';
import Profile from './Profile';
import UserCard from './UserCard';

function ChatPanel() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProfile, setShowProfile] = useState(false);



    useEffect(() => {
        const getUsers = async () => {
            // isme collection pass and data milta hai 
            const snapShot = await getDocs(collection(db, 'users'));
            const arrayOfUser = snapShot.docs.map((docs) => ({ ...docs.data(), id: docs.id }));


            setUsers(arrayOfUser);
            setLoading(false);
        };

        getUsers();
    }, []);


    const onBack = () => setShowProfile(false)

    if (showProfile === true) {
        return (
            <>
                {/* //profile component */}
                <Profile onBack={onBack} />


            </>
        )
    }

    return (

<div className='bg-white w-[30vw]'>

        <div className='flex items-center px-4 border-r gap-2 bg-background justify-between '>
            <div className='bg-background py-2'>
                <button onClick={() => setShowProfile(true)}>
                    <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="" className='h-10 rounded-full object-cover ' />
                </button>
            </div>
            <div className='flex gap-4'>
                <Moon />
                <CircleFadingPlus />
                <MessageSquare />
                <CircleUserRound />
            </div>
        </div>

        {loading ? <div>loading...</div> :
            /* chatlist */
            <div className='flex flex-col gap-3 '>
                {users.map((userObject) => (
                    <UserCard key={userObject.id} userObject={userObject}></UserCard>
                ))}
            </div>
        }


</div>

    )
}

export default ChatPanel