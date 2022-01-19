const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt"); //For authorization check
const { errorHandler } = require("../helpers/dbErrorCode");
const UserSchema = require("./../Model/User");

exports.Signup = (req, res) => {
  console.log("req.bory", req.body);
  const user = new UserSchema(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({
      user,
    });
  });
};

exports.Signin = (req, res) => {
  const { email, password } = req.body;
  UserSchema.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        // err: `User with ${req.body.name} and email ${email} doesnot exists please signUp`,
      });
    }

    //If user is found make sure the email and the password matches
    //Create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and Password didnot match",
      });
    }

    //Generate a Signed Token with user Id and Secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //Persist the Token as t in cookie with Expiry Date
    res.cookie("t", token, { expire: new Date() + 9999 });
    //Return Response with user and front end client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.Signout = (req, res) => {
  res.clearCookie("t");
  res.json({
    Message: "Signed out Succesfully",
  });
};

exports.requiresSigned = (req, res) => ({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(400).json({
      Message: "Access denied.. Not Authenticated",
    });
  }
};
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "user is not Admin",
    });
  }
  next();
};
