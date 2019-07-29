const server = require('./server.js')
const port = 3000

server.listen(3000, () => {
  console.log(`server listening on port ${port}`)
})
