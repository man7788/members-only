const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

exports.post_message = [
  // Validate and sanitize fields.
  body("title", "Ttiel must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("message", "Message must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // asyncHandler(async (req, res, next) => {
  //   console.log(res.locals.currentUser._id);
  // }),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a User object with escaped and trimmed data.
    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      email: req.body.email,
      date: Date.now(),
      author: res.locals.currentUser._id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("new-message", {
        message: message,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save message.

      await message.save();
      res.redirect("/");
    }
  }),
];
