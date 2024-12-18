import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { Loader } from 'lucide-react';

function ProtectedRoute({isLoggedIn,children}){
  const {userData,loading} = useAuth();

if (loading) {
  return  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="mb-6">
        <img src="https://firebasestorage.googleapis.com/v0/b/wa-clone-6c198.firebasestorage.app/o/whatsapp-512.png?alt=media&token=52d5a294-8551-48f9-84ce-7dacd7314031" alt="WhatsApp Logo" className="w-24 h-24" />
      </div>
      <h1 className="text-2xl font-bold">WhatsApp</h1>
      <Loader className='mt-6 animate-spin'/>
      
      <div className="mt-6">
      
        <span className="text-gray-400">🔒 encrypted by firebase</span>
      </div>
    </div>
}

  if(userData){
    
      return children
    }
    else{
      return <Navigate to='/login'></Navigate>
}
}
export default ProtectedRoute


