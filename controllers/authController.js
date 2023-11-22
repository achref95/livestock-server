const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const saltRounds = 10;


const signup = async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      if (username === "" || password === "") {
        res.status(400).json({ message: "Provide username and password" });
        return;
      }
  
      const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (!passwordRegex.test(password)) {
        res.status(400).json({
          message:
            "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
        });
        return;
      }
  
      const foundUser = await User.findOne({ username });
  
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
  
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      const createdUser = await User.create({ username, password: hashedPassword });
  
      const { _id } = createdUser;
  
      const user = { username, _id };
  
      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
    
      if (username === "" || password === "") {
        res.status(400).json({ message: "Provide username and password." });
        return;
      }
    
      const foundUser = await User.findOne({ username });
  
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }
    
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
    
      if (passwordCorrect) {
        const { _id, username} = foundUser;
    
        const payload = { _id, username };
        console.log(payload)
    
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "1h",
        });
    
        res.status(200).json({ authToken });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  

module.exports = {
    signup,
    login
}
