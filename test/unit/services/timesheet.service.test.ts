import { config } from 'dotenv';
import timesheetService from '../../../src/services/timesheet.service';
import httpUtil from '../../../src/utils/http.util';

jest.mock('../../../src/utils/http.util', () => ({
  GET: jest.fn(),
  POST: jest.fn(),
}));
jest.mock('../../../src/utils/payload.util');

const mockCookie = 'mock_cookie';
const mockUrl = 'http://mock.url';

jest.mock('../../../src/configs/env.config', () => ({
  urlTalenta: 'http://mock.url',
}));

describe('timesheetService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Pastikan mock bersih di setiap test case
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('lastTimesheet should return data on success', async () => {
    const mockResponse = { data: { timesheet: 'mock_timesheet_data' } };
    (httpUtil.GET as jest.Mock).mockResolvedValue(mockResponse);

    const result = await timesheetService.lastTimesheet(mockCookie);

    expect(httpUtil.GET).toHaveBeenCalledWith(expect.any(String), '/last', {
      headers: { Cookie: mockCookie },
    });
    expect(result).toEqual(mockResponse.data);
  });

  test('timesheetByDate should return data on success', async () => {
    const mockDate = '2024-02-01';
    const mockResponse = { data: { timesheet: [] } };
    (httpUtil.GET as jest.Mock).mockResolvedValue(mockResponse);

    const result = await timesheetService.timesheetByDate(mockCookie, mockDate);
    expect(result).toEqual(mockResponse.data);
    expect(httpUtil.GET).toHaveBeenCalledWith(
      mockUrl,
      `/report?assigneeid=&date=${mockDate}`,
      { headers: { Cookie: mockCookie } }
    );
  });

  test('getWeeks should return correct week ranges', () => {
    const startDate = '2024-02-01';
    const endDate = '2024-02-28';
    const weeks = timesheetService.getWeeks(startDate, endDate);
    expect(weeks).toBeInstanceOf(Array);
    expect(weeks.length).toBeGreaterThan(0);
  });

  test('inputTimesheet should return success response', async () => {
    const mockPayload = { task: 'test' };
    const mockResponse = { data: { message: 'Success' } };
    (httpUtil.POST as jest.Mock).mockResolvedValue(mockResponse);

    const result = await timesheetService.inputTimesheet(
      mockPayload,
      mockCookie
    );
    expect(result).toEqual(mockResponse.data);
    expect(httpUtil.POST).toHaveBeenCalledWith(mockUrl, '/store', mockPayload, {
      headers: { Cookie: mockCookie },
    });
  });
});
