import mongoose from 'mongoose' ;

const bookingsSchema = new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,ref:'place',required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    checkIn:{type:String,required:true},
    checkout:{type:String,required:true},
    maxGuests:{type:String,required:true},
    amount:Number,
    mobile:{type:String,required:true}
})
const bookings =new mongoose.model('bookings', bookingsSchema) ;
export default bookings