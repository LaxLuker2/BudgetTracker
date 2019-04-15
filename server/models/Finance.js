const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const _ = require("underscore");

let FinanceModel = {};

// mongoose.Types.ObjectID is a function that
// converts stringID to real mongoID
const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();

// rent is the type, amount of $ and payment time is the base format
const FinanceSchema = new mongoose.Schema({
  rent: {
    type: String,
    required: true,
    trim: true,
    set: setName
  },

  amount: {
    type: Number,
    min: 0,
    required: true
  },

  paymentTime: {
    type: String,
    required: true
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Account"
  },

  createdData: {
    type: Date,
    default: Date.now
  }
});

FinanceSchema.statics.toAPI = doc => ({
  rent: doc.rent,
  amount: doc.amount,
  paymentTime: doc.paymentTime,
  createdData: doc.createdData
});

FinanceSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId)
  };

  return FinanceModel.find(search)
    .select("rent amount paymentTime createdData")
    .exec(callback);
};

FinanceModel = mongoose.model("FinanceTracker", FinanceSchema);

module.exports.DomoModel = FinanceModel;
module.exports.DomoSchema = FinanceSchema;
