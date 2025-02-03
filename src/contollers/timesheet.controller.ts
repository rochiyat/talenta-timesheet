import { Request, Response } from 'express';
import { returnNonSuccess, returnSuccess } from '../utils/helper.util';
import timesheetService from '../services/timesheet.service';
import payloadUtil from '../utils/payload.util';

const timesheetController = {
  lastTimesheet: async (req: Request, res: Response) => {
    try {
      const { cookie } = req.headers;
      if (!cookie) {
        return returnNonSuccess(req, res, 500, 'Cookie is required');
      }

      const response = await timesheetService.lastTimesheet(cookie);
      if (response.status !== 200) {
        return returnNonSuccess(req, res, 500, response.error);
      }
      return returnSuccess(req, res, 200, 'Last timesheet', response.data);
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  timesheetByDate: async (req: Request, res: Response) => {
    try {
      const { cookie } = req.headers;
      const { date } = req.params;
      if (!cookie) {
        return returnNonSuccess(req, res, 500, 'Cookie is required');
      }
      const response = await timesheetService.timesheetByDate(cookie, date);
      if (response.status !== 200) {
        return returnNonSuccess(req, res, 500, response.error);
      }
      const formatData = {
        duration_week: response.data.duration_week,
        daily: payloadUtil.dataFormated(response.data.daily),
      };
      const data = formatData.daily.filter((dt: any) => dt.date === date);
      return returnSuccess(req, res, 200, 'Timesheet by date', data);
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },
};

export default timesheetController;
