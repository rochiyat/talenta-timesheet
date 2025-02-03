import { Router } from 'express';
import timesheetRouter from './timesheet.route';

const router = Router();

router.use('/timesheet', timesheetRouter);

export default router;
