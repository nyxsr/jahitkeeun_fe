import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar, { NavApp } from './components/Navbar/Navbar'
import Root from './pages/Authorized/Root'
import Landing from './pages/Landing/Landing'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

function App() {
  // useEffect(()=>{
  //   window.addEventListener('beforeunload', handleunload)
  //   return ()=>{
  //     window.removeEventListener('beforeunload', handleunload)
  //   }
  // },[])

  // const handleunload = (e) =>{
  //   localStorage.setItem('isAuthSelected',0)
  // }
  return (
    <>
    <BrowserRouter>
   <Navbar/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/app/*' element={<Root/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
