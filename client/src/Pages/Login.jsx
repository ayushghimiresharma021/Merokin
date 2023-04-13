import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' ;
import { setToken, setUserDetails } from '../State/State';
import {useDispatch} from 'react-redux'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginUser = async(e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post('/user/login',{email,password},{withCredentials: true})
      alert('Login Success')
      dispatch(setUserDetails({user:data.user}))
      dispatch(setToken({token:data.token}))
      navigate('/')
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log({errorRequest:error.request});
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }


  return (
    <div className='mt-3 grow flex items-center justify-around'>
      <div className='mb-32'>
        <h1 className='text-4xl text-center mb-5 font-sana '>Login</h1>
        <form onSubmit={loginUser} className='max-w-md  mx-auto'>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type='text'
            placeholder='youremail@email.com' />

          <input
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            type='password' 
            placeholder='password' />
          <button className='primary'>Login</button>
        </form>
        <div className='text-center p-1'>Don't have an account ?
          <Link className='underline text-black' to={'/register'}>Create Here</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
