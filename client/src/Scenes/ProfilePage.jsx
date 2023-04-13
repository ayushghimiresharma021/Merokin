import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setToken, setUserDetails } from '../State/State'


function ProfilePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.userDetails)
    const token = useSelector((state) => state.token)
    
    const logout = async() => {
        await axios.get('/user/logout')
        dispatch(setToken({token:null}))
        dispatch(setUserDetails({user:null}))
        navigate('/')
    }
    

  return (
      <div className='text-center max-w-lg mx-auto mt-8 gap-4'>
            <p className='font-normal text-l p-4'>Logged in as {user?.name} ({user?.email})</p>
            <button className='w-full p-2 bg-primary rounded-full text-white' onClick={logout}>Log Out</button>
      </div>
  )
}

export default ProfilePage ;
