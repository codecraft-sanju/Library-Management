import React from 'react'
import { Toaster } from 'react-hot-toast'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Attendance from './components/Attedance'
import Register from './page/Register'
import Login from './page/Login'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Attendance />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
      <Toaster/>
      
    </div>
  )
}

export default App
