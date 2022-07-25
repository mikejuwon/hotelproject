require("dotenv").config();
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");



const Room = require("../models/rooms");
const Booking = require("../models/bookings");

router.post("/bookroom", async (req, res) => {
  // const {
  //   roomName,
  //   roomID,
  //   userid,
  //   fromDate,
  //   toDate,
  //   totalAmount,
  //   totalDays,
  //   token,
  // } = req.body;

  const { token } = req.body;

  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });

  const charge = await stripe.charges.create(
    {
      amount: req.body.totalAmount * 100,
      currency: "ngn",
      customer: customer.id,
      receipt_email: token.email,
      description: `Booking for ${req.body.roomName}`
    },
    { idempotencyKey: uuidv4() }
  );

  if (charge) {
    const newBooking = new Booking({
      roomName: req.body.roomName,
      roomID: req.body.roomID,
      userid: req.body.userid,
      from: req.body.fromDate,
      to: req.body.toDate,
      totalAmount: req.body.totalAmount,
      totalDays: req.body.totalDays,
      transactionId: "123456789"
    });

    const result = await newBooking.save();

    //So I will push the details to the currentbookings in the room schema..
    //It means it will be updated that the room was booked successfully

    Room.findOne({ _id: req.body.roomID }, (err, match) => {
      match.currentbookings.push({
        bookingid: result._id,
        from: req.body.fromDate,
        to: req.body.toDate,
        userid: req.body.userid,
        status: result.status,
      });

      match.save();
    });

    res.send("Payment successful, Your Room has been booked!");
  } else {
    res.status(400).send("Something went wrong booking the room!");
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  
  const userid = req.body.userid;


  try {
    const bookings = await Booking.find({ userid : userid })
    res.send(bookings)
  } catch (error) {
    console.log(error);
  }

})

router.post("/cancelbooking", async (req, res) => {
  const {bookingID, roomID} = req.body;

  try {

    //changing the booking status for the bookingid passed from the frontend
    
    const bookingItem = await Booking.findOne({_id: bookingID})

    bookingItem.status = "Cancelled"

    await bookingItem.save();


    //removing the booking with the bookingid passed from the frontend
    //and updating the currentbookings of the room as well

    // Room.findOne({_id: roomID}, (err, matchingRoom) => {

    //   const bookings = matchingRoom.currentbookings

    //   bookings.findOneAndDelete({bookingid: bookingID})

    //   bookings.save();
    // });

    Room.findOne({_id: roomID}, (err, matchingRoom) => {

      const bookings = matchingRoom.currentbookings

      matchingRoom.currentbookings = bookings.filter(item => item.bookingid.toString() !== bookingID)

      matchingRoom.save();
      
    });

    res.send("Your booking has been cancelled successfully!")

  } catch (error) {
    console.log(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
    res.send(bookings)
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/deletebooking", async (req, res) => {
  const bookingID = req.body.bookingID;

  try {
    const deletedBooking = await Booking.findOneAndDelete({ _id: bookingID });
    res.send(deletedBooking);
  } catch (error) {
    res.status(404).send(error);
  }
});    

module.exports = router;
