const server = require('./server')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT  || 5000;

server.use(cors());
server.options('*', cors());

server.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
})