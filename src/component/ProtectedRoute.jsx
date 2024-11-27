import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({isLoggedIn,children}){
  if(isLoggedIn){
    
      return children
    }
    if(isLoggedIn == false){
      return <Navigate to='/login'></Navigate>
}
}
export default ProtectedRoute


