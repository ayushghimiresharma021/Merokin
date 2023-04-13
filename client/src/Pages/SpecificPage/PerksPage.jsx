import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CgMenuGridO } from 'react-icons/cg' ;
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import {AiOutlineWifi} from 'react-icons/ai';
import {CiParking1} from 'react-icons/ci' ;
import {MdOutlinePets} from 'react-icons/md' ;
import {GiCryptEntrance} from 'react-icons/gi' ;
import {RiComputerLine} from 'react-icons/ri' ;

function PerksPage() {
    const {perks} = useSelector((state) => state.places)

  return (
    <div className='mx-4'> 
        <h1 style={{ fontSize: '25px', color: 'black' }} className='font-semibold text-gray-800' >What this Place Offer</h1>
        <div className='m-2 grid justify-contents-center grid-cols-6 '>
          {perks && perks.map( (perk,index) => {
            return( 
              <div key={index} style={{boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.2)'}} className='flex m-3 p-3 items-center border border-gray-300 rounded-xl'>
                {perk==='wifi' && 
                    <>
                      <AiOutlineWifi className='m-2' style={{fontSize:'22px',color:'black' }}  />
                      <p style={{fontWeight:'600'}} >Wifi</p>
                    </>
                }
                {perk==='parking' && 
                    <>
                      <CiParking1 className='m-2' style={{fontSize:'22px',color:'black' }}  />
                      <p style={{fontWeight:'600'}} className='truncate'>Free Parking</p>
                    </>
                }
                {perk==='pets' && 
                    <>
                      <MdOutlinePets className='m-2' style={{fontSize:'22px',color:'black' }}  />
                      <p style={{fontWeight:'600'}}>Pets</p>
                    </>
                }
                {perk==='entrance' && 
                    <>
                      <GiCryptEntrance className='m-2' style={{fontSize:'22px',color:'black' }}  />
                      <p style={{fontWeight:'600'}}>Entrace</p>
                    </>
                }
                {perk==='radio' && 
                    <>
                      <GiCryptEntrance className='m-2' style={{fontSize:'22px',color:'black' }}  />
                      <p style={{fontWeight:'600'}}>Radio</p>
                    </>
                }

                {perk==='tv' && 
                    <>
                      <RiComputerLine className='m-2' style={{fontSize:'22px',color:'black' }}  />
                      <p style={{fontWeight:'600'}}>TV</p>
                    </>
                }

              </div>
            )
          })}
        </div>
      </div>
  )
}

export default PerksPage
