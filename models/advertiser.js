const mongoose = require("mongoose");

const advertiserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

module.exports = mongoose.model("advertiser", advertiserSchema);
