const server = require('./server')

require('dotenv').config()
const PORT = process.env.PORT  || 5005;

server.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
})