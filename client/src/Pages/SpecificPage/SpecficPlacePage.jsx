import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CgMenuGridO } from 'react-icons/cg';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import PerksPage from './PerksPage';
import PlaceWidget from './PlaceWidget';

function SpecficPlacePage() {
  const { title, address, photo, description, checkIn, checkOut, extraDescription, maxGuests, price } = useSelector((state) => state.places)
  const [showPhotos, setShowPhotos] = useState(false)
  

  if (showPhotos) {
    return (
      <div className='grid place-items-center p-4 absolute inset-0 bg-black min-h-screen'>
        <div style={{ width: '70%', marginLeft: '15px' }} >
          <button style={{ display: 'flex', alignItems: 'center' }} className='rounded-xl p-2 text-sm font-semibold' onClick={() => setShowPhotos(false)}><AiOutlineCloseCircle style={{ fontSize: '25px' }} className='py-1 ' /> Close Photos</button>
        </div>
        {photo.length > 0 && photo.map((p,index) => {

          return (
            <div key={index} style={{backgroundColor:'black'}} className='bg-black grid place-items-center pt-4'>
              <img style={{ display: 'grid', alignItems: 'center', width: '70%', backgroundColor: 'black' }} src={`http://localhost:3001/uploads/${p}`} />
            </div>)

        })}
      </div>
    )
  }
  return (
    <div className='mt-4'>


      <hr class="border-t-2 border-gray-200"></hr>
      <div className=' px-6  text-left mt-5'>
        <h1 className='text-gray-800 font-medium font-custom text-3xl'>{title}</h1>
        <div className=' my-3 flex items-center'>
          <a style={{ flex: 0.9 }} className=' block font-semibold underline' href={`https://www.google.com/maps/search/?api=1&query=${address}`} >{address}</a>
          <div style={{ flex: 0.1, paddingLeft: '10px' }} className='flex items-center underline bg-white font-semibold'>
            <button className='flex items-center pl-3 bg-white' ><AiOutlineShareAlt style={{ fontSize: '18px' }} />Share</button>
            <button className='flex items-center pl-3 bg-white' ><AiOutlineHeart style={{ fontSize: '18px' }} />Save</button>
          </div>





        </div>
        <div >
          {photo[0] &&
            <div className='h-200 py-6 grid grid-cols-2 md:grid-cols-2'>
              <img className='hover:brightness-90 aspect-square object-cover pr-2 rounded-tl-lg rounded-bl-lg' src={`http://localhost:3001/uploads/${photo[0]}`} />
              <div className='grid grid-cols-2'>
                <div className=''>
                  <img className='pr-2 rounded-tr-lg aspect-square object-cover' src={`http://localhost:3001/uploads/${photo[1]}`} />
                  <div className='pr-2 overflow-hidden'>
                    <img className='aspect-square object-cover mt-2' src={`http://localhost:3001/uploads/${photo[2]}`} />
                  </div>
                </div>
                <div>
                  <img className='aspect-square object-cover' src={`http://localhost:3001/uploads/${photo[2]}`} />
                  <div className='overflow-hidden'>
                    <img className='rounded-br-lg aspect-square object-cover relative top-2' src={`http://localhost:3001/uploads/${photo[3]}`} />
                    <button onClick={() => setShowPhotos(true)} style={{ position: 'absolute', bottom: '-180px', right: '50px', backgroundColor: 'white', fontSize: '11px', display: 'flex', alignItems: 'center' }} className=' rounded-xl p-2 text-sm font-semibold'>
                      <CgMenuGridO style={{ fontSize: '25px' }} className='py-1 ' /> Show All Photos</button>
                  </div>
                </div>
              </div>


            </div>

          }
        </div>
        <div className='flex'>
            <div className='pt-3 w-3/5 '>
              <hr class="border-t-2 border-gray-200" />
              <div className='py-6'>
                <img style={{ height: '30px', paddingBottom: '10px' }} src='https://a0.muscache.com/im/pictures/f4a1e0fb-bd06-4f11-91e3-8d3979d3431a.jpg' />
                <p className='text-gray-700' style={{ fontWeight: '400' }}  >Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
              </div>
              <hr class="border-t-2 border-gray-200" />
              <div className='py-6' >
                <h1 style={{ fontSize: '25px', color: 'black' }} className='font-semibold text-gray-800' >Descriptions:</h1>
                <p className='text-gray-700' style={{ fontWeight: '400' }}  >{description}</p>
              </div>
            </div>
            <hr class="border-t-2 border-gray-200"></hr>
            <div className='w-2/5 pt-3 ml-9 p-6  rounded-xl shadow-lg border border-gray-200'>
              <PlaceWidget />
            </div>
        </div>
      </div>
      
      
      <hr class="my-8 mx-4 border-t-2 border-gray-200"></hr>
      {/*perks */}
      <PerksPage />
      
    </div>

  )
}

export default SpecficPlacePage
