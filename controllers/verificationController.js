const User = require("../models/user");
const SecretCode = require("../models/verification");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.submit_verification = [
  asyncHandler(async (req, res, next) => {
    const { code } = await SecretCode.findOne({}, "code");
    req.body.code = code;
    next();
  }),

  // Validate and sanitize fields.
  body("verification", "Code must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .custom((value, { req }) => {
      return value === req.body.code;
    })
    .withMessage("Incorrect Code.")
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const user = await User.findById(res.locals.currentUser._id);
    const activeUser = new User({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      membership: "active",
      _id: user._id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.render("verification", {
        title: "Membership Verification",
        errors: errors.array(),
      });
    } else {
      // Update a User object with escaped and trimmed data.
      await User.findByIdAndUpdate(res.locals.currentUser._id, activeUser, {});
      res.redirect("/");
    }
  }),
];
