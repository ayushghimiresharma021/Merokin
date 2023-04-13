import express from 'express' ;
import { getBookings, userBookings } from '../controllers/bookings.js';

const router = express.Router()
router.get('/getBookings',getBookings)
router.post('/userBookings',userBookings)


export default router ;



