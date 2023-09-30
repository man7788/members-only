const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 100 },
  message: { type: String, required: true, minLength: 1, maxLength: 1000 },
  date: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// // Virtual for message's URL
// MessageSchema.virtual("url").get(function () {
//   // We don't use an arrow function as we'll need the this object
//   return `/catalog/book/${this._id}`;
// });

MessageSchema.virtual("date_formatted").get(function () {
  return this.date
    ? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED)
    : "";
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);
