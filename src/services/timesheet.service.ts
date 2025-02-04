import moment from 'moment';
import config from '../configs/env.config';
import httpUtil from '../utils/http.util';
import payloadUtil from '../utils/payload.util';

const timesheetService = {
  lastTimesheet: async (cookie: string) => {
    try {
      const url = config.urlTalenta;
      if (!url) {
        throw new Error('URL_TALENTA is not defined');
      }
      const response = await httpUtil.GET(url, '/last', {
        headers: {
          Cookie: cookie,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  timesheetByDate: async (cookie: string, date: string) => {
    try {
      const url = config.urlTalenta;
      if (!url) {
        throw new Error('URL_TALENTA is not defined');
      }

      const params = `report?assigneeid=&date=${date}`;
      const response = await httpUtil.GET(url, `/${params}`, {
        headers: {
          Cookie: cookie,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  getRangeDate: async (cookie: string, startDate: string, endDate: string) => {
    const weeks = timesheetService.getWeeks(startDate, endDate);
    const promises = weeks.map((week: any) => {
      return timesheetService.timesheetByDate(cookie, week.end);
    });
    const result = await Promise.all(promises);
    const datas = result.map((dt: any) =>
      payloadUtil.dataFormated(dt.data.daily)
    );
    return datas
      .flatMap((dt: any) => dt)
      .map((dt: any) => {
        if (dt.date >= startDate && dt.date <= endDate) {
          return dt;
        }
      })
      .filter((dt: any) => dt);
  },

  getWeeks: (startDate: string, endDate: string) => {
    // Convert input strings to moment objects
    let start = moment(startDate);
    let end = moment(endDate);
    let weeks = [];

    // Ensure start date is Monday
    if (start.day() !== 1) {
      start = start.day(1);
    }

    // Iterate through weeks until we reach or pass the end date
    while (start.isBefore(end)) {
      let weekStart = start.clone();
      let weekEnd = start.clone().day(7); // End on Sunday of the same week

      // If the week end is after the overall end date, use the overall end date
      if (weekEnd.isAfter(end)) {
        weekEnd = end.clone();
      }

      // Add the week object to the array
      weeks.push({
        start: weekStart.format('YYYY-MM-DD'),
        end: weekEnd.format('YYYY-MM-DD'),
      });

      // Move to next week
      start.add(1, 'weeks');
    }

    return weeks;
  },

  inputTimesheet: async (payload: any, cookie: string) => {
    try {
      const url = config.urlTalenta;
      if (!url) {
        throw new Error('URL_TALENTA is not defined');
      }
      const response = await httpUtil.POST(url, '/store', payload, {
        headers: {
          Cookie: cookie,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },
};

export default timesheetService;
