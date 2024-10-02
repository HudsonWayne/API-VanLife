const jwt = require("jsonwebtoken");
const User = require("./../models/userModel.js")
const errorHandler = require("./errorMiddleware.js")


//check if the user is authenticated or not


const authenticate = errorHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("not authorized , token failed");
    }
  } else {
    res.status(401)
    throw new Error("not authorized, no token");
  }
});

// check if the user is admin or not


// user models have no isAdmin field that why l removed this code

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as admin");
  }
};

module.exports =  { authenticate, authorizeAdmin };
