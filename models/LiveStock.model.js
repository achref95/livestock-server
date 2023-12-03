const { Schema, model } = require("mongoose");

const liveStockSchema = new Schema(
  {
    stockNumber: {
      type: String,
      required: [true, "live stock number is required."],
      unique: true,
    },
    stockType: {
      type: String,
      required: [true, "live stock type is required."],
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const LiveStock = model("LiveStock", liveStockSchema);

module.exports = LiveStock;
