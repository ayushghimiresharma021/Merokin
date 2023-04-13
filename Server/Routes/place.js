import express from 'express' ;
import { addPlace, allPlaces, changesInPlace, getPlace } from '../controllers/place.js';


const router = express.Router()

router.get('/',allPlaces)
router.get('/:id', getPlace)
router.post('/addPlace',addPlace)
router.patch('/changesPlace',changesInPlace)






export default router ;