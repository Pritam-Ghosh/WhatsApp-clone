import { Route, Routes } from 'react-router-dom'
import Login from './component/Login'
import Chat from './component/Chat'
import Home from './component/Home'
import Profile from './component/Profile'
import PageNotFound from './component/PageNotFound'
function App() {


  return (
    <>
<Routes>
  <Route path='/' element={<Home/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
  <Route path='Chat/:uniqueChat' element={<Chat/>}/>
  <Route path='/profile' element={<Profile></Profile>}/>
  <Route path='*' element={<PageNotFound/>}/>
</Routes>
    </>
  )
}

export default App
