const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

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
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } 
    
    catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
    
  }
);

module.exports = router;
