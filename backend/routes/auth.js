const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs'); //password hashing (salting and peppering)
var jwt = require('jsonwebtoken');

const JWT_SECRET="thisissecret"

router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email Id").isEmail(),
    body("password", "enter a strong password").isLength({ min: 5 }),
  ],//validation
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });  //if users with same mail id
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry user with this email alraedy exists" });
      }

      //User is the schema , User.craete :This function is used to create a new user record in the database based on the provided data
    
      const salt=await bcrypt.genSalt(10); //This value represents the number of iterations the hashing algorithm will perform to derive the final hash
      const secPass= await bcrypt.hash(req.body.password,salt)


      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      /*
  JWT-The process works like this:

    Web tokens, also known as JSON Web Tokens (JWT), are a compact and self-contained way to securely transmit information between parties as a JSON object


1.User logs in with their credentials, and the server verifies them.
2.Upon successful authentication, the server generates a JWT and sends it back to the user.
3.The user stores the JWT (usually in a client-side storage like cookies or local storage) and sends it with each subsequent request to the server.
4.The server validates the JWT on each request by checking its signature and expiration time.
5.If the JWT is valid, the server grants the requested access or performs the requested operation.*/


      const data ={
        user:{
          id:user.id
        }
      }
      var jwtData = jwt.sign(data, JWT_SECRET);
     
     // var decoded = jwt.verify(jwtData, JWT_SECRET) ---verify
     // res.json(decoded);
    } 
    
    catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
    
  }
);

module.exports = router;
