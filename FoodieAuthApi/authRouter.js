const express = require("express");

const db = require("./authModel");

const router = express.Router();


router.get("/foodie/:id", async (req, res) => {
  const { id } = req.params;

   await db.findBydetail_id(id).then(data =>
      res.json({ loggedInUser: req.user.username, data })
    );
  
});


router.get("/foodie/", async (req, res) => {


   await db.findBydetail().then(data =>
      res.json({ loggedInUser: req.user.username, data })
    );
  
});



router.get("/", async (req, res) => {
 await db.find_review().then(data => res.json({ loggedInUser: req.user.username, data }));
});

router.post("/", async (req, res) => {
  if (!req.body) {
    res.status(401).res.json({ message: "check your state in your form" });
  } else {
   await db.insert_review(req.body).then(data => res.json(data));
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params.id;
  if (!id) {
    res.status(401).res.json({ message: "no id" });
  } else {
   await db.remove_review(id).then(data => res.status(201).res.json(data));
  }
});


router.put("/:id", async (req,res)=>{
  const { id } = req.params;
  const body = req.body;
 await db.update_review(id,body).then(update =>{
    if (id) {
      res.status(200).json(update);
    }else(res.status(400).json({errorMessage: "Please provide name and bio for the user."}))
  }) .catch(err => {
    res.status(500).json({ error: "The user information could not be modified." });
  })

})






router.get("/menu", async (req, res) => {
 await db.find_menu().then(data => res.json(data));
});

router.post("/menu", async (req, res) => {
  if (!req.body) {
    res.status(401).res.json({ message: "check your state in your form" });
  } else {
   await db.insert_menu(req.body).then(data => res.json(data));
  }
});

router.delete("/menu/:id", async (req, res) => {
  const { id } = req.params.id;
  if (!id) {
    res.status(401).res.json({ message: "no id" });
  } else {
   await db.remove_menu(id).then(data => res.status(201).res.json(data));
  }
});


router.put("/menu/:id", async (req,res)=>{
  const { id } = req.params;
  const body = req.body;
 await db.update_menu(id,body).then(update =>{
    if (id) {
      res.status(200).json(update);
    }else(res.status(400).json({errorMessage: "Please provide name and bio for the user."}))
  }) .catch(err => {
    res.status(500).json({ error: "The user information could not be modified." });
  })

})

//other

router.get("/other", async (req, res) => {
 await db.find_other().then(data => res.json(data));
});

router.post("/other", async (req, res) => {
  if (!req.body) {
    res.status(401).res.json({ message: "check your state in your form" });
  } else {
   await db.insert_other(req.body).then(data => res.json(data));
  }
});

router.delete("/other/:id", async (req, res) => {
  const { id } = req.params.id;
  if (!id) {
    res.status(401).res.json({ message: "no id" });
  } else {
   await db.remove_other(id).then(data => res.status(201).res.json(data));
  }
});


router.put("/other/:id", async (req,res)=>{
  const { id } = req.params;
  const body = req.body;
 await db.update_other(id,body).then(update =>{
    if (id) {
      res.status(200).json(update);
    }else(res.status(400).json({errorMessage: "Please provide name and bio for the user."}))
  }) .catch(err => {
    res.status(500).json({ error: "The user information could not be modified." });
  })

})


module.exports = router;
