const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig')

describe('testing the route handlers', () => {
  describe('testing GET /games', () => {
    test('should respond with status 200 if successful', async () => {
      const response = await request(server).get('/games')

      expect(response.status).toBe(200)
    })
    
    test('should respond with a json object', async () => {
      const response = await request(server).get('/games')

      expect(response.type).toMatch(/json/i)
    })
    
    test('should respond with an array of objects', async () => {
      const response = await request(server).get('/games')

      expect(response.body).toEqual([])
    })
  })

  describe('testing POST /games', () => {
    afterEach( async () => {
      await db('games').truncate()
    })
    test('should respond with status 201 if successful', async () => {
      const body = {title: "Spiderman", genre: "RPG", releaseYear: 2018}
      const response = await request(server).post('/games').send(body)

      expect(response.status).toBe(201)
    })

    test('should respond with status 422 if not all the keys are included', async () => {
      const body = {title: "Spiderman", releaseYear: 2018}
      const response = await request(server).post('/games').send(body)

      expect(response.status).toBe(422)
    })
    
    test('should resond with a successful message if successful', async () => {
      const body = {title: "God of War", genre: "RPG", releaseYear: 2018}
      const response = await request(server).post('/games').send(body)

      expect(response.body).toEqual({success: "the game has been added"})
    })
  })
})

