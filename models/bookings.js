const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true },
    roomID: { type: String, required: true },
    userid: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    totalDays: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, required: true, default: "Booked" },
  },
  { timestapms: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
