import React from 'react'

function PlaceImg({className,place}) {
  return (
    <div>
      <img className={className} src={`http://localhost:3001/uploads/${place.photo[0]}`} />
    </div>
  )
}

export default PlaceImg
