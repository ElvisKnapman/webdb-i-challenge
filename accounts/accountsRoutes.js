const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

const { newAccountValidation } = require("../middleware/validation.js");

router.get("/", async (req, res) => {
  try {
    const result = await db("accounts");
    if (result.length) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Could not find accounts" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/", newAccountValidation, async (req, res) => {
  const { body } = req;
  const [id] = await db("accounts").insert(body, "id");
  console.log("The ID", id);
  res.status(200).json(id);
});

module.exports = router;
