const db = require("../data/dbConfig.js");

const accountInfoValidation = (req, res, next) => {
  const { body } = req;

  if (!body.name || !body.budget) {
    res
      .status(400)
      .json({ message: "New account must have both a name and budget." });
  } else if (typeof body.budget !== "number") {
    res.status(400).json({ message: "Budget can only be a number" });
  } else {
    next();
  }
};

const accountIDValidation = async (req, res, next) => {
  const { id } = req.params;

  try {
    // using .first() will pull that object out of the array for us
    const account = await db("accounts")
      .where({ id })
      .first();
    console.log("account::::", account);
    if (account) {
      req.account = account;
      next();
    } else {
      res.status(404).json({ message: "Account ID is invalid." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server could not retrieve the acccount" });
  }
};

module.exports = {
  accountInfoValidation,
  accountIDValidation
};
