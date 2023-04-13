import React, { useState } from 'react'
import { Link } from 'react-router-dom' ;
import axios from 'axios' ;


function Register() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  
  const registerUser = async(e) => {
    e.preventDefault()
    try {
      await axios.post('/user/register', {
        name,email,password
      })
      alert('Your email has been registered')
    } catch (error) {
      alert('An error has occurred') ;
    }
    setEmail('')
    setPassword('')

  }


  return (
    <div className='mt-3 grow flex items-center justify-around'>
      <div className='mb-32'>
        <h1  className='text-4xl text-center mb-5 font-sana '>Register</h1>
        <form onSubmit={registerUser} className='max-w-md  mx-auto'>
          <input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            type='text' placeholder='Name'/>
          <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            type='email' placeholder='email@email.com' />
          <input 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            type='password' placeholder='password'/>
          <button className='primary'>Register</button>
        </form>
        <div className='text-center p-1'>Already have an account ?
          <Link className='underline text-black' to={'/login'}>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
