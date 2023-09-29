const express = require("express");
const router = express.Router();

const sign_up_controller = require("../controllers/signUpController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Exclusive Clubhouse" });
});

router.get("/sign_up", function (req, res, next) {
  res.render("sign_up", { title: "Sign Up" });
});

router.post("/sign_up", sign_up_controller.submit_form);

module.exports = router;
