const server = require('./api/server')

const PORT = 4333;

server.listen(PORT, () => {
  console.log(`<<== running on port ${PORT} ==>>`)
})