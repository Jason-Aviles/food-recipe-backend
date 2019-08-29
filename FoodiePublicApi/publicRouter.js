const express = require("express");

const db = require("./publicModel");

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.findbyId(id).then(data => res.json(data));
});

router.get("/", (req, res) => {
  db.find().then(data => res.json(data));
});



router.get("/detail/:id", (req, res) => {
  const { id } = req.params;
if(id)
 { db.findBydetail_id(id).then(data => res.json(data))};
});

module.exports = router;
