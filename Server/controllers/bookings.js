import bookings from '../models/Booking.js';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken'


export const userBookings = async (req, res) => {
    try {
        const {
            place,
            name,
            userId,
            email,
            checkIn,
            checkout,
            maxGuests,
            amount,
            mobile,
        } = req.body
        const newBooking = await bookings.create({
            place,
            userId,
            name,
            email,
            checkIn,
            checkout,
            maxGuests,
            amount,
            mobile,
        })
        res.status(200).json(newBooking)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

export const paymentCustomer = async (req, res) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const { cardNumber, cardHolderName, expiryDate, cvv, billingAddress, billingCity, billingState, billingZip, amount, email } = req.body
        const customer = await stripe.customers.create({
            name: cardHolderName,
            address: {
                line1: billingAddress,
                city: billingCity,
                state: billingState,
                postal_code: billingZip,
                country: 'US',
            },
            payment_method: {
                card: {
                    number: cardNumber,
                    cvc: cvv,
                },
                billing_details: {
                    name: cardHolderName,
                    address: {
                        line1: billingAddress,
                        city: billingCity,
                        state: billingState,
                        postal_code: billingZip,
                        country: 'FI',
                    },
                },
            },
            invoice_settings: {
                default_payment_method: 'pm_card_visa', // You can change this to your preferred payment method
            },
        });

        const paymentMethod = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id
        })
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: customer.email,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Bookings'
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: process.env.CLIENT_SIDE_URL,
            cancel_url: process.env.CLIENT_SIDE_URL
        })



        res.json({ sessionId: session.id });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

export const getBookings = async (req, res) => {
    try {
        const { token } = req.cookies
        jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
            if (err) throw err;
            const getBooks = await bookings.find({ userId: userData.id }).populate('place') 
            res.status(200).json(getBooks)

        })
    } catch (error) {
        console.log(error)
        res.status(200).json(error) 
    }
}
