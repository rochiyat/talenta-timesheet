import moment from 'moment';
import { Timesheet, Data } from '../models/timesheet.model';

const startTime = process.env.START_TIME;
const endTime = process.env.END_TIME;

const payloadUtil = {
  dataFormated: (response: Timesheet[]) => {
    return response.map((dt: Timesheet) => {
      return {
        date: dt.date,
        total_duration: dt.total_duration,
        data: dt.data.map((d: Data) => {
          return {
            id: d.id,
            task_id: d.task_id,
            task_title: d.task_title,
            start_time: d.start_time,
            end_time: d.end_time,
            duration: d.activity_duration,
            activity: d.activity,
          };
        }),
      };
    });
  },

  formatTaskData(payload: any) {
    const { taskId, activity, startDate, endDate } = payload;
    return {
      task_id: taskId,
      activity: activity,
      start_time: moment(startDate).format(`YYYY-MM-DD ${startTime}`),
      end_time: moment(endDate).format(`YYYY-MM-DD ${endTime}`),
    };
  },

  formatUpdateTaskData(payload: any) {
    const { taskId, activity, startDate, endDate, id } = payload;
    return {
      id: Number(id),
      task_id: taskId,
      activity: activity,
      start_time: moment(startDate).format(`YYYY-MM-DD ${startTime}`),
      end_time: moment(endDate).format(`YYYY-MM-DD ${endTime}`),
    };
  },
};

export default payloadUtil;
