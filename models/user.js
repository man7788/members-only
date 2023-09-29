const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, minLength: 1, maxLength: 50 },
  last_name: { type: String, required: true, minLength: 1, maxLength: 50 },
  email: { type: String, required: true, minLength: 1, maxLength: 200 },
  password: { type: String, required: true, minLength: 8, maxLength: 200 },
  membership: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    default: "inactive",
  },
});

// // Virtual for user's URL
// UserSchema.virtual("url").get(function () {
//   // We don't use an arrow function as we'll need the this object
//   return `/catalog/book/${this._id}`;
// });
UserSchema.virtual("fullname").get(function () {
  // We don't use an arrow function as we'll need the this object
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.last_name}, ${this.first_name}`;
  }

  return fullname;
});

// Export model
module.exports = mongoose.model("User", UserSchema);
