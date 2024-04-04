const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  domains: [String],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;