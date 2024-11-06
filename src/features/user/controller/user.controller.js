// Please don't change the pre-written code
// Import the necessary modules here
import jwt from "jsonwebtoken";
import { addUser, confirmLogin } from "../model/user.model.js";
export const registerUser = (req, res, next) => {
  const userData = req.body;
  if (userData) {
    let user = addUser(userData);
    res.status(201).send({ status: "success", user });
  } else {
    res.status(400).json({ status: "failure", msg: "invalid user details" });
  }
};

export const loginUser = (req, res) => {
  let status = confirmLogin(req.body);
  console.log(status);
  if (status) {
    console.log(status);
    //  Write your code here to create the JWT token and store it in a cookie named "jwtToken"
    // create the payload
    const payload = {
      userId: status.id,
      email: status.email,
    };
    // this is the secret key
    // const secretKey = "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz"; 
    // create the token using secret key
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Set the token in a cookie named 'jwtToken'
    res.cookie("jwtToken", token, {
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });

    res.status(200).json({
      status: "success",
      msg: "login successfull",
      token: token,
    });
  } else {
    res.status(400).json({ status: "failure", msg: "invalid user details" });
  }
};
