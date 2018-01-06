const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  signature: {
    type: String,
    unique : true
  },
  trans_num: {
    type: String
  },
  date: {
    type: Date
  },
  type: {
    type: String
  },
  account: {
    type: String
  },
  amount: {
    type : Number
  },
  customer: {
    type: String
  }
});

const Payment = mongoose.model('payment', PaymentSchema);

module.exports = {
  Payment
};