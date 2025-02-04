import { Router } from 'express';
import timesheetMiddleware from '../middlewares/timesheet.middleware';
import timesheetController from '../contollers/timesheet.controller';

const router = Router();

router.get('/last', async (req, res) => {
  await timesheetController.lastTimesheet(req, res);
});

router.get(
  '/date/:date',
  timesheetMiddleware.validateDate,
  async (req, res) => {
    await timesheetController.timesheetByDate(req, res);
  }
);

router.get('/this-week', async (req, res) => {
  await timesheetController.timesheetThisWeek(req, res);
});

router.get(
  '/range-date/:startDate/:endDate',
  timesheetMiddleware.validateRangeDate,
  async (req, res) => {
    await timesheetController.timesheetByRangeDate(req, res);
  }
);

router.get(
  '/check-timesheet/:year/:month',
  timesheetMiddleware.validateCheckTimesheet,
  async (req, res) => {
    await timesheetController.checkTimesheet(req, res);
  }
);

router.post(
  '/input-timesheet',
  timesheetMiddleware.validateInputTimesheet,
  async (req, res) => {
    await timesheetController.inputTimesheet(req, res);
  }
);

export default router;
