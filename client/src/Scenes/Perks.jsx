import React from 'react' ;
import {AiOutlineWifi} from 'react-icons/ai'
import {CiParking1} from 'react-icons/ci' ;
import {FiRadio} from 'react-icons/fi' ;
import {MdPets} from 'react-icons/md' 
import {HiOutlineLogout} from 'react-icons/hi' ;
import {HiOutlineDesktopComputer} from 'react-icons/hi' ;

function Perks({selected,onChange}) {
    
    const handleSubmit = async(e) => {
        const {checked,name} = e.target 
        console.log(name)
        if (checked){
            onChange([...selected,name])
        }
        else{
            onChange([...selected.filter(selectedName => selectedName!==name)])
        }
        console.log(selected)

        

    }
  return (
    <div>
        <h2 className='p-1 text-xl mt-4'>Perks</h2>
                        <p className='p-1 text-sm text-gray-300'>Select all the perks for your place</p>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 '>
                            <label className='flex items-center gap-1 border p-4 rounded-xl text-sm'>
                                <input checked={selected.includes('wifi')} type='checkbox' name='wifi' onChange={handleSubmit}  />
                                <AiOutlineWifi className='text-lg' />
                                <span>Wifi</span>
                            </label>
                            <label className='flex items-center gap-1 border p-4 rounded-xl text-sm'>
                                <input checked={selected.includes('parking')} type='checkbox' name='parking' onChange={handleSubmit} />
                                <CiParking1 className='text-lg' />
                                <span>Free Parking space</span>
                            </label>
                            <label className='flex items-center gap-1 border p-4 rounded-xl text-sm'>
                                <input checked={selected.includes('tv')} type='checkbox' name='tv' onChange={handleSubmit} />
                                <HiOutlineDesktopComputer className='text-lg' />
                                <span>TV</span>
                            </label>
                            <label className='flex items-center gap-1 border p-4 rounded-xl text-sm'>
                                <input checked={selected.includes('entrance')} type='checkbox' name='entrance' onChange={handleSubmit} />
                                <HiOutlineLogout className='text-lg' />
                                <span>Private Entrace</span>
                            </label>
                            <label className='flex items-center gap-1 border p-4 rounded-xl text-sm'>
                                <input checked={selected.includes('pets')} type='checkbox' name='pets' onChange={handleSubmit} />
                                <MdPets className='text-lg' />
                                <span>Pets</span>
                            </label>
                            <label className='flex items-center gap-1 border p-4 rounded-xl text-sm'>
                                <input checked={selected.includes('radio')} type='checkbox' name='radio' onChange={handleSubmit} />
                                <FiRadio className='text-lg' />
                                <span>Radio</span>
                            </label>
                        </div>
    </div>
  )
}

export default Perks
