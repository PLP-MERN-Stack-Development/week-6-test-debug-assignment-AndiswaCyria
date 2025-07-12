const request = require('supertest');
const express = require('express');
const bugRoutes = require('../routes/bugRoutes');
const Bug = require('../models/bugModel');
jest.mock('../models/bugModel');

const app = express();
app.use(express.json());
app.use('/api/bugs', bugRoutes);

describe('Bug API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create a bug', async () => {
    Bug.create.mockResolvedValue({
      _id: '123',
      title: 'Test bug',
      description: 'desc',
      status: 'open',
    });

    const res = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test bug', description: 'desc' });

      console.log(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test bug');
  });

  test('should return error if no title', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({ description: 'desc' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Title is required');
  });

  // Add more tests for GET, PUT, DELETE with mocked DB calls
  test('should handle DB error on createBug', async () => {
  // Simulate DB failure
  Bug.create.mockRejectedValue(new Error('Database down'));

  const res = await request(app)
    .post('/api/bugs')
    .send({ title: 'Test bug', description: 'desc' });

  expect(res.statusCode).toBe(500);
  expect(res.body.message).toBe('Server error');
});


});
