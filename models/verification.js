require("dotenv").config();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const secretCodeSchema = new Schema({
  code: { type: String, required: true, minLength: 1 },
});
const SecretCode = mongoose.model("SecretCode", secretCodeSchema);

// async function saveCode(input) {
//   console.log("Debug: About to connect");
//   await mongoose.connect(process.env.MONGODB_URI);
//   console.log("Debug: Should be connected?");

//   const code = new SecretCode({ code: input });
//   await code.save();
//   console.log("Debug: Code Saved");

//   console.log("Debug: Closing mongoose");
//   mongoose.connection.close();
// }

// saveCode("ThisCoolCode");

// Export model
module.exports = SecretCode;
