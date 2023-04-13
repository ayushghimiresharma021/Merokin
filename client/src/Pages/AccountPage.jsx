import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setToken, setUserDetails } from '../State/State'
import { CgProfile } from 'react-icons/cg';
import { MdOutlineMenuBook } from 'react-icons/md';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdPerson } from 'react-icons/io';
import AccountNavbar from '../Scenes/AccountNavbar'
import ProfilePage from '../Scenes/ProfilePage'
import MyAccommadation from './MyAccommadation'
import Bookings from '../Scenes/Bookings'

function AccountPage() {
  let { subpage, action } = useParams()


  if (subpage === undefined) {
    subpage = 'profile'
  }




  return (
    <div>
      <AccountNavbar />
      {
        subpage === 'profile' &&
        <ProfilePage />
      }
      {
        subpage === 'places' && (
          <MyAccommadation />
        )
      }{
        subpage === 'bookings' && (
          <Bookings />
        )
      }


    </div>
  )
}

export default AccountPage
