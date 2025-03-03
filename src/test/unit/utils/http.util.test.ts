import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import httpUtil from '../../../utils/http.util';

describe('httpUtil', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    // Inisialisasi mock adapter sebelum setiap test
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    // Reset mock adapter setelah setiap test
    mock.reset();
  });

  describe('GET method', () => {
    it('should make a GET request and return data', async () => {
      const baseURL = 'https://api.example.com';
      const params = '/data';
      const mockResponse = { success: true, data: { id: 1, name: 'Test' } };

      // Mock response untuk request GET
      mock.onGet(baseURL + params).reply(200, mockResponse);

      const response = await httpUtil.GET(baseURL, params);
      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockResponse);
    });

    it('should handle GET request failure', async () => {
      const baseURL = 'https://api.example.com';
      const params = '/data';

      // Mock response untuk request GET gagal
      mock
        .onGet(baseURL + params)
        .reply(500, { error: 'Internal Server Error' });

      try {
        await httpUtil.GET(baseURL, params);
      } catch (error: any) {
        expect(error.response.status).toBe(500);
        expect(error.response.data).toEqual({ error: 'Internal Server Error' });
      }
    });
  });

  describe('POST method', () => {
    it('should make a POST request and return data', async () => {
      const baseURL = 'https://api.example.com';
      const params = '/submit';
      const payload = { key: 'value' };
      const mockResponse = { success: true, message: 'Data submitted' };

      // Mock response untuk request POST
      mock.onPost(baseURL + params, payload).reply(201, mockResponse);

      const response = await httpUtil.POST(baseURL, params, payload);
      expect(response.status).toBe(201);
      expect(response.data).toEqual(mockResponse);
    });

    it('should handle POST request failure', async () => {
      const baseURL = 'https://api.example.com';
      const params = '/submit';
      const payload = { key: 'value' };

      // Mock response untuk request POST gagal
      mock
        .onPost(baseURL + params, payload)
        .reply(400, { error: 'Bad Request' });

      try {
        await httpUtil.POST(baseURL, params, payload);
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toEqual({ error: 'Bad Request' });
      }
    });
  });
});
