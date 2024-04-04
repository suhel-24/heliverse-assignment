const mongoose =require("mongoose")
const UserSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  domain: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
});

User=mongoose.model("User", UserSchema);
module.exports = User; 