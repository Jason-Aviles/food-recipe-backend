const express = require("express");

const db = require("./authModel");

const router = express.Router();


router.get("/foodie/:id", (req, res) => {
  const { id } = req.params;

    db.findBydetail_id(id).then(data =>
      res.json({ loggedInUser: req.user.username, data })
    );
  
});


router.get("/foodie/", (req, res) => {


    db.findBydetail().then(data =>
      res.json({ loggedInUser: req.user.username, data })
    );
  
});



router.get("/", (req, res) => {
  db.find_review().then(data => res.json({ loggedInUser: req.user.username, data }));
});

router.post("/", (req, res) => {
  if (!req.body) {
    res.status(401).res.json({ message: "check your state in your form" });
  } else {
    db.insert_review(req.body).then(data => res.json(data));
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params.id;
  if (!id) {
    res.status(401).res.json({ message: "no id" });
  } else {
    db.remove_review(id).then(data => res.status(201).res.json(data));
  }
});


router.put("/:id",(req,res)=>{
  const { id } = req.params;
  const body = req.body;
  db.update_review(id,body).then(update =>{
    if (id) {
      res.status(200).json(update);
    }else(res.status(400).json({errorMessage: "Please provide name and bio for the user."}))
  }) .catch(err => {
    res.status(500).json({ error: "The user information could not be modified." });
  })

})






router.get("/menu", (req, res) => {
  db.find_menu().then(data => res.json(data));
});

router.post("/menu", (req, res) => {
  if (!req.body) {
    res.status(401).res.json({ message: "check your state in your form" });
  } else {
    db.insert_menu(req.body).then(data => res.json(data));
  }
});

router.delete("/menu/:id", (req, res) => {
  const { id } = req.params.id;
  if (!id) {
    res.status(401).res.json({ message: "no id" });
  } else {
    db.remove_menu(id).then(data => res.status(201).res.json(data));
  }
});


router.put("/menu/:id",(req,res)=>{
  const { id } = req.params;
  const body = req.body;
  db.update_menu(id,body).then(update =>{
    if (id) {
      res.status(200).json(update);
    }else(res.status(400).json({errorMessage: "Please provide name and bio for the user."}))
  }) .catch(err => {
    res.status(500).json({ error: "The user information could not be modified." });
  })

})

//other

router.get("/other", (req, res) => {
  db.find_other().then(data => res.json(data));
});

router.post("/other", (req, res) => {
  if (!req.body) {
    res.status(401).res.json({ message: "check your state in your form" });
  } else {
    db.insert_other(req.body).then(data => res.json(data));
  }
});

router.delete("/other/:id", (req, res) => {
  const { id } = req.params.id;
  if (!id) {
    res.status(401).res.json({ message: "no id" });
  } else {
    db.remove_other(id).then(data => res.status(201).res.json(data));
  }
});


router.put("/other/:id",(req,res)=>{
  const { id } = req.params;
  const body = req.body;
  db.update_other(id,body).then(update =>{
    if (id) {
      res.status(200).json(update);
    }else(res.status(400).json({errorMessage: "Please provide name and bio for the user."}))
  }) .catch(err => {
    res.status(500).json({ error: "The user information could not be modified." });
  })

})


module.exports = router;
