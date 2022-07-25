const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://hotelproject:hotelproject@cluster0.wpbts.mongodb.net/mern-rooms";

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB");
});

mongoose.connection.on("error", () => {
    console.log("MongoDB connection error");
  });


module.exports = mongoose;