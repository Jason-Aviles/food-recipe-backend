const express = require("express");

const db = require("./publicModel");

const router = express.Router();  



router.get("/", (req, res) => {
  db.findDetail().then(data => res.json(data));
});



 router.get("/:id", (req, res) => {
   const { id } = req.params;

   db.findBydetail_id(id).then(data => res.json(data));
 });

module.exports = router;
