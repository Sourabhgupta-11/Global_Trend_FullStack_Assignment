const request = require('supertest');
const app = require('../src/app');
const store = require('../src/store');

beforeEach(() => {
  const tasks = store.getAll();
  tasks.forEach((t) => store.delete(t.id));
});

describe('GET /tasks', () => {
  it('returns an empty list initially', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([]);
  });

  it('filters by completed status', async () => {
    store.create({ title: 'Task A' });
    const task = store.create({ title: 'Task B' });
    store.update(task.id, { completed: true });

    const res = await request(app).get('/tasks?status=completed');
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].title).toBe('Task B');
  });

  it('filters by incomplete status', async () => {
    store.create({ title: 'Task A' });
    const task = store.create({ title: 'Task B' });
    store.update(task.id, { completed: true });

    const res = await request(app).get('/tasks?status=incomplete');
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].title).toBe('Task A');
  });
});

describe('POST /tasks', () => {
  it('creates a task with valid data', async () => {
    const res = await request(app).post('/tasks').send({ title: 'New Task' });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe('New Task');
    expect(res.body.data.completed).toBe(false);
    expect(res.body.data.id).toBeDefined();
  });

  it('returns 400 if title is missing', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('returns 400 if title is empty string', async () => {
    const res = await request(app).post('/tasks').send({ title: '   ' });
    expect(res.statusCode).toBe(400);
  });
});

describe('PATCH /tasks/:id', () => {
  it('marks a task as completed', async () => {
    const task = store.create({ title: 'Todo' });
    const res = await request(app).patch(`/tasks/${task.id}`).send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.completed).toBe(true);
  });

  it('edits task title', async () => {
    const task = store.create({ title: 'Old Title' });
    const res = await request(app).patch(`/tasks/${task.id}`).send({ title: 'New Title' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe('New Title');
  });

  it('returns 404 for unknown id', async () => {
    const res = await request(app).patch('/tasks/non-existent-id').send({ completed: true });
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /tasks/:id', () => {
  it('deletes an existing task', async () => {
    const task = store.create({ title: 'Delete me' });
    const res = await request(app).delete(`/tasks/${task.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('returns 404 for unknown id', async () => {
    const res = await request(app).delete('/tasks/ghost-id');
    expect(res.statusCode).toBe(404);
  });
});
