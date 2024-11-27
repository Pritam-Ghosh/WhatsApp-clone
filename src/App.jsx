import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './component/Login'
import Chat from './component/Chat'
import Home from './component/Home'
import Profile from './component/Profile'
import PageNotFound from './component/PageNotFound'
import { useState } from 'react'
import ProtectedRoute from './component/ProtectedRoute'




function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);


  return (
    <>
      {/* <h1>My App</h1> */}
      <Routes>
        <Route path='/' element={
          // <ProtectedRoute isLoggedIn={isLoggedIn}>
          <Home setLoggedIn={setLoggedIn}></Home>
          //</ProtectedRoute>
          }>
          </Route>
        <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />}></Route>
        <Route path='Chat/:uniqueChat' element={<Chat />} />
        <Route path='/profile' element={<Profile></Profile>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App


