import config from '../configs/env.config';
import httpUtil from '../utils/http.util';

const timesheetService = {
  lastTimesheet: async (cookie: string) => {
    try {
      const url = config.urlTalenta;
      if (!url) {
        throw new Error('URL_TALENTA is not defined');
      }
      const response = await httpUtil.GET(url, '/timesheet/last', '', {
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
      const response = await httpUtil.GET(url, `/timesheet/${params}`, '', {
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
