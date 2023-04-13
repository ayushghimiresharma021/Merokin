import React, { useState } from 'react'
import { useEffect } from 'react' ;
import axios from 'axios';
import { Link } from 'react-router-dom';

function MyPlaces() {
    const [places,setPlaces] = useState('')
    useEffect(() =>{
        axios.get('/place/myplace').then(({data}) => {
            console.log(data)
            setPlaces(data);
        })

    },[])
  return (
    <div >
        {places && places.map(({_id,title,address,photo,description,perks,checkIn,checkOut,extraDescription,maxGuests},index) => {
            return (
                <Link key={index} to={'/account/places/updatePlace/'+_id} className='my-4 flex bg-gray-100 gap-3 p-4 rounded-2xl '>
                    <div className='w-32 h-32 bg-gray-300 grow shrink-0'>

                     {photo.length > 0 &&(
                        <img className='w-60 h-32' src={`http://localhost:3001/uploads/${photo[0]}`}/>
                     )}

                    </div>
                    <div className='grid justify-items-start grow'>
                        <h2 className='font-custom text-2xl font-semicolon text-gray-600'>{title}</h2>
                        <p className='text-left text-gray-500'>{description.substring(0,500)}</p>
                    </div>                   
                </Link>
            )
        })}
    </div>
  )
}

export default MyPlaces ;
