import {
  returnSuccess,
  returnNonSuccess,
  getMonthStartAndEnd,
} from '../../../src/utils/helper.util';
import { Request, Response } from 'express';
import moment from 'moment';

describe('Helper Functions', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    mockRequest = {};
    mockResponse = {
      status: statusMock,
      json: jsonMock,
    } as Partial<Response>;
  });

  describe('returnSuccess', () => {
    it('should return a success response with the correct format', () => {
      returnSuccess(
        mockRequest as Request,
        mockResponse as Response,
        200,
        'Success',
        { key: 'value' }
      );

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        status: 'OK',
        message: 'Success',
        data: { key: 'value' },
      });
    });
  });

  describe('returnNonSuccess', () => {
    it('should return an error response with the correct format', () => {
      returnNonSuccess(
        mockRequest as Request,
        mockResponse as Response,
        400,
        'Error occurred'
      );

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        status: 'ERROR',
        message: 'Error occurred',
      });
    });
  });

  describe('getMonthStartAndEnd', () => {
    it('should return the correct start and end date for a given month and year', () => {
      const result = getMonthStartAndEnd('2025', '02');
      expect(result).toEqual({
        startDate: moment('2025-02-01').format('YYYY-MM-DD'),
        endDate: moment('2025-02-01').endOf('month').format('YYYY-MM-DD'),
      });
    });

    it('should correctly handle single-digit month input', () => {
      const result = getMonthStartAndEnd('2025', '3');
      expect(result).toEqual({
        startDate: '2025-03-01',
        endDate: '2025-03-31',
      });
    });
  });
});
