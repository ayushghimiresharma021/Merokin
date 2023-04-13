import React from 'react'
import { Link } from 'react-router-dom'

function BrandPage() {
  return (
    <div>
      <Link to={'/'} className='m-0'>
        <img className='h-8 pl-6  ' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png'} />  
      </Link>
    </div>
  )
}

export default BrandPage
