import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { differenceInCalendarDays } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setBooks, setReservation } from '../../State/State';


function PlaceWidget() {
    const { _id,title, address, photo, description, checkIn, checkOut, extraDescription, maxGuests, price } = useSelector((state) => state.places)
    const [guests, setGuests] = useState(1)
    const [checkin, setCheckin] = useState('')
    const [checkout, setCheckout] = useState('')
    const [Phone,setPhone] = useState('')
    const navigate = useNavigate()
    const user = useSelector((state) =>state.userDetails)
    const dispatch = useDispatch()
 
    let numberOfDays = 0;
    let service = 0
    let totalPriceNights = 0
    let totalAmount = 0
    
    if (checkin && checkout) {
        numberOfDays = differenceInCalendarDays(new Date(checkout), new Date(checkin))
        service = numberOfDays*price*0.13
        totalPriceNights = numberOfDays * price
        totalAmount = totalPriceNights+service
        
    }
    
    const reserveData = async(e) => {
        e.preventDefault() ;
        if (!user){
            navigate('/login') ;
        } 
        try {
            
            const {data} = await axios.post('/bookings/userBookings',{
                place:_id,
                userId:user._id,
                name:user.name,
                email:user.email,
                checkIn:checkin,
                checkout:checkout,
                maxGuests:maxGuests,
                amount:totalAmount,
                mobile:Phone
            })
            console.log(data)
            dispatch(setBooks({bookings:data}))
            dispatch(setReservation({reservation:{numberOfDays,service,totalPriceNights,totalAmount}}))
            navigate('/payment')
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log({ errorRequest: error.request });
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    }
    


    return (
        <div>
            <form onSubmit={(e) => reserveData(e)}>
                <div className='mx-2 my-1'>
                    <div className='py-3 pb-5'>
                        <h1 className='font-semibold text-2xl'>$ {price} night</h1>
                    </div> 
                    <div className='grid grid-cols-2 border border-gray-300  rounded-t-xl'>
                        <div className='border border-gray-300 rounded-tl-xl p-2 '>
                            <h1 style={{ fontSize: '11px', paddingTop: '10px', fontWeight: 'bold' }} >CHECK-IN</h1>
                            <input style={{border:'none',outline:'none'}} value={checkin} onChange={(e) => setCheckin(e.target.value)} type='date' />
                        </div>
                        <div className='border border-gray-300 rounded-tr-xl  p-2 '>
                            <label>
                                <h1 style={{ fontSize: '11px', paddingTop: '10px', fontWeight: 'bold' }} >CHECK-OUT</h1>
                                <input style={{border:'none',outline:'none'}} value={checkout} onChange={(e) => setCheckout(e.target.value)} type='date' />
                            </label>
                        </div>
                    </div>
                    <div className='border border-gray-300 px-2 ' style={{ borderBottomWidth: '2px', borderLeftWidth: '2px', borderRightWidth: '2px' }}>
                        <label>
                            <h1 style={{ fontSize: '11px', paddingTop: '10px', fontWeight: 'bold' }} >GUESTS</h1>
                            <input value={guests} onChange={(e) => {setGuests(e.target.value) }} type='Number' style={{ outline: 'none', border: 'none' }} />
                        </label>
                    </div>
                    <div className='border border-gray-300 rounded-b-xl px-2 ' style={{ borderBottomWidth: '2px', borderLeftWidth: '2px', borderRightWidth: '2px' }}>
                        <label>
                            <h1 style={{ fontSize: '11px', paddingTop: '10px', fontWeight: 'bold' }} >PHONE NUMBER</h1>
                            <input value={Phone} onChange={(e) => {setPhone(e.target.value) }} type='tel' style={{ outline: 'none', border: 'none' }} />
                        </label>
                    </div>
                </div>
                <div className='m-2'>
                    <button type='submit' className='bg-primary text-white rounded-xl w-full font-semibold p-3'>Reserve</button>
                </div>
            </form>
            
            <div className='flex items-center justify-center' >
                <p style={{ fontWeight: 'lighter' }}>You won't charged yet</p>
            </div>
            <div style={{ display: 'flex' }} className='py-2'>
                <p style={{ paddingLeft: '10px', fontWeight: 'bold', flex: '0.9' }} className='underline'>$ {price} <span>x</span> {numberOfDays} nights</p>
                <p className='font-semibold' >{totalPriceNights}</p>
            </div>
            <div style={{ display: 'flex' }} className='py-2'>
                <p style={{ paddingLeft: '10px', fontWeight: 'bold', flex: '0.9' }} className='underline'>Airbnb Service Fee</p>
                <p className='font-semibold' >{service}</p>
            </div>
            <hr class="mt-8 m-4 border-t-2 border-gray-200"></hr>
            <div style={{ display: 'flex' }} className='py-2'>
                <p style={{ paddingLeft: '10px', fontWeight: 'bold', flex: '0.9' }} className='underline'>Total</p>
                <p className='font-semibold' >{totalAmount}</p>
            </div>
        </div>
    )
}

export default PlaceWidget ;
