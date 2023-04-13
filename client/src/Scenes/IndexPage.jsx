import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSpecificPlaces } from '../State/State';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  const [place,setPlace] = useState([])
  const dispatch = useDispatch()
  const navigate  = useNavigate()


  const specficPlace = (index) => {
    dispatch(setSpecificPlaces({places:place[index]}))
    navigate('/place')
  }

  useEffect(() => {
      axios.get('/place/').then((response) => {
        const {data} = response 
        setPlace([...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data,...data])
        
      })

  },[])
  
  return (
    <div className='grid grid-cols-3  md:grid-cols-2 lg:grid-cols-4 gap-2'>
      {place && place.map(({_id,title,address,photo,checkIn,checkOut,price},index) => {
        return (
          <div style={{overflow:'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap',cursor:'pointer'}} key={index} onClick={ () => specficPlace(index)} className='grid mt-5 p-2 rounded-xl'>
            <div>
              <img style={{height:'200px'}} className='h-30 object-fit rounded-xl' src={`http://localhost:3001/uploads/${photo[0]}`} />
            </div>
            <div className='pt-2' style={{paddingLeft:'2px'}}>
              <h2  className='text-left text-l text-gray-800 font-bold truncate'>{address.toString().slice(0,30)}...</h2>
              <p className='text-left text-sm text-gray-400 truncate'>{title}</p>
              <p className='text-left text-sm text-gray-400'>{checkIn+'-'+checkOut}</p>
              <p className='text-left text-sm text-gray-500'><span className='font-semibold text-black text-lg'>${price}</span> night</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
