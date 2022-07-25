const express = require('express');
const router = express.Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {

    const newUser = new User ({name : req.body.name, email : req.body.email, password : req.body.password});
    
    try {
        const user = await newUser.save();
        res.send("User Registered Successfully");
    } catch (error) {
        return res.status(400).send(error);
    }
        
    }
);

router.post("/login", async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email : email, password : password});
        if(user) {
            const filteredResult = {
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                _id : user._id
            }
            res.send(filteredResult);
        } else {
            res.status(400).send("Invalid email or password");
        }
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.get("/getallusers", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        return res.status(400).send(error);
    }
})


module.exports = router;