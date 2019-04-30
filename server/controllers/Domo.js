const models = require("../models");

const Domo = models.Domo;

const makerPage = (req, res) => {
  // grab all Domos for user based on user id in their session
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "An error occured" });
    }
    return res.render("app", { csrfToken: req.csrfToken(), domos: docs });
  });
};

// make the Finance data to send to the db
const makeFin = (req, res) => {
  if (!req.body.rent) {
    return res.status(400).json({ error: "rent required" });
  }

  const financeData = {
    rent: req.body.rent,
    amount: req.body.amount,
    paymentTime: req.body.paymentTime,
    owner: req.session.account._id
  };

  // console.log(financeData);

  const newFinance = new Domo.DomoModel(financeData);

  const financePromise = newFinance.save();

  financePromise.then(() => res.json({ redirect: "/maker" }));

  financePromise.catch(err => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "That already exists." });
    }
    return res.status(400).json({ error: "An error occurred" });
  });

  return financePromise;
};

// get json responses of domos for a user
// update dynamically using REACT, pair data on screen to data from this func
// no reloading of page grab updates from server and immediately update UI
const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "An error occured" });
    }

    return res.json({ domos: docs });
  });
};

const whatIsBTPage = (req, res) => {
  res.render("whatIsBT", { csrfToken: req.csrfToken() });
};

const becomeASponsorPage = (req, res) => {
  res.render("becomeASponsor", { csrfToken: req.csrfToken() });
};

module.exports.makerPage = makerPage;
module.exports.whatIsBTPage = whatIsBTPage;
module.exports.becomeASponsorPage = becomeASponsorPage;
module.exports.getDomos = getDomos;
module.exports.make = makeFin;
