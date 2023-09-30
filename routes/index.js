const express = require("express");
const router = express.Router();

const sign_up_controller = require("../controllers/signUpController");
const verification_controller = require("../controllers/verificationController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Exclusive Clubhouse",
    user: res.locals.currentUser,
    fail: req.flash("error"),
  });
});

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up", { title: "Sign Up" });
});

router.post("/sign-up", sign_up_controller.submit_form);

router.get("/verification", function (req, res, next) {
  if (res.locals.currentUser) {
    res.render("verification", { title: "Membership Verification" });
  } else {
    res.redirect("/");
  }
});

router.post("/verification", verification_controller.submit_verification);

module.exports = router;
