import React from 'react'
import Navbar from '../Scenes/Navbar'
import { Outlet } from 'react-router'

const  Homepage = function() {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default Homepage
