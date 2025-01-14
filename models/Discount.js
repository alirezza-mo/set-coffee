const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    maxUse: {
      // 5
      type: Number,
      required: true,
    },
    uses: {
      // 1
      type: Number,
      required: true,
    },
    // user : {
    //   type : mongoose.Schema.Types.ObjectId,
    //   ref : 'User',
    //   required : true
    // }
  },
  
  {
    timestamps: true,
  }
);

const model = mongoose.models.Discount || mongoose.model("Discount", schema);

export default model;
