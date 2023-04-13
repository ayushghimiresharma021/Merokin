import React, { useState } from "react";
import BrandPage from "../../Scenes/BrandPage";
import { IoIosArrowBack } from 'react-icons/io';
import {loadStripe} from '@stripe/stripe-js';
import { useSelector } from "react-redux";
import axios from "axios";
import PaymentFormdata from "./Formdata";

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        cardNumber: "",
        cardHolderName: "",
        expiryDate: "",
        cvv: "",
        billingAddress: "",
        billingCity: "",
        billingState: "",
        billingZip: "",
    });
    const place = useSelector((state) => state.places)
    const {amount} = useSelector((state) => state.bookings)
    const {email} = useSelector((state) => state.userDetails)
    const {numberOfDays,service,totalPriceNights,totalAmount} = useSelector((state) => state.reserve)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post('/create-checkout-session',{...formData,amount,email})
            const {data} = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="m-3">
            <div className="m-4 my-6 ">
                <BrandPage />
            </div>

            <hr class="my-7 border-t-2 border-gray-200"></hr>
            <div style={{ margin: '50px 70px' }} >
                <div style={{ display: 'flex', alignItems: 'center' }} >
                    <IoIosArrowBack style={{ fontWeight: 'normal' }} />
                    <div style={{ fontSize: '32px', padding: '32px ', fontWeight: 'bolder' }}>Request to Book</div>
                </div>

                {/*your trip*/}
                <div className="grid grid-cols-2 gap-9">
                    <div className="justify-self-start py-2">
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Your Trip</div>
                        <div className="py-4">
                            <div className="py-2 " style={{ display: 'grid', padding: 'py-3' }} >
                                <p className="font-semibold" >Dates</p>
                                <p>April 10-15</p>
                            </div>
                            <div className="py-2" style={{ display: 'grid', padding: 'py-3' }} >
                                <p className="font-semibold">Guests</p>
                                <p>1</p>
                            </div>
                        </div>
                        <hr class="my-7 border-t-2 border-gray-200"></hr>
                        <div className="pb-7" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                            <div  style={{ fontSize: '20px', fontWeight: 'bold' }}>Pay With</div>
                            <img src="https://robinsonwaste.com/wp-content/uploads/2017/12/mastercard-visa-amex.jpg" style={{height:'25px'}} />
                        </div>
                        <PaymentFormdata />
                    </div>

                    {/* grid-cols-2 */}

                    <div className="border border-gray-300 rounded-xl p-5">
                        <div className="flex justify-space">
                            <div className="w-2/5" >
                                <img className="rounded-xl" src={`http://localhost:3001/uploads/${place.photo[0]}`} />
                            </div>
                            <div className="px-2">
                                <h1 style={{fontSize:'18px'}}>{place.title}</h1>
                                <p  style={{fontSize:'12px',fontWeight:'300'}}>{place.address}</p>
                            </div>
                        </div>
                        <hr class="my-7 border-t-2 border-gray-200"></hr>
                        <div  style={{ fontSize: '22px', fontWeight: 'bold' }}>Pay details</div>
                        <hr class="my-7 border-t-2 border-gray-200"></hr>
                        <div className='flex items-center justify-center' >
                <p style={{ fontWeight: 'lighter' }}>You won't charged yet</p>
            </div>
            <div style={{ display: 'flex' }} className='py-2'>
                <p style={{ paddingLeft: '10px', fontWeight: 'bold', flex: '0.9' }} className='underline'>$ {place.price} <span>x</span> {numberOfDays} nights</p>
                <p className='font-semibold' >{totalPriceNights}</p>
            </div>
            <div style={{ display: 'flex' }} className='py-2'>
                <p style={{ paddingLeft: '10px', fontWeight: 'bold', flex: '0.9' }} className='underline'>Airbnb Service Fee</p>
                <p className='font-semibold' >{service}</p>
            </div>
            <hr class="mt-8 m-4 border-t-2 border-gray-200"></hr>
            <div style={{ display: 'flex' }} className='py-2'>
                <p style={{ paddingLeft: '10px', fontWeight: 'bold', flex: '0.9' }} className='underline'>Total</p>
                <p className='font-semibold' >{totalAmount}</p>
            </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default PaymentForm;