const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

exports.submit_form = [
  // Validate and sanitize fields.
  body("firstname", "First name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastname", "Last name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .withMessage("Email is not valid.")
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body("match-password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a User object with escaped and trimmed data.
    const user = new User({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      membership: "inactive",
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("sign_up", {
        user: user,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Encrtpy password and save user.
      asyncHandler(
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          user.password = hashedPassword;
          await user.save();
          res.redirect("/sign_up");
        })
      );
    }
  }),
];
