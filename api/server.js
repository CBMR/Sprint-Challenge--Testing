const express = require('express')
const games = require('../models/gamesModel')

const server = express();

server.use(express.json());

server.get('/games', async (req, res) => {
  const allGames = await games.getAllGames();

  res.status(200).json(allGames)
})

server.get('/games/:id', async (req, res) => {
  const { id } = req.params;

  const game = await games.getGameById(id)
  res.status(200).json(game)
})

server.post('/games', async (req, res) => {
  const body = req.body;

  if(body.title && body.genre) {
    try {
      await games.insert(body)
      res.status(201).json({success: "the game has been added"})
    } catch (error) {
      res.status(500).json({failure: "unable to send data"})
    }
  } else {
    res.status(422).json({failure: "please add the title or genre"})
  }
})

module.exports = server;