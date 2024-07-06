
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  carModel: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },  
  color: {
    type: String,
    required: true,
  },
  ownerName: {
   type: String,
   required: true,
  },

   phone: {
    type: Number,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
}]
   
});

const vehicalModel = mongoose.model('Vehical', vehicleSchema);
module.exports = vehicalModel;