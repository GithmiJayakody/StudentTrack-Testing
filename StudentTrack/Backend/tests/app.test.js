
const request = require('supertest');
const app = require('../app');

describe('StudentTrack API', () => {

  test('GET / should return API running message', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Attendance Tracker API is running...');
  });

  test('CORS should allow requests from the authorized frontend', async () => {
    const response = await request(app)
      .get('/')
      .set('Origin', 'http://localhost:5174');

    expect(response.headers['access-control-allow-origin'])
      .toBe('http://localhost:5174');
  });

  test('CORS should not allow requests from unauthorized origins', async () => {
    const response = await request(app)
        .get('/')
        .set('Origin', 'http://unauthorized.example.com');

    expect(response.headers['access-control-allow-origin'])
        .not.toBe('http://unauthorized.example.com');
    });

  test('Response should not expose the Express framework header', async () => {
    const response = await request(app).get('/');

    expect(response.headers['x-powered-by']).toBeUndefined();
  });

});
