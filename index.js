const server = require('./server')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT  || 5000;
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.use(cors());
server.options('*', cors());

server.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
})