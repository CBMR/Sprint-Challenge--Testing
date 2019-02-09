const db = require('../data/dbConfig')

const insert = async (game) => {
  return db('games').insert(game)
}

const getAllGames = async () => {
  return db('games')
}

const getGameById = async (id) => {
  return db('games').where('id', id)
}

const updateGame = async (id, change) => {
  return db('games').where('id', id).update(change)
}

const remove = async (id) => {
  return db('games').where('id', id).del()
}

module.exports = {
  insert,
  getAllGames,
  getGameById,
  updateGame,
  remove
}
