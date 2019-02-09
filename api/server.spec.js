const request = require('supertest');
const server = require('./server');

describe('testing the route handlers', () => {
  describe('testing GET /games', () => {
    test('should respond with status 200 if successful', async () => {
      const response = await request(server).get('/games')

      expect(response.status).toBe(200)
    })
    
    test('should respond with an array of length 2', async () => {
      const response = await request(server).get('/games')

      expect(response.body.length).toBe(2)
    })
    
    test('should respond with an array of objects', async () => {
      const response = await request(server).get('/games')

      expect(response.body).toEqual([{title: "Red Dead Redemption", genre: "RPG", releaseYear: 2018}, {title: "God of War", genre: "RPG", releaseYear: 2018}])
    })
  })

  describe('testing POST /games', () => {
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

