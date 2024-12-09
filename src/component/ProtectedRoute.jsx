import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

function ProtectedRoute({isLoggedIn,children}){
  const {userData} = useAuth();
  if(userData){
    
      return children
    }
    else{
      return <Navigate to='/login'></Navigate>
}
}
export default ProtectedRoute


