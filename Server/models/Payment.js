import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    amount: Number,
    currency: String,
    status: String,
    paymentId: String,
    customerId: String,
    cardDetails: {
      cardNumber: String,
      expMonth: String,
      expYear: String,
      cvc: String
    },
    created: {
      type: Date,
      default: Date.now,
    },
  });

  const payment = mongoose.model('payment', paymentSchema);


  export default payment ;
  