import React, { useContext, useState } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthWrapper({ children }) {

    const [userData,setUserData] = useState(null);
    
  return (
<AuthContext.Provider value={{userData,setUserData}}>
{children}
</AuthContext.Provider>
  )
}

export default  AuthContext