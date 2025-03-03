import { Request, Response, NextFunction } from 'express';
import timesheetMiddleware from '../../../middlewares/timesheet.middleware';
import Joi from 'joi';

describe('timesheetMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {}; // Inisialisasi objek kosong
    res = {}; // Inisialisasi res agar tidak undefined
    next = jest.fn(); // Mock fungsi next()
  });

  test('validateCookie - harus memanggil next() jika cookie valid', () => {
    req = { headers: { cookie: 'valid_cookie' } };

    timesheetMiddleware.validateCookie(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(); // Tidak ada error
  });

  test('validateCookie - harus mengembalikan error jika cookie tidak ada', () => {
    req = { headers: {} };

    timesheetMiddleware.validateCookie(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(Joi.ValidationError)); // Error harus dipanggil
  });

  test('validateDate - harus memanggil next() jika date valid', () => {
    req = { params: { date: '2024-02-05' } };

    timesheetMiddleware.validateDate(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  test('validateDate - harus mengembalikan error jika date tidak ada', () => {
    req = { params: {} };

    timesheetMiddleware.validateDate(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(Joi.ValidationError));
  });

  test('validateRangeDate - harus memanggil next() jika startDate dan endDate valid', () => {
    req = { params: { startDate: '2024-02-01', endDate: '2024-02-05' } };

    timesheetMiddleware.validateRangeDate(
      req as Request,
      res as Response,
      next
    );

    expect(next).toHaveBeenCalledWith();
  });

  test('validateRangeDate - harus mengembalikan error jika startDate atau endDate tidak ada', () => {
    req = { params: { startDate: '2024-02-01' } };

    timesheetMiddleware.validateRangeDate(
      req as Request,
      res as Response,
      next
    );

    expect(next).toHaveBeenCalledWith(expect.any(Joi.ValidationError));
  });

  test('validateCheckTimesheet - harus memanggil next() jika year dan month valid', () => {
    req = { params: { year: '2024', month: '02' } };

    timesheetMiddleware.validateCheckTimesheet(
      req as Request,
      res as Response,
      next
    );

    expect(next).toHaveBeenCalledWith();
  });

  test('validateCheckTimesheet - harus mengembalikan error jika year atau month tidak ada', () => {
    req = { params: { year: '2024' } };

    timesheetMiddleware.validateCheckTimesheet(
      req as Request,
      res as Response,
      next
    );

    expect(next).toHaveBeenCalledWith(expect.any(Joi.ValidationError));
  });

  test('validateInputTimesheet - harus memanggil next() jika semua data valid', () => {
    req = {
      body: {
        taskId: 12345,
        activity: 'Coding',
        startDate: '2024-02-01',
        endDate: '2024-02-05',
      },
    };

    timesheetMiddleware.validateInputTimesheet(
      req as Request,
      res as Response,
      next
    );

    expect(next).toHaveBeenCalledWith();
  });

  test('validateInputTimesheet - harus mengembalikan error jika ada field yang kosong', () => {
    req = {
      body: {
        taskId: 'task123',
        activity: 'Coding',
        startDate: '2024-02-01',
      },
    };

    timesheetMiddleware.validateInputTimesheet(
      req as Request,
      res as Response,
      next
    );

    expect(next).toHaveBeenCalledWith(expect.any(Joi.ValidationError));
  });
});
