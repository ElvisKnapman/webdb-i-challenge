const newAccountValidation = (req, res, next) => {
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

module.exports = {
  newAccountValidation
};
