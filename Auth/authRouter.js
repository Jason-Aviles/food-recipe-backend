const router = require("express").Router();
const db = require("./authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../Secret/secret");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto")
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

// sgMail.setApiKey("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");
// const transporter=nodemailer.createTransport(sendgridTransport({
// auth:{  api_key:"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"}
// }))
// sgMail.setApiKey(
//   "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"
// );
const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{  api_key:"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"}
  }))

router.post("/register", async (req, res) => {
  
  // if (await db.findByusername(req.body.username)) {
  //   return res.json({
  //     message: `username ${creds.username} is already created `
  //   });
  // }
  const creds = req.body;
console.log(creds)
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;

  
  

  // console.log(db.findBy({email:creds.email}).then(user => console.log(user,'here')))
  // if (await db.findByemail(creds.email)) {
  //   return res.json({ message: ` email ${creds.email} is already created` });
  // }
  const msg = {
    to: creds.email,
    from: "sandman2k18@outlook.com",
    subject: "register",
    text: "and easy to do anywhere, even with Node.js",
    html: `<h1>You successfully signed up ${creds.username}</h1>`
  };

  if (creds) {
    db.add(creds)
      .then(user => {
        sgMail.send(msg);
        res.status(201).json(user);
      })
      .catch(error => {
        if(error.errno ===1062){
          res.status(500).json({ message: "duplicate email or username in database" });
        }
        res.status(500).json({ message: "failed to add user" });
      });
  } else {
    res.status(401).json({ message: "missing username and password" });
  }
  //   try {
  //     //  transporter.sendMail(msg)

  //     sgMail.send(msg);

  //     res.status(201).json(db.add(creds));
      
  //   } catch (error) {
  //     console.log(error.message.ER_DUP_ENTRY,"hello")
  //     if(
  //     error.message.errno===1062){
  //     return  await res.json({ message: ` duplicate email or username in database` });
  //     }
  //  return await res.json({ message:` duplicate email or username in database` });
      
  //   }
    
});

router.post("/login", async (req, res) => {
  let { password, username } = req.body;

 

  // console.log(db.findBy({email:creds.email}).then(user => console.log(user,'here')))


  if (password && username) {
     await db
      .findByusername( username )
      //takes first item out of object
      .then(user => {
        console.log(user)
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);

      res
            .status(200)
            .json({ username: `${user.username}`, token, id: user.id });
        } else {
          res.json({ message: "invalid login info" });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "you messed up, login failed" + error });
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
    expiresIn: "24h"
  };

  return jwt.sign(payload, secret.jwtSecret, option);
}



router.put("/reset", async (req, res) => {
let {password,email,username} = req.body

 if(await db.findByusername(username) ===null  ){
 return res.json({message:"username dosnt exist"})
 
 } 
  if(await db.findByemail(email) ===  null||await db.findByemail(email) ===  undefined  ){
return res.json({message:"email doesnt exist"})

 } 
 
 
 if (await db.findBy({username:username,email:email})  === undefined  ||await db.findBy({username:username,email:email})  === null ){
  res.json({message:"email and user name dont match"})
 }


 req.body.password =  crypto.randomBytes(20).toString('hex')
   const msg = {
    to: email,
    from: "sandman2k18@outlook.com",
    subject: "Password reset",
    text: "and easy to do anywhere, even with Node.js",
    html: `<h1> Hey ${req.params.username} this is your new temporary  password : ${req.body.password} </h1>`
  };


  try {
    // sgMail.send(msg);
    transporter.sendMail(msg)
 const hash = bcrypt.hashSync(req.body.password, 14);
  req.body.password = hash;
    
    res.status(201).json( await db.update_password({email,reset:req.body}))
 
  } catch (error) {
    res.status(500).json({message:error})
  }
  
});


//check if is not the right email 
//check if is not the right user
//change password to a temp password
//send password to email

module.exports = router;
