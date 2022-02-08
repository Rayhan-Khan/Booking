const mongoose = require("mongoose");
const newHotel = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    Location: {
      type: String,
      required: true,
    },
    Room: {
      type: Number,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Breakfast: Boolean,
    Offer: { type: Number, required: true },
    Restaurant: Boolean,
    coverPhoto: String,
    RoomPhoto: [{ type: String }],
    review: [
      {
        type: mongoose.ObjectId,
        ref: "user",
        enum: ["user"],
      },
    ],
    Details: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

newHotel.index({offer:-1});
newHotel.index({Price:1,Offer:-1});



newHotel.virtual('calculatePrice').get(function(){
    const discount =this.Offer/100;
    const finalPrice=this.Price-(this.Price*discount);
   return finalPrice;
});
/* newHotel.virtual('length').get(function(start,end){
  if(start,end)
    return 200;
  return this.Room
}) */


const NewHotel = mongoose.model("NewHotel", newHotel);
module.exports = NewHotel;
