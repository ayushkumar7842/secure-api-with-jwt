// Please don't change the pre-written code

// Import the necessary modules here
import jwt from "jsonwebtoken";
import { getAllUsers } from "../features/user/model/user.model.js";

const jwtAuth = (req, res, next) => {
  // Write your code here

  try {
    // Retrieve the token from the 'jwtToken' cookie
    const token = req.cookies.jwtToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: {
          name: "JsonWebTokenError",
          message: "jwt must be provided",
        },
      });
    }

    // const secretKey = "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz";
    // verify the token
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const userId = payload.userId;
    // check this user is present in database or not

    const user = getAllUsers().find((singleUser) => {
      return singleUser.id === userId;
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    // if the user is present in data base
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        msg: {
          name: "TokenExpiredError",
          message: "JWT has expired",
        },
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        msg: {
          name: "JsonWebTokenError",
          message: error.message,
        },
      });
    } else {
      return res.status(500).json({
        success: false,
        msg: {
          name: "InternalServerError",
          message: "An unexpected error occurred",
        },
      });
    }
  }
};

export default jwtAuth;
