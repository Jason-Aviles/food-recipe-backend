const server = require('./server')

require('dotenv').config()
const PORT = process.env.PORT  || 6000;

server.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
})