import { Router } from 'express';
import timesheetController from '../contollers/timesheet.controller';
import timesheetMiddleware from '../middlewares/timesheet.middleware';

const router = Router();

router.get('/last', timesheetMiddleware.validateCookie, async (req, res) => {
  await timesheetController.lastTimesheet(req, res);
});

router.get(
  '/:date',
  timesheetMiddleware.validateCookie,
  timesheetMiddleware.validateDate,
  async (req, res) => {
    await timesheetController.timesheetByDate(req, res);
  }
);

export default router;
