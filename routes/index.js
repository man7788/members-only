const express = require("express");
const router = express.Router();
const Message = require("../models/message");

const sign_up_controller = require("../controllers/signUpController");
const verification_controller = require("../controllers/verificationController");
const new_message_controller = require("../controllers/newMessageController");
const admin_controller = require("../controllers/adminController");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const messages = await Message.find({}).populate("author");

  res.render("index", {
    title: "Exclusive Clubhouse",
    user: res.locals.currentUser,
    messages: messages,
    fail: req.flash("error"),
  });
});

// Sign-up
router.get("/sign-up", function (req, res, next) {
  res.render("sign-up", { title: "Sign Up" });
});

router.post("/sign-up", sign_up_controller.submit_form);

// Verification
router.get("/verification", function (req, res, next) {
  if (res.locals.currentUser) {
    const user = res.locals.currentUser;
    if (user.membership === "inactive") {
      res.render("verification", { title: "Membership Verification" });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
});

router.post("/verification", verification_controller.submit_verification);

// New message
router.get("/new-message", function (req, res, next) {
  if (res.locals.currentUser) {
    const user = res.locals.currentUser;
    if (user.membership === "active") {
      res.render("new-message", { title: "Create New Message" });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
});

router.post("/new-message", new_message_controller.post_message);

//Admin Verification
router.get("/admin", function (req, res, next) {
  if (res.locals.currentUser) {
    const user = res.locals.currentUser;
    if (user.membership === "active") {
      res.render("admin", { title: "Admin Verification" });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
});

router.post("/admin", admin_controller.submit_verification);

//Delete Message
router.post("/delete", admin_controller.delete_message);

module.exports = router;
