const request = require('supertest');
const express = require('express');
const bugRoutes = require('../routes/bugRoutes');
const Bug = require('../models/bugModel');

jest.mock('../models/bugModel'); // Automatically mocks Bug.create, Bug.find, etc.

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

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test bug');
    expect(Bug.create).toHaveBeenCalledWith({
      title: 'Test bug',
      description: 'desc',
    });
  });

  test('should return error if no title', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({ description: 'desc only' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Title is required');
  });

  test('should get all bugs', async () => {
    Bug.find.mockResolvedValue([
      { _id: '1', title: 'Bug 1', description: 'desc 1' },
      { _id: '2', title: 'Bug 2', description: 'desc 2' },
    ]);

    const res = await request(app).get('/api/bugs');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(Bug.find).toHaveBeenCalled();
  });

  test('should update a bug', async () => {
    const mockBug = {
      status: 'open',
      save: jest.fn().mockResolvedValue({ _id: '123', status: 'resolved' }),
    };

    Bug.findById.mockResolvedValue(mockBug);

    const res = await request(app)
      .put('/api/bugs/123')
      .send({ status: 'resolved' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('resolved');
    expect(mockBug.save).toHaveBeenCalled();
  });

  test('should delete a bug', async () => {
    Bug.findByIdAndDelete.mockResolvedValue({
      _id: '123',
      title: 'Bug to delete',
    });

    const res = await request(app).delete('/api/bugs/123');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bug deleted');
    expect(Bug.findByIdAndDelete).toHaveBeenCalledWith('123');
  });
});
