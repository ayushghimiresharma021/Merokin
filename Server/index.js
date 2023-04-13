import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet, { crossOriginResourcePolicy } from 'helmet';
import bodyParser from "body-parser";
import userRoutes from './Routes/user.js';
import placeRoute from './Routes/place.js'
import bookingRoute from './Routes/bookings.js' ;
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import download from 'image-downloader';
import jwt from 'jsonwebtoken'
import fs from  'fs' ;
import place from './models/Place.js';
import Stripe from 'stripe';
import { paymentCustomer } from './controllers/bookings.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(express.json());

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan("common"));
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname,'/uploads')));


mongoose.connect(process.env.MONGODB).then(() => {
    app.listen(3001,()  => {
        console.log('Server is running on port 3001')
    })
})


app.post('/photoLink',async(req,res) => {
    try {
        const {link} = req.body
        const newName = 'photo'+ Date.now() + '.jpg' ;
        await download.image({
            url: link,
            dest: __dirname+'/uploads/'+newName, 
        })
        console.log(newName)
        res.status(200).json(newName)
    } catch (error) {
        res.status(404).json({error: error.request})
        console.log(error)
    }
})

const storage = multer({dest: 'uploads/'})


app.post('/uploadPhoto', storage.array('photos',100), async (req, res) =>{
    try {
        console.log(req.files)
        const uploadedFiles = []
        for ( let i = 0 ;i< req.files.length;i++){
            const {path,originalname,filename} = req.files[i]
            const part = originalname.split('.')
            const ext = part[part.length - 1]
            const newPath = path + '.' + ext
            const newFilename = filename + '.' + ext
            fs.renameSync(path, newPath)
            uploadedFiles.push(newFilename)
        }
        res.status(200).json(uploadedFiles) ;
    } catch (error) {
        console.log(error)
    }
})
app.get('/place/myplace',async (req, res) => {
    const {token} = req.cookies
    jwt.verify(token, process.env.SECRET_KEY,{},async(err,userdata) => {
        if (err) throw err ;
        const {id} =userdata
        const userPlaces = await place.find({owner:id})
        console.log(userPlaces)
        res.status(200).json(userPlaces)
    })
})

app.post('/create-checkout-session', paymentCustomer);

app.use('/user',userRoutes)
app.use('/place',placeRoute)
app.use('/bookings',bookingRoute)







