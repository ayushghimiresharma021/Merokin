import React, { useState } from "react";
import BrandPage from "../../Scenes/BrandPage";
import { IoIosArrowBack } from 'react-icons/io';
import {loadStripe} from '@stripe/stripe-js';
import { useSelector } from "react-redux";
import axios from "axios";

function PaymentFormdata() {
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
    <div>
      <form onSubmit={handleSubmit}>
                            <label >
                                
                                <input
                                    placeholder="Card Number"
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                />
                            </label>
                            <label >
                                <input
                                placeholder="CardHolder Name"
                                
                                    type="text"
                                    name="cardHolderName"
                                    value={formData.cardHolderName}
                                    onChange={handleChange}
                                />
                            </label>
                            <div style={{display:'flex',justifyContent:'space-evenly'}}>
                            
                                
                                <input
                                    className="mr-1"
                                    placeholder="Expiry Date:"
                                    type="text"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                />
                            
                                
                                <input
                                    placeholder="CVV:"
                                    
                                    type="text"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                />
                            

                            </div>
                            
                            <div className="py-3"  style={{ fontSize: '15px' }}>Billing Address :</div>
                            <label>
                                
                                <input
                                    type="text"
                                    placeholder="Billing Address:"
                                    name="billingAddress"
                                    value={formData.billingAddress}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                
                                <input
                                    type="text"
                                    placeholder="Billing City:"
                                    name="billingCity"
                                    value={formData.billingCity}
                                    onChange={handleChange}
                                />
                            </label>
                            
                            <label>
                                
                                <input
                                    type="text"
                                    name="billingState"
                                    placeholder="Billing State:"
                                    value={formData.billingState}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                
                                <input
                                    type="text"
                                    placeholder="Billing Zip:"
                                    name="billingZip"
                                    value={formData.billingZip}
                                    onChange={handleChange}
                                />
                            </label>
                            <div className="py-3">
                                <button  className="py-2 w-full h-10 text-white bg-primary rounded-xl" type="submit">Request to Book</button>
                            </div>
                        </form>
    </div>
  )
}

export default PaymentFormdata ;
