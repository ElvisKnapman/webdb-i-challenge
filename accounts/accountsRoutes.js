const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

const {
  accountInfoValidation,
  accountIDValidation
} = require("../middleware/validation.js");

router.get("/", async (req, res) => {
  // retrieve account stored on req object by accountIDValidation middleware
  try {
    const accounts = await db("accounts");
    res.status(200).json(accounts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server could not retrieve accounts." });
  }
  console.log("account in GET:ID", account);
  res.status(200).json(account);
});

router.get("/:id", accountIDValidation, (req, res) => {
  // retrieve account stored on req object by accountIDValidation middleware
  const { account } = req;
  console.log("account in GET:ID", account);
  res.status(200).json(account);
});

router.post("/", accountInfoValidation, async (req, res) => {
  const { body } = req;
  const [id] = await db("accounts").insert(body, "id");
  console.log("The ID", id);
  res.status(200).json(id);
});

router.put("/:id", accountInfoValidation, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await db("accounts")
      // find record with id
      .where({ id })
      .update(changes);
    res
      .status(200)
      .json({ message: `Successfully updated ${count} record(s)` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server could not update the resource" });
  }
});

router.delete("/:id", accountIDValidation, async (req, res) => {
  const { id } = req.params;
  try {
    // find record with id
    const deleted = await db("accounts")
      .where({ id })
      .del();
    res.status(200).json({ message: `Successfully deleted account` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server could not delete the account" });
  }
});

module.exports = router;
