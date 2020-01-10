const express = require("express");

const db = require("./authModel");


const multer =require('multer')



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/[-T:\.Z]/g, "") + file.originalname
    );
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },fileFilter:fileFilter
});







const router = express.Router();

router.get("/foodie", async (req, res) => {
  return await db
    .findBydetail()
    .then(data => res.json({ loggedInUser: req.user.username, data })).catch(err => console.log(err));
});

router.get("/", async (req, res) => {
  return await db
    .find_review()
    .then(data => res.json({ loggedInUser: req.user.username, data })).catch(err => console.log(err));
});

router.get("/other", async (req, res) => {
  return  await db
    .find_other()
    .then(data => res.json({ loggedInUser: req.user.username, data })).catch(err => console.log(err));
});

router.get("/menu", async (req, res) => {
  return  await db
    .find_menu()
    .then(data => res.json({ loggedInUser: req.user.username, data })).catch(err => console.log(err));
});

/////////////////////////get by id request//////////////////////////////////////

router.get("/validate/:id", async (req, res) => {
  const { id } = req.params;

  return await db
    .findById_fulltable(id)
    .then(data => res.json({ loggedInUser: req.user.username, data })).catch(err => console.log(err));
});



router.get("/foodie/:id", async (req, res) => {
  const { id } = req.params;

  return await db
    .findBydetail_id(id)
    .then(data => res.json({ loggedInUser: req.user.username, data })).catch(err => console.log(err));
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

 return await db
    .findById_review(id)
    .then(data => res.json({ loggedInUser: req.user.username, data })).catch(err => console.log(err));
});

router.get("/menu/:id", async (req, res) => {
  const { id } = req.params;

 return await db
    .findById_menu(id)
    .then(data => res.json({ loggedInUser: req.user.username, data })).catch(err => console.log(err));
});

router.get("/other/:id", async (req, res) => {
  const { id } = req.params;

 return await db
    .findById_other(id)
    .then(data => res.json({ loggedInUser: req.user.username, data })).catch(err => console.log(err));
});

/////////////////////////post request//////////////////////////////////////

router.post("/", async (req, res) => {
  if (!req.body) {
  return  res.status(401).res.json({ message: "check your state in your form" });
  } else {
   return await db.insert_review(req.body).then(data => res.json(data)).catch(err => console.log(err));
  }
});

router.post("/menu", async (req, res) => {
  if (!req.body) {
 return   res.status(401).res.json({ message: "check your state in your form" });
  } else {
  return  await db.insert_menu(req.body).then(data => res.json(data)).catch(err => console.log(err));
  }
});

router.post("/other", async (req, res) => {
  if (!req.body) {
  return  res.status(401).res.json({ message: "check your state in your form" }).catch(err => console.log(err));
  } else {
  return  await db.insert_other(req.body).then(data => res.json(data)).catch(err => console.log(err));
  }
});

router.post("/validation", async (req, res) => {
  if (!req.body) {
  return  res.status(401).res.json({ message: "check your state in your form" });
  } else {
  return  await db.fulltable(req.body).then(data => res.json(data)).catch(err => console.log(err));
  }
});



/////////////////////////del request//////////////////////////////////////

router.delete("/:id", async (req, res) => {
  const { id } = req.params.id;
  if (!id) {
  return  res.status(401).res.json({ message: "no id" });
  } else {
  return  await db.remove_review(id).then(data => res.status(201).res.json(data)).catch(err => console.log(err));
  }
});
router.delete("/menu/:id", async (req, res) => {
  const { id } = req.params.id;
  if (!id) {
 return   res.status(401).res.json({ message: "no id" });
  } else {
  return  await db.remove_menu(id).then(data => res.status(201).res.json(data)).catch(err => console.log(err));
  }
});

router.delete("/other/:id", async (req, res) => {
  const { id } = req.params.id;
  if (!id) {
  return  res.status(401).res.json({ message: "no id" });
  } else {
   return await db.remove_other(id).then(data => res.status(201).res.json(data)).catch(err => console.log(err));
  }
});

/////////////////////////put request//////////////////////////////////////

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  await db
    .update_review(id, body)
    .then(update => {
      if (id) {
     return   res.status(200).json(update);
      } else
      return  res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

router.put("/menu/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  await db
    .update_menu(id, body)
    .then(update => {
      if (id) {
      return  res.status(200).json(update);
      } else
     return   res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

router.put("/other/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
 return await db
    .update_other(id, body)
    .then(update => {
      if (id) {
        res.status(200).json(update);
      } else
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

//menu

// router.get("/menu", async (req, res) => {
//   console.log(req.body);
//   await db.find_menu().then(data => res.json(data));
// });

// router.get("/menu/:id", async (req, res) => {
//   const { id } = req.params;

//   await db
//     .findById_menu(id)
//     .then(data => res.json({ loggedInUser: req.user.username, data }));
// });

// router.post("/menu", async (req, res) => {
//   if (!req.body) {
//     res.status(401).res.json({ message: "check your state in your form" });
//   } else {
//     await db.insert_menu(req.body).then(data => res.json(data));
//   }
// });

// router.delete("/menu/:id", async (req, res) => {
//   const { id } = req.params.id;
//   if (!id) {
//     res.status(401).res.json({ message: "no id" });
//   } else {
//     await db.remove_menu(id).then(data => res.status(201).res.json(data));
//   }
// });

// router.put("/menu/:id", async (req, res) => {
//   const { id } = req.params;
//   const body = req.body;
//   await db
//     .update_menu(id, body)
//     .then(update => {
//       if (id) {
//         res.status(200).json(update);
//       } else
//         res
//           .status(400)
//           .json({ errorMessage: "Please provide name and bio for the user." });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: "The user information could not be modified." });
//     })
//     .catch(err => json({ message: "failed" }));
// });

// //other

// router.get("/other", async (req, res) => {
//   await db.find_other().then(data => res.json(data));
// });

// router.get("/other/:id", async (req, res) => {
//   const { id } = req.params;

//   await db
//     .findById_other(id)
//     .then(data => res.json({ loggedInUser: req.user.username, data }));
// });

// router.post("/other", async (req, res) => {
//   if (!req.body) {
//     res.status(401).res.json({ message: "check your state in your form" });
//   } else {
//     await db.insert_other(req.body).then(data => res.json(data));
//   }
// });

// router.delete("/other/:id", async (req, res) => {
//   const { id } = req.params.id;
//   if (!id) {
//     res.status(401).res.json({ message: "no id" });
//   } else {
//     await db.remove_other(id).then(data => res.status(201).res.json(data));
//   }
// });

// router.put("/other/:id", async (req, res) => {
//   const { id } = req.params;
//   const body = req.body;
//   await db
//     .update_other(id, body)
//     .then(update => {
//       if (id) {
//         res.status(200).json(update);
//       } else
//         res
//           .status(400)
//           .json({ errorMessage: "Please provide name and bio for the user." });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: "The user information could not be modified." });
//     });
// });

module.exports = router;
