require("dotenv").config();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminCodeSchema = new Schema({
  code: { type: String, required: true, minLength: 1 },
});
const AdminCode = mongoose.model("AdminCode", AdminCodeSchema);

// async function saveCode(input) {
//   console.log("Debug: About to connect");
//   await mongoose.connect(process.env.MONGODB_URI);
//   console.log("Debug: Should be connected?");

//   const code = new AdminCode({ code: input });
//   await code.save();
//   console.log("Debug: Code Saved");

//   console.log("Debug: Closing mongoose");
//   mongoose.connection.close();
// }

// saveCode("CoolAdmin");

// Export model
module.exports = AdminCode;
