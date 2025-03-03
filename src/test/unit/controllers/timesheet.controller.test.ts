import { Request, Response } from 'express';
import timesheetController from '../../../contollers/timesheet.controller';
import timesheetService from '../../../services/timesheet.service';

jest.mock('../../../utils/payload.util');
jest.mock('../../../services/timesheet.service');

describe('timesheetController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock })) as any;
    req = { headers: { cookie: 'mock_cookie' } } as Partial<Request>;
    res = { status: statusMock } as Partial<Response>;
  });

  it('should return last timesheet successfully', async () => {
    (timesheetService.lastTimesheet as jest.Mock).mockResolvedValue({
      status: 200,
      message: 'Last timesheet',
      data: { timesheet: 'mock_timesheet_data' },
    });

    await timesheetController.lastTimesheet(req as Request, res as Response);

    expect(timesheetService.lastTimesheet).toHaveBeenCalledWith('mock_cookie');
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Last timesheet',
      data: { timesheet: 'mock_timesheet_data' },
    });
  });

  it('should return error if no cookie is provided', async () => {
    req.headers = {}; // No cookie

    await timesheetController.lastTimesheet(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      status: 'ERROR',
      message: 'Cookie is required',
    });
  });
});
