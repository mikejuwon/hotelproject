const express = require("express");
const router = express.Router();



const Room = require("../models/rooms");

router.get("/getallrooms", async (req, res) => {
  
    
  try {
    const rooms = await Room.find({});
        res.send(rooms);
  } catch (err) {
      return res.status(400).json({message: err.message});
  }  
});

router.post("/getroombyid", async (req, res) => {
  
  const roomid = req.body.roomid

  try {
    const room = await Room.findOne({_id : roomid});
        res.send(room);
  } catch (err) {
      return res.status(400).json({message: err.message});
  }  
});


router.post("/addroom", async (req, res) => {

  const newRoom = new Room ({
      name: req.body.roomName,
      rentperday: req.body.rentPerDay,
      type: req.body.type,
      facilities: req.body.facilities,
      phonenumber: req.body.phoneNumber,
      maxcount: req.body.maxCount,
      description: req.body.description,
      imageurls: req.body.imageurls,
      currentbookings: []
  });

  const room = await newRoom.save();

  try {
    res.send(room);
  } catch (error) {
    return res.status(404).send(error);
  }

})


module.exports = router;