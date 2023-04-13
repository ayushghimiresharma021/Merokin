import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setToken, setUserDetails } from '../State/State'
import {CgProfile} from 'react-icons/cg' ;
import {MdOutlineMenuBook} from 'react-icons/md' ;
import {BsFillHouseDoorFill} from 'react-icons/bs' ;
import {AiOutlinePlus} from 'react-icons/ai' ;
import {IoMdPerson} from 'react-icons/io' ;

function AccountNavbar({}) {
    let {subpage,action} = useParams()
    function linkClasses(type=null){
        

        let classes = 'flex items-center justify-evenly content-evenly gap-1 py-2 px-6 rounded-full font-medium text-sm ';
        if (type === subpage) {
          classes += ' bg-primary text-white';
        } else {
          classes += ' bg-gray-100';
        }
        return classes;
    }
  return (
    <nav className='w-full flex justify-center mt-8 gap-4'>
        <Link className={linkClasses('profile')}  to='/account'><IoMdPerson className='mt-1' /> <p>My Profile</p></Link>
        <Link className={linkClasses('bookings')} to='/account/bookings' ><MdOutlineMenuBook /> <p>My bookings</p></Link>
        <Link className={linkClasses('places')}   to='/account/places'><BsFillHouseDoorFill /> <p>My Accommodations</p></Link>
    </nav>
  )
}

export default AccountNavbar
