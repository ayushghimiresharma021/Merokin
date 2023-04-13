import mongoose from 'mongoose'
const placeSchema = new mongoose.Schema({
    
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    title:{
        type:String
    },
    address:String,
    photo:Array,
    description:String,
    perks:Array,
    extraDescription:String,
    checkIn:Number,
    checkOut:Number,
    price:Number,
    maxGuests:Number,
})

const place = mongoose.model('place', placeSchema)
export default place 