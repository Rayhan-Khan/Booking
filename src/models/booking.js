const mongoose = require("mongoose");
const NewHotel = require("./CreateHotel");
const User = require("./user");

const bookSchema = mongoose.Schema(
  {
    StartDate: {
      type: Date,
      required: true,
      min: new Date().getDate() + 1,
    },
    EndDate: {
      type: Date,
      required: true,
      min: new Date().getDate() + 2,
    },
    room: {
      type: Number,
      required: true,
    },
      user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    }, 
    RoomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: NewHotel,
    },
       Totalprice: {
      type: Number,
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const Booking = mongoose.model("Booking", bookSchema);

module.exports = Booking;
