const mongoose    = require('mongoose')
const { Schema }  = mongoose

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  menuUser: [{
    type: Schema.Types.ObjectId,
    ref: "MenuUser"
  }],
  fonda: {
    type: Schema.Types.ObjectId,
    ref: "Fonda"
  },
  howMany: Number,
  arrive: String
},
{
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Order', orderSchema)