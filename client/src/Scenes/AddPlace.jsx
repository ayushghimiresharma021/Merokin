import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BsCloudUpload } from 'react-icons/bs'
import { AiOutlineWifi } from 'react-icons/ai'
import { CiParking1 } from 'react-icons/ci';
import { FiRadio } from 'react-icons/fi';
import { MdPets } from 'react-icons/md'
import { HiOutlineLogout } from 'react-icons/hi';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import Perks from './Perks';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MdDeleteOutline } from 'react-icons/md'
import { AiOutlineStar } from 'react-icons/ai';
import {AiFillStar} from 'react-icons/ai' ;
import AccountNavbar from './AccountNavbar';



function AddPlace() {

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState([])
    const [photoLinks, setPhotoLinks] = useState('')
    const [perks, setPerks] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [extraDescription, setExtraDescription] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price,setPrice] = useState('')
    const navigate = useNavigate()
    

    



    const addPhoto = async (e) => {
        e.preventDefault()
        try {
            const file = await axios.post('/photoLink', { link: photoLinks })
            console.log(file.data)
            setPhoto(prev => {
                return [...prev, file.data]
            })
        }
        catch (error) {
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

    const AddPhotoToServer = async (e) => {
        const fileLocation = e.target.files;

        const data = new FormData()
        for (let i = 0; i < fileLocation.length; i++) {
            data.append('photos', fileLocation[i])
        }

        axios.post('/uploadPhoto', data, {
            headers: { "Content-Type": 'multipart/form-data' }
        }).then((response) => {

            const { data: filenames } = response
            console.log(filenames)
            setPhoto(prev => {
                return [...prev, ...filenames]
            })

        })
    }
    const DeletePhoto = (e, link) => {
        e.preventDefault()
        const newPhoto = photo.filter(p => p !== link);
        setPhoto(newPhoto)
    }


    const saveDetails = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/place/addPlace', {
                title, address, photo, description, perks, checkIn, checkOut, extraDescription, maxGuests,price
            })
            navigate('/account/places')
        } catch (error) {
            console.log(error)
        }
    
    }
    const frontImages = (e,link) => {
        e.preventDefault()
        const newPhoto = photo.filter(photo => photo!==link)
        const newAddedPhotos = [link,...newPhoto]
        setPhoto(newAddedPhotos)
        
    }


    return (
        <div>
            <form onSubmit={saveDetails} className='text-left'>
                {/* it has to be short */}
                <h2 className='p-1 text-xl mt-4'>Title</h2>
                <p className='p-1 text-sm text-gray-300'>Title for your place, Shoould be short and catchy as in advertisement</p>
                <input className='focus:outline-none' value={title} onChange={e => setTitle(e.target.value)} type='text' placeholder='title' />

                {/* it has to be short */}
                <h2 className='p-1 text-xl mt-4'>Address</h2>
                <p className='p-1 text-sm text-gray-300'>Address for your places</p>
                <input className='focus:outline-none' value={address} onChange={e => setAddress(e.target.value)} type='text' placeholder='address' />



                {/* it has to be short */}
                <h2 className='p-1 text-xl mt-4'>Places</h2>
                <p className='p-1 text-sm text-gray-300'>Images for your places</p>
                <div className='flex gap-2 py-2'>
                    <input className='focus:outline-none' value={photoLinks} onChange={e => setPhotoLinks(e.target.value)} type='text' placeholder='Add a photo' />
                    <button onClick={addPhoto} style={{ width: '200px' }} className='w-200 bg-gray-200 font-semibold py-2 px-4 rounded-2xl'>Add photo</button>
                </div>
                <div className='grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6 justify-center'>
                    {photo.length > 0 && (
                        photo.map((link, index) => {
                            return (
                                <div className='relative flex' key={index}>
                                    <img className='w-full border border-dotted border-gray-400 rounded-2xl' src={`http://localhost:3001/uploads/${link}`} />
                                    <button onClick={(e) => DeletePhoto(e, link)} className=' bottom-2 bg-opacity-50 right-2 absolute bg-black text-white p-1 rounded-full'>
                                        <MdDeleteOutline />
                                    </button>

                                    <button onClick={(e) => frontImages(e,link) } className={`bottom-2 left-2 absolute bg-black text-white bg-opacity-50 rounded-full`} >
                                        {link === photo[0] ? 
                                        <AiFillStar />:
                                        <AiOutlineStar />
                                        } 
                                    </button>
                                </div>
                            )
                        })
                    )}
                    <label className='px-10 py-9 flex gap-1 items-center justify-center bg-transparent border border-dotted border-gray-400 rounded-2xl'  >
                        <input type='file' className='hidden' onChange={AddPhotoToServer} />
                        <BsCloudUpload className='mt-2' />Upload
                    </label>
                </div>


                {/* it has to be short */}
                <h2 className='p-1 text-xl mt-4'>Description</h2>
                <p className='p-1 text-sm text-gray-300'>Description of the place </p>
                <textarea className='focus:outline-none' name='' value={description} onChange={e => setDescription(e.target.value)}></textarea>

                <Perks selected={perks} onChange={setPerks} />

                {/* it has to be short */}
                <h2 className='p-1 text-xl mt-4'>Extra Info</h2>
                <p className='p-1 text-sm text-gray-300'>What are the extra things You want</p>
                <textarea className='focus:outline-none' name='' value={extraDescription} onChange={e => setExtraDescription(e.target.value)} />

                <div className='grid grid-cols-3 py-2 gap-2'>
                    <div>
                        <h2 className='ml-1'>Check In Time</h2>
                        <input value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className='focus:outline-none' type='number' />
                    </div>
                    <div>
                        <h2 className='ml-1'>Check Out Time</h2>
                        <input value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className='focus:outline-none' type='number' />
                    </div>
                    <div>
                        <h2 className='ml-1'>Max Guests</h2>
                        <input value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} className='focus:outline-none' type='number' />
                    </div>
                    
                </div>
                <div className='w-full'>
                        <h2 className='ml-1'>Price</h2>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} className='focus:outline-none' type='number' />
                </div>
                <button className='my-4 w-full bg-primary text-white py-2 px-6 rounded-full'>Save</button>
            </form>
        </div>
    )
}

export default AddPlace
