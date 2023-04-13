import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {BsCloudUpload} from 'react-icons/bs'
import {AiOutlineWifi} from 'react-icons/ai'
import {CiParking1} from 'react-icons/ci' ;
import {FiRadio} from 'react-icons/fi' ;
import {MdPets} from 'react-icons/md' 
import {HiOutlineLogout} from 'react-icons/hi' ;
import {HiOutlineDesktopComputer} from 'react-icons/hi' ;
import Perks from '../Scenes/Perks';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AddPlace from '../Scenes/AddPlace';
import MyPlacesClient from '../Scenes/MyPlacesClient';
import MyPlaces from '../Scenes/MyPlacesClient';



function PlacePage() {
    const {action} = useParams() ;
    const user = useSelector((state) => state.userDetails)
    const navigate = useNavigate()
    useEffect(() => {
      if (!user) {
        navigate('/login')
      }
    })
    

    
  return (
    
    <>
      
      <div className='text-center mt-6'>
              <MyPlaces />
              <Link className={'bg-primary text-white py-2 px-6 rounded-full '} to='/account/places/NewPlaces'>+ Add new places</Link>
      </div>
      
      

    </>
  )
  
}

export default PlacePage
