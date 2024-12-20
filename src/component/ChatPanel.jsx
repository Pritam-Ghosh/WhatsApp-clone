import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { CircleFadingPlus, CircleUserRound, MessageSquare, Moon, SearchIcon } from 'lucide-react';
import Profile from './Profile';
import UserCard from './UserCard';
import { useAuth } from './AuthContext';

function ChatPanel() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { userData } = useAuth();

    useEffect(() => {
        const getUsers = async () => {
            const snapShot = await getDocs(collection(db, 'users'));
            const arrayOfUser = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUsers(arrayOfUser);
            setLoading(false);
        };
        getUsers();
    }, []);

    const onBack = () => setShowProfile(false);

    if (showProfile) {
        return <Profile onBack={onBack} />;
    }

    // Filter users based on search query
    const filteredUsers = users.filter((user) =>
        user.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white w-full max-w-[400px] h-screen border-r shadow-md flex flex-col">
            {/* Topbar */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-100">
                <button onClick={() => setShowProfile(true)}>
                    <img
                        src={
                            userData?.profilePhoto ||
                            'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
                        }
                        alt="profile"
                        className="h-10 w-10 rounded-full object-cover border"
                    />
                </button>
                <div className="flex gap-4 text-gray-600">
                    {/* <Moon className="cursor-pointer hover:text-gray-900" /> */}
                    <CircleFadingPlus className="cursor-pointer hover:text-gray-900" />
                    <MessageSquare className="cursor-pointer hover:text-gray-900" />
                    <CircleUserRound className="cursor-pointer hover:text-gray-900" />
                </div>
            </div>

            {/* Loading Skeleton */}
            {loading ? (
                <div className="p-4 flex-1 flex flex-col justify-center items-center">
                    <div className="animate-pulse w-full max-w-xs">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                            <div className="flex-1 h-4 bg-gray-300 rounded"></div>
                        </div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
            ) : (
                /* Chat List */
                <div className='bg-white py-2 px-3 overflow-y-scroll '>
                    <div className='bg-background flex items-center gap-4 px-3 py-2 rounded-lg mb-2'>
                        <SearchIcon className='w-4 h-4' />
                        <input
                            type="text"
                            className='bg-background focus-within:outline-none'
                            placeholder='Search'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y">
                        {filteredUsers.map((userObject) => (
                            <UserCard key={userObject.id} userObject={userObject} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatPanel;
