const express = require("express");
const { Signin, Signout, Signup } = require("../Controller/auth");
const { userSignupValidator } = require("./../Validator/index");

const router = express.Router();

router.post("/signin", Signin);
router.get("/signout", Signout);
router.post("/signup", Signup);

module.exports = router;
