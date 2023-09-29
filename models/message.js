const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  titel: { type: String, required: true, minLength: 1, maxLength: 100 },
  message: { type: String, required: true, minLength: 1, maxLength: 1000 },
  date: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

// // Virtual for message's URL
// MessageSchema.virtual("url").get(function () {
//   // We don't use an arrow function as we'll need the this object
//   return `/catalog/book/${this._id}`;
// });

// Export model
module.exports = mongoose.model("Message", MessageSchema);
