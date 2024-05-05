const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
const user = require("../models/user.js");


router
.route("/signup")
.get(userController.renderSignupForm)
.post(userController.signup);

router
.route("/login")
.get(userController.renderLoginForm)
.post(savedRedirectUrl,passport.authenticate("local",
{failureRedirect: "/login",failureFlash:true}),userController.login);
 
// Logout Routes -->
router.get("/logout", userController.logout)

module.exports = router;