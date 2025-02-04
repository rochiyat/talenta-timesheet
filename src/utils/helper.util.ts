import { Request, Response } from 'express';
import moment from 'moment';
export function returnSuccess(
  req: Request,
  res: Response,
  statusCode: number,
  message: string,
  data: any
) {
  const returnResponse = {
    status: 'OK',
    message,
    data,
  };
  return res.status(statusCode).json(returnResponse);
}

export function returnNonSuccess(
  req: Request,
  res: Response,
  statusCode: number,
  message: string
) {
  const returnResponse = {
    status: 'ERROR',
    message,
  };
  return res.status(statusCode).json(returnResponse);
}

export function getMonthStartAndEnd(year: string, month: string) {
  const paddedMonth = month.toString().padStart(2, '0');
  const startDate = moment(`${year}-${paddedMonth}-01`, 'YYYY-MM-DD').format(
    'YYYY-MM-DD'
  );
  const endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
  return { startDate, endDate };
}
