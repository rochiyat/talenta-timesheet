import { Request, Response } from 'express';
import moment from 'moment';
import { returnNonSuccess, returnSuccess } from '../utils/helper.util';
import timesheetService from '../services/timesheet.service';
import payloadUtil from '../utils/payload.util';
import { getMonthStartAndEnd } from '../utils/helper.util';
import { log } from 'console';

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

  timesheetThisWeek: async (req: Request, res: Response) => {
    try {
      const { cookie } = req.headers;
      console.log('cookie', cookie);
      if (!cookie) {
        return returnNonSuccess(req, res, 500, 'Cookie is required');
      }
      const response = await timesheetService.timesheetByDate(
        cookie,
        moment().format('YYYY-MM-DD')
      );
      if (response.status !== 200) {
        return returnNonSuccess(req, res, 500, response.error);
      }
      const formatData = payloadUtil.dataFormated(response.data.daily);
      return returnSuccess(req, res, 200, 'Timesheet this week', formatData);
    } catch (error: any) {
      console.log('error', error);
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  timesheetByRangeDate: async (req: Request, res: Response) => {
    try {
      const { cookie } = req.headers;
      const { startDate, endDate } = req.params;
      if (!cookie) {
        return returnNonSuccess(req, res, 500, 'Cookie is required');
      }
      const formatData = await timesheetService.getRangeDate(
        cookie,
        startDate,
        endDate
      );
      return returnSuccess(
        req,
        res,
        200,
        'Timesheet by range date',
        formatData
      );
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  checkTimesheet: async (req: Request, res: Response) => {
    try {
      const { cookie } = req.headers;
      const { year, month } = req.params;
      if (!cookie) {
        return res.status(500).send('Cookie is required');
      }

      const { startDate, endDate } = getMonthStartAndEnd(year, month);
      const formatData = await timesheetService.getRangeDate(
        cookie,
        startDate,
        endDate
      );
      let dateData;
      const result = formatData.map((data: any) => {
        dateData = moment(data.date);
        return {
          date: data.date,
          day: moment(data.date).format('dddd'),
          total_duration: data.total_duration,
          days: dateData.day(),
          is_valid:
            dateData.day() === 0 || dateData.day() === 6
              ? data.total_duration === '00:00:00'
              : data.total_duration === '08:00:00',
        };
      });
      return returnSuccess(req, res, 200, 'Check timesheet', result);
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  inputTimesheet: async (req: Request, res: Response) => {
    try {
      const { cookie } = req.headers;
      const data = req.body;
      let response;
      let payload;

      if (!cookie) {
        return res.status(500).send('Cookie is required');
      }

      if (!data) {
        return res.status(500).send('Data is required');
      }

      const diffDays = moment(data.endDate).diff(
        moment(data.startDate),
        'days'
      );

      if (diffDays < 0) {
        return res
          .status(500)
          .send('End time should be greater than start time');
      } else if (diffDays === 0) {
        payload = payloadUtil.formatTaskData(data);
        response = await timesheetService.inputTimesheet(payload, cookie);
      } else if (diffDays > 0) {
        let promises = [];
        let payloadData;
        let date;
        for (let i = 0; i <= diffDays; i++) {
          date = moment(data.startDate).add(i, 'days');
          if (date.day() === 0 || date.day() === 6) {
            continue;
          }
          payloadData = {
            taskId: data.taskId,
            activity: data.activity,
            startDate: moment(date).format('YYYY-MM-DD'),
            endDate: moment(date).format('YYYY-MM-DD'),
          };
          payload = payloadUtil.formatTaskData(payloadData);
          promises.push(timesheetService.inputTimesheet(payload, cookie));
        }
        response = await Promise.all(promises);
      }
      return returnSuccess(req, res, 200, 'Bulk input timesheet', response);
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },
};

export default timesheetController;
