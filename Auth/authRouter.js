const router = require("express").Router();
const db = require("./authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../Secret/secret");


router.post("/register", async (req, res) => {
  const creds = req.body;
  console.log(creds)
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  if (creds) {
   await db.add(creds)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({ message: "failed to add user" });
      });
  } else {
    res.status(401).json({ message: "missing username and password" });
  }
});


router.post("/login",  (req, res) => {
  let { password, username } = req.body;
  if (password && username) {
     db.findBy({ username })
      .first() //takes first item out of object
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);

          res.status(200).json({ message: `Hello ${user.username}`, token,id:user.id });
        } else {
          res.status(401).json({ message: "invalid login info" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "you messed up, login failed" });
      });
  } else {
    res.status(401).json({ message: "missing username or password" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const option = {
    expiresIn: "8h"
  };

  return jwt.sign(payload, secret.jwtSecret, option);
}

module.exports = router;
