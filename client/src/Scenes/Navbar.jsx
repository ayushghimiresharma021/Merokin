import React, { useEffect } from 'react' ;
import {CiSearch} from 'react-icons/ci' ;
import {AiOutlineMenu} from 'react-icons/ai' ;
import {FaUserCircle} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BrandPage from './BrandPage';




const Navbar = function() {
  const user = useSelector(state => state.userDetails)
  const dispatch = useSelector(state => state.dis)
 


  return (
    <nav className='flex justify-between items-center  flex-row flex-wrap md:flex-nowrap'>
      <BrandPage />
      <div className='flex items-center justify-evenly  border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300' >
        <div className='px-5 text-sm font-medium'>Anywhere </div>
        <div className='text-gray-300'>|</div>
        <div className='px-5 text-sm font-medium'>Any week </div>
        <div className='text-gray-300'>|</div>
        <div className='px-5 text-sm font-medium'>Add Guests </div>
        <button className='bg-primary hover:bg-primary text-white font-bold py-1 px-2 border border-primary rounded-full'><CiSearch/></button>
      </div>
      <div className='flex items-center justify-end gap-4 border border-gray-300 rounded-full py-2 px-4'>
        <AiOutlineMenu />
        <Link to={user?'/account':'/login'} className='flex items-center gap-2'>
          
          <FaUserCircle />
            {user?.name && (
              <div>{user.name}</div>
            )}

        </Link>
        
        
      </div>
    </nav>
    
  )
  }

export default Navbar ;
