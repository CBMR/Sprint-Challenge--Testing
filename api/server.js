const express = require('express')

const server = express();

server.use(express.json());
const games = [{title: "Red Dead Redemption", genre: "RPG", releaseYear: 2018}, {title: "God of War", genre: "RPG", releaseYear: 2018}]

server.get('/games', async (req, res) => {
  res.status(200).json(games)
})

server.post('/games', async (req, res) => {
  const body = req.body;

  if(body.title && body.genre) {
    res.status(201).json({success: "the game has been added"})
  } else {
    res.status(422).json({failure: "please add the title or genre"})
  }
})

module.exports = server;