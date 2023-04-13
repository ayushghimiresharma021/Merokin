import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import PlaceImg from './PlaceImg'
import axios from 'axios'
import { differenceInCalendarDays, format } from 'date-fns'
import {BsCalendar} from 'react-icons/bs'
import {MdOutlineModeNight} from 'react-icons/md'  ;
import {BsWallet} from 'react-icons/bs' 

function Bookings() {
  const user = useSelector((state) => state.userDetails)
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    axios.get('/bookings/getBookings').then(response => {
      console.log(response)
      console.log(response.data)
      setBookings(response.data)
    })
  }, [])


  return (
    <div className='px-3 py-10'>
      {bookings.map(booking => {
        return (
          <div className='flex gap-4 bg-gray-200  rounded-2xl overflow-hidden'>
            <PlaceImg className={'w-48'} place={booking.place} />
            <div className='p-3'>
              <h1 className='text-l font-semibold' >{booking.place.title}</h1>
              <div className='border-t border-gray-300 mt-3 py-2 flex items-center text-sm text-gray-600'>
                  <div className='flex items-center mr-2'><MdOutlineModeNight className='mr-1'/>{`${differenceInCalendarDays(new Date(booking.checkout), new Date(booking.checkIn))} nights`} </div> | 
                  <div className='pl-2 flex items-center'> <BsCalendar className='mx-2' /> {` ${format(new Date(booking.checkIn), 'yyyy-MM-dd')} ->`} <BsCalendar className='mx-2' /> {`${format(new Date(booking.checkout), 'yyyy-MM-dd')}`}</div>
              </div>
              <div className='flex items-center text-l'>
                <BsWallet className='mr-1' />
                <div className=''>{`Total Amount : ${booking.place.price}`}</div>
              </div>
              
                
              
              
              
            </div>
          </div>

        )
      })}
    </div>
  )
}

export default Bookings
