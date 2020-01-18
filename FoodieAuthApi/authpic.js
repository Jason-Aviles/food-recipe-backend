const router = require("express").Router();
const multer = require("multer");

const db = require("./authpicModal");

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
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

router.get("/", async (req, res) => {
  const pictures = await db
    .getPhoto()
    .then(pic => res.status(200).json(pic))
    .catch(err =>
      res.status(200).json({ message: ` fix the backend : ${err}` })
    );

  return pictures;
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const pictures = await db
    .getPhotoById(id)
    .then(pic => res.status(200).json(pic))
    .catch(err =>
      res.status(500).json({ message: ` fix the backend : ${err}` })
    );
  if (!id) {
    res.status(401).json({ message: "no id found" });
  } else {
    return pictures;
  }
});

router.post("/", upload.single("photo_of_order"), (req, res) => {
  const body = req.body;

  debugger;
  // console.log(req.body,'id');

   console.log(req.file, "img");
  if (!body) {
    return res.status(401).json({ message: "no data" });
  }
  if (!body.item_name) {
    return res.status(401).json({ message: "no item_name" });
  } else {
    debugger;
    console.log(req.file);
    db.addPhoto({
      item_name: req.body.item_name,
      photo_of_order: `https://foodappapisql.herokuapp.com/uploads/${req.file.filename}`,
      food_rating: req.body.food_rating,
      user_id: req.body.user_id
    })
      .then(pic => res.status(200).json(pic))
      .catch(err =>
        res.status(500).json({ message: ` fix the backend : ${err}` })
      );
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  console.log(id);

  if (!body) {
    return res.status(401).json({ message: "no body found" });
  } else if (!id) {
    res.status(401).json({ message: "no  id found" });
  } else {
    return db
      .updatePhoto(id, body)
      .then(pic => res.status(200).json(pic))
      .catch(err =>
        res.status(500).json({ message: ` fix the backend : ${err}` })
      );
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  console.log(id);

  if (!id) {
    res.status(401).json({ message: "no  id found" });
  } else {
    return db
      .removePhoto(id)
      .then(pic => res.status(200).json(pic))
      .catch(err =>
        res.status(500).json({ message: ` fix the backend : ${err}` })
      );
  }
});

router.delete("/", (req, res) => {
  const l = false;
  console.log();

  if (l) {
    res.status(401).json({ message: "no   found" });
  } else {
    return db
      .removeAllPhoto()
      .then(pic => res.status(200).json(pic))
      .catch(err =>
        res.status(500).json({ message: ` fix the backend : ${err}` })
      );
  }
});

module.exports = router;
