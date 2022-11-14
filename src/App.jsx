import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Landing from './pages/Landing/Landing'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
