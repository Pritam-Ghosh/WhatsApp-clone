import { ArrowLeft, Check, Edit2Icon, Loader2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Profile(props) {
  const navigate = useNavigate();
  // Getting data
  const { userData, handleUpdateName, handleUpdateStatus, updatePhoto, isUploading, error } = useAuth();

  const [name, setName] = useState(userData?.name || "");
  const [status, setStatus] = useState(userData?.status || "");

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="bg-background w-[33.3vw]">
      <div className="flex bg-primary text-white items-center">
        <button onClick={props.onBack} className="p-2">
          <ArrowLeft className="text-white" />
        </button>
        <div>Profile</div>
      </div>

      <div className="flex flex-col gap-8 mt-8 items-center justify-center">
        <label className={`group relative rounded-full overflow-hidden cursor-pointer ${isUploading ? "pointer-events-none" : ""}`}>
          <img src={userData.profilePhoto} alt="Profile" className="h-[160px] w-[160px] object-cover" />

          {isUploading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
              <Loader2Icon className="w-6 h-6 text-primary-dense animate-spin z-10" />
            </div>
          ) : (
            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/30 z-10">
              <Edit2Icon className="w-6 h-6 text-primary-dense z-10" />
            </div>
          )}
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > 2 * 1024 * 1024) { // 2 MB limit
                  alert("File size should be less than 2MB.");
                  return;
                }
                updatePhoto(file);
              }
            }}
            className="hidden"
          />
        </label>

        {error && <h2 className="text-red-500">{error}</h2>}

        {/* Name */}
        <div className="flex flex-col bg-white w-full py-4 px-8">
          <label htmlFor="" className="text-sm text-primary-dense mb-2">Your name</label>
          <input
            type="text"
            value={name}
            className="w-full bg-transparent"
            placeholder="update name..."
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => { handleUpdateName(name) }} className="p-2">
            <Check className="w-5 h-5" />
          </button>
        </div>

        {/* Status */}
        <div className="flex flex-col bg-white w-full py-4 px-8">
          <label htmlFor="" className="text-sm text-primary-dense mb-2">Status</label>
          <input
            type="text"
            value={status}
            className="w-full bg-transparent"
            placeholder="Update status..."
            onChange={(e) => setStatus(e.target.value)}
          />
          <button onClick={() => handleUpdateStatus(status)} className="p-2">
            <Check className="w-5 h-5" />
          </button>
        </div>

        <button onClick={handleLogout} className="bg-primary p-2 rounded-md text-white">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
